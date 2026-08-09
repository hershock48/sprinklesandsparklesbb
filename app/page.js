import SoftImage from '@/components/SoftImage';
import SignupForm from '@/components/SignupForm';
import Confetti from '@/components/Confetti';
import Reveal from '@/components/Reveal';
import Sparkles from '@/components/Sparkles';
import Link from 'next/link';
import { retailers, heroImage, aboutImage, site } from '@/lib/data';
import { homeProducts, sugars, money } from '@/lib/catalog';

// bright colors for borders and decoration
const ACCENTS = ['#FF4E9B', '#FFC93C', '#2DC7DE', '#5FCB53', '#8B6BFF', '#FF8A3D'];
// deeper matching colors, readable as text on white
const INKS = ['#E8317F', '#B57C00', '#0E93A8', '#358F35', '#7B57F0', '#DC6A13'];

export default function Home() {
  const [featured, ...rest] = homeProducts;

  return (
    <>
      <main id="top">
        {/* ---------------- hero ---------------- */}
        <section className="relative overflow-hidden bg-vanilla pb-20 pt-32 md:pb-28 md:pt-40">
          <Confetti />
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-bubble/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-aqua/20 blur-3xl" />

          <div className="relative mx-auto grid max-w-page items-center gap-14 px-5 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <p className="eyebrow mb-5 flex items-center gap-2 text-muted">
                <span className="h-2.5 w-2.5 rounded-full bg-pink" />
                Marshall, Michigan
              </p>
              <h1 className="font-display text-[clamp(42px,7vw,78px)] font-semibold leading-[1.02] tracking-tight text-ink">
                Desserts that{' '}
                <span className="holo-text">catch the light.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                Brittany Bennett has spent fifteen years figuring out how to make sugar
                shimmer. The tutorials, the sanding sugars and the dessert sheets behind
                every holographic cake pop on your feed start here.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/shop?category=Tutorials" className="btn-candy">
                  Learn the holographic method
                </Link>
                <Link href="/shop?category=Sanding%20Sugars" className="btn-outline">
                  See the sugars
                </Link>
              </div>
            </Reveal>

            <Reveal delay={120} className="relative mx-auto w-full max-w-md">
              <Sparkles />
              <div className="shine relative aspect-[4/5] rotate-2 overflow-hidden rounded-[36px] border-[6px] border-white shadow-pop">
                <SoftImage
                  variant="soft"
                  src={heroImage}
                  alt="Holographic desserts by Sprinkles and Sparkles BB"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 440px"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-4 -rotate-3 rounded-2xl border-2 border-line bg-white px-5 py-3 shadow-candy">
                <p className="eyebrow text-pink">Most loved</p>
                <p className="mt-0.5 font-display font-semibold text-ink">
                  Holographic Cake Pops
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <div className="stripe h-3 w-full" aria-hidden />

        {/* ---------------- stocked by ---------------- */}
        <section className="bg-frosting">
          <div className="mx-auto flex max-w-page flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 py-7">
            <span className="eyebrow text-muted">Stocked by</span>
            {retailers.map((r, i) => (
              <span
                key={r.name}
                className="font-display text-lg font-semibold"
                style={{ color: INKS[i % INKS.length] }}
              >
                {r.name}
              </span>
            ))}
          </div>
        </section>

        {/* ---------------- tutorials ---------------- */}
        <section id="tutorials" className="relative overflow-hidden bg-frosting py-24">
          <div className="relative mx-auto max-w-page px-5">
            <Reveal className="relative mb-12 max-w-2xl">
              <p style={{ color: '#0E93A8' }} className="eyebrow mb-4">Tutorials &amp; downloads</p>
              <h2 className="font-display text-[clamp(32px,5vw,52px)] font-semibold leading-[1.05] tracking-tight text-ink">
                Learn the finish everyone asks about.
              </h2>
              <p className="mt-5 text-lg text-muted">
                Written for makers who already know their way around a cake pop and want
                the part nobody explains.
              </p>
            </Reveal>

            {/* featured */}
            <Reveal className="relative">
              <Sparkles
                stars={[
                  { top: '-4%', left: '38%', size: 24, color: '#FFC93C', delay: 0.2 },
                  { bottom: '6%', left: '-2%', size: 18, color: '#FF4E9B', delay: 1.1 },
                  { top: '20%', right: '-2%', size: 20, color: '#8B6BFF', delay: 1.7 },
                ]}
              />
              <Link
                href={`/shop/${featured.slug}`}
                className="card group mb-6 grid overflow-hidden md:grid-cols-2"
                style={{ borderColor: '#FF4E9B' }}
              >
                <div className="shine relative aspect-[4/3] md:aspect-auto md:min-h-[420px]">
                  <SoftImage
                    variant="soft"
                    src={featured.image}
                    alt={featured.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 560px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center gap-4 p-8 lg:p-12">
                  <p className="eyebrow text-pink">{featured.tagline}</p>
                  <h3 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink">
                    {featured.name}
                  </h3>
                  <p className="text-muted">{featured.blurb}</p>
                  <div className="mt-2 flex items-center gap-4">
                    <span className="font-display text-3xl font-semibold text-pink">
                      {money(featured.price)}
                    </span>
                    <span className="text-sm text-muted">Video plus PDF, yours forever</span>
                  </div>
                </div>
              </Link>
            </Reveal>

            {/* the rest */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {rest.map((p, i) => {
                const accent = ACCENTS[(i + 1) % ACCENTS.length];
                const inkAccent = INKS[(i + 1) % INKS.length];
                return (
                  <Reveal key={p.slug} delay={i * 90}>
                    <Link
                      href={`/shop/${p.slug}`}
                      className="card flex h-full flex-col overflow-hidden"
                      style={{ borderColor: accent }}
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <SoftImage
                          src={p.image}
                          alt={p.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, 270px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-2 p-5">
                        <p className="eyebrow" style={{ color: inkAccent }}>
                          {p.tagline}
                        </p>
                        <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-ink">
                          {p.name}
                        </h3>
                        <p className="flex-1 text-sm leading-relaxed text-muted">{p.blurb}</p>
                        <span
                          className="mt-1 font-display text-2xl font-semibold"
                          style={{ color: inkAccent }}
                        >
                          {money(p.price)}
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>

            <Reveal className="mt-12 text-center">
              <Link href="/shop" className="btn-outline">
                See everything in the shop
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ---------------- sanding sugars ---------------- */}
        <section id="sugars" className="relative overflow-hidden bg-batter py-24">
          <Confetti density={0.5} />
          <div className="relative mx-auto max-w-page px-5">
            <Reveal className="relative mx-auto mb-14 max-w-2xl text-center">
              <Sparkles
                stars={[
                  { top: '-10%', left: '8%', size: 22, color: '#FF4E9B', delay: 0.3 },
                  { top: '4%', right: '6%', size: 26, color: '#2DC7DE', delay: 1.2 },
                  { bottom: '-14%', right: '30%', size: 16, color: '#5FCB53', delay: 2.0 },
                ]}
              />
              <p style={{ color: '#DC6A13' }} className="eyebrow mb-4">Sparkling Sanding Sugar</p>
              <h2 className="font-display text-[clamp(32px,5vw,52px)] font-semibold leading-[1.05] tracking-tight text-ink">
                Ten shades of <span className="holo-text">shimmer</span>
              </h2>
              <p className="mt-5 text-lg text-muted">
                Made by Brittany in small batches. Every one catches light its own way,
                and they ship straight from her kitchen in Michigan.
              </p>
            </Reveal>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {sugars.map((s, i) => {
                const accent = ACCENTS[i % ACCENTS.length];
                const inkAccent = INKS[i % INKS.length];
                return (
                  <Reveal key={s.slug} delay={(i % 5) * 80}>
                    <Link
                      href={`/shop/${s.slug}`}
                      className="card block h-full overflow-hidden"
                      style={{ borderColor: accent }}
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <SoftImage
                          src={s.image}
                          alt={s.alt}
                          fill
                          sizes="(max-width: 640px) 45vw, 210px"
                          className="object-cover"
                        />
                      </div>
                      <p
                        className="px-3 pb-1 pt-3 text-center font-display text-[15px] font-semibold leading-tight tracking-tight"
                        style={{ color: inkAccent }}
                      >
                        {s.shortName}
                      </p>
                      <p className="pb-3 text-center text-sm font-bold text-muted">
                        {money(s.price)}
                      </p>
                    </Link>
                  </Reveal>
                );
              })}
            </div>

            <Reveal className="mt-12 text-center">
              <Link href="/shop?category=Sanding%20Sugars" className="btn-candy">
                Shop all ten shades
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ---------------- retailers ---------------- */}
        <section id="retailers" className="bg-frosting py-24">
          <div className="mx-auto max-w-page px-5">
            <Reveal className="mb-12 max-w-2xl">
              <p className="eyebrow mb-4 text-grape">Where else to buy</p>
              <h2 className="font-display text-[clamp(30px,4.6vw,48px)] font-semibold leading-[1.05] tracking-tight text-ink">
                Also stocked at six shops.
              </h2>
              <p className="mt-5 text-lg text-muted">
                Order direct from the shop here, or pick up the sugars, molds and wafer
                paper from whichever of these you already buy from.
              </p>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {retailers.map((r, i) => {
                const accent = ACCENTS[i % ACCENTS.length];
                const inkAccent = INKS[i % INKS.length];
                return (
                  <Reveal key={r.name} delay={(i % 3) * 90}>
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noreferrer"
                      className="card group flex h-full items-center justify-between gap-4 px-6 py-5"
                      style={{ borderColor: accent }}
                    >
                      <div>
                        <p className="font-display text-xl font-semibold tracking-tight text-ink">
                          {r.name}
                        </p>
                        <p className="mt-0.5 text-sm text-muted">{r.note}</p>
                      </div>
                      <span
                        aria-hidden
                        className="text-xl transition-transform duration-300 group-hover:translate-x-1"
                        style={{ color: inkAccent }}
                      >
                        &rarr;
                      </span>
                    </a>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------- workshops ---------------- */}
        <section id="workshops" className="bg-frosting pb-24">
          <div className="mx-auto max-w-page px-5">
            <Reveal className="relative">
              <div className="relative overflow-hidden rounded-[36px] border-[3px] border-white bg-gradient-to-br from-bubble/35 via-lemon/25 to-aqua/30 px-6 py-16 text-center md:px-16">
                <Confetti density={0.5} dots={false} />
                <Sparkles
                  stars={[
                    { top: '12%', left: '10%', size: 24, color: '#FF4E9B', delay: 0.4 },
                    { top: '18%', right: '12%', size: 20, color: '#8B6BFF', delay: 1.4 },
                    { bottom: '14%', left: '22%', size: 18, color: '#FFC93C', delay: 2.1 },
                  ]}
                />
                <div className="relative">
                  <p className="eyebrow mb-4 text-pink">In person workshops</p>
                  <h2 className="font-display text-[clamp(28px,4.4vw,46px)] font-semibold leading-[1.08] tracking-tight text-ink">
                    Come make something shiny with me.
                  </h2>
                  <p className="mx-auto mt-5 max-w-xl text-lg text-ink/70">
                    Small group classes and pop-ups where you leave with the technique and a
                    box of what you made. Dates go out to the list first.
                  </p>
                  <div className="mt-9 flex flex-wrap justify-center gap-3">
                    <a href="#list" className="btn-candy">
                      Get the dates first
                    </a>
                    <a href={`mailto:${site.email}`} className="btn-outline">
                      Host a workshop
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------------- about ---------------- */}
        <section id="about" className="relative overflow-hidden bg-vanilla py-24">
          <Confetti density={0.34} />
          <div className="relative mx-auto grid max-w-page items-center gap-14 px-5 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal className="relative">
              <Sparkles
                stars={[
                  { top: '-3%', left: '-4%', size: 24, color: '#FFC93C', delay: 0.2 },
                  { bottom: '4%', right: '-3%', size: 20, color: '#2DC7DE', delay: 1.3 },
                ]}
              />
              <div className="shine relative aspect-[4/5] -rotate-2 overflow-hidden rounded-[36px] border-[6px] border-white shadow-candy">
                <SoftImage
                  variant="soft"
                  src={aboutImage}
                  alt="Brittany Bennett of Sprinkles and Sparkles BB"
                  fill
                  sizes="(max-width: 1024px) 90vw, 420px"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <p style={{ color: '#358F35' }} className="eyebrow mb-4">The person behind it</p>
              <h2 className="font-display text-[clamp(32px,5vw,52px)] font-semibold leading-[1.05] tracking-tight text-ink">
                Hi, I&apos;m <span className="holo-text">Brittany.</span>
              </h2>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
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

              <div className="mt-9 flex flex-wrap gap-3">
                {[
                  { value: '15+', label: 'Years decorating', color: '#FF4E9B', ink: '#E8317F' },
                  { value: '10', label: 'Sugar shades', color: '#2DC7DE', ink: '#0E93A8' },
                  { value: '6', label: 'Retail stockists', color: '#8B6BFF', ink: '#7B57F0' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border-2 bg-white px-5 py-4"
                    style={{ borderColor: stat.color }}
                  >
                    <p
                      className="font-display text-3xl font-semibold leading-none"
                      style={{ color: stat.ink }}
                    >
                      {stat.value}
                    </p>
                    <p className="mt-1.5 text-sm text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <div className="stripe h-3 w-full" aria-hidden />

        {/* ---------------- list ---------------- */}
        <section id="list" className="relative overflow-hidden bg-frosting py-20">
          <Confetti density={0.5} />
          <Reveal className="relative mx-auto max-w-2xl px-5 text-center">
            <Sparkles
              stars={[
                { top: '-2%', left: '6%', size: 22, color: '#5FCB53', delay: 0.5 },
                { top: '10%', right: '4%', size: 26, color: '#FF8A3D', delay: 1.5 },
              ]}
            />
            <p className="eyebrow mb-4 text-pink">The list</p>
            <h2 className="font-display text-[clamp(28px,4.4vw,44px)] font-semibold leading-[1.08] tracking-tight text-ink">
              New shades, new tutorials, workshop dates first.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted">
              Plus the holographic color guide, free, the moment you sign up.
            </p>
            <SignupForm />
            <p className="mt-4 text-xs text-muted">No spam. Leave whenever you like.</p>
          </Reveal>
        </section>
      </main>
    </>
  );
}
