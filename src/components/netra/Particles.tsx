import { useMemo } from "react";

export function Particles({ count = 24 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: 60 + Math.random() * 40,
        dx: (Math.random() - 0.5) * 120,
        dy: -60 - Math.random() * 200,
        delay: Math.random() * 6,
        dur: 6 + Math.random() * 6,
        size: 2 + Math.random() * 3,
        color: Math.random() > 0.5 ? "oklch(0.78 0.16 70)" : "oklch(0.7 0.16 165)",
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            ["--dx" as never]: `${p.dx}px`,
            ["--dy" as never]: `${p.dy}px`,
            animation: `float-particle ${p.dur}s ease-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function NetworkMap() {
  // decorative animated SVG of nodes + connecting lines
  const nodes = [
    { x: 80, y: 90 },
    { x: 200, y: 60 },
    { x: 320, y: 130 },
    { x: 460, y: 80 },
    { x: 580, y: 160 },
    { x: 700, y: 100 },
    { x: 150, y: 200 },
    { x: 380, y: 240 },
    { x: 540, y: 280 },
    { x: 680, y: 240 },
  ];
  const edges: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
    [0, 6], [6, 7], [2, 7], [7, 8], [8, 9], [5, 9], [4, 8],
  ];
  return (
    <svg viewBox="0 0 800 320" className="absolute inset-0 w-full h-full opacity-[0.45]">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="oklch(0.34 0.08 250)"
          strokeOpacity={0.45}
          strokeWidth={1.2}
          className="animate-dash"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={8} fill="oklch(0.78 0.16 70 / 0.18)" />
          <circle cx={n.x} cy={n.y} r={3.5} fill="oklch(0.34 0.08 250)" />
        </g>
      ))}
    </svg>
  );
}
