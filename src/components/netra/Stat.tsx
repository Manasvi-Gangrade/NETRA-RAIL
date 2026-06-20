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
  bgClass = "bg-slate-900/90 border-white/15 text-white shadow-xl",
  textClass = "text-slate-300",
}: {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  icon?: ReactNode;
  accent?: "primary" | "saffron" | "emerald" | "violet" | "rose" | "blue" | "amber";
  bgClass?: string;
  textClass?: string;
}) {
  const display = useCountUp(value, 1500, decimals);
  const accentClass =
    accent === "saffron" || accent === "amber"
      ? "text-amber-400 bg-amber-500/20 border border-amber-500/30"
      : accent === "emerald"
        ? "text-emerald-400 bg-emerald-500/20 border border-emerald-500/30"
        : accent === "rose"
          ? "text-rose-400 bg-rose-500/20 border border-rose-500/30"
          : accent === "violet"
            ? "text-violet-400 bg-violet-500/20 border border-violet-500/30"
            : accent === "blue"
              ? "text-blue-400 bg-blue-500/20 border border-blue-500/30"
              : "text-saffron bg-saffron/20 border border-saffron/30";
  return (
    <div className={`card-hover rounded-2xl border p-5 flex flex-col gap-3 backdrop-blur-md transition-all duration-300 ${bgClass}`}>
      <div className="flex items-center justify-between">
        <div className={`text-[10px] uppercase tracking-wider font-extrabold ${textClass}`}>{label}</div>
        {icon ? <div className={`w-9 h-9 rounded-xl grid place-items-center ${accentClass}`}>{icon}</div> : null}
      </div>
      <div className="text-3xl font-display font-extrabold tracking-tight text-white">
        {prefix}
        {display}
        {suffix ? <span className="text-sm font-bold text-slate-300 ml-1">{suffix}</span> : null}
      </div>
    </div>
  );
}

