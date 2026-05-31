import { Link } from "@tanstack/react-router";
import { formatINR, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        {product.compareAt && (
          <span className="absolute left-3 top-3 bg-background/90 px-2 py-1 text-[10px] uppercase tracking-widest text-foreground">
            Sale
          </span>
        )}
      </div>
      <div className="pt-4 text-center">
        <p className="eyebrow text-[0.65rem]">{product.category}</p>
        <h3 className="font-display text-xl mt-1">{product.name.split("—")[0].trim()}</h3>
        <div className="mt-1 flex items-center justify-center gap-2 text-sm">
          <span>{formatINR(product.price)}</span>
          {product.compareAt && (
            <span className="text-muted-foreground line-through text-xs">
              {formatINR(product.compareAt)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
