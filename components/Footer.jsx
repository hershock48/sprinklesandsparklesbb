import { site, nav } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line/60 bg-ink">
      <div className="diffract absolute inset-x-0 top-0 h-1 opacity-80" />
      <div className="mx-auto grid max-w-page gap-12 px-6 py-16 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl holo-text">Sprinkles &amp; Sparkles BB</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Holographic desserts, sanding sugars that actually sparkle, and the tutorials
            that show you how it is done.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-5 inline-block text-sm text-cyan hover:text-pink"
          >
            {site.email}
          </a>
        </div>

        <div>
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-cream/75 hover:text-cream">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Follow</p>
          <ul className="space-y-2.5 text-sm">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cream/75 hover:text-cream"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line/60">
        <div className="mx-auto flex max-w-page flex-col gap-2 px-6 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Sprinkles &amp; Sparkles BB. All rights reserved.</p>
          <p>
            Site by{' '}
            <a href="https://glazedweb.com" className="text-cyan hover:text-pink">
              Glazed Web
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
