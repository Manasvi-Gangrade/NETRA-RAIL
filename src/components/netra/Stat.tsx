import type { ReactNode } from "react";
import { useCountUp } from "@/hooks/use-count-up";

export function StatCard({
  label,
  value,
  suffix,
  prefix,
  decimals = 0,
  icon,
  accent = "primary",
}: {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  icon?: ReactNode;
  accent?: "primary" | "saffron" | "emerald";
}) {
  const display = useCountUp(value, 1500, decimals);
  const accentClass =
    accent === "saffron"
      ? "text-saffron-foreground bg-saffron/15"
      : accent === "emerald"
        ? "text-emerald bg-emerald/10"
        : "text-primary bg-primary/10";
  return (
    <div className="card-hover rounded-2xl border border-border bg-white p-5 flex flex-col gap-3 shadow-[0_2px_0_oklch(0.34_0.08_250/0.04)]">
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">{label}</div>
        {icon ? <div className={`w-9 h-9 rounded-xl grid place-items-center ${accentClass}`}>{icon}</div> : null}
      </div>
      <div className="text-3xl font-display font-bold tracking-tight">
        {prefix}
        {display}
        {suffix ? <span className="text-base font-medium text-muted-foreground ml-1">{suffix}</span> : null}
      </div>
    </div>
  );
}
