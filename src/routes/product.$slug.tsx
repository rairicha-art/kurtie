import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { getProduct, products, formatINR } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/lib/cart";
import { Heart, Minus, Plus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    return {
      meta: p
        ? [
            { title: `${p.name} — KURTIE` },
            { name: "description", content: p.description },
            { property: "og:title", content: p.name },
            { property: "og:description", content: p.description },
            { property: "og:image", content: p.image },
          ]
        : [{ title: "Product — KURTIE" }],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="px-6 py-32 text-center">
      <h1 className="font-display text-3xl">Piece not found</h1>
      <Link to="/shop" className="mt-6 inline-block underline">Return to shop</Link>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const navigate = useNavigate();
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);

  const handleAdd = (buyNow = false) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }
    add(product.slug, size, qty);
    toast.success(`Added to bag`, { description: product.name });
    if (buyNow) navigate({ to: "/cart" });
  };

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <>
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-12 md:grid-cols-2 md:py-16">
        <div className="bg-muted">
          <img
            src={product.image}
            alt={product.name}
            width={1024}
            height={1280}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <p className="eyebrow">{product.category}</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">{product.name}</h1>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-xl">{formatINR(product.price)}</span>
            {product.compareAt && (
              <span className="text-sm text-muted-foreground line-through">{formatINR(product.compareAt)}</span>
            )}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Inclusive of all taxes</p>

          <div className="divider-gold my-8 w-24" />

          <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-widest">
              <span>Size</span>
              <button className="text-muted-foreground hover:text-foreground">Size guide</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s: string) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`h-11 min-w-11 border px-3 text-sm transition-colors ${
                    size === s ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <p className="eyebrow">Quantity</p>
            <div className="flex items-center border border-border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3 hover:bg-muted"><Minus size={14} /></button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="p-3 hover:bg-muted"><Plus size={14} /></button>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => handleAdd(false)}
              className="flex-1 bg-foreground px-7 py-4 text-xs uppercase tracking-[0.2em] text-background transition-colors hover:bg-primary"
            >
              Add to bag
            </button>
            <button
              onClick={() => handleAdd(true)}
              className="flex-1 border border-foreground px-7 py-4 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-foreground hover:text-background"
            >
              Buy now
            </button>
            <button aria-label="Save" className="border border-foreground p-4 hover:bg-foreground hover:text-background">
              <Heart size={16} />
            </button>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-y-3 border-t border-border/60 pt-8 text-sm">
            <dt className="text-muted-foreground">Fabric</dt><dd>{product.fabric}</dd>
            <dt className="text-muted-foreground">Colour</dt><dd>{product.color}</dd>
            <dt className="text-muted-foreground">Care</dt><dd>Dry clean only</dd>
            <dt className="text-muted-foreground">Shipping</dt><dd>Free across India</dd>
          </dl>
        </div>
      </div>

      <section className="border-t border-border/60 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center font-display text-3xl">You may also love</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
            {related.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>
    </>
  );
}
