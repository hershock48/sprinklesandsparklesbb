import { nav, site } from '@/lib/data';

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-page items-center justify-between gap-6 px-6 py-4">
        <a href="#top" className="group flex items-baseline gap-2 leading-none">
          <span className="font-display text-xl tracking-tight holo-text">Sprinkles</span>
          <span className="font-display text-xl tracking-tight text-cream/90">&amp;</span>
          <span className="font-display text-xl tracking-tight holo-text">Sparkles</span>
          <span className="ml-1 text-[10px] font-bold tracking-[0.3em] text-muted">BB</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-cream/75 transition-colors hover:text-cream"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#tutorials" className="btn-holo !px-5 !py-2 text-sm">
          Shop tutorials
        </a>
      </div>
    </header>
  );
}
