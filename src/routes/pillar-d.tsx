import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Bot, Battery, MapPin, CheckCircle2, AlertTriangle, Download, QrCode, Cpu, Wind, Camera, Wrench } from "lucide-react";
import { Shell, PageHeader } from "@/components/netra/Shell";
import { StatCard } from "@/components/netra/Stat";
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from "recharts";

export const Route = createFileRoute("/pillar-d")({
  head: () => ({
    meta: [
      { title: "Pillar D · Garun CV Structural Auditor · NETRA-RAIL" },
      { name: "description", content: "Autonomous drone dispatch with on-device convolutional defect detection for track infrastructure." },
    ],
  }),
  component: PillarD,
});

const initialDrones = [
  { id: "GRN-03", target: "22.31°N, 73.10°E", site: "Vadodara–Surat", progress: 62, eta: "04:12", battery: 78, signal: 92, alt: 14 },
  { id: "GRN-07", target: "27.04°N, 88.26°E", site: "Siliguri–NJP", progress: 31, eta: "11:34", battery: 64, signal: 78, alt: 22 },
  { id: "GRN-11", target: "19.92°N, 75.34°E", site: "Aurangabad", progress: 88, eta: "01:08", battery: 41, signal: 86, alt: 11 },
];

const reports = [
  { section: "Vadodara–Surat KM 134", drone: "GRN-03", result: "DEFECT FOUND", time: "14:47", action: "MR #44821 generated", severity: "HIGH" },
  { section: "Howrah–Asansol KM 217", drone: "GRN-09", result: "CLEARED", time: "14:32", action: "Slow zone lifted", severity: "OK" },
  { section: "Bhopal–Itarsi KM 092", drone: "GRN-04", result: "CLEARED", time: "14:18", action: "Slow zone lifted", severity: "OK" },
  { section: "Pune–Daund KM 045", drone: "GRN-12", result: "DEFECT FOUND", time: "13:55", action: "MR #44820 generated", severity: "MED" },
];

const inspectionTrend = Array.from({ length: 14 }).map((_, i) => ({
  d: `D${i + 1}`,
  passed: 8 + Math.floor(Math.random() * 4),
  defects: Math.floor(Math.random() * 3),
}));

const componentScores = [
  { name: "Joint bar", score: 96, fill: "oklch(0.7 0.16 165)" },
  { name: "Fastener", score: 82, fill: "oklch(0.78 0.16 70)" },
  { name: "Sleeper", score: 91, fill: "oklch(0.34 0.08 250)" },
  { name: "Rail head", score: 94, fill: "oklch(0.6 0.2 295)" },
  { name: "Ballast", score: 78, fill: "oklch(0.7 0.13 195)" },
];

function PillarD() {
  const [drones, setDrones] = useState(initialDrones);
  const [activeDrone, setActiveDrone] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setDrones((d) => d.map((x) => ({
        ...x,
        progress: Math.min(100, x.progress + Math.random() * 2),
        battery: Math.max(15, x.battery - 0.2),
        signal: Math.max(60, Math.min(99, x.signal + (Math.random() - 0.5) * 3)),
      })));
    }, 1500);
    return () => clearInterval(t);
  }, []);

  const active = drones[activeDrone];
  const battData = [{ name: "b", value: active.battery, fill: active.battery > 50 ? "oklch(0.7 0.16 165)" : active.battery > 30 ? "oklch(0.78 0.16 70)" : "oklch(0.62 0.22 25)" }];

  return (
    <Shell>
      <PageHeader
        eyebrow="Pillar D"
        title="Garun CV Structural Auditor"
        description="Autonomous geo-fenced drone dispatch — convolutional inference on fasteners, joint bars and QR-tagged fittings, with auto-generated work orders."
        icon={<Bot className="w-6 h-6" />}
      />

      <section className="mx-auto max-w-7xl px-6 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Drones Active" value={3} icon={<Bot className="w-4 h-4" />} />
        <StatCard label="Inspections Today" value={12} icon={<CheckCircle2 className="w-4 h-4" />} accent="emerald" />
        <StatCard label="Defects Confirmed" value={2} icon={<AlertTriangle className="w-4 h-4" />} accent="saffron" />
        <StatCard label="Slow Zones Cleared" value={10} icon={<CheckCircle2 className="w-4 h-4" />} accent="emerald" />
        <StatCard label="On-device Inference" value={47} suffix=" ms" icon={<Cpu className="w-4 h-4" />} />
      </section>

      <section className="mx-auto max-w-7xl px-6 mt-8 grid lg:grid-cols-12 gap-5">
        {/* DRONES */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Active Drone Missions</h2>
          {drones.map((d, idx) => (
            <button key={d.id} onClick={() => setActiveDrone(idx)} className={`card-hover w-full text-left rounded-2xl border bg-white p-5 ${idx === activeDrone ? "border-primary ring-2 ring-primary/20" : "border-border"}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg gradient-bio grid place-items-center text-white animate-drone shadow">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-display font-semibold">{d.id} <span className="text-[10px] text-muted-foreground font-normal">· {d.site}</span></div>
                    <div className="text-[11px] text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> {d.target}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-xs flex items-center gap-1 font-semibold ${d.battery > 50 ? "text-emerald" : d.battery > 30 ? "text-saffron-foreground" : "text-destructive"}`}><Battery className="w-3.5 h-3.5" /> {Math.round(d.battery)}%</div>
                  <div className="text-[10px] text-muted-foreground">📡 {Math.round(d.signal)}%</div>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-[11px] text-muted-foreground"><span>Mission</span><span className="font-mono">ETA {d.eta}</span></div>
                <div className="mt-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary via-violet to-saffron transition-all duration-700" style={{ width: `${d.progress}%` }} />
                </div>
              </div>
              <div className="mt-3 relative h-12 rounded-lg bg-gradient-to-r from-cream-bg via-white to-cream-bg border border-border overflow-hidden">
                <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-px bg-foreground/15" />
                <div className="absolute top-1/2 -translate-y-1/2 transition-all duration-700" style={{ left: `${d.progress}%` }}>
                  <Bot className="w-4 h-4 text-primary animate-drone" />
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 right-2 text-[10px] text-muted-foreground">target ▶</div>
              </div>
            </button>
          ))}

          {/* Component scores */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Component Health Scores</div>
            <div className="h-44">
              <ResponsiveContainer>
                <BarChart data={componentScores} layout="vertical">
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={70} />
                  <Tooltip contentStyle={{ fontSize: 11 }} />
                  <Bar dataKey="score" radius={[0, 6, 6, 0]}>
                    {componentScores.map((c, i) => <Cell key={i} fill={c.fill} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* CAM FEED + telemetry */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Live Inspection Feed</h2>
          <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-md">
            <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-slate-900 to-slate-800 text-white border-b border-border">
              <div className="text-xs font-semibold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-rose animate-pulse" /> DRONE CAM · {active.id}</div>
              <div className="text-[11px] font-mono text-white/80">{active.target} · alt {active.alt}m</div>
            </div>
            <div className="relative aspect-[16/10] bg-gradient-to-b from-[#dfe7ef] to-[#cbd5e1] overflow-hidden">
              {/* scan line */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald to-transparent animate-scan" />
              {/* track ballast */}
              <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-b from-[#a8a29e]/40 to-[#78716c]/60" />
              {/* rails */}
              <div className="absolute left-[18%] top-[18%] bottom-0 w-2 bg-[#475569]" style={{ transform: "perspective(400px) rotateX(40deg)" }} />
              <div className="absolute right-[18%] top-[18%] bottom-0 w-2 bg-[#475569]" style={{ transform: "perspective(400px) rotateX(40deg)" }} />
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="absolute left-[12%] right-[12%] h-2 bg-[#57534e]/80 rounded-sm" style={{ top: `${28 + i * 9}%` }} />
              ))}
              {/* HUD corners */}
              {[0, 1, 2, 3].map((c) => (
                <div key={c} className={`absolute w-5 h-5 border-emerald ${c === 0 ? "top-2 left-2 border-l-2 border-t-2" : c === 1 ? "top-2 right-2 border-r-2 border-t-2" : c === 2 ? "bottom-2 left-2 border-l-2 border-b-2" : "bottom-2 right-2 border-r-2 border-b-2"}`} />
              ))}
              {/* bounding boxes */}
              <div className="absolute top-[40%] left-[22%] w-10 h-7 border-2 border-emerald rounded-md text-[9px] text-emerald font-bold bg-emerald/10 grid place-items-end">
                <span className="bg-white px-1 rounded-sm">JOINT BAR · OK ✓</span>
              </div>
              <div className="absolute top-[58%] right-[26%] w-12 h-8 border-2 border-destructive rounded-md text-[9px] text-destructive font-bold bg-destructive/10 grid place-items-end animate-pulse">
                <span className="bg-white px-1 rounded-sm">LOOSE FASTENER ⚠</span>
              </div>
              <div className="absolute bottom-[14%] left-[44%] w-10 h-10 border-2 border-saffron rounded-md text-[9px] text-saffron-foreground font-bold bg-saffron/15 grid place-items-end">
                <span className="bg-white px-1 rounded-sm flex items-center gap-0.5"><QrCode className="w-2.5 h-2.5" /> #TF-44821</span>
              </div>
              <div className="absolute top-[30%] right-[40%] w-8 h-8 border-2 border-violet rounded-full text-[9px] text-violet font-bold grid place-items-end">
                <span className="bg-white px-1 rounded-sm">SLEEPER</span>
              </div>
              <div className="absolute top-2 right-2 text-[10px] font-mono bg-rose/90 text-white px-2 py-0.5 rounded animate-pulse">● REC</div>
              <div className="absolute bottom-2 left-2 text-[11px] font-bold bg-white/95 px-2 py-1 rounded">Confidence: 97.3%</div>
              <div className="absolute bottom-2 right-2 text-[10px] font-mono bg-black/60 text-white px-2 py-0.5 rounded">FPS 60 · 4K</div>
            </div>
            {/* Telemetry strip */}
            <div className="grid grid-cols-4 gap-px bg-border">
              {[
                { l: "ALT", v: `${active.alt}m`, i: Wind },
                { l: "BATT", v: `${Math.round(active.battery)}%`, i: Battery },
                { l: "SIG", v: `${Math.round(active.signal)}%`, i: Cpu },
                { l: "CAM", v: "4K·60", i: Camera },
              ].map((x) => (
                <div key={x.l} className="bg-white px-3 py-2 flex items-center gap-2">
                  <x.i className="w-3.5 h-3.5 text-primary" />
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{x.l}</div>
                    <div className="text-xs font-mono font-bold">{x.v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Battery radial + inspection trend */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border bg-white p-5">
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Battery · {active.id}</div>
              <div className="h-40 relative">
                <ResponsiveContainer>
                  <RadialBarChart innerRadius="65%" outerRadius="100%" data={battData} startAngle={90} endAngle={-270}>
                    <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                    <RadialBar dataKey="value" cornerRadius={20} background={{ fill: "oklch(0.95 0.02 80)" }} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <div className="text-2xl font-display font-bold">{Math.round(active.battery)}%</div>
                    <div className="text-[10px] uppercase text-muted-foreground">{Math.round(active.battery * 0.6)} min left</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-white p-5">
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Inspections · 14 days</div>
              <div className="h-40">
                <ResponsiveContainer>
                  <BarChart data={inspectionTrend} stackOffset="sign">
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 250)" />
                    <XAxis dataKey="d" tick={{ fontSize: 9 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip contentStyle={{ fontSize: 11 }} />
                    <Bar dataKey="passed" stackId="a" fill="oklch(0.7 0.16 165)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="defects" stackId="a" fill="oklch(0.62 0.22 25)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* REPORTS + Maintenance */}
        <div className="lg:col-span-3 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Inspection Reports</h2>
          <div className="space-y-3">
            {reports.map((r, i) => (
              <div key={i} className="rounded-2xl border border-border bg-white p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">{r.section}</div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${r.result === "CLEARED" ? "bg-emerald/10 text-emerald" : r.severity === "HIGH" ? "bg-destructive text-white" : "bg-saffron/15 text-saffron-foreground"}`}>
                    {r.result}
                  </span>
                </div>
                <div className="text-[11px] text-muted-foreground mt-1">{r.drone} · {r.time}</div>
                <div className="mt-2 text-xs bg-cream-bg rounded-md px-2 py-1 text-foreground/80 flex items-center gap-1.5">
                  <Wrench className="w-3 h-3 text-primary" /> {r.action}
                </div>
                <button className="mt-3 inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline">
                  <Download className="w-3.5 h-3.5" /> Download report
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Shell>
  );
}
