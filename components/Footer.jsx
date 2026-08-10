import { site, nav } from '@/lib/data';
import GlazedCredit from '@/components/GlazedCredit';

const DOTS = ['#FF4E9B', '#FFC93C', '#2DC7DE', '#5FCB53', '#8B6BFF'];

export default function Footer() {
  return (
    <footer className="bg-vanilla">
      <div className="mx-auto grid max-w-page gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex gap-1" aria-hidden>
              {DOTS.slice(0, 3).map((c) => (
                <span key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />
              ))}
            </span>
            <p className="font-display text-xl font-semibold tracking-tight text-ink">
              Sprinkles <span className="text-pink">&amp;</span> Sparkles BB
            </p>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Holographic desserts, sanding sugars that actually sparkle, and the tutorials
            that show you how it is done.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-4 inline-block text-sm font-bold text-pink hover:text-grape"
          >
            {site.email}
          </a>
        </div>

        <div>
          <p className="eyebrow mb-4 text-muted">Explore</p>
          <ul className="space-y-2.5 text-sm">
            {nav.map((item, i) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex items-center gap-2 font-semibold text-ink/75 hover:text-ink"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: DOTS[i % DOTS.length] }}
                    aria-hidden
                  />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4 text-muted">Follow</p>
          <ul className="space-y-2.5 text-sm">
            {site.socials.map((s, i) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-ink/75 hover:text-ink"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: DOTS[(i + 2) % DOTS.length] }}
                    aria-hidden
                  />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="stripe h-2 w-full" aria-hidden />
      <div className="bg-vanilla">
        <div className="mx-auto flex max-w-page flex-col gap-2 px-5 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Sprinkles &amp; Sparkles BB. All rights reserved.</p>
          {/* Was plain text on the non-www host. The component inherits this bar's own
              colour, so the mark reads on vanilla without putting a second pink into a
              footer that already has one. */}
          <GlazedCredit line="Double Dipped by" />
        </div>
      </div>
    </footer>
  );
}
