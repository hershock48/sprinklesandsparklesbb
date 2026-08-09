'use client';

import { useState } from 'react';
import { useCart } from '@/components/CartProvider';

export default function AddToCart({ slug, kind }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {kind === 'physical' && (
        <div className="flex items-center gap-1 rounded-full border-2 border-line bg-white">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="h-11 w-11 rounded-full text-lg text-ink"
          >
            &minus;
          </button>
          <span className="w-6 text-center font-bold">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(99, q + 1))}
            aria-label="Increase quantity"
            className="h-11 w-11 rounded-full text-lg text-ink"
          >
            +
          </button>
        </div>
      )}
      <button type="button" onClick={() => add(slug, qty)} className="btn-candy">
        Add to bag
      </button>
    </div>
  );
}
