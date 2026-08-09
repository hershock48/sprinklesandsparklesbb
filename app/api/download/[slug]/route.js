import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { bySlug, DOWNLOADS } from '@/lib/catalog';

export const runtime = 'nodejs';

/**
 * Serves a digital product only to someone holding a paid Stripe session
 * that actually contains it. No database needed: Stripe is the record.
 */
export async function GET(req, { params }) {
  const { slug } = await params;
  const sessionId = new URL(req.url).searchParams.get('session_id');

  const product = bySlug(slug);
  if (!product || product.kind !== 'digital') {
    return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  }

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || !sessionId) {
    return NextResponse.json({ error: 'Not authorized.' }, { status: 401 });
  }

  let session;
  try {
    const stripe = new Stripe(key);
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return NextResponse.json({ error: 'Not authorized.' }, { status: 401 });
  }

  if (session?.payment_status !== 'paid') {
    return NextResponse.json({ error: 'Not authorized.' }, { status: 401 });
  }

  const purchased = (session.metadata?.cart || '')
    .split(',')
    .map((entry) => entry.split(':')[0]);

  if (!purchased.includes(slug)) {
    return NextResponse.json({ error: 'Not in this order.' }, { status: 403 });
  }

  const url = DOWNLOADS[product.file];
  if (!url) {
    return NextResponse.json(
      { error: 'This file is not uploaded yet. It will be emailed to you.' },
      { status: 503 }
    );
  }

  return NextResponse.redirect(url, 302);
}
