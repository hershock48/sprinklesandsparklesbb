'use client';

import { useEffect } from 'react';
import { useCart } from '@/components/CartProvider';

/** Empties the bag once the order confirmation page loads. */
export default function ClearCart() {
  const { clear, ready, setOpen } = useCart();

  useEffect(() => {
    if (!ready) return;
    setOpen(false);
    clear();
  }, [ready, clear, setOpen]);

  return null;
}
