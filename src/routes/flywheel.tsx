import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Ship, TrainTrack as TrainTrackIcon, Smartphone, Bot, Zap, ArrowRight, Play, RotateCcw, Cpu, ShieldAlert, Sparkles, Terminal } from "lucide-react";
import { Shell, PageHeader } from "@/components/netra/Shell";
import { addSlowZone, clearSlowZone } from "@/lib/api/datasets.functions";

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
  { p: "A", s: "MV Himalaya dock manifest parsed — 48,200T ore", c: "#2563eb", t: "10:30:15", detail: "Mundra Port Manifest parsed. Demurrage minimization algorithm initialized across 14 freight nodes." },
  { p: "A", s: "Wagon dispatch queue optimized — Dwell: 0 min", c: "#2563eb", t: "10:30:18", detail: "RL Multi-Agent optimizer allocated 58 BOXN wagons. Estimated transit time: 4.2 hrs." },
  { p: "B", s: "JSSP Solver: Section 7 precedence override", c: "#d97706", t: "10:30:25", detail: "Sub-second heuristics: Side-tracked FRT-2241 to Loop A. VB-12 precedence active (Latency: 420ms)." },
  { p: "C", s: "Passenger Smartphone IMU Vibration Anomaly Flagged", c: "#7c3aed", t: "10:30:40", detail: "200Hz Accelerometer Cluster isolated at GPS 22.31°N, 73.10°E. AKNN Vector Index score: 0.89." },
  { p: "B", s: "Automatic Slow-Zone Enforced — 45 km/h", c: "#d97706", t: "10:30:42", detail: "Corridor Segment Section 7 speed restriction issued. Speed ceiling restricted to 45 km/h." },
  { p: "D", s: "Drone GRN-03 Launched — Target GPS Acquired", c: "#059669", t: "10:30:45", detail: "Garun CV Edge System: Target coordinates locked. Aerial inspection ETA: 3.5 min." },
  { p: "D", s: "YOLOv8 Scan Confirms Loose Track Bracket #TF-44821", c: "#059669", t: "10:31:02", detail: "Convolutional inference: 98.4% confidence score on loose fastener. Maintenance crew dispatched." },
  { p: "D", s: "Crew Repair Complete — Track Clearance Uploaded", c: "#059669", t: "10:31:12", detail: "Garun CV post-repair audit: Joint bars OK. Fastener torque verified. Uploading safety certificate." },
  { p: "System", s: "Slow-Zone Lifted — Full Corridor Capacity Restored", c: "#e11d48", t: "10:31:15", detail: "Throughput metrics restored to 94 trains/hr ceiling. Total flywheel cycle time: 1.0 min." },
];

function ts() {
  return new Date().toLocaleTimeString("en-IN", { hour12: false });
}

export function Flywheel({ noShell = false, dark = false }: { noShell?: boolean; dark?: boolean }) {
  const [mode, setMode] = useState<"auto" | "interactive">("interactive");
  const [activeStep, setActiveStep] = useState<number>(0);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [phase, setPhase] = useState(0);
  const [diagLogs, setDiagLogs] = useState<Array<{ t: string; text: string; type: "info" | "exec" | "metric" | "success" }>>([
    { t: "10:30:00", text: "NETRA-RAIL Engine online. Listening to multimodal telemetry streams...", type: "info" },
    { t: "10:30:05", text: "Post-adapted RL Logistics engine initialized on Mundra Port Corridor.", type: "exec" },
    { t: "10:30:10", text: "JSSP Precedence Solver active — Sub-second heuristic latency: 420ms.", type: "metric" },
  ]);

  const addDiagLog = (text: string, type: "info" | "exec" | "metric" | "success" = "exec") => {
    setDiagLogs((prev) => [{ t: ts(), text, type }, ...prev].slice(0, 10));
  };

  // Auto-running simulation mode
  useEffect(() => {
    if (mode !== "auto") return;
    const t = setInterval(() => {
      const idx = Math.floor(Math.random() * seedLogs.length);
      const next = seedLogs[idx];
      setLog((l) => [{ ...next, t: ts() }, ...l].slice(0, 15));
      setPhase((p) => (p + 1) % 4);
      addDiagLog(next.detail || next.s, "exec");
    }, 2200);
    return () => clearInterval(t);
  }, [mode]);

  // Set initial logs on load
  useEffect(() => {
    setLog(seedLogs);
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
      title: "Vessel Arrival & Multimodal Queueing",
      desc: "Vessel MV Himalaya docks at Mundra Port carrying 48,200 tonnes of iron ore. The RL routing optimizer ingests shipping parameters to calculate optimal wagon dispatches.",
      actionText: "Trigger Vessel Ingestion (Pillar A)",
      diagnostic: "Initializing Multimodal Logistics Synchroniser... Running Post-adapted RL queues. Minimizing demurrage costs across 14 connected manufacturing nodes...",
      log: { p: "A", s: "MV Himalaya dock manifest parsed - 48,200T ore", c: "#2563eb" },
      metrics: [
        { label: "Cargo Ore", val: "48,200 T" },
        { label: "Demurrage Saved", val: "₹1.4 Lakhs" },
        { label: "Routing Model", val: "RL Multi-Agent" }
      ]
    },
    {
      pillar: "B",
      title: "Mixed-Speed Precedence Dispatch",
      desc: "The freight train enters the mainline corridor. The dynamic Job Shop Scheduling (JSSP) solver computes sub-second precedence variables, side-tracking the freight to let high-speed Vande Bharat pass.",
      actionText: "Recalculate Precedence (Pillar B)",
      diagnostic: "JSSP Solver executing. Multi-stage LLM heuristic optimization running with diversity elitism. Precedence set: side-track FRT-2241 on Loop Line A.",
      log: { p: "B", s: "Precedence override: side-tracked FRT-2241 for VB-12", c: "#d97706" },
      metrics: [
        { label: "Solver Latency", val: "0.42 sec" },
        { label: "Conflict State", val: "Resolved" },
        { label: "Priority Train", val: "VB-12 Express" }
      ]
    },
    {
      pillar: "C",
      title: "Crowdsourced Telemetry Flag",
      desc: "3-axis IMU streams from passenger smartphones detect abnormal vibrations at coordinates 22.31°N, 73.10°E. AKNN vector index flags coordinates with mathematically certified query bounds.",
      actionText: "Ingest Telemetry Anomaly (Pillar C)",
      diagnostic: "Streaming 200Hz accelerometer inputs. Performing dimensionality reduction via Sparse Johnson-Lindenstrauss. Cosine distance trigger: 0.89 anomaly cluster isolated.",
      log: { p: "C", s: "Track Anomaly isolated at GPS 22.31°N, 73.10°E", c: "#7c3aed" },
      metrics: [
        { label: "IMU Sample Rate", val: "200 Hz" },
        { label: "GPS Coordinates", val: "22.31°N, 73.10°E" },
        { label: "AKNN Anomaly Score", val: "0.89 (High)" }
      ]
    },
    {
      pillar: "B",
      title: "Slow-Zone Enforcement & Alert",
      desc: "Pillar B intercepts the anomaly flag and automatically issues a 45 km/h slow-zone warning to all approaching trains, while simultaneously triggering drone deployment.",
      actionText: "Enforce Slow-Zone & Trigger Drone (Pillar B → D)",
      diagnostic: "Slow-zone speed restriction set for Section 7 Vadodara-Surat. Speed ceiling restricted to 45km/h. Launching automated drone GRN-03 command.",
      log: { p: "B", s: "Slow-zone enforced (45 km/h) on Section 7 segment", c: "#d97706" },
      metrics: [
        { label: "Enforced Ceiling", val: "45 km/h" },
        { label: "Corridor Segment", val: "Section 7 (Surat)" },
        { label: "Drone Command", val: "GRN-03 Dispatched" }
      ]
    },
    {
      pillar: "D",
      title: "Garun CV Drone Inspection",
      desc: "Drone GRN-03 launches autonomously. Real-time convolutional inspection scans QR codes and identifies a loose fastening bracket. Crew dispatches, fixes component, drone reports clearance.",
      actionText: "Verify Track Clearance (Pillar D)",
      diagnostic: "Drone camera active. Scanning QR code #TF-44821. Convolutional layer output: loose fastener confirmed. Local crew repair verified. Uploading track clearance report...",
      log: { p: "D", s: "Defect repaired. Drone GRN-03 uploads clean report", c: "#059669" },
      metrics: [
        { label: "CV Model", val: "YOLOv8 Edge" },
        { label: "Track Bracket QR", val: "#TF-44821" },
        { label: "Repair Status", val: "Verified Clean" }
      ]
    },
    {
      pillar: "B",
      title: "Autonomous Closed-Loop Recovery",
      desc: "Pillar D's verification report satisfies the safety protocols. The slow-zone restriction is automatically lifted. Train throughput capacity returns to the 94 trains/hour ceiling.",
      actionText: "Restore Full Throughput (Loop Complete)",
      diagnostic: "Clearance report authenticated. Lifting speed restrictions on Section 7. Restoring makespan calculations. Throughput stabilized at 94 trains/hr. Cycle Complete.",
      log: { p: "System", s: "Slow-zone lifted. Mainline traffic capacity restored", c: "#e11d48" },
      metrics: [
        { label: "Throughput", val: "94 trains/hr" },
        { label: "Efficiency Delta", val: "+12.6%" },
        { label: "Flywheel Status", val: "100% Closed" }
      ]
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
    addDiagLog(`[STEP ${activeStep + 1}/${stepsData.length}] Executing ${step.title}`, "info");
    addDiagLog(step.diagnostic, "exec");
    if (step.metrics && step.metrics[0]) {
      addDiagLog(`[METRIC METADATA] ${step.metrics[0].label}: ${step.metrics[0].val} | ${step.metrics[1]?.label}: ${step.metrics[1]?.val}`, "metric");
    }

    // Map step to node phase indicator
    if (step.pillar === "A") setPhase(0);
    else if (step.pillar === "B") setPhase(1);
    else if (step.pillar === "C") setPhase(2);
    else if (step.pillar === "D") setPhase(3);

    // Sync state with Python backend
    if (activeStep === 3) {
      addSlowZone({
        data: {
          section: "Section 7 (Vadodara-Surat)",
          speed_limit: 45,
          reason: "Automated simulation vibration trigger"
        }
      }).catch((e) => console.error("Could not sync slow zone:", e));
    } else if (activeStep === 5) {
      clearSlowZone({
        data: {
          section: "Section 7 (Vadodara-Surat)"
        }
      }).catch((e) => console.error("Could not lift slow zone:", e));
    }

    setActiveStep((s) => s + 1);
  };

  const resetSimulation = () => {
    setActiveStep(0);
    setLog([]);
    setPhase(0);
    addDiagLog("System reset. Awaiting step 1 parameters.", "info");
    // Clear simulation slow zone on reset
    clearSlowZone({
      data: {
        section: "Section 7 (Vadodara-Surat)"
      }
    }).catch((e) => console.error("Could not reset slow zone:", e));
  };

  const content = (
    <>
      <PageHeader
        eyebrow="System Overview"
        title="The Autonomous Flywheel Dashboard"
        description="Four pillars. One closed loop. Interact with the live simulation to demonstrate the self-healing operations logic."
        icon={<Zap className="w-6 h-6 text-primary" />}
        dark={dark}
      />

      {/* Simulator Mode Switcher */}
      <section className="mx-auto max-w-7xl px-6 mb-6">
        <div className={`flex items-center justify-between p-4 rounded-2xl border ${dark ? "border-white/10 bg-[#121c38]/60 text-white" : "border-border bg-white shadow-sm"}`}>
          <div>
            <span className={`text-xs uppercase tracking-wider font-semibold ${dark ? "text-slate-400" : "text-muted-foreground"}`}>Simulation Control Mode</span>
            <div className="text-sm font-bold mt-0.5">
              {mode === "auto" ? "🤖 Autonomous Playback (Continuous logs)" : "🎮 Interactive Presentation (Step-by-step clickthrough)"}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`flex p-1 rounded-xl border ${dark ? "bg-slate-900 border-white/10" : "bg-slate-100 border-border"}`}>
              <button
                onClick={() => { setMode("auto"); resetSimulation(); }}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${mode === "auto" ? "bg-primary text-primary-foreground shadow-sm" : (dark ? "text-slate-400 hover:text-white" : "text-muted-foreground")}`}
              >
                Auto-Run
              </button>
              <button
                onClick={() => { setMode("interactive"); resetSimulation(); }}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${mode === "interactive" ? "bg-primary text-primary-foreground shadow-sm" : (dark ? "text-slate-400 hover:text-white" : "text-muted-foreground")}`}
              >
                Interactive
              </button>
            </div>
            {mode === "interactive" && (
              <button onClick={resetSimulation} className={`p-2 rounded-xl transition border ${dark ? "bg-slate-900 hover:bg-slate-800 border-white/10 text-white" : "bg-slate-100 hover:bg-slate-200 border-border"}`} title="Reset presentation">
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Autonomous loop visualization */}
        <div className="lg:col-span-5 relative aspect-square w-full max-w-[480px] mx-auto rounded-3xl p-4 border border-slate-700 bg-[#0a1128] shadow-xl overflow-hidden">
          <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full">
            <circle cx="200" cy="200" r="160" fill="none" stroke="#334155" strokeDasharray="3 6" />
            <circle cx="200" cy="200" r="150" fill="none" stroke="#3b82f6" strokeDasharray="8 8" strokeWidth={2.5} />
            <circle cx="200" cy="200" r="68" fill="#0f172a" stroke="#38bdf8" strokeWidth={2.5} />
            <text x="200" y="190" textAnchor="middle" fontSize="14" fontWeight="900" fill="#ffffff">NETRA-RAIL</text>
            <text x="200" y="206" textAnchor="middle" fontSize="9" fontWeight="700" fill="#38bdf8" letterSpacing="1">AUTONOMOUS CORE</text>
            <text x="200" y="222" textAnchor="middle" fontSize="9" fill="#10b981" fontWeight="800">● {mode === "auto" ? "AUTO-RUNNING" : "STANDBY"}</text>
            {/* connecting lines */}
            {nodes.map((_, i) => {
              const a = (i / 4) * Math.PI * 2 - Math.PI / 2;
              const x = 200 + Math.cos(a) * 150;
              const y = 200 + Math.sin(a) * 150;
              return <line key={i} x1="200" y1="200" x2={x} y2={y} stroke="#475569" strokeDasharray="3 4" />;
            })}
          </svg>
          {nodes.map((n, i) => {
            const angle = (i / 4) * Math.PI * 2 - Math.PI / 2;
            const x = 50 + Math.cos(angle) * 38;
            const y = 50 + Math.sin(angle) * 38;
            const Icon = n.icon;
            const active = phase === i;
            const cardStyles = [
              { bg: "bg-[#1d4ed8]", border: "border-blue-300", text: "text-blue-100", iconBg: "bg-white text-[#1d4ed8]" },
              { bg: "bg-[#d97706]", border: "border-amber-300", text: "text-amber-100", iconBg: "bg-white text-[#d97706]" },
              { bg: "bg-[#7c3aed]", border: "border-purple-300", text: "text-purple-100", iconBg: "bg-white text-[#7c3aed]" },
              { bg: "bg-[#059669]", border: "border-emerald-300", text: "text-emerald-100", iconBg: "bg-white text-[#059669]" }
            ][i];

            return (
              <div key={n.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
                <div
                  className={`w-28 h-28 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all ${cardStyles.bg} ${cardStyles.border} ${active ? "scale-110 shadow-2xl ring-4 ring-white" : "shadow-lg"}`}
                >
                  <div className={`w-9 h-9 rounded-xl grid place-items-center shadow-sm ${cardStyles.iconBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-[13px] font-display font-extrabold text-white">{n.label}</div>
                  <div className={`text-[9px] uppercase tracking-wider font-extrabold ${cardStyles.text}`}>{n.sub}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT: presentation walkthrough & logs */}
        <div className="lg:col-span-7 space-y-6">
          {mode === "interactive" ? (
            <div className={`rounded-2xl border p-5 ${dark ? "border-white/10 bg-[#121c38]/60 text-white" : "border-border bg-white shadow-sm"}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <h2 className={`text-sm font-bold uppercase tracking-wider ${dark ? "text-slate-200" : "text-slate-800"}`}>Interactive Operational Walkthrough</h2>
                </div>
                <span className="text-[10px] uppercase font-extrabold tracking-widest px-2.5 py-1 rounded-full bg-blue-600 text-white shadow-sm">
                  Step {Math.min(activeStep + 1, stepsData.length)} / {stepsData.length}
                </span>
              </div>

              {/* Stepper Progress Indicator */}
              <div className="grid grid-cols-6 gap-1.5 mb-5">
                {stepsData.map((st, idx) => {
                  const isDone = activeStep > idx;
                  const isCurrent = activeStep === idx;
                  const pillarColor = [
                    "bg-[#2563eb]",
                    "bg-[#d97706]",
                    "bg-[#7c3aed]",
                    "bg-[#d97706]",
                    "bg-[#059669]",
                    "bg-[#e11d48]"
                  ][idx];

                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveStep(idx);
                        if (st.pillar === "A") setPhase(0);
                        else if (st.pillar === "B") setPhase(1);
                        else if (st.pillar === "C") setPhase(2);
                        else if (st.pillar === "D") setPhase(3);
                      }}
                      className={`h-2 rounded-full transition-all ${
                        isCurrent
                          ? `${pillarColor} ring-2 ring-slate-900 ring-offset-1 scale-105`
                          : isDone
                          ? `${pillarColor} opacity-80`
                          : "bg-slate-200 dark:bg-slate-800"
                      }`}
                      title={`Step ${idx + 1}: Pillar ${st.pillar}`}
                    />
                  );
                })}
              </div>

              {activeStep < stepsData.length ? (
                <div className={`p-5 rounded-2xl border space-y-4 shadow-sm ${dark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase font-extrabold tracking-widest px-2.5 py-1 rounded-md bg-slate-900 text-white">
                      Pillar {stepsData[activeStep].pillar} Execution
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> LIVE STEP
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{stepsData[activeStep].title}</h3>
                    <p className={`text-xs leading-relaxed mt-1.5 ${dark ? "text-slate-300" : "text-slate-600"}`}>{stepsData[activeStep].desc}</p>
                  </div>

                  {/* Step Metric Pills */}
                  {stepsData[activeStep].metrics && (
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      {stepsData[activeStep].metrics.map((m, mi) => (
                        <div key={mi} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 text-center shadow-2xs">
                          <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">{m.label}</div>
                          <div className="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">{m.val}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={triggerNextStep}
                    className="w-full mt-2 flex items-center justify-center gap-2 px-6 py-3.5 font-extrabold text-sm rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md active:scale-95"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    {stepsData[activeStep].actionText}
                  </button>
                </div>
              ) : (
                <div className={`p-6 rounded-2xl border text-center space-y-4 ${dark ? "bg-emerald-950/40 border-emerald-800/60" : "bg-emerald-50 border-emerald-200"}`}>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white grid place-items-center mx-auto shadow-lg">
                    <Zap className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400">Autonomous Flywheel Loop Fully Verified!</h3>
                    <p className={`text-xs max-w-md mx-auto mt-1 leading-relaxed ${dark ? "text-slate-300" : "text-slate-600"}`}>
                      All 6 operational steps—from vessel ore arrival to smartphone vibration anomaly detection, drone CV audit, and automated clearance—completed with zero human intervention.
                    </p>
                  </div>

                  <div className="flex justify-center gap-3 pt-2">
                    <button
                      onClick={resetSimulation}
                      className="inline-flex items-center gap-2 px-6 py-3 font-extrabold text-xs rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition shadow-md"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Restart Operational Loop
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={`rounded-2xl border p-5 ${dark ? "border-white/10 bg-[#121c38]/60 text-white" : "border-border bg-white shadow-sm"}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-emerald" />
                  <h2 className={`text-sm font-semibold uppercase tracking-wider ${dark ? "text-slate-300" : "text-muted-foreground"}`}>Self-Healing Diagnostic Ingestion</h2>
                </div>
                <span className="text-xs text-emerald flex items-center gap-1.5 font-bold"><span className="live-dot" /> STREAMING EVENTS</span>
              </div>
              <p className={`text-xs leading-relaxed ${dark ? "text-slate-300" : "text-muted-foreground"}`}>
                The platform is actively listening to dynamic API inputs (vessel ETAs, IMU telemetry streams, drone CV feeds). Hover over logs to view detailed telemetry metrics.
              </p>
            </div>
          )}

          {/* Diagnostic Console Box */}
          <div className="rounded-2xl border border-slate-800 bg-[#090d16] p-4 font-mono text-xs shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-800 text-slate-400">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5 mr-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-bold text-slate-200 text-[11px] tracking-wide uppercase">Diagnostic Telemetry Console</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-slate-400 font-mono">
                <span className="flex items-center gap-1 text-emerald-400 font-bold"><span className="live-dot" /> LIVE</span>
                <span>CPU: 14%</span>
                <span>LATENCY: 14ms</span>
              </div>
            </div>

            <div className="space-y-2 select-none min-h-[140px] max-h-[200px] overflow-y-auto pr-2 scrollbar-thin text-[11px] leading-relaxed">
              {diagLogs.map((lg, idx) => {
                const colorMap = {
                  info: "text-blue-400 font-bold",
                  exec: "text-amber-400 font-bold",
                  metric: "text-purple-400 font-bold",
                  success: "text-emerald-400 font-bold"
                };

                return (
                  <div key={idx} className="flex items-start gap-2 animate-slide-up">
                    <span className="text-slate-500 text-[10px] shrink-0 font-mono">[{lg.t}]</span>
                    <span className={`text-[10px] uppercase shrink-0 ${colorMap[lg.type]}`}>
                      &gt; [{lg.type.toUpperCase()}]
                    </span>
                    <span className="text-slate-200 font-mono leading-tight">{lg.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dynamic Event Log */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className={`text-sm font-semibold uppercase tracking-wider ${dark ? "text-slate-300" : "text-muted-foreground"}`}>Flywheel Logs</h2>
              <span className="text-[10px] text-muted-foreground">Last {log.length} records</span>
            </div>
            <div className={`rounded-2xl border p-4 max-h-[380px] overflow-y-auto space-y-2.5 shadow-sm ${dark ? "border-slate-800 bg-[#0c1427] text-white" : "border-slate-200 bg-white"}`}>
              {log.length > 0 ? (
                log.map((e, i) => (
                  <div key={i} className={`animate-slide-up border-b last:border-0 pb-2.5 pt-1 flex items-start gap-3 text-xs ${dark ? "border-slate-800/60" : "border-slate-100"}`}>
                    <span className="font-mono text-slate-400 text-[11px] w-16 shrink-0 pt-0.5">{e.t}</span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md text-white shrink-0 shadow-2xs" style={{ background: e.c }}>
                      Pillar {e.p}
                    </span>
                    <div className="flex-1">
                      <div className={`font-bold ${dark ? "text-slate-100" : "text-slate-900"}`}>{e.s}</div>
                      {e.detail && <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-mono leading-relaxed">{e.detail}</p>}
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
        <div className="text-xs uppercase tracking-[0.22em] font-extrabold mb-4 text-amber-400 flex items-center gap-2">
          <span>CHAIN OF CAUSATION · FLYWHEEL LIFECYCLE</span>
          <span className="h-px flex-1 bg-slate-700" />
        </div>
        <div className="grid lg:grid-cols-5 gap-3">
          {[
            {
              i: Ship,
              p: "A",
              t: "Vessel Arrives",
              d: "MV Himalaya docks at Mundra · 48.2k T Ore",
              cardBg: "bg-[#1e3a8a] border border-blue-400 text-white shadow-md",
              badgeBg: "bg-[#3b82f6] text-white",
              subText: "text-blue-200",
              iconBox: "bg-white text-[#1e3a8a]"
            },
            {
              i: TrainTrackIcon,
              p: "B",
              t: "Dynamic Schedule",
              d: "Section precedence & JSSP solved in sub-second",
              cardBg: "bg-[#78350f] border border-amber-400 text-white shadow-md",
              badgeBg: "bg-[#f59e0b] text-white",
              subText: "text-amber-200",
              iconBox: "bg-white text-[#78350f]"
            },
            {
              i: Smartphone,
              p: "C",
              t: "Telemetry Anomaly",
              d: "Passengers' devices flag vibration at KM 134",
              cardBg: "bg-[#4c1d95] border border-purple-400 text-white shadow-md",
              badgeBg: "bg-[#8b5cf6] text-white",
              subText: "text-purple-200",
              iconBox: "bg-white text-[#4c1d95]"
            },
            {
              i: Bot,
              p: "D",
              t: "Drone Inspection",
              d: "GRN-03 confirms defect · slow zone enforced",
              cardBg: "bg-[#064e3b] border border-emerald-400 text-white shadow-md",
              badgeBg: "bg-[#10b981] text-white",
              subText: "text-emerald-200",
              iconBox: "bg-white text-[#064e3b]"
            },
            {
              i: Zap,
              p: "✓",
              t: "Loop Restored",
              d: "Slow-zone lifted · throughput capacity normalized",
              cardBg: "bg-[#881337] border border-rose-400 text-white shadow-md",
              badgeBg: "bg-[#f43f5e] text-white",
              subText: "text-rose-200",
              iconBox: "bg-white text-[#881337]"
            },
          ].map((x, i) => {
            const isCompleted = activeStep > i;
            const isInProgress = activeStep === i;
            return (
              <div
                key={i}
                className={`group relative rounded-2xl border p-4 transition-all ${x.cardBg} ${
                  isInProgress ? "ring-4 ring-white shadow-2xl scale-105" : "hover:scale-[1.02]"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className={`w-8 h-8 rounded-xl grid place-items-center shadow-sm ${x.iconBox}`}>
                    <x.i className="w-4.5 h-4.5" />
                  </div>
                  <span className={`text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${x.badgeBg}`}>
                    STEP {i + 1} · PILLAR {x.p}
                  </span>
                </div>

                <div className="mt-3 font-display font-bold text-sm text-white flex items-center justify-between">
                  <span>{x.t}</span>
                  {isCompleted && <span className="text-xs text-[#4ade80] font-extrabold">✓ CLEAR</span>}
                  {isInProgress && <span className="inline-block w-2 h-2 rounded-full bg-white animate-ping" />}
                </div>

                <p className={`text-[11px] mt-1 leading-relaxed font-medium ${x.subText}`}>{x.d}</p>

                {i < 4 ? (
                  <ArrowRight className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white font-bold z-10 drop-shadow" />
                ) : null}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );

  if (noShell) return content;
  return <Shell>{content}</Shell>;
}
