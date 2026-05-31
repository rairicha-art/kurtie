import { Toaster as Sonner } from "sonner";

export const Toaster = (props: React.ComponentProps<typeof Sonner>) => (
  <Sonner
    position="bottom-right"
    toastOptions={{
      classNames: {
        toast: "border border-border bg-background text-foreground",
        title: "font-display text-base",
        description: "text-muted-foreground text-sm",
      },
    }}
    {...props}
  />
);
