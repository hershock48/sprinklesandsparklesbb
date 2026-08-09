'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useCart } from '@/components/CartProvider';
import { bySlug, money, FREE_SHIPPING_AT } from '@/lib/catalog';

export default function CartDrawer() {
  const { items, open, setOpen, setQty, remove, subtotal, shipping, total, count } = useCart();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setOpen]);

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

  const remaining = FREE_SHIPPING_AT ? FREE_SHIPPING_AT - subtotal : 0;

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        aria-hidden
        className={`fixed inset-0 z-[60] bg-ink/35 backdrop-blur-[2px] transition-opacity ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        aria-label="Cart"
        aria-hidden={!open}
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-[420px] flex-col bg-frosting shadow-2xl transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="stripe h-2 w-full shrink-0" aria-hidden />

        <div className="flex items-center justify-between px-5 py-4">
          <p className="font-display text-xl font-semibold text-ink">
            Your bag {count > 0 && <span className="text-pink">({count})</span>}
          </p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-line bg-white text-lg leading-none text-ink"
          >
            &times;
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="flex gap-1.5" aria-hidden>
              {['#FF4E9B', '#FFC93C', '#2DC7DE', '#5FCB53'].map((c) => (
                <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
              ))}
            </span>
            <p className="text-muted">Nothing in here yet.</p>
            <a href="/shop" onClick={() => setOpen(false)} className="btn-outline">
              Browse the shop
            </a>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-3 overflow-y-auto px-5 pb-4">
              {items.map((i) => {
                const p = bySlug(i.slug);
                if (!p) return null;
                return (
                  <li key={i.slug} className="flex gap-3 rounded-2xl border-2 border-line bg-white p-3">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                      <Image src={p.image} alt={p.alt} fill sizes="80px" className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display font-semibold leading-tight text-ink">
                        {p.name}
                      </p>
                      <p className="mt-0.5 text-xs text-muted">
                        {p.kind === 'digital' ? 'Instant download' : 'Ships from Michigan'}
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        {p.kind === 'digital' ? (
                          <span className="text-xs font-bold text-muted">Qty 1</span>
                        ) : (
                          <div className="flex items-center gap-1 rounded-full border-2 border-line">
                            <button
                              type="button"
                              onClick={() => setQty(i.slug, i.qty - 1)}
                              aria-label={`Remove one ${p.name}`}
                              className="h-7 w-7 rounded-full text-ink"
                            >
                              &minus;
                            </button>
                            <span className="w-5 text-center text-sm font-bold">{i.qty}</span>
                            <button
                              type="button"
                              onClick={() => setQty(i.slug, i.qty + 1)}
                              aria-label={`Add one ${p.name}`}
                              className="h-7 w-7 rounded-full text-ink"
                            >
                              +
                            </button>
                          </div>
                        )}
                        <span className="font-display font-semibold text-pink">
                          {money(p.price * i.qty)}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(i.slug)}
                      aria-label={`Remove ${p.name}`}
                      className="self-start text-muted hover:text-pink"
                    >
                      &times;
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="border-t-2 border-line bg-white px-5 py-4">
              {FREE_SHIPPING_AT > 0 && shipping > 0 && remaining > 0 && (
                <p className="mb-3 rounded-xl bg-vanilla px-3 py-2 text-center text-xs font-bold text-ink">
                  {money(remaining)} more for free shipping
                </p>
              )}
              <dl className="space-y-1.5 text-sm">
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
                <div className="flex justify-between border-t-2 border-line pt-2 text-base">
                  <dt className="font-bold text-ink">Total</dt>
                  <dd className="font-display text-xl font-semibold text-pink">{money(total)}</dd>
                </div>
              </dl>

              {error && <p className="mt-3 text-sm font-bold text-pink">{error}</p>}

              <button
                type="button"
                onClick={checkout}
                disabled={sending}
                className="btn-candy mt-4 w-full disabled:opacity-60"
              >
                {sending ? 'Taking you to checkout' : 'Checkout'}
              </button>
              <p className="mt-2 text-center text-xs text-muted">
                Card payment handled by Stripe. Tax added at checkout.
              </p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
