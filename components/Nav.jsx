'use client';

import { useEffect, useState } from 'react';
import { nav } from '@/lib/data';

const DOTS = ['#FF4E9B', '#FFC93C', '#2DC7DE', '#5FCB53', '#8B6BFF'];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-shadow ${
        solid ? 'bg-frosting/90 shadow-[0_6px_24px_-18px_rgba(46,35,64,0.6)] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-page items-center justify-between gap-6 px-5 py-4">
        <a href="#top" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex gap-1" aria-hidden>
            {DOTS.slice(0, 3).map((c) => (
              <span key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />
            ))}
          </span>
          <span className="whitespace-nowrap font-display text-[16px] font-semibold leading-none tracking-tight text-ink sm:text-xl">
            Sprinkles <span className="text-pink">&amp;</span> Sparkles
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-bold text-ink/75 transition-colors hover:text-ink"
              style={{ textDecorationColor: DOTS[i % DOTS.length] }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#tutorials" className="btn-candy !px-5 !py-2.5 text-sm">
            Shop
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-line bg-white md:hidden"
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
        <div className="border-t-2 border-line bg-frosting px-5 pb-6 pt-4 md:hidden">
          <ul className="space-y-1">
            {nav.map((item, i) => (
              <li key={item.href}>
                <a
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
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#tutorials"
            onClick={() => setOpen(false)}
            className="btn-candy mt-4 w-full"
          >
            Shop the tutorials
          </a>
        </div>
      )}
    </header>
  );
}
