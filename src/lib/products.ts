import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import p7 from "@/assets/p7.jpg";

export type Product = {
  slug: string;
  name: string;
  price: number;
  compareAt?: number;
  image: string;
  category: "Embroidered" | "Block Print" | "Silk" | "Cotton";
  fabric: string;
  description: string;
  sizes: string[];
  color: string;
};

export const products: Product[] = [
  {
    slug: "aatma-terracotta-zari",
    name: "Aatma — Terracotta Zari Kurti",
    price: 3290,
    compareAt: 3990,
    image: p1,
    category: "Embroidered",
    fabric: "Pure silk with hand zari",
    description:
      "A deep terracotta silk kurti with intricate gold zari embroidery at the neckline. Heritage craftsmanship for the modern woman.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    color: "Terracotta",
  },
  {
    slug: "saanjh-ivory-floral",
    name: "Saanjh — Ivory Floral Anarkali",
    price: 4190,
    image: p2,
    category: "Block Print",
    fabric: "Cotton mulmul, hand block printed",
    description:
      "An ivory anarkali kurti dressed in delicate floral block prints. A piece for slow afternoons and quiet celebrations.",
    sizes: ["XS", "S", "M", "L", "XL"],
    color: "Ivory",
  },
  {
    slug: "vana-emerald-chanderi",
    name: "Vana — Emerald Chanderi Silk",
    price: 5490,
    compareAt: 6290,
    image: p3,
    category: "Silk",
    fabric: "Pure Chanderi silk with gold border",
    description:
      "Forest-green Chanderi silk with a hand-woven gold border. Light as breath, regal in presence.",
    sizes: ["S", "M", "L", "XL"],
    color: "Emerald",
  },
  {
    slug: "gulab-pink-chikankari",
    name: "Gulab — Pink Chikankari",
    price: 2890,
    image: p4,
    category: "Embroidered",
    fabric: "Cotton mulmul, hand chikankari",
    description:
      "Dusty rose mulmul with white chikankari embroidery from Lucknow. Heirloom in the making.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    color: "Dusty Pink",
  },
  {
    slug: "neel-ajrakh-indigo",
    name: "Neel — Ajrakh Indigo",
    price: 3490,
    image: p5,
    category: "Block Print",
    fabric: "Cotton, natural indigo ajrakh",
    description:
      "Centuries-old ajrakh printing on natural cotton, in deep indigo. Worn by artisans, made for everyday.",
    sizes: ["S", "M", "L", "XL"],
    color: "Indigo",
  },
  {
    slug: "kesar-mustard-mirror",
    name: "Kesar — Mustard Mirror Work",
    price: 4790,
    compareAt: 5490,
    image: p6,
    category: "Embroidered",
    fabric: "Pure silk with mirror & thread work",
    description:
      "Saffron silk with mirror work and thread embroidery — a piece that catches every light in the room.",
    sizes: ["XS", "S", "M", "L", "XL"],
    color: "Mustard",
  },
  {
    slug: "raat-black-silver",
    name: "Raat — Ink Black Silk",
    price: 4990,
    image: p7,
    category: "Silk",
    fabric: "Pure silk with silver thread work",
    description:
      "Midnight black silk with delicate silver thread embroidery. For the woman who arrives, never enters.",
    sizes: ["XS", "S", "M", "L", "XL"],
    color: "Black",
  },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
