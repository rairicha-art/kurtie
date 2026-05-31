import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/products";
import { Minus, Plus, X } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Bag — KURTIE" }, { name: "description", content: "Review the kurtis in your shopping bag." }] }),
  component: CartPage,
});

function CartPage() {
  const { resolved, updateQty, remove, subtotal, count } = useCart();
  const shipping = 0;
  const total = subtotal + shipping;

  if (count === 0) {
    return (
      <section className="mx-auto max-w-xl px-6 py-32 text-center">
        <p className="eyebrow">Your bag</p>
        <h1 className="mt-4 font-display text-4xl">Empty, for now</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Find a piece you love. Each one is hand-made and limited in number.
        </p>
        <Link to="/shop" className="mt-10 inline-block bg-foreground px-8 py-4 text-xs uppercase tracking-[0.2em] text-background hover:bg-primary">
          Browse kurtis
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-12 text-center">
        <p className="eyebrow">Your bag</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">Review &amp; checkout</h1>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
        <div className="divide-y divide-border border-y border-border">
          {resolved.map(({ item, product }) => (
            <div key={`${item.slug}-${item.size}`} className="flex gap-6 py-6">
              <Link to="/product/$slug" params={{ slug: product.slug }} className="w-28 shrink-0 md:w-32">
                <img src={product.image} alt={product.name} className="aspect-[4/5] w-full object-cover" />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link to="/product/$slug" params={{ slug: product.slug }} className="font-display text-xl hover:text-primary">
                      {product.name}
                    </Link>
                    <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">Size {item.size}</p>
                  </div>
                  <button onClick={() => remove(item.slug, item.size)} className="text-muted-foreground hover:text-foreground" aria-label="Remove">
                    <X size={18} />
                  </button>
                </div>
                <div className="mt-auto flex items-end justify-between pt-4">
                  <div className="flex items-center border border-border">
                    <button onClick={() => updateQty(item.slug, item.size, item.quantity - 1)} className="p-2 hover:bg-muted"><Minus size={12} /></button>
                    <span className="w-9 text-center text-sm">{item.quantity}</span>
                    <button onClick={() => updateQty(item.slug, item.size, item.quantity + 1)} className="p-2 hover:bg-muted"><Plus size={12} /></button>
                  </div>
                  <span className="text-sm">{formatINR(product.price * item.quantity)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit bg-muted/40 p-8">
          <h2 className="font-display text-2xl">Order summary</h2>
          <div className="divider-gold my-5 w-16" />
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatINR(subtotal)}</dd></div>
            <div className="flex justify-between"><dt>Shipping</dt><dd className="text-muted-foreground">Free</dd></div>
            <div className="flex justify-between border-t border-border pt-3 text-base"><dt>Total</dt><dd>{formatINR(total)}</dd></div>
          </dl>
          <button className="mt-6 w-full bg-foreground px-7 py-4 text-xs uppercase tracking-[0.2em] text-background transition-colors hover:bg-primary">
            Proceed to checkout
          </button>
          <p className="mt-4 text-center text-[10px] uppercase tracking-widest text-muted-foreground">
            Secure checkout · COD &amp; UPI coming soon
          </p>
        </aside>
      </div>
    </section>
  );
}
