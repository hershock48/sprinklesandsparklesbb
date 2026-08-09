import SoftImage from '@/components/SoftImage';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Confetti from '@/components/Confetti';
import Reveal from '@/components/Reveal';
import Sparkles from '@/components/Sparkles';
import AddToCart from '@/components/AddToCart';
import ProductCard from '@/components/ProductCard';
import { catalog, bySlug, money, SHIPPING, FREE_SHIPPING_AT } from '@/lib/catalog';

export function generateStaticParams() {
  return catalog.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = bySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.blurb,
    openGraph: {
      title: product.name,
      description: product.blurb,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = bySlug(slug);
  if (!product) notFound();

  const related = catalog
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 4);
  const fallback = catalog.filter((p) => p.slug !== product.slug).slice(0, 4);
  const alsoLike = related.length >= 2 ? related : fallback;

  return (
    <main className="pt-24">
      <section className="relative overflow-hidden bg-vanilla py-12">
        <Confetti density={0.34} />
        <div className="relative mx-auto max-w-page px-5">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm font-bold text-muted">
            <Link href="/shop" className="hover:text-ink">
              Shop
            </Link>
            <span className="mx-2" aria-hidden>
              /
            </span>
            <Link
              href={`/shop?category=${encodeURIComponent(product.category)}`}
              className="hover:text-ink"
            >
              {product.category}
            </Link>
          </nav>

          <div className="grid items-start gap-12 lg:grid-cols-2">
            <Reveal className="relative">
              <Sparkles
                stars={[
                  { top: '-3%', left: '-3%', size: 24, color: '#FFC93C', delay: 0.2 },
                  { bottom: '4%', right: '-3%', size: 20, color: '#2DC7DE', delay: 1.2 },
                ]}
              />
              <div className="shine relative aspect-square overflow-hidden rounded-[36px] border-[6px] border-white shadow-candy">
                <SoftImage
                  variant="soft"
                  src={product.image}
                  alt={product.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 520px"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={100}>
              <p className="eyebrow mb-3 text-pink">
                {product.kind === 'digital' ? 'Instant download' : 'Ships from Michigan'}
              </p>
              <h1 className="font-display text-[clamp(30px,4.4vw,46px)] font-semibold leading-[1.06] tracking-tight text-ink">
                {product.name}
              </h1>
              <p className="mt-4 font-display text-3xl font-semibold text-pink">
                {money(product.price)}
              </p>

              <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
                {product.body.map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </div>

              <div className="mt-8">
                <AddToCart slug={product.slug} kind={product.kind} />
              </div>

              <ul className="mt-8 space-y-2.5 rounded-3xl border-2 border-line bg-white p-6">
                {product.includes.map((line, i) => (
                  <li key={line} className="flex items-start gap-3 text-sm text-ink">
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                      style={{
                        background: ['#FF4E9B', '#FFC93C', '#2DC7DE', '#5FCB53'][i % 4],
                      }}
                      aria-hidden
                    />
                    {line}
                  </li>
                ))}
                <li className="flex items-start gap-3 border-t-2 border-line pt-3 text-sm text-muted">
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-grape"
                    aria-hidden
                  />
                  {product.kind === 'digital'
                    ? 'Download link appears the moment your payment goes through, and lands in your email too.'
                    : FREE_SHIPPING_AT
                      ? `Flat ${money(SHIPPING)} shipping, free over ${money(FREE_SHIPPING_AT)}.`
                      : `Flat ${money(SHIPPING)} shipping.`}
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="stripe h-3 w-full" aria-hidden />

      <section className="bg-frosting py-20">
        <div className="mx-auto max-w-page px-5">
          <Reveal className="mb-10">
            <h2 className="font-display text-[clamp(26px,3.6vw,38px)] font-semibold tracking-tight text-ink">
              You might also like
            </h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {alsoLike.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <ProductCard product={p} index={i + 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
