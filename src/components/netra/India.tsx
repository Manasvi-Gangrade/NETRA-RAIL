// Simplified stylized India outline (decorative, not geographically exact).
import type { ReactNode } from "react";

export function IndiaMap({
  markers = [],
  children,
}: {
  markers?: { x: number; y: number; label?: string; color?: string; pulse?: boolean }[];
  children?: ReactNode;
}) {
  return (
    <div className="relative w-full">
      <svg viewBox="0 0 500 560" className="w-full h-auto">
        <defs>
          <linearGradient id="ind" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.97 0.01 90)" />
            <stop offset="100%" stopColor="oklch(0.93 0.02 80)" />
          </linearGradient>
        </defs>
        <path
          d="M150 40 L210 30 L260 50 L310 40 L360 70 L400 100 L420 150 L410 200 L430 240 L420 290 L380 330 L340 370 L300 410 L280 460 L250 500 L220 520 L200 480 L180 430 L150 400 L120 360 L100 310 L90 260 L100 210 L110 160 L130 110 Z"
          fill="url(#ind)"
          stroke="oklch(0.34 0.08 250 / 0.35)"
          strokeWidth={1.5}
        />
        {/* Rail corridor lines */}
        <g stroke="oklch(0.34 0.08 250 / 0.4)" strokeWidth={1} fill="none" strokeDasharray="4 4">
          <path d="M120 120 L250 250 L380 200" />
          <path d="M150 350 L260 280 L380 320" />
          <path d="M200 60 L260 250 L300 420" />
        </g>
        {markers.map((m, i) => (
          <g key={i}>
            {m.pulse ? (
              <circle cx={m.x} cy={m.y} r={14}>
                <animate attributeName="r" from="6" to="22" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.55" to="0" dur="1.8s" repeatCount="indefinite" />
                <set attributeName="fill" to={m.color ?? "oklch(0.7 0.16 165)"} />
              </circle>
            ) : null}
            <circle cx={m.x} cy={m.y} r={5} fill={m.color ?? "oklch(0.34 0.08 250)"} />
            {m.label ? (
              <text x={m.x + 9} y={m.y + 4} fontSize="10" fill="oklch(0.34 0.08 250)" fontWeight={600}>
                {m.label}
              </text>
            ) : null}
          </g>
        ))}
        {children}
      </svg>
    </div>
  );
}
