import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Ship, TrainTrack as TrainTrackIcon, Smartphone, Bot, Zap, ArrowRight, Play, RotateCcw, Cpu, ShieldAlert, Sparkles, Terminal } from "lucide-react";
import { Shell, PageHeader } from "@/components/netra/Shell";

export const Route = createFileRoute("/flywheel")({
  head: () => ({
    meta: [
      { title: "The Flywheel · NETRA-RAIL" },
      { name: "description", content: "The closed-loop autonomous chain connecting all four NETRA-RAIL pillars in real time." },
    ],
  }),
  component: Flywheel,
});

type LogEntry = { p: string; s: string; c: string; t: string; detail?: string };

const seedLogs: LogEntry[] = [
  { p: "A", s: "Vessel MV Himalaya ETA updated: 14:45", c: "oklch(0.34 0.08 250)", t: "10:30:15", detail: "Mundra Port Manifest parsed. Adapting SIH24 logistics engine..." },
  { p: "A", s: "Freight dispatch queue recalculated", c: "oklch(0.34 0.08 250)", t: "10:30:18", detail: "Optimized wagon queue updated. Idle dwell time projection: 0 min." },
  { p: "B", s: "Section 7 precedence override issued", c: "oklch(0.78 0.16 70)", t: "10:30:25", detail: "JSSP Solver: Side-tracked FRT-2241. VB-12 precedence active." },
  { p: "C", s: "Anomaly flagged at 22.3°N 73.1°E", c: "oklch(0.6 0.2 295)", t: "10:30:40", detail: "AKNN Vector Index: isolated 128-dim cluster. Cosine dist: 0.87." },
  { p: "B", s: "Slow zone enforced — Section 7", c: "oklch(0.78 0.16 70)", t: "10:30:42", detail: "Corridor Segment speed restriction set: 45 km/h limit." },
  { p: "D", s: "Drone GRN-03 dispatched", c: "oklch(0.7 0.16 165)", t: "10:30:45", detail: "Garun CV system: target acquired. Drone ETA on coordinates: 4 min." },
  { p: "D", s: "Track cleared — report uploaded", c: "oklch(0.7 0.16 165)", t: "10:31:12", detail: "Convolutional inference: joint bars OK. Fastener fixed." },
  { p: "B", s: "Slow zone lifted — Section 7", c: "oklch(0.78 0.16 70)", t: "10:31:15", detail: "Throughput metrics restored. Makespan efficiency: +12.6%." },
];

function ts() {
  return new Date().toLocaleTimeString("en-IN", { hour12: false });
}

function Flywheel() {
  const [mode, setMode] = useState<"auto" | "interactive">("interactive");
  const [activeStep, setActiveStep] = useState<number>(0);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [phase, setPhase] = useState(0);
  const [diagText, setDiagText] = useState("System standby. Choose Auto or Interactive to start.");

  // Auto-running simulation mode
  useEffect(() => {
    if (mode !== "auto") return;
    const t = setInterval(() => {
      const idx = Math.floor(Math.random() * seedLogs.length);
      const next = seedLogs[idx];
      setLog((l) => [{ ...next, t: ts() }, ...l].slice(0, 12));
      setPhase((p) => (p + 1) % 4);
      setDiagText(`[AUTO-PILOT] ${next.detail || next.s}`);
    }, 2500);
    return () => clearInterval(t);
  }, [mode]);

  // Set initial logs on load
  useEffect(() => {
    setLog(seedLogs.map((s, i) => ({ ...s, t: s.t })));
  }, []);

  const nodes = [
    { id: "A", icon: Ship, label: "Pillar A", sub: "Logistics", color: "oklch(0.34 0.08 250)" },
    { id: "B", icon: TrainTrackIcon, label: "Pillar B", sub: "Traffic", color: "oklch(0.78 0.16 70)" },
    { id: "C", icon: Smartphone, label: "Pillar C", sub: "Telemetry", color: "oklch(0.6 0.2 295)" },
    { id: "D", icon: Bot, label: "Pillar D", sub: "Drones", color: "oklch(0.7 0.16 165)" },
  ];

  const stepsData = [
    {
      pillar: "A",
      title: "Vessel Arrival & Queue Optimization",
      desc: "Vessel MV Himalaya docks at Mundra Port carrying 48,200 tonnes of raw iron ore. The RL routing optimizer ingests shipping parameters to calculate optimal wagon dispatches.",
      actionText: "Trigger Vessel Ingestion (Pillar A)",
      diagnostic: "Initializing Multimodal Logistics Synchroniser... Running Post-adapted RL queues. Minimizing demurrage costs across 14 connected manufacturing nodes...",
      log: { p: "A", s: "MV Himalaya dock manifest parsed - 48,200T ore", c: "oklch(0.34 0.08 250)" },
    },
    {
      pillar: "B",
      title: "Mixed-Speed Traffic Dispatch",
      desc: "The freight train enters the mainline corridor. The dynamic Job Shop Scheduling (JSSP) solver computes sub-second precedence variables, side-tracking the freight to let high-speed Vande Bharat pass.",
      actionText: "Recalculate Traffic Precedence (Pillar B)",
      diagnostic: "JSSP Solver executing. Multi-stage LLM heuristic optimization running with diversity elitism. Precedence set: side-track FRT-2241 on Loop Line A.",
      log: { p: "B", s: "Precedence override: side-tracked FRT-2241 for VB-12", c: "oklch(0.78 0.16 70)" },
    },
    {
      pillar: "C",
      title: "Passenger Phone Vibration Flag",
      desc: "3-axis IMU streams from passenger smartphones detect abnormal vibrations at coordinates 22.31°N, 73.10°E. AKNN vector index flags coordinates with mathematically certified query bounds.",
      actionText: "Ingest Passenger Telemetry (Pillar C)",
      diagnostic: "Streaming 200Hz accelerometer inputs. Performing dimensionality reduction via Sparse Johnson-Lindenstrauss. Cosine distance trigger: 0.89 anomaly cluster isolated.",
      log: { p: "C", s: "Track Anomaly isolated at GPS 22.31°N, 73.10°E", c: "oklch(0.6 0.2 295)" },
    },
    {
      pillar: "B",
      title: "Slow-Zone Enforcement & Dispatch",
      desc: "Pillar B intercepts the anomaly flag and automatically issues a 45 km/h slow-zone warning to all approaching trains, while simultaneously triggering drone deployment.",
      actionText: "Enforce Slow-Zone & Trigger Drone (Pillar B → D)",
      diagnostic: "Slow-zone speed restriction set for Section 7 Vadodara-Surat. Speed ceiling restricted to 45km/h. Launching automated drone GRN-03 command.",
      log: { p: "B", s: "Slow-zone enforced (45 km/h) on Section 7 segment", c: "oklch(0.78 0.16 70)" },
    },
    {
      pillar: "D",
      title: "Garun CV Drone Infrastructure Audit",
      desc: "Drone GRN-03 launches autonomously. Real-time convolutional inspection scans QR codes and identifies a loose fastening bracket. Crew dispatches, fixes component, drone reports clearance.",
      actionText: "Verify Track Clearance (Pillar D)",
      diagnostic: "Drone camera active. Scanning QR code #TF-44821. Convolutional layer output: loose fastener confirmed. Local crew repair verified. Uploading track clearance report...",
      log: { p: "D", s: "Defect repaired. Drone GRN-03 uploads clean report", c: "oklch(0.7 0.16 165)" },
    },
    {
      pillar: "B",
      title: "Closed-Loop Recovery",
      desc: "Pillar D's verification report satisfies the safety protocols. The slow-zone restriction is automatically lifted. Train throughput capacity returns to the 94 trains/hour ceiling.",
      actionText: "Restore Normal Throughput (System Recovery)",
      diagnostic: "Clearance report authenticated. Lifting speed restrictions on Section 7. Restoring makespan calculations. Throughput stabilized at 94 trains/hr. Cycle Complete.",
      log: { p: "System", s: "Slow-zone lifted. Mainline traffic capacity restored", c: "oklch(0.7 0.16 165)" },
    },
  ];

  const triggerNextStep = () => {
    if (activeStep >= stepsData.length) return;
    const step = stepsData[activeStep];
    const newLogEntry: LogEntry = {
      p: step.pillar,
      s: step.log.s,
      c: step.log.c,
      t: ts(),
      detail: step.diagnostic,
    };
    setLog((l) => [newLogEntry, ...l]);
    setDiagText(`[DIAGNOSTIC] ${step.diagnostic}`);

    // Map step to node phase indicator
    if (step.pillar === "A") setPhase(0);
    else if (step.pillar === "B") setPhase(1);
    else if (step.pillar === "C") setPhase(2);
    else if (step.pillar === "D") setPhase(3);

    setActiveStep((s) => s + 1);
  };

  const resetSimulation = () => {
    setActiveStep(0);
    setLog([]);
    setPhase(0);
    setDiagText("System reset. Awaiting step 1 parameters.");
  };

  return (
    <Shell>
      <PageHeader
        eyebrow="System Overview"
        title="The Autonomous Flywheel Dashboard"
        description="Four pillars. One closed loop. Interact with the live simulation to demonstrate the self-healing operations logic."
        icon={<Zap className="w-6 h-6 text-primary" />}
      />

      {/* Simulator Mode Switcher */}
      <section className="mx-auto max-w-7xl px-6 mb-6">
        <div className="flex items-center justify-between p-4 rounded-2xl border border-border bg-white shadow-sm">
          <div>
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Simulation Control Mode</span>
            <div className="text-sm font-bold mt-0.5">
              {mode === "auto" ? "🤖 Autonomous Playback (Continuous logs)" : "🎮 Interactive Presentation (Step-by-step clickthrough)"}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-slate-100 p-1 rounded-xl border border-border">
              <button
                onClick={() => { setMode("auto"); resetSimulation(); }}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${mode === "auto" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"}`}
              >
                Auto-Run
              </button>
              <button
                onClick={() => { setMode("interactive"); resetSimulation(); }}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${mode === "interactive" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"}`}
              >
                Interactive
              </button>
            </div>
            {mode === "interactive" && (
              <button onClick={resetSimulation} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition border border-border" title="Reset presentation">
                <RotateCcw className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Autonomous loop visualization */}
        <div className="lg:col-span-5 relative aspect-square w-full max-w-[480px] mx-auto bg-white/50 rounded-3xl p-4 border border-border shadow-sm">
          <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="ringg" x1="0" x2="1">
                <stop offset="0%" stopColor="oklch(0.34 0.08 250)" />
                <stop offset="33%" stopColor="oklch(0.78 0.16 70)" />
                <stop offset="66%" stopColor="oklch(0.6 0.2 295)" />
                <stop offset="100%" stopColor="oklch(0.7 0.16 165)" />
              </linearGradient>
              <marker id="arrow2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0 0 L10 5 L0 10 z" fill="oklch(0.6 0.2 295)" />
              </marker>
            </defs>
            <circle cx="200" cy="200" r="160" fill="none" stroke="oklch(0.34 0.08 250 / 0.15)" strokeDasharray="2 6" />
            <circle cx="200" cy="200" r="150" fill="none" stroke="url(#ringg)" strokeDasharray="10 10" className="animate-dash" strokeWidth={2.5} markerEnd="url(#arrow2)" />
            <circle cx="200" cy="200" r="68" fill="white" stroke="oklch(0.34 0.08 250 / 0.3)" strokeWidth={1.5} />
            <text x="200" y="190" textAnchor="middle" fontSize="13" fontWeight="800" fill="oklch(0.34 0.08 250)">NETRA-RAIL</text>
            <text x="200" y="206" textAnchor="middle" fontSize="9" fill="oklch(0.5 0.02 250)">AUTONOMOUS CORE</text>
            <text x="200" y="220" textAnchor="middle" fontSize="8" fill="oklch(0.7 0.16 165)" fontWeight="700">● {mode === "auto" ? "AUTO-RUNNING" : "STANDBY"}</text>
            <circle cx="200" cy="200" r="68" fill="none" stroke="oklch(0.7 0.16 165)" strokeWidth="2">
              <animate attributeName="r" from="60" to="90" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.7" to="0" dur="2.4s" repeatCount="indefinite" />
            </circle>
            {/* connecting lines */}
            {nodes.map((_, i) => {
              const a = (i / 4) * Math.PI * 2 - Math.PI / 2;
              const x = 200 + Math.cos(a) * 150;
              const y = 200 + Math.sin(a) * 150;
              return <line key={i} x1="200" y1="200" x2={x} y2={y} stroke="oklch(0.34 0.08 250 / 0.15)" strokeDasharray="3 4" />;
            })}
          </svg>
          {nodes.map((n, i) => {
            const angle = (i / 4) * Math.PI * 2 - Math.PI / 2;
            const x = 50 + Math.cos(angle) * 38;
            const y = 50 + Math.sin(angle) * 38;
            const Icon = n.icon;
            const active = phase === i;
            return (
              <div key={n.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
                <div className={`card-hover w-28 h-28 rounded-2xl bg-white border shadow-md flex flex-col items-center justify-center gap-1 transition-all ${active ? "scale-110 shadow-lg border-primary" : "border-border"}`} style={{ boxShadow: `0 0 0 ${active ? 8 : 4}px ${n.color}25` }}>
                  <div className="w-10 h-10 rounded-xl grid place-items-center" style={{ background: `${n.color}18`, color: n.color }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-[12px] font-display font-bold">{n.label}</div>
                  <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{n.sub}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT: presentation walkthrough & logs */}
        <div className="lg:col-span-7 space-y-6">
          {mode === "interactive" ? (
            <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-saffron-foreground" />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Interactive Walkthrough</h2>
              </div>

              {activeStep < stepsData.length ? (
                <div className="p-4 rounded-xl bg-cream-bg border border-border/80 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      Step {activeStep + 1} of {stepsData.length}
                    </span>
                    <span className="text-xs font-mono font-bold text-muted-foreground">Pillar {stepsData[activeStep].pillar}</span>
                  </div>
                  <h3 className="text-base font-bold text-foreground">{stepsData[activeStep].title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{stepsData[activeStep].desc}</p>
                  
                  <button
                    onClick={triggerNextStep}
                    className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition shadow-md"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    {stepsData[activeStep].actionText}
                  </button>
                </div>
              ) : (
                <div className="p-6 rounded-xl bg-emerald/5 border border-emerald/20 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald/10 text-emerald grid place-items-center mx-auto">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-emerald">Causal Flywheel Loop Complete!</h3>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    The entire sequence—from vessel arrival to track defect identification, drone auditing, and resolution—completed with zero manual intervention.
                  </p>
                  <button
                    onClick={resetSimulation}
                    className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Restart Walkthrough
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-emerald" />
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Self-Healing Diagnostic Ingestion</h2>
                </div>
                <span className="text-xs text-emerald flex items-center gap-1.5 font-bold"><span className="live-dot" /> STREAMING EVENTS</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The platform is actively listening to dynamic API inputs (vessel ETAs, IMU telemetry streams, drone CV feeds). Hover over logs to view detailed telemetry metrics.
              </p>
            </div>
          )}

          {/* Diagnostic Console Box */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-300 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-800 text-slate-400">
              <Terminal className="w-4 h-4 text-emerald" />
              <span>Diagnostic Console</span>
            </div>
            <div className="space-y-1 select-none min-h-[60px] leading-relaxed text-[11px]">
              <span className="text-emerald font-bold">&gt; </span>
              {diagText}
            </div>
          </div>

          {/* Dynamic Event Log */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Flywheel Logs</h2>
              <span className="text-[10px] text-muted-foreground">Last {log.length} records</span>
            </div>
            <div className="rounded-2xl border border-border bg-white p-4 max-h-[320px] overflow-y-auto space-y-2">
              {log.length > 0 ? (
                log.map((e, i) => (
                  <div key={i} className="animate-slide-up border-b last:border-0 border-slate-100 py-2.5 flex items-start gap-3 text-xs">
                    <span className="font-mono text-slate-400 w-16 shrink-0">{e.t}</span>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded text-white shrink-0" style={{ background: e.c }}>{e.p}</span>
                    <div className="flex-1">
                      <span className="text-foreground/95 font-semibold">{e.s}</span>
                      {e.detail && <p className="text-[10px] text-muted-foreground mt-0.5 font-mono">{e.detail}</p>}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-xs text-muted-foreground italic">
                  Awaiting trigger parameter logs... Click a step above to populate the feed.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Static causation flow */}
      <section className="mx-auto max-w-7xl px-6 mt-10">
        <div className="text-xs uppercase tracking-[0.22em] text-saffron-foreground font-semibold mb-3">Chain of Causation · Flywheel Lifecycle</div>
        <div className="grid lg:grid-cols-5 gap-3">
          {[
            { i: Ship, p: "A", t: "Vessel Arrives", d: "MV Himalaya docks at Mundra · 48.2k T Ore", c: "from-primary/15 to-primary/5", b: "border-primary/30" },
            { i: TrainTrackIcon, p: "B", t: "Dynamic Schedule", d: "Section precedence & JSSP solved in sub-second", c: "from-saffron/20 to-saffron/5", b: "border-saffron/40" },
            { i: Smartphone, p: "C", t: "Telemetry Anomaly", d: "Passengars' devices flag vibration at KM 134", c: "from-violet/20 to-violet/5", b: "border-violet/40" },
            { i: Bot, p: "D", t: "Drone Inspection", d: "GRN-03 confirms defect · slow zone enforced", c: "from-emerald/20 to-emerald/5", b: "border-emerald/40" },
            { i: Zap, p: "✓", t: "Loop Restored", d: "Slow-zone lifted · throughput capacity normalized", c: "from-rose/20 to-rose/5", b: "border-rose/40" },
          ].map((x, i) => {
            const isCompleted = activeStep > i;
            const isInProgress = activeStep === i;
            return (
              <div
                key={i}
                className={`relative rounded-2xl border ${x.b} bg-gradient-to-br ${x.c} p-4 transition-all duration-300 ${
                  isCompleted ? "opacity-100 shadow-sm" : isInProgress ? "opacity-100 ring-2 ring-primary ring-offset-2 scale-105" : "opacity-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white grid place-items-center shadow-sm">
                    <x.i className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-[9px] font-bold tracking-widest text-foreground/60">STEP {i + 1} · PILLAR {x.p}</div>
                </div>
                <div className="mt-3 font-display font-semibold text-xs flex items-center gap-1.5">
                  {x.t}
                  {isCompleted && <span className="text-[10px] text-emerald font-bold">✓</span>}
                  {isInProgress && <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                </div>
                <div className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{x.d}</div>
                {i < 4 ? <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" /> : null}
              </div>
            );
          })}
        </div>
      </section>
    </Shell>
  );
}
