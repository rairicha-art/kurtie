import { Link } from "@tanstack/react-router";
import { ShoppingBag, Search, Heart, User } from "lucide-react";
import { useCart } from "@/lib/cart";

export function SiteHeader() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:h-20">
        <nav className="hidden flex-1 items-center gap-8 text-sm md:flex">
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <Link to="/shop" search={{ category: "Embroidered" }} className="hover:text-primary transition-colors">Embroidered</Link>
          <Link to="/shop" search={{ category: "Block Print" }} className="hover:text-primary transition-colors">Block Print</Link>
          <Link to="/shop" search={{ category: "Silk" }} className="hover:text-primary transition-colors">Silk</Link>
        </nav>
        <Link to="/" className="flex-1 text-center md:flex-none">
          <span className="font-display text-2xl tracking-[0.4em] lg:text-3xl">K U R T I E</span>
        </Link>
        <div className="flex flex-1 items-center justify-end gap-5 text-foreground/80">
          <button aria-label="Search" className="hover:text-primary transition-colors hidden sm:inline-flex"><Search size={18} /></button>
          <button aria-label="Account" className="hover:text-primary transition-colors hidden sm:inline-flex"><User size={18} /></button>
          <button aria-label="Wishlist" className="hover:text-primary transition-colors hidden sm:inline-flex"><Heart size={18} /></button>
          <Link to="/cart" aria-label="Cart" className="relative hover:text-primary transition-colors">
            <ShoppingBag size={18} />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
