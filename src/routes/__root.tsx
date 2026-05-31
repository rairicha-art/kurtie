import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "@/lib/cart";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-display text-4xl">This page has wandered off</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you're looking for isn't here. Let's take you home.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center bg-foreground px-6 py-3 text-xs uppercase tracking-widest text-background hover:bg-primary"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl">Something didn't unfold</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          We had trouble loading this page. Please try again.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="bg-foreground px-5 py-2.5 text-xs uppercase tracking-widest text-background hover:bg-primary"
          >
            Try again
          </button>
          <a href="/" className="border border-foreground px-5 py-2.5 text-xs uppercase tracking-widest hover:bg-foreground hover:text-background">
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "KURTIE — Heirloom Ethnic Wear for Women" },
      { name: "description", content: "Hand-crafted kurtis in silk, cotton and chanderi. Block prints, chikankari, zari embroidery — heritage textiles for the modern woman." },
      { property: "og:title", content: "KURTIE — Heirloom Ethnic Wear" },
      { property: "og:description", content: "Slow-made kurtis from Indian artisans. Embroidered, block-printed and silk." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1"><Outlet /></main>
          <SiteFooter />
        </div>
      </CartProvider>
    </QueryClientProvider>
  );
}
