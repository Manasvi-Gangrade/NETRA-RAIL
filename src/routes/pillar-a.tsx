import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Ship, Anchor, Train, IndianRupee, Boxes, Activity, Container, Fuel, Leaf, Clock, Warehouse, TrendingDown } from "lucide-react";
import { Shell, PageHeader } from "@/components/netra/Shell";
import { StatCard } from "@/components/netra/Stat";
import { IndiaMap } from "@/components/netra/India";
import { useCountUp } from "@/hooks/use-count-up";
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";

export const Route = createFileRoute("/pillar-a")({
  head: () => ({
    meta: [
      { title: "Pillar A · Intermodal Supply-Chain Synchroniser · NETRA-RAIL" },
      { name: "description", content: "Real-time port-to-plant freight orchestration: vessel ETAs synchronised with wagon dispatch queues." },
    ],
  }),
  component: PillarA,
});

const initialPorts = [
  { name: "Mundra Port", vessel: "MV Himalaya", eta: 1320, cargo: "Iron Ore", tons: 48200, status: "ARRIVING" as const, img: "https://images.unsplash.com/photo-1494412574745-c66e1ba6c2f4?auto=format&fit=crop&w=800&q=70" },
  { name: "JNPT Mumbai", vessel: "MV Konkan", eta: 0, cargo: "Containers", tons: 26100, status: "DOCKED" as const, img: "https://images.unsplash.com/photo-1535556261260-f2191cc63217?auto=format&fit=crop&w=800&q=70" },
  { name: "Vishakhapatnam", vessel: "MV Vindhya", eta: -1, cargo: "Coal", tons: 61800, status: "DISPATCHED" as const, img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=70" },
];

const initialQueue = [
  { id: "FRT-2241", from: "Mundra Port", to: "JSW Toranagallu Plant", time: "14:45", status: "DISPATCH READY", load: 92 },
  { id: "FRT-2242", from: "JNPT Mumbai", to: "Tata Steel Jamshedpur", time: "15:10", status: "LOADING", load: 68 },
  { id: "FRT-2243", from: "Paradip", to: "SAIL Bhilai", time: "15:35", status: "QUEUED", load: 41 },
  { id: "FRT-2244", from: "Vishakhapatnam", to: "RINL Plant", time: "16:00", status: "QUEUED", load: 22 },
];

const cargoMix = [
  { name: "Iron Ore", value: 38, fill: "oklch(0.34 0.08 250)" },
  { name: "Coal", value: 27, fill: "oklch(0.45 0.06 60)" },
  { name: "Containers", value: 18, fill: "oklch(0.78 0.16 70)" },
  { name: "Cement", value: 9, fill: "oklch(0.7 0.13 195)" },
  { name: "Fertiliser", value: 8, fill: "oklch(0.7 0.16 165)" },
];

const dwellHistory = Array.from({ length: 14 }).map((_, i) => ({
  d: `D${i + 1}`,
  before: 5.8 + Math.sin(i / 2) * 1.2 + Math.random() * 0.6,
  after: 0.8 + Math.cos(i / 2) * 0.25 + Math.random() * 0.2,
}));

const wagonUtil = Array.from({ length: 12 }).map((_, i) => ({
  h: `${i * 2}:00`,
  util: 60 + Math.sin(i / 1.4) * 20 + Math.random() * 6,
}));

function statusStyle(s: string) {
  if (s === "ARRIVING") return "bg-saffron/15 text-saffron-foreground";
  if (s === "DOCKED") return "bg-primary/10 text-primary";
  if (s === "DISPATCHED") return "bg-emerald/10 text-emerald";
  return "bg-muted text-muted-foreground";
}
function statusDot(s: string) {
  if (s === "ARRIVING") return "bg-saffron animate-pulse";
  if (s === "DOCKED") return "bg-primary";
  return "bg-emerald";
}

function fmtCountdown(secs: number) {
  if (secs < 0) return "DEPARTED";
  if (secs === 0) return "DOCKED";
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function PillarA() {
  const [ports, setPorts] = useState(initialPorts);
  const [queue, setQueue] = useState(initialQueue);

  useEffect(() => {
    const t = setInterval(() => {
      setPorts((p) => p.map((x) => ({ ...x, eta: x.eta > 0 ? Math.max(0, x.eta - 5) : x.eta })));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setQueue((q) => {
        const id = `FRT-${2245 + Math.floor(Math.random() * 90)}`;
        const next = [
          { id, from: "Kandla Port", to: "Adani Mundra Plant", time: new Date(Date.now() + 30 * 60000).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }), status: "QUEUED", load: Math.floor(Math.random() * 50) },
          ...q,
        ].slice(0, 6);
        return next;
      });
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const efficiency = useCountUp(94, 1400);

  return (
    <Shell>
      <PageHeader
        eyebrow="Pillar A"
        title="Intermodal Supply-Chain Synchroniser"
        description="Port-to-plant freight orchestration. Vessel ETAs feed directly into a multimodal RL-inspired dispatch optimiser that eliminates wagon idle dwell."
        icon={<Ship className="w-6 h-6" />}
      />

      {/* KPI ROW */}
      <section className="mx-auto max-w-7xl px-6 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Active Vessels" value={17} icon={<Anchor className="w-4 h-4" />} />
        <StatCard label="Freight Trains Today" value={142} icon={<Train className="w-4 h-4" />} accent="saffron" />
        <StatCard label="Wagons Routed" value={3812} icon={<Boxes className="w-4 h-4" />} />
        <StatCard label="Idle Dwell Cut" value={87} suffix="%" icon={<TrendingDown className="w-4 h-4" />} accent="emerald" />
        <StatCard label="Savings Today" value={2.3} prefix="₹" suffix="Cr" decimals={1} icon={<IndianRupee className="w-4 h-4" />} accent="emerald" />
      </section>

      <section className="mx-auto max-w-7xl px-6 mt-8 grid lg:grid-cols-12 gap-5">
        {/* PORTS WITH PHOTOS */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Live Port Status</h2>
            <span className="text-xs flex items-center gap-1.5 text-emerald"><span className="live-dot" /> LIVE</span>
          </div>
          {ports.map((p) => (
            <div key={p.name} className="card-hover rounded-2xl border border-border bg-white overflow-hidden">
              <div className="relative h-24">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white">
                  <div className="font-display font-bold flex items-center gap-1.5 drop-shadow"><Anchor className="w-4 h-4" />{p.name}</div>
                  <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1.5 ${statusStyle(p.status)}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${statusDot(p.status)}`} /> {p.status}
                  </div>
                </div>
              </div>
              <div className="p-4 grid grid-cols-3 gap-3 text-sm">
                <div>
                  <div className="text-[10px] uppercase text-muted-foreground">Vessel</div>
                  <div className="font-medium text-xs">{p.vessel}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-muted-foreground">Cargo</div>
                  <div className="font-medium text-xs">{p.cargo}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-muted-foreground">Tonnage</div>
                  <div className="font-mono text-xs">{p.tons.toLocaleString()}T</div>
                </div>
                <div className="col-span-2">
                  <div className="text-[10px] uppercase text-muted-foreground">ETA Countdown</div>
                  <div className="font-mono font-bold text-primary">{fmtCountdown(p.eta)}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-muted-foreground">Sync</div>
                  <div className="text-xs font-medium flex items-center gap-1"><Activity className="w-3 h-3 text-emerald" />Locked</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* QUEUE + UTILISATION */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Freight Dispatch Queue</h2>
            <span className="text-xs text-muted-foreground">{queue.length} active</span>
          </div>
          <div className="rounded-2xl border border-border bg-white overflow-hidden">
            {queue.map((q) => (
              <div key={q.id + q.time} className="animate-slide-up border-b last:border-b-0 border-border px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg gradient-cool grid place-items-center text-white">
                    <Train className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold">{q.id} <span className="text-muted-foreground font-normal">· {q.time}</span></div>
                    <div className="text-xs text-muted-foreground truncate">{q.from} → {q.to}</div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-saffron/15 text-saffron-foreground font-semibold whitespace-nowrap">{q.status}</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full gradient-saffron transition-all duration-700" style={{ width: `${q.load}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Wagon utilisation */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Wagon Utilisation (24h)</div>
              <span className="text-[11px] text-emerald font-bold">+18.4%</span>
            </div>
            <div className="h-28 mt-2">
              <ResponsiveContainer>
                <AreaChart data={wagonUtil}>
                  <defs>
                    <linearGradient id="wu" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.7 0.16 165)" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="oklch(0.7 0.16 165)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="h" hide />
                  <YAxis hide />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                  <Area type="monotone" dataKey="util" stroke="oklch(0.7 0.16 165)" fill="url(#wu)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* METRICS */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Synchronisation Metrics</h2>
          <div className="rounded-2xl border border-border bg-gradient-to-br from-saffron/10 via-white to-emerald/10 p-5">
            <div className="text-xs text-muted-foreground">Sync Efficiency</div>
            <div className="mt-3 grid place-items-center">
              <div className="relative w-44 h-44">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  <defs>
                    <linearGradient id="ring" x1="0" x2="1">
                      <stop offset="0%" stopColor="oklch(0.7 0.16 165)" />
                      <stop offset="50%" stopColor="oklch(0.78 0.16 70)" />
                      <stop offset="100%" stopColor="oklch(0.6 0.2 295)" />
                    </linearGradient>
                  </defs>
                  <circle cx="60" cy="60" r="50" stroke="oklch(0.95 0.02 80)" strokeWidth="10" fill="none" />
                  <circle cx="60" cy="60" r="50" stroke="url(#ring)" strokeWidth="10" fill="none"
                    strokeDasharray={`${(94.3 / 100) * 314} 314`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold text-primary">{efficiency}<span className="text-base">.3%</span></div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">vessel ↔ wagon</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cargo mix */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Cargo Mix · today</div>
              <Container className="w-4 h-4 text-primary" />
            </div>
            <div className="h-44">
              <ResponsiveContainer>
                <PieChart>
                  <Tooltip contentStyle={{ fontSize: 11 }} />
                  <Pie data={cargoMix} dataKey="value" innerRadius={42} outerRadius={70} paddingAngle={2}>
                    {cargoMix.map((c, i) => <Cell key={i} fill={c.fill} />)}
                  </Pie>
                  <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <StatCard label="CO₂ Saved" value={184} suffix="T" icon={<Leaf className="w-4 h-4" />} accent="emerald" />
            <StatCard label="Fuel Saved" value={42} suffix="kL" icon={<Fuel className="w-4 h-4" />} accent="saffron" />
            <StatCard label="On-time" value={96} suffix="%" icon={<Clock className="w-4 h-4" />} />
          </div>
        </div>
      </section>

      {/* DWELL HISTORY + WAREHOUSE */}
      <section className="mx-auto max-w-7xl px-6 mt-10 grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-white p-5">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Wagon Idle Dwell · last 14 days</div>
              <div className="text-sm font-display font-semibold">Before vs After NETRA-RAIL</div>
            </div>
            <div className="flex gap-3 text-[11px]">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-destructive/70" /> Before</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-emerald" /> After</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={dwellHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 250)" />
                <XAxis dataKey="d" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} unit="h" />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Bar dataKey="before" fill="oklch(0.62 0.22 25 / 0.75)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="after" fill="oklch(0.7 0.16 165)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Warehouse Buffers</div>
            <Warehouse className="w-4 h-4 text-primary" />
          </div>
          <div className="space-y-3">
            {[
              { n: "Mundra-Adani", v: 78, c: "bg-primary" },
              { n: "JSW Toranagallu", v: 52, c: "bg-emerald" },
              { n: "Tata Jamshedpur", v: 91, c: "bg-saffron" },
              { n: "SAIL Bhilai", v: 64, c: "bg-violet" },
              { n: "RINL Vizag", v: 38, c: "bg-teal" },
            ].map((w) => (
              <div key={w.n}>
                <div className="flex justify-between text-xs"><span>{w.n}</span><span className="font-mono">{w.v}%</span></div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full ${w.c} transition-all duration-700`} style={{ width: `${w.v}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="mx-auto max-w-7xl px-6 mt-10 mb-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Live Freight Route Map · Ports ⇄ Plants</h2>
        <div className="rounded-2xl border border-border bg-gradient-to-br from-cream-bg to-white p-6">
          <IndiaMap
            markers={[
              { x: 110, y: 200, label: "Mundra", color: "oklch(0.34 0.08 250)", pulse: true },
              { x: 145, y: 280, label: "JNPT", color: "oklch(0.34 0.08 250)", pulse: true },
              { x: 350, y: 340, label: "Vizag", color: "oklch(0.34 0.08 250)", pulse: true },
              { x: 250, y: 220, label: "Bhilai", color: "oklch(0.78 0.16 70)" },
              { x: 320, y: 260, label: "Jamshedpur", color: "oklch(0.78 0.16 70)" },
              { x: 230, y: 320, label: "Toranagallu", color: "oklch(0.78 0.16 70)" },
              { x: 180, y: 350, label: "Hyderabad", color: "oklch(0.6 0.2 295)" },
              { x: 380, y: 280, label: "Rourkela", color: "oklch(0.7 0.16 165)" },
            ]}
          />
        </div>
      </section>
    </Shell>
  );
}
