import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import {
  bySlug,
  CURRENCY,
  SHIPPING,
  FREE_SHIPPING_AT,
  subtotal,
  hasPhysical,
} from '@/lib/catalog';

export const runtime = 'nodejs';

function siteUrl(req) {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return new URL(req.url).origin;
}

export async function POST(req) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json(
      { error: 'Checkout is not connected yet. Add STRIPE_SECRET_KEY.' },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Bad request.' }, { status: 400 });
  }

  // Rebuild every line from our own catalog. Nothing about price or name
  // is taken from the browser, only the slug and how many.
  const clean = [];
  for (const raw of Array.isArray(body?.items) ? body.items : []) {
    const product = bySlug(raw?.slug);
    if (!product) continue;
    const qty = product.kind === 'digital' ? 1 : Math.min(Math.max(parseInt(raw?.qty, 10) || 1, 1), 99);
    if (clean.some((c) => c.slug === product.slug)) continue;
    clean.push({ slug: product.slug, qty });
  }

  if (clean.length === 0) {
    return NextResponse.json({ error: 'Your bag is empty.' }, { status: 400 });
  }

  const stripe = new Stripe(key);
  const origin = siteUrl(req);
  const physical = hasPhysical(clean);
  const freeShipping = FREE_SHIPPING_AT && subtotal(clean) >= FREE_SHIPPING_AT;

  const line_items = clean.map(({ slug, qty }) => {
    const p = bySlug(slug);
    return {
      quantity: qty,
      price_data: {
        currency: CURRENCY,
        unit_amount: p.price,
        product_data: {
          name: p.name,
          description: p.blurb,
          images: [p.image.split('?')[0]],
          metadata: { slug: p.slug, kind: p.kind },
        },
      },
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop`,
      billing_address_collection: 'auto',
      phone_number_collection: { enabled: false },
      allow_promotion_codes: true,
      metadata: {
        cart: clean.map((c) => `${c.slug}:${c.qty}`).join(','),
      },
      ...(physical
        ? {
            shipping_address_collection: { allowed_countries: ['US', 'CA'] },
            shipping_options: [
              {
                shipping_rate_data: {
                  type: 'fixed_amount',
                  display_name: freeShipping ? 'Free shipping' : 'Standard shipping',
                  fixed_amount: {
                    amount: freeShipping ? 0 : SHIPPING,
                    currency: CURRENCY,
                  },
                  delivery_estimate: {
                    minimum: { unit: 'business_day', value: 3 },
                    maximum: { unit: 'business_day', value: 7 },
                  },
                },
              },
            ],
          }
        : {}),
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('[checkout]', err?.message);
    return NextResponse.json(
      { error: 'Could not start checkout. Please try again.' },
      { status: 500 }
    );
  }
}
