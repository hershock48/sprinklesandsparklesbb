'use client';

import SoftImage from '@/components/SoftImage';
import Link from 'next/link';
import { useCart } from '@/components/CartProvider';
import { money } from '@/lib/catalog';

const ACCENTS = ['#FF4E9B', '#FFC93C', '#2DC7DE', '#5FCB53', '#8B6BFF', '#FF8A3D'];
const INKS = ['#E8317F', '#B57C00', '#0E93A8', '#358F35', '#7B57F0', '#DC6A13'];

export default function ProductCard({ product, index = 0 }) {
  const { add } = useCart();
  const accent = ACCENTS[index % ACCENTS.length];
  const ink = INKS[index % INKS.length];

  return (
    <div className="card flex h-full flex-col overflow-hidden" style={{ borderColor: accent }}>
      <Link href={`/shop/${product.slug}`} className="relative block aspect-square overflow-hidden">
        <SoftImage
          src={product.image}
          alt={product.alt}
          fill
          sizes="(max-width: 640px) 100vw, 280px"
          className="object-cover"
        />
        {product.badge && (
          <span
            className="absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white"
            style={{ background: ink }}
          >
            {product.badge}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="eyebrow" style={{ color: ink }}>
          {product.kind === 'digital' ? 'Instant download' : 'Ships from Michigan'}
        </p>
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-ink hover:underline">
            {product.shortName || product.name}
          </h3>
        </Link>
        <p className="flex-1 text-sm leading-relaxed text-muted">{product.blurb}</p>

        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="font-display text-xl font-semibold" style={{ color: ink }}>
            {money(product.price)}
          </span>
          <button
            type="button"
            onClick={() => add(product.slug)}
            className="rounded-full border-2 px-4 py-1.5 text-sm font-bold transition-colors"
            style={{ borderColor: accent, color: ink }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
