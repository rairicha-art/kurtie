import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { z } from "zod";

const searchSchema = z.object({
  category: z.enum(["Embroidered", "Block Print", "Silk", "Cotton"]).optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Shop Kurtis — KURTIE" },
      { name: "description", content: "Browse all kurtis: embroidered, block-printed, silk and cotton. Hand-crafted in India." },
      { property: "og:title", content: "Shop All Kurtis — KURTIE" },
      { property: "og:description", content: "Browse our full collection of heirloom kurtis." },
    ],
  }),
  component: Shop,
});

const categories = ["All", "Embroidered", "Block Print", "Silk"] as const;

function Shop() {
  const search = Route.useSearch();
  const [sort, setSort] = useState<"new" | "low" | "high">("new");

  const active = search.category ?? "All";
  let list = active === "All" ? products : products.filter((p) => p.category === active);
  list = [...list].sort((a, b) =>
    sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : 0,
  );

  return (
    <>
      <section className="border-b border-border/60 px-6 py-16 text-center">
        <p className="eyebrow">The collection</p>
        <h1 className="mt-3 font-display text-5xl md:text-6xl">{active === "All" ? "All Kurtis" : active}</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
          {list.length} pieces, hand-crafted in small batches across India.
        </p>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div className="flex flex-wrap gap-2 text-xs uppercase tracking-widest">
            {categories.map((c) => (
              <Link
                key={c}
                to="/shop"
                search={c === "All" ? {} : { category: c as Exclude<typeof c, "All"> }}
                className={`px-3 py-2 transition-colors ${
                  active === c ? "bg-foreground text-background" : "hover:text-primary"
                }`}
              >
                {c}
              </Link>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="border border-border bg-background px-3 py-2 text-xs uppercase tracking-widest"
          >
            <option value="new">Newest</option>
            <option value="low">Price: Low to high</option>
            <option value="high">Price: High to low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {list.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </div>
    </>
  );
}
