import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TrainTrack as TrainTrackIcon, Cpu, AlertTriangle, CheckCircle2, Zap, GitBranch, Gauge, Brain, Sigma } from "lucide-react";
import { Shell, PageHeader } from "@/components/netra/Shell";
import { StatCard } from "@/components/netra/Stat";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

export const Route = createFileRoute("/pillar-b")({
  head: () => ({
    meta: [
      { title: "Pillar B · Section Throughput Maximiser · NETRA-RAIL" },
      { name: "description", content: "LLM-driven dynamic heuristics for real-time mixed-speed precedence and loop-line allocation." },
    ],
  }),
  component: PillarB,
});

type Train = { id: string; type: "VB" | "FRT" | "EXP"; x: number; speed: number; lane: 0 | 1 | 2; color: string };

const initialTrains: Train[] = [
  { id: "VB-12", type: "VB", x: 5, speed: 0.9, lane: 0, color: "bg-primary" },
  { id: "VB-08", type: "VB", x: 60, speed: 1.0, lane: 0, color: "bg-primary" },
  { id: "EXP-22", type: "EXP", x: 35, speed: 0.7, lane: 0, color: "bg-violet" },
  { id: "MG-447", type: "FRT", x: 30, speed: 0.35, lane: 1, color: "bg-saffron text-saffron-foreground" },
  { id: "MG-501", type: "FRT", x: 80, speed: 0.4, lane: 1, color: "bg-saffron text-saffron-foreground" },
  { id: "MG-388", type: "FRT", x: 12, speed: 0.32, lane: 1, color: "bg-saffron text-saffron-foreground" },
  { id: "LOC-71", type: "FRT", x: 50, speed: 0.28, lane: 2, color: "bg-emerald text-emerald-foreground" },
  { id: "LOC-92", type: "FRT", x: 88, speed: 0.3, lane: 2, color: "bg-emerald text-emerald-foreground" },
];

const initialLogs = [
  "Generated Heuristic #2847 — Throughput +3.2%",
  "Evolutionary Crossover Applied — Iteration 4",
  "Convergence Check: PASSED ✓",
  "Precedence override: VB-12 priority pass",
];

const slowZones = [
  { section: "Vadodara–Surat KM 134", trigger: "Pillar C anomaly", limit: "45 km/h", active: true, age: "08:12" },
  { section: "Itarsi–Bhopal KM 092", trigger: "Pillar C anomaly", limit: "60 km/h", active: false, age: "01:24:00" },
  { section: "Howrah–Asansol KM 217", trigger: "Maintenance", limit: "30 km/h", active: true, age: "23:45" },
];

const radarData = [
  { k: "Throughput", v: 94 },
  { k: "Punctuality", v: 91 },
  { k: "Fuel", v: 86 },
  { k: "Safety", v: 98 },
  { k: "Capacity", v: 88 },
  { k: "Optimality", v: 97 },
];

const sections = [
  { n: "Section 1 · Vadodara–Surat", load: 88, status: "OPTIMAL" },
  { n: "Section 2 · Surat–Mumbai", load: 73, status: "OPTIMAL" },
  { n: "Section 3 · Itarsi–Bhopal", load: 62, status: "SLOW ZONE" },
  { n: "Section 4 · Bhopal–Jhansi", load: 91, status: "PEAK" },
  { n: "Section 5 · Jhansi–Agra", load: 56, status: "OPTIMAL" },
  { n: "Section 6 · Howrah–Asansol", load: 79, status: "SLOW ZONE" },
];

function PillarB() {
  const [trains, setTrains] = useState(initialTrains);
  const [logs, setLogs] = useState(initialLogs);
  const [slowZonesList, setSlowZonesList] = useState(slowZones);
  const [overrideActive, setOverrideActive] = useState(false);
  const [isAnomalyActive, setIsAnomalyActive] = useState(false);
  const [series, setSeries] = useState(
    Array.from({ length: 30 }).map((_, i) => ({ t: i, throughput: 67 + Math.random() * 8 + i * 1.1, baseline: 70 + Math.random() * 4 })),
  );

  useEffect(() => {
    const t = setInterval(() => {
      setTrains((arr) =>
        arr.map((tr) => {
          let nextX = tr.x + tr.speed * (isAnomalyActive ? 0.22 : 1.0);
          
          // Precedence overtaking logic
          let nextLane = tr.lane;
          if (overrideActive) {
            // Divert EXP-22 to Loop Line A (lane 1) if VB-12 is approaching
            if (tr.id === "EXP-22") {
              nextLane = 1;
            }
          } else {
            // Restore EXP-22 to Main Line (lane 0)
            if (tr.id === "EXP-22") {
              nextLane = 0;
            }
          }
          
          return { ...tr, x: (nextX) % 100, lane: nextLane };
        })
      );
    }, 80);
    return () => clearInterval(t);
  }, [overrideActive, isAnomalyActive]);

  const handlePrecedenceOverride = () => {
    if (overrideActive) return;
    setOverrideActive(true);
    setLogs((l) => [
      `[JSSP OVERRIDE] VB-12 precedence flag active. EXP-22 routed to Loop Line A.`,
      ...l
    ].slice(0, 9));
    
    setTimeout(() => {
      setOverrideActive(false);
      setLogs((l) => [
        `[JSSP RESOLVED] VB-12 overtaking maneuver complete. EXP-22 returned to corridor.`,
        ...l
      ].slice(0, 9));
    }, 7000);
  };

  const handleSimulateAnomaly = () => {
    if (isAnomalyActive) return;
    setIsAnomalyActive(true);
    
    // Set Vadodara-Surat slow zone to active
    setSlowZonesList(prev => prev.map((s, idx) => idx === 0 ? { ...s, active: true } : s));
    
    setLogs((l) => [
      `[IMU TELEMETRY] ⚠️ High vertical G-spike flagged at Vadodara–Surat KM 134!`,
      `[FLYWHEEL SYSTEM] Applying temporary slow zone (45 km/h limit) on active corridor.`,
      ...l
    ].slice(0, 9));

    // Phase 2: Dispatch Drone (after 2.5s)
    setTimeout(() => {
      setLogs((l) => [
        `[GARUN CV AUDITOR] 🛸 Drone GRN-03 dispatched for real-time video verification.`,
        `[GARUN CV AUDITOR] CNN checks: Fasteners [SECURE], joint bars [NORMAL], path cleared.`,
        ...l
      ].slice(0, 9));
    }, 2500);

    // Phase 3: Clear Slow Zone (after 6.5s)
    setTimeout(() => {
      setIsAnomalyActive(false);
      setSlowZonesList(prev => prev.map((s, idx) => idx === 0 ? { ...s, active: false } : s));
      setLogs((l) => [
        `[FLYWHEEL SYSTEM] ✅ Inspection complete. Tracks cleared. Corridor speed restored!`,
        ...l
      ].slice(0, 9));
    }, 6500);
  };

  useEffect(() => {
    const t = setInterval(() => {
      const heuristics = [
        `Heuristic #${2848 + Math.floor(Math.random() * 200)} — Throughput +${(Math.random() * 2 + 1).toFixed(1)}%`,
        `Loop-line allocation: FRT-${400 + Math.floor(Math.random() * 200)} → Loop ${1 + Math.floor(Math.random() * 4)}`,
        `Mutation operator applied — fitness improved`,
        `VB priority pass issued — section ${5 + Math.floor(Math.random() * 8)}`,
        `Convergence Check: PASSED ✓`,
        `JSSP solver: makespan reduced by ${(Math.random() * 4 + 1).toFixed(1)} min`,
      ];
      // Only inject generic logs if no interactive sequences are overriding them rapidly
      setLogs((l) => [heuristics[Math.floor(Math.random() * heuristics.length)], ...l].slice(0, 9));
      setSeries((s) => [...s.slice(1), { t: s[s.length - 1].t + 1, throughput: 88 + Math.random() * 8, baseline: 72 + Math.random() * 3 }]);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <Shell>
      <PageHeader
        eyebrow="Pillar B"
        title="Real-Time Section Throughput Maximiser"
        description="Models the rail corridor as a dynamic JSSP. LLM-driven heuristics compute sub-second precedence and loop-line decisions with formal convergence guarantees."
        icon={<TrainTrackIcon className="w-6 h-6" />}
      />

      <section className="mx-auto max-w-7xl px-6 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Section Throughput" value={94} suffix="trains/hr" icon={<Zap className="w-4 h-4" />} accent="emerald" />
        <StatCard label="Precedence Overrides" value={12} icon={<Cpu className="w-4 h-4" />} accent="saffron" />
        <StatCard label="Loop Lines Occupied" value={8} suffix="/ 24" icon={<TrainTrackIcon className="w-4 h-4" />} />
        <StatCard label="Optimality Score" value={97} suffix=".2%" icon={<CheckCircle2 className="w-4 h-4" />} accent="emerald" />
        <StatCard label="Avg Decision Time" value={812} suffix=" ms" icon={<Gauge className="w-4 h-4" />} accent="saffron" />
      </section>

      <section className="mx-auto max-w-7xl px-6 mt-8 grid lg:grid-cols-12 gap-5">
        {/* LEFT: heuristic engine + radar */}
        <div className="lg:col-span-3 space-y-4">
          <div className="rounded-2xl border border-border bg-gradient-to-br from-saffron/15 to-white p-5">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5"><Brain className="w-3.5 h-3.5 text-saffron-foreground" /> LLM Heuristic Engine</div>
              <span className="text-[11px] flex items-center gap-1.5 text-emerald font-semibold"><span className="live-dot" /> ACTIVE</span>
            </div>
            <div className="mt-4 space-y-1.5 max-h-72 overflow-hidden">
              {logs.map((l, i) => (
                <div key={i} className="animate-slide-up text-[11px] font-mono text-foreground/85 border-l-2 border-saffron pl-2">
                  <span className="text-muted-foreground">{new Date().toLocaleTimeString("en-IN", { hour12: false })}</span> {l}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-5">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Multi-objective Score</div>
              <Sigma className="w-4 h-4 text-primary" />
            </div>
            <div className="h-48 mt-1">
              <ResponsiveContainer>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="oklch(0.92 0.01 250)" />
                  <PolarAngleAxis dataKey="k" tick={{ fontSize: 9 }} />
                  <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                  <Radar dataKey="v" stroke="oklch(0.34 0.08 250)" fill="oklch(0.6 0.2 295 / 0.35)" strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* CENTER: corridor sim - 3 lanes */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-gradient-to-b from-white to-cream-bg p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Live Corridor Simulation</div>
              <div className="text-sm font-display font-semibold">Western Dedicated Freight Corridor · KM 100–250</div>
            </div>
            <span className="text-[11px] self-start sm:self-center flex items-center gap-1.5 text-emerald font-semibold"><span className="live-dot" /> LIVE</span>
          </div>

          {/* Interactive controls bar */}
          <div className="flex flex-wrap gap-2 mb-4 p-2 bg-muted/40 rounded-xl border border-border/50">
            <button
              onClick={handlePrecedenceOverride}
              disabled={overrideActive}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                overrideActive
                  ? "bg-saffron/20 text-saffron-foreground border border-saffron/30 cursor-not-allowed"
                  : "bg-primary text-white hover:bg-primary/90 shadow-sm"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              {overrideActive ? "JSSP Priority Active..." : "⚡ Trigger JSSP Override"}
            </button>
            <button
              onClick={handleSimulateAnomaly}
              disabled={isAnomalyActive}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                isAnomalyActive
                  ? "bg-destructive/20 text-destructive border border-destructive/30 cursor-not-allowed"
                  : "bg-destructive text-white hover:bg-destructive/95 shadow-sm"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              {isAnomalyActive ? "Closed-Loop Running..." : "⚠️ Simulate IMU Anomaly"}
            </button>
          </div>

          <CorridorLane label="MAIN LINE · UP" trains={trains.filter((t) => t.lane === 0)} />
          <CorridorJunction />
          <CorridorLane label="LOOP LINE A" trains={trains.filter((t) => t.lane === 1)} />
          <CorridorJunction reverse />
          <CorridorLane label="LOOP LINE B" trains={trains.filter((t) => t.lane === 2)} />

          <div className="mt-5 grid sm:grid-cols-2 gap-3">
            <div className={`rounded-xl border p-3 text-sm flex items-start gap-3 transition-all ${overrideActive ? "bg-saffron/10 border-saffron/40" : "bg-saffron/5 border-saffron/20"}`}>
              <AlertTriangle className="w-4 h-4 text-saffron-foreground mt-0.5" />
              <div>
                <div className="font-semibold text-saffron-foreground">FRT #EXP-22 → LOOP LINE A</div>
                <div className="text-muted-foreground text-xs">VB #VB-12 priority pass · clearance 3.4s · delay avoided: 11 min</div>
              </div>
            </div>
            <div className="rounded-xl bg-emerald/10 border border-emerald/30 p-3 text-sm flex items-start gap-3">
              <GitBranch className="w-4 h-4 text-emerald mt-0.5" />
              <div>
                <div className="font-semibold text-emerald">JSSP Solver · iteration #4827</div>
                <div className="text-muted-foreground text-xs">Makespan reduced 6.2 min · 0 conflicts · convergence ✓</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: slow zones */}
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-border bg-white p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">Slow Zone Alerts</div>
            <div className="space-y-3">
              {slowZonesList.map((s) => (
                <div key={s.section} className={`rounded-xl border p-3 ${s.active ? "border-destructive/30 bg-destructive/5" : "border-emerald/30 bg-emerald/5"}`}>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold">{s.section}</div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${s.active ? "bg-destructive text-white" : "bg-emerald text-white"}`}>
                      {s.active ? "● ACTIVE" : "● CLEARED"}
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div>Trigger: <span className="text-foreground">{s.trigger}</span></div>
                    <div>Limit: <span className="text-foreground font-mono">{s.limit}</span></div>
                    <div>Age: <span className="text-foreground font-mono">{s.age}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-border bg-white p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Section Load · live</div>
            <div className="mt-3 space-y-2">
              {sections.map((s) => (
                <div key={s.n}>
                  <div className="flex justify-between text-[11px]">
                    <span className="truncate">{s.n}</span>
                    <span className={`font-mono ${s.status === "SLOW ZONE" ? "text-destructive" : s.status === "PEAK" ? "text-saffron-foreground" : "text-emerald"}`}>{s.load}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full transition-all duration-700 ${s.status === "SLOW ZONE" ? "bg-destructive/70" : s.status === "PEAK" ? "bg-saffron" : "bg-emerald"}`} style={{ width: `${s.load}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THROUGHPUT GRAPH */}
      <section className="mx-auto max-w-7xl px-6 mt-8 grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-white p-5">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Throughput · NETRA-RAIL vs Baseline</div>
              <div className="text-sm font-display font-semibold">trains / hour · 60 min window</div>
            </div>
            <div className="flex gap-3 text-[11px]">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-primary" /> NETRA-RAIL</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-muted-foreground/40" /> Baseline</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={series}>
                <defs>
                  <linearGradient id="th1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.34 0.08 250)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.34 0.08 250)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="t" hide />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Area type="monotone" dataKey="throughput" stroke="oklch(0.34 0.08 250)" fill="url(#th1)" strokeWidth={2.5} />
                <Line type="monotone" dataKey="baseline" stroke="oklch(0.5 0.02 250)" strokeDasharray="4 4" strokeWidth={1.5} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-white to-saffron/10 p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">JSSP Solver</div>
          <div className="mt-3 text-4xl font-display font-bold gradient-brand">4,827</div>
          <div className="text-xs text-muted-foreground">iterations / minute</div>
          <div className="mt-4 space-y-2 text-xs">
            {[
              ["Population", "256"],
              ["Crossover rate", "0.85"],
              ["Mutation rate", "0.07"],
              ["Fitness Δ", "+12.6%"],
              ["Convergence", "PASSED ✓"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-border/60 pb-1.5">
                <span className="text-muted-foreground">{k}</span>
                <span className="font-mono font-semibold">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Shell>
  );
}

function CorridorLane({ label, trains }: { label: string; trains: Train[] }) {
  return (
    <div>
      <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">
        <span>{label}</span>
        <span>{trains.length} train(s)</span>
      </div>
      <div className="relative h-12 rounded-lg bg-white border border-border overflow-hidden">
        <div className="absolute inset-x-2 top-[40%] h-px bg-foreground/15" />
        <div className="absolute inset-x-2 top-[60%] h-px bg-foreground/15" />
        {/* sleepers */}
        <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-3 track-bg opacity-60" />
        {/* KM markers */}
        {[0, 25, 50, 75, 100].map((k) => (
          <div key={k} className="absolute top-1 text-[8px] font-mono text-muted-foreground" style={{ left: `${k}%` }}>{100 + k * 1.5}</div>
        ))}
        {trains.map((t) => (
          <div
            key={t.id}
            className="absolute top-1/2 -translate-y-1/2 transition-all duration-75 ease-linear"
            style={{ left: `${t.x}%` }}
          >
            <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold text-white shadow ${t.color}`}>
              <TrainTrackIcon className="w-3 h-3" />
              {t.id}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CorridorJunction({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="my-2 h-3 relative">
      <svg viewBox="0 0 800 30" className="w-full h-full">
        <path
          d={reverse ? "M150 30 Q 250 15 350 15 L 450 15 Q 550 15 650 30" : "M150 0 Q 250 15 350 15 L 450 15 Q 550 15 650 0"}
          stroke="oklch(0.34 0.08 250 / 0.4)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4 3"
        />
      </svg>
    </div>
  );
}
