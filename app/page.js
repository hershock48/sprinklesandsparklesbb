import Image from 'next/image';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import {
  products,
  sugars,
  retailers,
  heroImage,
  aboutImage,
  sugarHeroImage,
  site,
} from '@/lib/data';

export default function Home() {
  const featured = products.find((p) => p.featured);
  const rest = products.filter((p) => !p.featured);

  return (
    <>
      <Nav />
      <main id="top">
        {/* ---------------- hero ---------------- */}
        <section className="relative grain isolate flex min-h-[92vh] items-center overflow-hidden pt-28">
          <div className="aurora" />
          <div className="absolute inset-0 -z-10">
            <Image
              src={heroImage}
              alt="Holographic desserts by Sprinkles and Sparkles BB"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/60 to-ink" />
          </div>

          <div className="mx-auto grid w-full max-w-page gap-14 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="eyebrow mb-6">Marshall, Michigan &nbsp;&middot;&nbsp; Since 2010</p>
              <h1 className="font-display text-[clamp(44px,7.5vw,88px)] font-normal leading-[0.98] tracking-[-0.03em]">
                Desserts that
                <br />
                <span className="holo-text">catch the light.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-cream/80">
                Brittany Bennett has spent fifteen years figuring out how to make sugar
                shimmer. The tutorials, the sanding sugars and the dessert sheets behind
                every holographic cake pop on your feed start here.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a href="#tutorials" className="btn-holo">
                  Learn the holographic method
                </a>
                <a href="#sugars" className="btn-ghost">
                  See the sugars
                </a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="holo-edge sheen relative aspect-[4/5] overflow-hidden rounded-[28px] shadow-2xl shadow-pink/20">
                <Image
                  src={featured.image}
                  alt={featured.alt}
                  fill
                  sizes="(max-width: 1024px) 90vw, 420px"
                  className="object-cover"
                />
              </div>
              <div className="holo-edge absolute -bottom-6 -left-6 rounded-2xl bg-panel/95 px-5 py-4 backdrop-blur">
                <p className="eyebrow">Most loved</p>
                <p className="mt-1 text-sm font-semibold text-cream">
                  Holographic Cake Pop Tutorial
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- stocked by ---------------- */}
        <section className="relative border-y border-line/60 bg-panel/40">
          <div className="mx-auto flex max-w-page flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 py-7">
            <span className="eyebrow">Stocked by</span>
            {retailers.map((r) => (
              <span
                key={r.name}
                className="font-display text-lg tracking-tight text-cream/60 transition-colors hover:text-cream"
              >
                {r.name}
              </span>
            ))}
          </div>
        </section>

        {/* ---------------- tutorials ---------------- */}
        <section id="tutorials" className="relative overflow-hidden py-28">
          <div className="mx-auto max-w-page px-6">
            <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow mb-4">Tutorials &amp; downloads</p>
                <h2 className="font-display text-[clamp(32px,5vw,56px)] leading-[1.02] tracking-[-0.02em]">
                  Learn the finish
                  <br />
                  <span className="holo-text">everyone asks about.</span>
                </h2>
              </div>
              <p className="max-w-sm text-cream/70">
                Written for makers who already know their way around a cake pop and want
                the part nobody explains.
              </p>
            </div>

            {/* featured */}
            <a
              href={featured.href}
              className="holo-edge sheen lift group mb-8 grid overflow-hidden rounded-[28px] bg-panel md:grid-cols-2"
            >
              <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[440px]">
                <Image
                  src={featured.image}
                  alt={featured.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center gap-5 p-10 lg:p-14">
                <p className="eyebrow">{featured.note}</p>
                <h3 className="font-display text-4xl leading-tight tracking-tight">
                  {featured.title}
                </h3>
                <p className="text-cream/75">{featured.blurb}</p>
                <div className="mt-2 flex items-center gap-5">
                  <span className="font-display text-3xl holo-text">{featured.price}</span>
                  <span className="text-sm text-muted">Video plus PDF, yours forever</span>
                </div>
              </div>
            </a>

            {/* the rest */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {rest.map((p) => (
                <a
                  key={p.title}
                  href={p.href}
                  className="holo-edge sheen lift group flex flex-col overflow-hidden rounded-3xl bg-panel"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={p.image}
                      alt={p.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 280px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-6">
                    <p className="eyebrow">{p.note}</p>
                    <h3 className="font-display text-xl leading-snug tracking-tight">
                      {p.title}
                    </h3>
                    <p className="flex-1 text-sm leading-relaxed text-cream/65">{p.blurb}</p>
                    <span className="mt-2 font-display text-2xl holo-text">{p.price}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- sanding sugars ---------------- */}
        <section id="sugars" className="relative isolate overflow-hidden py-28">
          <div className="aurora opacity-70" />
          <div className="absolute inset-0 -z-10">
            <Image
              src={sugarHeroImage}
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />
          </div>

          <div className="mx-auto max-w-page px-6">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <p className="eyebrow mb-4">Sparkling Sanding Sugar</p>
              <h2 className="font-display text-[clamp(32px,5vw,56px)] leading-[1.02] tracking-[-0.02em]">
                Ten shades of <span className="holo-text">shimmer</span>
              </h2>
              <p className="mt-5 text-cream/75">
                Made by Brittany, sold through the shops she trusts. Every one of them
                catches light differently.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {sugars.map((s) => (
                <figure
                  key={s.name}
                  className="holo-edge sheen lift group overflow-hidden rounded-2xl bg-panel2"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={s.image}
                      alt={`${s.name} Sparkling Sanding Sugar`}
                      fill
                      sizes="(max-width: 640px) 45vw, 220px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="px-4 py-3.5 text-center">
                    <span className="font-display text-base tracking-tight text-cream">
                      {s.name}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="mt-12 text-center">
              <a href="#retailers" className="btn-holo">
                Find a shop that carries them
              </a>
            </div>
          </div>
        </section>

        {/* ---------------- retailers ---------------- */}
        <section id="retailers" className="border-y border-line/60 bg-panel/30 py-28">
          <div className="mx-auto max-w-page px-6">
            <div className="mb-14 max-w-2xl">
              <p className="eyebrow mb-4">Where to buy</p>
              <h2 className="font-display text-[clamp(32px,5vw,52px)] leading-[1.03] tracking-[-0.02em]">
                Six shops carry the line.
              </h2>
              <p className="mt-5 text-cream/75">
                Sugars, molds and wafer paper ship from these stockists. Pick whichever one
                you already order from.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {retailers.map((r) => (
                <a
                  key={r.name}
                  href={r.href}
                  target="_blank"
                  rel="noreferrer"
                  className="holo-edge lift group flex items-center justify-between gap-4 rounded-2xl bg-panel px-7 py-6"
                >
                  <div>
                    <p className="font-display text-2xl tracking-tight">{r.name}</p>
                    <p className="mt-1 text-sm text-muted">{r.note}</p>
                  </div>
                  <span
                    aria-hidden
                    className="text-xl text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-pink"
                  >
                    &rarr;
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- workshops ---------------- */}
        <section id="workshops" className="relative isolate overflow-hidden py-28">
          <div className="mx-auto max-w-page px-6">
            <div className="holo-edge relative overflow-hidden rounded-[32px] bg-panel px-8 py-16 text-center md:px-20">
              <div className="aurora opacity-60" />
              <div className="relative">
                <p className="eyebrow mb-4">In person workshops</p>
                <h2 className="font-display text-[clamp(30px,4.6vw,52px)] leading-[1.05] tracking-[-0.02em]">
                  Come make something <span className="holo-text">shiny</span> with me.
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-cream/75">
                  Small group classes and pop-ups where you leave with the technique and a
                  box of what you made. Dates go out to the list first.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <a href="#list" className="btn-holo">
                    Get the dates first
                  </a>
                  <a href={`mailto:${site.email}`} className="btn-ghost">
                    Host a workshop
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- about ---------------- */}
        <section id="about" className="py-28">
          <div className="mx-auto grid max-w-page gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="holo-edge sheen relative aspect-[4/5] overflow-hidden rounded-[28px]">
              <Image
                src={aboutImage}
                alt="Brittany Bennett of Sprinkles and Sparkles BB"
                fill
                sizes="(max-width: 1024px) 90vw, 460px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="eyebrow mb-4">The person behind it</p>
              <h2 className="font-display text-[clamp(32px,5vw,56px)] leading-[1.02] tracking-[-0.02em]">
                Hi, I&apos;m <span className="holo-text">Brittany.</span>
              </h2>
              <div className="mt-7 space-y-5 text-lg leading-relaxed text-cream/80">
                <p>
                  Fifteen years in baking and cake decorating, and somewhere in there I got
                  obsessed with making sugar do something it is not supposed to do.
                </p>
                <p>
                  That turned into the holographic method, then into a line of Sparkling
                  Sanding Sugars that six shops now carry, then into teaching it to
                  thousands of dessert makers who wanted to know how.
                </p>
                <p>
                  If you have ever seen a cake pop that looked like an oil slick in the best
                  possible way, there is a decent chance it started here.
                </p>
              </div>
              <hr className="holo-rule my-9 max-w-xs border-0" />
              <div className="flex flex-wrap gap-x-12 gap-y-6">
                <div>
                  <p className="font-display text-4xl holo-text">15+</p>
                  <p className="mt-1 text-sm text-muted">Years decorating</p>
                </div>
                <div>
                  <p className="font-display text-4xl holo-text">10</p>
                  <p className="mt-1 text-sm text-muted">Sugar shades</p>
                </div>
                <div>
                  <p className="font-display text-4xl holo-text">6</p>
                  <p className="mt-1 text-sm text-muted">Retail stockists</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- list ---------------- */}
        <section id="list" className="relative isolate overflow-hidden">
          <div className="diffract absolute inset-0 opacity-30" />
          <div className="absolute inset-0 bg-ink/80" />
          <div className="relative mx-auto max-w-2xl px-6 py-24 text-center">
            <p className="eyebrow mb-4">The list</p>
            <h2 className="font-display text-[clamp(30px,4.6vw,50px)] leading-[1.05] tracking-[-0.02em]">
              New shades, new tutorials,
              <br />
              <span className="holo-text">workshop dates first.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-cream/75">
              Plus the holographic color guide, free, the moment you sign up.
            </p>
            <form className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:flex-row">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-full border border-lav/40 bg-panel/80 px-6 py-3.5 text-cream placeholder:text-muted/70 focus:border-pink focus:outline-none focus:ring-2 focus:ring-pink/40"
              />
              <button type="submit" className="btn-holo justify-center whitespace-nowrap">
                Send it
              </button>
            </form>
            <p className="mt-4 text-xs text-muted">No spam. Leave whenever you like.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
