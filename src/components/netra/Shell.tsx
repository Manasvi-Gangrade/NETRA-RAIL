import type { ReactNode } from "react";
import { Nav, Footer } from "./Nav";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 w-full max-w-full overflow-x-hidden">
      <Nav />
      <main className="flex-1 animate-fade-in w-full max-w-full overflow-x-hidden">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  icon,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="mx-auto max-w-7xl px-6 pt-10 pb-6">
      <div className="flex items-start gap-4">
        {icon ? (
          <div className="w-14 h-14 rounded-2xl grid place-items-center bg-white border border-slate-200 text-blue-600 shadow-sm shrink-0">
            {icon}
          </div>
        ) : null}
        <div>
          <div className="text-xs uppercase tracking-[0.22em] font-extrabold text-amber-600">{eyebrow}</div>
          <h1 className="mt-1 text-3xl md:text-4xl font-display font-black text-slate-900 tracking-tight">{title}</h1>
          {description ? (
            <p className="mt-2 max-w-2xl text-slate-600 font-semibold text-sm md:text-base leading-relaxed">{description}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
