import type { ReactNode } from "react";
import { Nav, Footer } from "./Nav";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Nav />
      <main className="flex-1 animate-fade-in">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  icon,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-6 pt-10 pb-6">
      <div className="flex items-start gap-4">
        {icon ? (
          <div className="w-14 h-14 rounded-2xl bg-cream-bg border border-border grid place-items-center text-primary">
            {icon}
          </div>
        ) : null}
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-saffron-foreground/80 font-semibold">{eyebrow}</div>
          <h1 className="mt-1 text-3xl md:text-4xl font-display font-bold text-foreground">{title}</h1>
          {description ? (
            <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
