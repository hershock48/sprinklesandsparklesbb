import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { bySlug, money, DOWNLOADS } from '@/lib/catalog';

export const runtime = 'nodejs';

/**
 * Stripe calls this after a successful payment. It sends the buyer their
 * download links and tells Brittany an order came in.
 *
 * Set up in Stripe: Developers > Webhooks > add endpoint
 *   URL    https://your-domain.com/api/stripe/webhook
 *   Event  checkout.session.completed
 * Copy the signing secret into STRIPE_WEBHOOK_SECRET.
 */
export async function POST(req) {
  const key = process.env.STRIPE_SECRET_KEY;
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!key || !whSecret) {
    return NextResponse.json({ error: 'Webhook not configured.' }, { status: 503 });
  }

  const stripe = new Stripe(key);
  const raw = await req.text();
  const signature = req.headers.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(raw, signature, whSecret);
  } catch (err) {
    console.error('[webhook] bad signature', err?.message);
    return NextResponse.json({ error: 'Bad signature.' }, { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object;
  const items = (session.metadata?.cart || '')
    .split(',')
    .filter(Boolean)
    .map((entry) => {
      const [slug, qty] = entry.split(':');
      return { product: bySlug(slug), qty: parseInt(qty, 10) || 1 };
    })
    .filter((i) => i.product);

  try {
    await Promise.all([sendBuyerEmail(session, items), sendOwnerEmail(session, items)]);
  } catch (err) {
    // Never fail the webhook over email. Stripe would keep retrying.
    console.error('[webhook] email failed', err?.message);
  }

  return NextResponse.json({ received: true });
}

async function resend(payload) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ORDER_FROM;
  if (!apiKey || !from) return;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, ...payload }),
  });

  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${await res.text()}`);
  }
}

function shell(inner) {
  return `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:#FFFCF7;padding:32px">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:2px solid #F0E3D6;border-radius:24px;overflow:hidden">
    <div style="height:8px;background:linear-gradient(115deg,#FF4E9B,#FF8A3D,#FFC93C,#5FCB53,#2DC7DE,#8B6BFF)"></div>
    <div style="padding:28px">${inner}</div>
  </div>
</div>`;
}

async function sendBuyerEmail(session, items) {
  const to = session.customer_details?.email;
  if (!to) return;

  const origin = process.env.NEXT_PUBLIC_SITE_URL || '';
  const digital = items.filter((i) => i.product.kind === 'digital');
  const physical = items.filter((i) => i.product.kind === 'physical');

  const downloads = digital
    .map(({ product }) => {
      const ready = Boolean(DOWNLOADS[product.file]);
      const link = `${origin}/api/download/${product.slug}?session_id=${session.id}`;
      return ready
        ? `<li style="margin:0 0 10px"><a href="${link}" style="color:#E8317F;font-weight:700">${product.name}</a></li>`
        : `<li style="margin:0 0 10px">${product.name} <span style="color:#7C6C8C">(coming by email shortly)</span></li>`;
    })
    .join('');

  const shipping = physical
    .map(
      ({ product, qty }) =>
        `<li style="margin:0 0 6px">${product.name} &times;${qty} <span style="color:#7C6C8C">${money(
          product.price * qty
        )}</span></li>`
    )
    .join('');

  await resend({
    to,
    subject: 'Your Sprinkles & Sparkles order',
    html: shell(`
      <h1 style="margin:0 0 8px;font-size:24px;color:#2E2340">Thank you</h1>
      <p style="margin:0 0 20px;color:#7C6C8C;line-height:1.6">Your order came through. Go make something shiny.</p>
      ${digital.length ? `<h2 style="font-size:16px;color:#2E2340;margin:0 0 10px">Your downloads</h2><ul style="padding-left:18px;margin:0 0 24px">${downloads}</ul>` : ''}
      ${physical.length ? `<h2 style="font-size:16px;color:#2E2340;margin:0 0 10px">Shipping to you</h2><ul style="padding-left:18px;margin:0 0 24px;color:#2E2340">${shipping}</ul><p style="margin:0 0 20px;color:#7C6C8C">Packed and mailed from Michigan, usually within a couple of days.</p>` : ''}
      <p style="margin:0;color:#7C6C8C;font-size:13px">Reply to this email if anything looks off.</p>
    `),
  });
}

async function sendOwnerEmail(session, items) {
  const to = process.env.ORDER_TO;
  if (!to) return;

  const lines = items
    .map(({ product, qty }) => `<li>${product.name} &times;${qty}</li>`)
    .join('');
  const addr = session.shipping_details?.address;

  await resend({
    to,
    reply_to: session.customer_details?.email,
    subject: `New order, ${money(session.amount_total)}`,
    html: shell(`
      <h1 style="margin:0 0 8px;font-size:20px;color:#2E2340">New order</h1>
      <p style="margin:0 0 16px;color:#7C6C8C">${session.customer_details?.name || ''} ${session.customer_details?.email || ''}</p>
      <ul style="padding-left:18px;color:#2E2340">${lines}</ul>
      <p style="margin:16px 0 0;font-weight:700;color:#2E2340">Total ${money(session.amount_total)}</p>
      ${
        addr
          ? `<p style="margin:16px 0 0;color:#2E2340;line-height:1.5">${[addr.line1, addr.line2, `${addr.city || ''} ${addr.state || ''} ${addr.postal_code || ''}`, addr.country].filter(Boolean).join('<br>')}</p>`
          : '<p style="margin:16px 0 0;color:#7C6C8C">Digital only, nothing to ship.</p>'
      }
    `),
  });
}
