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
  bgClass = "bg-white border-slate-200 text-slate-900 shadow-sm",
  textClass = "text-slate-500 font-extrabold",
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
      ? "text-amber-700 bg-amber-100 border border-amber-200"
      : accent === "emerald"
        ? "text-emerald-700 bg-emerald-100 border border-emerald-200"
        : accent === "rose"
          ? "text-rose-700 bg-rose-100 border border-rose-200"
          : accent === "violet"
            ? "text-violet-700 bg-violet-100 border border-violet-200"
            : accent === "blue"
              ? "text-blue-700 bg-blue-100 border border-blue-200"
              : "text-amber-700 bg-amber-100 border border-amber-200";
  return (
    <div className={`card-hover rounded-2xl border p-5 flex flex-col gap-3 transition-all duration-300 ${bgClass}`}>
      <div className="flex items-center justify-between">
        <div className={`text-[10px] uppercase tracking-wider font-extrabold ${textClass}`}>{label}</div>
        {icon ? <div className={`w-9 h-9 rounded-xl grid place-items-center ${accentClass}`}>{icon}</div> : null}
      </div>
      <div className="text-3xl font-display font-black tracking-tight text-slate-900">
        {prefix}
        {display}
        {suffix ? <span className="text-sm font-bold text-slate-500 ml-1">{suffix}</span> : null}
      </div>
    </div>
  );
}

