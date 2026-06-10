import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { Smartphone, Waves, AlertTriangle, Database, Activity, Gauge, MapPin, Zap, Cpu } from "lucide-react";
import { Shell, PageHeader } from "@/components/netra/Shell";
import { StatCard } from "@/components/netra/Stat";
import { IndiaMap } from "@/components/netra/India";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, ReferenceLine, Tooltip, AreaChart, Area, BarChart, Bar, ScatterChart, Scatter, ZAxis, CartesianGrid, Cell } from "recharts";

export const Route = createFileRoute("/pillar-c")({
  head: () => ({
    meta: [
      { title: "Pillar C · IMU Sensor Telemetry · NETRA-RAIL" },
      { name: "description", content: "Crowdsourced 3-axis IMU telemetry from passenger smartphones. AKNN vector isolation of track anomalies." },
    ],
  }),
  component: PillarC,
});

function rand(min: number, max: number) { return Math.random() * (max - min) + min; }

const axisInit = Array.from({ length: 60 }).map((_, i) => ({
  t: i,
  x: Math.sin(i / 3) * 0.4 + (Math.random() - 0.5) * 0.3,
  y: Math.cos(i / 4) * 0.5 + (Math.random() - 0.5) * 0.3,
  z: Math.sin(i / 2) * 0.3 + (Math.random() - 0.5) * 0.4,
}));

const trackKm = Array.from({ length: 20 }).map((_, i) => ({
  km: `KM ${100 + i * 5}`,
  health: Math.max(40, 92 - Math.abs(i - 7) * 9 + Math.random() * 4),
}));

const scatter = Array.from({ length: 80 }).map(() => ({
  x: Math.cos(Math.random() * Math.PI * 2) * (10 + Math.random() * 8),
  y: Math.sin(Math.random() * Math.PI * 2) * (10 + Math.random() * 8),
  z: 1,
}));
const scatterAnom = Array.from({ length: 8 }).map(() => ({
  x: 25 + Math.random() * 10,
  y: -25 + Math.random() * 8,
  z: 3,
}));

function PillarC() {
  const [feed, setFeed] = useState<{ id: string; coord: string; v: number; t: string; anomaly: boolean; device: string }[]>([]);
  const [series, setSeries] = useState(Array.from({ length: 30 }).map((_, i) => ({ t: i, v: 0.4 + Math.random() * 0.2 })));
  const [axes, setAxes] = useState(axisInit);
  const triggerRef = useRef(false);

  useEffect(() => {
    const t = setInterval(() => {
      const anomaly = triggerRef.current || Math.random() < 0.18;
      if (triggerRef.current) {
        triggerRef.current = false;
      }
      const v = anomaly ? rand(2.4, 3.6) : rand(0.3, 0.9);
      const devices = ["iPhone 15", "Pixel 8", "OnePlus 12", "Samsung S24", "Xiaomi 14", "Realme GT"];
      const entry = {
        id: `IMU-${Math.floor(rand(10000, 99999))}`,
        coord: `${rand(8, 32).toFixed(2)}°N, ${rand(72, 92).toFixed(2)}°E`,
        v,
        t: new Date().toLocaleTimeString("en-IN", { hour12: false }),
        anomaly,
        device: devices[Math.floor(Math.random() * devices.length)],
      };
      setFeed((f) => [entry, ...f].slice(0, 14));
      setSeries((s) => [...s.slice(1), { t: s[s.length - 1].t + 1, v }]);
      setAxes((a) => [...a.slice(1), {
        t: a[a.length - 1].t + 1,
        x: Math.sin((a.length) / 3) * 0.4 + (anomaly ? rand(-2, 2) : (Math.random() - 0.5) * 0.4),
        y: Math.cos((a.length) / 4) * 0.5 + (anomaly ? rand(-2, 2) : (Math.random() - 0.5) * 0.4),
        z: Math.sin((a.length) / 2) * 0.3 + (anomaly ? rand(-2, 2) : (Math.random() - 0.5) * 0.4),
      }]);
    }, 900);
    return () => clearInterval(t);
  }, []);

  return (
    <Shell>
      <PageHeader
        eyebrow="Pillar C"
        title="Crowdsourced IMU Sensor Telemetry Node"
        description="Every smartphone aboard a moving train becomes a precision track quality sensor. AKNN vector indexing isolates anomalies in real time."
        icon={<Waves className="w-6 h-6" />}
      />

      <section className="mx-auto max-w-7xl px-6 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Active Sensors" value={12847} icon={<Smartphone className="w-4 h-4" />} />
        <StatCard label="Data Points / Day" value={2300000000} icon={<Database className="w-4 h-4" />} accent="saffron" />
        <StatCard label="Anomalies (24h)" value={7} icon={<AlertTriangle className="w-4 h-4" />} accent="emerald" />
        <StatCard label="AKNN Latency" value={2} suffix=".3 ms" icon={<Cpu className="w-4 h-4" />} />
        <StatCard label="Vector Dim" value={128} icon={<Activity className="w-4 h-4" />} accent="saffron" />
      </section>

      <section className="mx-auto max-w-7xl px-6 mt-8 grid lg:grid-cols-12 gap-5">
        {/* LIVE FEED */}
        <div className="lg:col-span-3 rounded-2xl border border-border bg-white p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Live Sensor Feed</div>
            <span className="live-dot" />
          </div>
          <div className="space-y-1.5 max-h-[32rem] overflow-hidden">
            {feed.map((f, i) => (
              <div key={f.id + i} className={`animate-slide-up rounded-lg px-2.5 py-1.5 text-[11px] font-mono ${f.anomaly ? "bg-destructive/8 text-destructive border-l-2 border-destructive" : "bg-cream-bg text-primary/90 border-l-2 border-emerald/40"}`}>
                <div className="flex justify-between"><span>{f.id}</span><span>{f.t}</span></div>
                <div className="text-[10px] opacity-80">{f.coord}</div>
                <div className="text-[10px] flex justify-between">
                  <span>📱 {f.device}</span>
                  <span>v={f.v.toFixed(2)}g {f.anomaly ? "⚠" : "✓"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER: faux phone + map + alert */}
        <div className="lg:col-span-6 space-y-5">
          {/* Phone + axes */}
          <div className="rounded-2xl border border-border bg-gradient-to-br from-violet/15 via-white to-primary/10 p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">3-Axis IMU · Live Capture</div>
                <div className="text-sm font-display font-semibold">Sensor IMU-{(Math.floor(rand(10000, 99999)))} · Vande Bharat coach C5</div>
              </div>
              <span className="text-[11px] flex items-center gap-1.5 text-emerald font-semibold"><span className="live-dot" /> 200 Hz</span>
            </div>
            <div className="grid md:grid-cols-[140px_1fr] gap-4 items-center">
              {/* faux phone */}
              <div className="relative mx-auto w-[120px] h-[220px] rounded-[28px] bg-gradient-to-b from-slate-800 to-slate-900 border-4 border-slate-700 shadow-xl overflow-hidden">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-3 rounded-full bg-slate-700" />
                <div className="absolute inset-2 top-8 rounded-xl bg-gradient-to-b from-primary/30 to-emerald/20 grid place-items-center">
                  <Smartphone className="w-7 h-7 text-white animate-drone" />
                  <div className="text-[9px] text-white/80 font-mono mt-1 absolute bottom-3 left-2 right-2 text-center">accel · gyro · mag</div>
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
                </div>
              </div>
              <div className="h-44">
                <ResponsiveContainer>
                  <LineChart data={axes}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 250)" />
                    <XAxis dataKey="t" hide />
                    <YAxis tick={{ fontSize: 10 }} domain={[-3, 3]} />
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                    <Line type="monotone" dataKey="x" stroke="oklch(0.62 0.22 25)" strokeWidth={1.5} dot={false} isAnimationActive={false} />
                    <Line type="monotone" dataKey="y" stroke="oklch(0.7 0.16 165)" strokeWidth={1.5} dot={false} isAnimationActive={false} />
                    <Line type="monotone" dataKey="z" stroke="oklch(0.34 0.08 250)" strokeWidth={1.5} dot={false} isAnimationActive={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="flex gap-3 text-[11px] mt-2 justify-end">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-destructive" /> X-axis</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-emerald" /> Y-axis</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-primary" /> Z-axis</span>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">India Railway Health Heatmap</div>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald" /> Healthy</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-saffron" /> Variance</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-destructive" /> Anomaly</span>
              </div>
            </div>
            <IndiaMap
              markers={[
                { x: 200, y: 220, color: "oklch(0.62 0.22 25)", pulse: true, label: "Vadodara-Surat" },
                { x: 280, y: 310, color: "oklch(0.78 0.16 70)", label: "Itarsi" },
                { x: 340, y: 180, color: "oklch(0.7 0.16 165)" },
                { x: 380, y: 280, color: "oklch(0.7 0.16 165)" },
                { x: 130, y: 320, color: "oklch(0.7 0.16 165)" },
                { x: 220, y: 380, color: "oklch(0.7 0.16 165)" },
                { x: 300, y: 420, color: "oklch(0.78 0.16 70)" },
                { x: 250, y: 150, color: "oklch(0.7 0.16 165)" },
                { x: 180, y: 280, color: "oklch(0.7 0.16 165)" },
              ]}
            />
            <div className="mt-3 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-destructive/15 text-destructive grid place-items-center shrink-0"><AlertTriangle className="w-5 h-5" /></div>
                <div>
                  <div className="flex items-center gap-2 font-semibold text-destructive">ANOMALY DETECTED <span className="text-[10px] bg-destructive text-white px-1.5 py-0.5 rounded animate-blink">LIVE</span></div>
                  <div className="mt-1 text-xs text-foreground/80">
                    22.3°N, 73.1°E · Vadodara–Surat Corridor · 23 devices reported · Vibration spike <span className="font-mono font-bold">+340%</span> above baseline · Drone GRN-03 dispatched ✓
                  </div>
                </div>
              </div>
              <button
                onClick={() => { triggerRef.current = true; }}
                className="shrink-0 bg-destructive hover:bg-destructive/95 text-white font-bold text-[10px] uppercase tracking-wider px-3 py-2 rounded-xl transition shadow active:scale-95 flex items-center gap-1"
              >
                ⚡ Trigger Anomaly Spike
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: vector + intensity */}
        <div className="lg:col-span-3 space-y-4">
          <div className="rounded-2xl border border-border bg-white p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">AKNN Vector Space</div>
              <Zap className="w-4 h-4 text-violet" />
            </div>
            <div className="h-48">
              <ResponsiveContainer>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 250)" />
                  <XAxis type="number" dataKey="x" tick={false} axisLine={false} domain={[-40, 40]} />
                  <YAxis type="number" dataKey="y" tick={false} axisLine={false} domain={[-40, 40]} />
                  <ZAxis type="number" dataKey="z" range={[20, 120]} />
                  <Tooltip contentStyle={{ fontSize: 11 }} />
                  <Scatter data={scatter} fill="oklch(0.34 0.08 250 / 0.5)" />
                  <Scatter data={scatterAnom} fill="oklch(0.62 0.22 25)" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <div className="text-[11px] text-muted-foreground">128-dim signature · anomaly cluster isolated · cosine dist 0.87</div>
          </div>

          <div className="rounded-2xl border border-border bg-gradient-to-br from-destructive/10 to-white p-5">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Vibration Intensity</div>
              <Gauge className="w-4 h-4 text-destructive" />
            </div>
            <div className="h-28 mt-2">
              <ResponsiveContainer>
                <AreaChart data={series}>
                  <defs>
                    <linearGradient id="vib" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.62 0.22 25)" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="oklch(0.62 0.22 25)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="t" hide />
                  <YAxis hide domain={[0, 4]} />
                  <Tooltip contentStyle={{ fontSize: 11 }} />
                  <ReferenceLine y={2} stroke="oklch(0.62 0.22 25)" strokeDasharray="3 3" />
                  <Area type="monotone" dataKey="v" stroke="oklch(0.34 0.08 250)" fill="url(#vib)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="text-[10px] text-muted-foreground mt-1">Threshold 2.0g · current peak ⚠</div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-primary" /> Device Distribution</div>
            <div className="space-y-2 text-xs">
              {[
                ["Android", 68, "bg-emerald"],
                ["iOS", 27, "bg-primary"],
                ["HarmonyOS", 5, "bg-violet"],
              ].map(([n, v, c]) => (
                <div key={n as string}>
                  <div className="flex justify-between"><span>{n}</span><span className="font-mono">{v}%</span></div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full ${c as string}`} style={{ width: `${v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Track health bar */}
      <section className="mx-auto max-w-7xl px-6 mt-8">
        <div className="rounded-2xl border border-border bg-white p-5">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Track Health Score · per KM segment</div>
              <div className="text-sm font-display font-semibold">Vadodara–Surat corridor</div>
            </div>
            <span className="text-[11px] text-muted-foreground">aggregated from 12,847 sensors</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={trackKm}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 250)" />
                <XAxis dataKey="km" tick={{ fontSize: 9 }} interval={1} />
                <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Bar dataKey="health" radius={[6, 6, 0, 0]}>
                  {trackKm.map((d, i) => (
                    <Cell key={i} fill={d.health < 55 ? "oklch(0.62 0.22 25)" : d.health < 75 ? "oklch(0.78 0.16 70)" : "oklch(0.7 0.16 165)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </Shell>
  );
}
