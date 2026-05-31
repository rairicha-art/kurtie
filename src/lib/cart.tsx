import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "./products";

export type CartItem = {
  slug: string;
  size: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  add: (slug: string, size: string, qty?: number) => void;
  remove: (slug: string, size: string) => void;
  updateQty: (slug: string, size: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  resolved: { item: CartItem; product: Product }[];
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "kurtie.cart.v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const resolved = items
      .map((it) => {
        const product = products.find((p) => p.slug === it.slug);
        return product ? { item: it, product } : null;
      })
      .filter((x): x is { item: CartItem; product: Product } => x !== null);

    return {
      items,
      resolved,
      count: items.reduce((s, i) => s + i.quantity, 0),
      subtotal: resolved.reduce((s, r) => s + r.product.price * r.item.quantity, 0),
      add: (slug, size, qty = 1) =>
        setItems((prev) => {
          const i = prev.findIndex((x) => x.slug === slug && x.size === size);
          if (i >= 0) {
            const next = [...prev];
            next[i] = { ...next[i], quantity: next[i].quantity + qty };
            return next;
          }
          return [...prev, { slug, size, quantity: qty }];
        }),
      remove: (slug, size) =>
        setItems((prev) => prev.filter((x) => !(x.slug === slug && x.size === size))),
      updateQty: (slug, size, qty) =>
        setItems((prev) =>
          prev
            .map((x) => (x.slug === slug && x.size === size ? { ...x, quantity: qty } : x))
            .filter((x) => x.quantity > 0),
        ),
      clear: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
