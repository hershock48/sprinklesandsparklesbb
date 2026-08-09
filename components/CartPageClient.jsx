'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Confetti from '@/components/Confetti';
import { useCart } from '@/components/CartProvider';
import { bySlug, money, FREE_SHIPPING_AT } from '@/lib/catalog';

export default function CartPageClient() {
  const { items, ready, setQty, remove, subtotal, shipping, total } = useCart();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  async function checkout() {
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: items.map((i) => ({ slug: i.slug, qty: i.qty })) }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setError(data.error || 'Checkout is not available right now.');
    } catch {
      setError('Could not reach checkout. Please try again.');
    }
    setSending(false);
  }

  return (
    <main className="pt-24">
      <section className="relative overflow-hidden bg-vanilla py-12">
        <Confetti density={0.34} />
        <div className="relative mx-auto max-w-page px-5">
          <p className="eyebrow mb-3 text-pink">Your bag</p>
          <h1 className="font-display text-[clamp(30px,4.4vw,46px)] font-semibold tracking-tight text-ink">
            Ready when you are.
          </h1>
        </div>
      </section>

      <div className="stripe h-3 w-full" aria-hidden />

      <section className="bg-frosting py-14">
        <div className="mx-auto max-w-page px-5">
          {!ready ? (
            <p className="text-muted">Loading your bag.</p>
          ) : items.length === 0 ? (
            <div className="rounded-3xl border-2 border-line bg-white px-8 py-16 text-center">
              <p className="text-lg text-muted">Nothing in here yet.</p>
              <Link href="/shop" className="btn-candy mt-6">
                Browse the shop
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
              <ul className="space-y-4">
                {items.map((i) => {
                  const p = bySlug(i.slug);
                  if (!p) return null;
                  return (
                    <li
                      key={i.slug}
                      className="flex gap-4 rounded-3xl border-2 border-line bg-white p-4"
                    >
                      <Link
                        href={`/shop/${p.slug}`}
                        className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl"
                      >
                        <Image src={p.image} alt={p.alt} fill sizes="112px" className="object-cover" />
                      </Link>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <Link href={`/shop/${p.slug}`}>
                          <p className="font-display text-lg font-semibold leading-tight text-ink hover:underline">
                            {p.name}
                          </p>
                        </Link>
                        <p className="mt-1 text-sm text-muted">
                          {p.kind === 'digital' ? 'Instant download' : 'Ships from Michigan'}
                        </p>
                        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                          {p.kind === 'digital' ? (
                            <span className="text-sm font-bold text-muted">Qty 1</span>
                          ) : (
                            <div className="flex items-center gap-1 rounded-full border-2 border-line">
                              <button
                                type="button"
                                onClick={() => setQty(i.slug, i.qty - 1)}
                                aria-label={`Remove one ${p.name}`}
                                className="h-9 w-9 rounded-full text-ink"
                              >
                                &minus;
                              </button>
                              <span className="w-6 text-center font-bold">{i.qty}</span>
                              <button
                                type="button"
                                onClick={() => setQty(i.slug, i.qty + 1)}
                                aria-label={`Add one ${p.name}`}
                                className="h-9 w-9 rounded-full text-ink"
                              >
                                +
                              </button>
                            </div>
                          )}
                          <div className="flex items-center gap-4">
                            <span className="font-display text-xl font-semibold text-pink">
                              {money(p.price * i.qty)}
                            </span>
                            <button
                              type="button"
                              onClick={() => remove(i.slug)}
                              className="text-sm font-bold text-muted underline hover:text-pink"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="rounded-3xl border-2 border-pink bg-white p-6 lg:sticky lg:top-28">
                <h2 className="font-display text-xl font-semibold text-ink">Summary</h2>
                {FREE_SHIPPING_AT > 0 && shipping > 0 && (
                  <p className="mt-4 rounded-xl bg-vanilla px-3 py-2 text-center text-xs font-bold text-ink">
                    {money(FREE_SHIPPING_AT - subtotal)} more for free shipping
                  </p>
                )}
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted">Subtotal</dt>
                    <dd className="font-bold text-ink">{money(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted">Shipping</dt>
                    <dd className="font-bold text-ink">
                      {shipping === 0 ? 'Free' : money(shipping)}
                    </dd>
                  </div>
                  <div className="flex justify-between border-t-2 border-line pt-3 text-base">
                    <dt className="font-bold text-ink">Total</dt>
                    <dd className="font-display text-2xl font-semibold text-pink">
                      {money(total)}
                    </dd>
                  </div>
                </dl>
                {error && <p className="mt-4 text-sm font-bold text-pink">{error}</p>}
                <button
                  type="button"
                  onClick={checkout}
                  disabled={sending}
                  className="btn-candy mt-6 w-full disabled:opacity-60"
                >
                  {sending ? 'Taking you to checkout' : 'Checkout'}
                </button>
                <p className="mt-3 text-center text-xs text-muted">
                  Card payment handled by Stripe. Tax added at checkout.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
