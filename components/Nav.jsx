'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { nav } from '@/lib/data';
import { useCart } from '@/components/CartProvider';

const DOTS = ['#FF4E9B', '#FFC93C', '#2DC7DE', '#5FCB53', '#8B6BFF'];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      // The notch inset lives on the header, not on the row below, so the row
      // keeps its own rhythm and the inset stacks on top of it. Resolves to 0 in
      // normal Safari; it only does anything if this gets installed to a home
      // screen or the viewport ever goes viewport-fit=cover.
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
      className={`fixed inset-x-0 top-0 z-50 transition-shadow ${
        solid
          ? 'bg-frosting/90 shadow-[0_6px_24px_-18px_rgba(46,35,64,0.6)] backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-page items-center justify-between gap-3 px-5 pb-4 pt-[18px] sm:gap-4 sm:py-4">
        {/* min-w-0 here plus truncate on the wordmark is the structural half of
            the fix: the brand is what gives way when space runs out, so no
            control can be pushed off the right edge the way the menu button
            was. At real phone widths it never actually needs to truncate. */}
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 xs:gap-2.5"
          onClick={() => setOpen(false)}
        >
          <span className="flex shrink-0 gap-1" aria-hidden>
            {DOTS.slice(0, 3).map((c) => (
              <span key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />
            ))}
          </span>
          <span className="truncate font-display text-[13px] font-semibold leading-none tracking-tight text-ink xs:text-[15px] sm:text-xl">
            Sprinkles <span className="text-pink">&amp;</span> Sparkles BB
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-bold text-ink/75 transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`Open cart, ${count} item${count === 1 ? '' : 's'}`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-line bg-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M4 7h16l-1.4 11.2a2 2 0 0 1-2 1.8H7.4a2 2 0 0 1-2-1.8L4 7Z"
                stroke="#2E2340"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M9 7a3 3 0 0 1 6 0"
                stroke="#2E2340"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-pink px-1 text-[11px] font-extrabold text-white">
                {count}
              </span>
            )}
          </button>

          {/* Hidden on phones. The wordmark plus four controls needed 399px of a
              390px row, so the menu button was clipped off the right edge. This
              is the control that goes: the bag beside it still carries the
              commerce affordance, and the menu opens with a full-width Shop
              button as its first item. It returns at sm, where all three fit.

              !hidden rather than hidden, and that matters. .btn-candy is plain
              CSS sitting after @tailwind utilities in globals.css, so its
              display:inline-flex beats the .hidden utility on source order and a
              bare "hidden" does nothing here at all. Same reason !px-5 was
              already spelled that way. Anything that needs to hide or re-lay-out
              a .btn-candy or .btn-outline needs the bang too. */}
          <Link href="/shop" className="btn-candy !hidden !px-5 !py-2.5 text-sm sm:!inline-flex">
            Shop
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-line bg-white lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute inset-x-0 top-0 h-[2.5px] rounded bg-ink transition-transform ${
                  open ? 'translate-y-[5px] rotate-45' : ''
                }`}
              />
              <span
                className={`absolute inset-x-0 bottom-0 h-[2.5px] rounded bg-ink transition-transform ${
                  open ? '-translate-y-[5px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t-2 border-line bg-frosting px-5 pb-6 pt-4 lg:hidden">
          {/* Carries the Shop call to action that the header drops on phones, at
              full width so it is the obvious thing to press. The /shop entry is
              filtered out of the list below so it is not offered twice. */}
          <Link
            href="/shop"
            onClick={() => setOpen(false)}
            className="btn-candy mb-3 w-full !py-3 sm:!hidden"
          >
            Shop all
          </Link>
          <ul className="space-y-1">
            {nav.map((item, i) => (
              <li key={item.href} className={item.href === '/shop' ? 'hidden sm:block' : undefined}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-2xl px-3 py-3 font-bold text-ink hover:bg-vanilla"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: DOTS[i % DOTS.length] }}
                    aria-hidden
                  />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
