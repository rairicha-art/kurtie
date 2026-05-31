export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border/60 bg-muted/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <span className="font-display text-2xl tracking-[0.4em]">K U R T I E</span>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Heirloom ethnic wear, crafted in small batches by Indian artisans.
            Slow fashion, made with intention.
          </p>
          <form className="mt-6 flex max-w-sm">
            <input
              type="email"
              placeholder="Email for new arrivals"
              className="flex-1 border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
            <button className="border border-l-0 border-foreground bg-foreground px-4 text-xs uppercase tracking-widest text-background hover:bg-primary hover:border-primary">
              Join
            </button>
          </form>
        </div>
        <div>
          <p className="eyebrow mb-4">Shop</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>All Kurtis</li><li>Embroidered</li><li>Silk</li><li>Block Print</li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">House</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Our story</li><li>Artisans</li><li>Care guide</li><li>Returns</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 px-6 py-6 text-center text-xs tracking-widest text-muted-foreground">
        © {new Date().getFullYear()} KURTIE · CRAFTED IN INDIA
      </div>
    </footer>
  );
}
