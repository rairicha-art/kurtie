import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-1.jpg";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KURTIE — Heirloom Kurtis, Slow-Made in India" },
      { name: "description", content: "Discover hand-crafted kurtis in silk, cotton, chanderi and chikankari. KURTIE is heritage Indian wear, reimagined." },
      { property: "og:title", content: "KURTIE — Heirloom Kurtis" },
      { property: "og:description", content: "Hand-crafted kurtis from Indian artisans." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = products.slice(0, 4);
  return (
    <>
      {/* HERO */}
      <section className="relative grid grid-cols-1 md:grid-cols-12">
        <div className="relative md:col-span-7 md:order-2">
          <img
            src={heroImg}
            alt="Woman in heritage terracotta kurti"
            width={1080}
            height={1920}
            className="h-[70vh] w-full object-cover md:h-[88vh]"
          />
        </div>
        <div className="flex flex-col justify-center px-8 py-16 md:col-span-5 md:order-1 md:px-14 md:py-24">
          <p className="eyebrow">The Equinox Edit · Autumn '26</p>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] text-balance md:text-6xl lg:text-7xl">
            Woven by hand,<br />worn for life.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            A small collection of kurtis, slow-made in Jaipur, Lucknow and
            Bhuj. Honest fabrics, considered details, heirloom quality.
          </p>
          <div className="mt-10 flex gap-4">
            <Link to="/shop" className="bg-foreground px-7 py-4 text-xs uppercase tracking-[0.2em] text-background transition-colors hover:bg-primary">
              Shop the edit
            </Link>
            <Link to="/shop" className="border border-foreground px-7 py-4 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-foreground hover:text-background">
              Our craft
            </Link>
          </div>
          <div className="divider-gold mt-14 w-32" />
          <p className="mt-4 max-w-sm font-display italic text-muted-foreground">
            "Every kurti carries the breath of the hands that made it."
          </p>
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 flex items-end justify-between">
          <div>
            <p className="eyebrow">Newly arrived</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">The autumn pieces</h2>
          </div>
          <Link to="/shop" className="hidden text-xs uppercase tracking-widest underline-offset-4 hover:underline md:inline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      {/* CRAFT STORY */}
      <section className="bg-muted/40 py-24">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 text-center md:grid-cols-3">
          {[
            { t: "Hand block prints", d: "Wooden blocks carved in Bagru, pressed by hand on natural cotton." },
            { t: "Chikankari from Lucknow", d: "Six generations of needlework, in white thread on soft mulmul." },
            { t: "Pure mulberry silk", d: "Loomed in small batches in Bhagalpur and Chanderi villages." },
          ].map((c) => (
            <div key={c.t}>
              <div className="divider-gold mx-auto w-12 mb-6" />
              <h3 className="font-display text-2xl">{c.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SHOP ALL */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 text-center">
          <p className="eyebrow">The collection</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">All kurtis</h2>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>
    </>
  );
}
