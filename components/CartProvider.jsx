'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { bySlug, subtotal, shippingFor } from '@/lib/catalog';

const KEY = 'ssbb-cart-v1';
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setItems(parsed.filter((i) => i && bySlug(i.slug)));
        }
      }
    } catch {
      /* a corrupt cart is not worth crashing over */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* private mode, ignore */
    }
  }, [items, ready]);

  const add = useCallback((slug, qty = 1) => {
    const product = bySlug(slug);
    if (!product) return;
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === slug);
      // a digital file only needs buying once
      if (existing) {
        if (product.kind === 'digital') return prev;
        return prev.map((i) => (i.slug === slug ? { ...i, qty: Math.min(i.qty + qty, 99) } : i));
      }
      return [...prev, { slug, qty: product.kind === 'digital' ? 1 : qty }];
    });
    setOpen(true);
  }, []);

  const setQty = useCallback((slug, qty) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.slug !== slug)
        : prev.map((i) => (i.slug === slug ? { ...i, qty: Math.min(qty, 99) } : i))
    );
  }, []);

  const remove = useCallback((slug) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const sub = subtotal(items);
    const ship = shippingFor(items);
    return {
      items,
      ready,
      open,
      setOpen,
      add,
      setQty,
      remove,
      clear,
      count,
      subtotal: sub,
      shipping: ship,
      total: sub + ship,
    };
  }, [items, ready, open, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
