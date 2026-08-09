import Link from 'next/link';
import Confetti from '@/components/Confetti';
import Reveal from '@/components/Reveal';
import ProductCard from '@/components/ProductCard';
import { catalog, CATEGORIES } from '@/lib/catalog';

export const metadata = {
  title: 'Shop',
  description:
    'Holographic dessert tutorials, Sparkling Sanding Sugars and dessert sheets, direct from Brittany Bennett.',
};

export default async function ShopPage({ searchParams }) {
  const params = await searchParams;
  const active = CATEGORIES.includes(params?.category) ? params.category : null;
  const items = active ? catalog.filter((p) => p.category === active) : catalog;

  return (
    <main className="pt-24">
      <section className="relative overflow-hidden bg-vanilla py-14">
        <Confetti density={0.5} />
        <div className="relative mx-auto max-w-page px-5">
          <Reveal>
            <p className="eyebrow mb-4 text-pink">The shop</p>
            <h1 className="font-display text-[clamp(34px,5.5vw,56px)] font-semibold leading-[1.03] tracking-tight text-ink">
              Everything, straight from Brittany.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted">
              Tutorials download the second you pay. Sugars and sheets ship from Michigan.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="stripe h-3 w-full" aria-hidden />

      <section className="bg-frosting py-12">
        <div className="mx-auto max-w-page px-5">
          <div className="mb-10 flex flex-wrap gap-2">
            <Link
              href="/shop"
              className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors ${
                active ? 'border-line bg-white text-ink' : 'border-pink bg-pink text-white'
              }`}
            >
              Everything
            </Link>
            {CATEGORIES.map((c) => (
              <Link
                key={c}
                href={`/shop?category=${encodeURIComponent(c)}`}
                className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors ${
                  active === c ? 'border-pink bg-pink text-white' : 'border-line bg-white text-ink'
                }`}
              >
                {c}
              </Link>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 80}>
                <ProductCard product={p} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
