import { createFileRoute, Link } from "@tanstack/react-router";
import { Ship, TrainTrack as TrainTrackIcon, Train, Smartphone, Bot, ArrowRight, Activity, Globe, Zap, Shield, IndianRupee, Brain, Radio, ShieldAlert } from "lucide-react";
import { Shell } from "@/components/netra/Shell";
// @ts-ignore
import videoBg from "../../Videos/18626169-hd_1080_1920_30fps.mp4";
// @ts-ignore
import netraVideo from "../../Videos/NETRA(Non-Contact, Embedded, Track Recording Analysis).mp4";
// @ts-ignore
import img1 from "../../Images/img1.jpeg";
// @ts-ignore
import img2 from "../../Images/img2.jpeg";
// @ts-ignore
import img3 from "../../Images/img3.jpeg";
// @ts-ignore
import img4 from "../../Images/img4.jpeg";
import { StatCard } from "@/components/netra/Stat";
import { Particles } from "@/components/netra/Particles";
import { AreaChart, Area, ResponsiveContainer, BarChart, Bar, Tooltip, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { getSystemSummary, getSlowZones, clearSlowZone } from "@/lib/api/datasets.functions";
import { useEffect, useState, useRef } from "react";
import { Flywheel } from "./flywheel";
import { CommandCenter } from "./command-center";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NETRA-RAIL · Autonomous Intelligence for Indian Railways" },
      { name: "description", content: "India's first closed-loop autonomous multi-agent platform for railway logistics, traffic, telemetry and structural safety." },
      { property: "og:title", content: "NETRA-RAIL" },
      { property: "og:description", content: "National Enterprise Traffic, Routing & Autonomous Rail-Grid." },
    ],
  }),
  component: Landing,
});

const pillars = [
  { 
    to: "/pillar-a", 
    icon: Ship, 
    chip: "Pillar A", 
    title: "Intermodal Logistics Sync", 
    desc: "Port-to-plant freight orchestration. Vessel ETAs → wagon dispatch in real time.", 
    cardBg: "bg-blue-900 hover:bg-blue-950 border-blue-800 text-white shadow-md",
    chipBg: "text-white border-white/30 bg-white/20 font-black",
    iconBg: "bg-white text-blue-900",
    textColor: "text-white font-black",
    descColor: "text-slate-100 font-semibold",
    actionColor: "text-white font-extrabold"
  },
  { 
    to: "/pillar-b", 
    icon: TrainTrackIcon, 
    chip: "Pillar B", 
    title: "Section Throughput Maximiser", 
    desc: "LLM-driven JSSP scheduling. Sub-second loop-line precedence overrides.", 
    cardBg: "bg-amber-600 hover:bg-amber-700 border-amber-500 text-white shadow-md",
    chipBg: "text-white border-white/30 bg-white/20 font-black",
    iconBg: "bg-white text-amber-700",
    textColor: "text-white font-black",
    descColor: "text-slate-100 font-semibold",
    actionColor: "text-white font-extrabold"
  },
  { 
    to: "/pillar-c", 
    icon: Smartphone, 
    chip: "Pillar C", 
    title: "IMU Sensor Telemetry", 
    desc: "Every passenger phone becomes a track sensor. AKNN anomaly isolation.", 
    cardBg: "bg-emerald-700 hover:bg-emerald-800 border-emerald-600 text-white shadow-md",
    chipBg: "text-white border-white/30 bg-white/20 font-black",
    iconBg: "bg-white text-emerald-800",
    textColor: "text-white font-black",
    descColor: "text-slate-100 font-semibold",
    actionColor: "text-white font-extrabold"
  },
  { 
    to: "/pillar-d", 
    icon: Bot, 
    chip: "Pillar D", 
    title: "Garun CV Structural Auditor", 
    desc: "Autonomous drone dispatch + on-device CV defect detection.", 
    cardBg: "bg-rose-700 hover:bg-rose-800 border-rose-600 text-white shadow-md",
    chipBg: "text-white border-white/30 bg-white/20 font-black",
    iconBg: "bg-white text-rose-800",
    textColor: "text-white font-black",
    descColor: "text-slate-100 font-semibold",
    actionColor: "text-white font-extrabold"
  },
] as const;

const tracker = Array.from({ length: 24 }).map((_, i) => ({
  h: i,
  throughput: 60 + Math.sin(i / 3) * 12 + Math.random() * 6 + i * 0.5,
  savings: 30 + Math.cos(i / 4) * 14 + Math.random() * 4,
}));

const corridorBars = [
  { name: "WDFC", value: 94, fill: "oklch(0.34 0.08 250)" },
  { name: "EDFC", value: 88, fill: "oklch(0.6 0.2 295)" },
  { name: "Howrah-Dhanbad", value: 81, fill: "oklch(0.78 0.16 70)" },
  { name: "Chennai-Vizag", value: 76, fill: "oklch(0.7 0.13 195)" },
  { name: "Delhi-Mumbai", value: 91, fill: "oklch(0.7 0.16 165)" },
];

const health = [{ name: "h", value: 96, fill: "oklch(0.7 0.16 165)" }];

function Landing() {
  const [summary, setSummary] = useState<any>(null);
  const [slowZones, setSlowZones] = useState<any[]>([]);
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  const refreshSlowZones = () => {
    getSlowZones().then((zones) => {
      setSlowZones(zones || []);
    });
  };

  useEffect(() => {
    getSystemSummary().then((data) => {
      setSummary(data);
    });
    refreshSlowZones();
    const interval = setInterval(refreshSlowZones, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (bgVideoRef.current) {
      bgVideoRef.current.playbackRate = 0.35; // Slow down background video playback speed
    }
  }, []);

  const marqueeImages = [
    img1,
    img2,
    img3,
    img4,
    "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=600&q=80",
  ];

  return (
    <Shell>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0b1329] text-white pb-12">
        <video
          ref={bgVideoRef}
          src={videoBg}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1329]/80 via-[#0b1329]/60 to-[#0b1329] pointer-events-none" />
        <Particles count={36} />
        <div className="relative mx-auto max-w-7xl px-6 pt-8 pb-4 grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: All Content & Controls */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div>
              <h1 className="mt-2 text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight leading-none flex flex-wrap items-center gap-2 sm:gap-3">
                <span>
                  <span className="text-white">NETRA</span>
                  <span className="text-amber-400">-RAIL</span>
                </span>
                <span className="inline-flex items-center justify-center p-2 rounded-2xl bg-white/10 border border-white/20 text-amber-400 shrink-0 shadow-md">
                  <Train className="w-7 h-7 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
                </span>
              </h1>
              <p className="mt-3 max-w-3xl text-lg md:text-xl text-white/90 font-extrabold leading-snug">
                National Enterprise Traffic, Routing & Autonomous Rail-Grid
              </p>
            </div>
            <p className="max-w-3xl text-slate-300 text-sm font-semibold leading-relaxed">
              India's first closed-loop autonomous intelligence platform for Indian Railways — unifying freight, traffic, telemetry and structural safety into a single self-healing flywheel.
            </p>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
              {[
                { t: "LLM-driven JSSP", c: "bg-white/10 text-white border-white/20 font-extrabold" },
                { t: "Crowdsourced IMU", c: "bg-violet-500/20 text-violet-200 border-violet-500/30 font-extrabold" },
                { t: "Autonomous drones", c: "bg-emerald-500/20 text-emerald-200 border-emerald-500/30 font-extrabold" },
                { t: "230+ languages", c: "bg-amber-500/20 text-amber-200 border-amber-500/30 font-extrabold" },
              ].map((x) => (
                <div key={x.t} className={`px-4 py-2.5 rounded-xl text-center text-[11px] shadow-sm border backdrop-blur-md ${x.c}`}>
                  {x.t}
                </div>
              ))}
            </div>

            {/* Photo Marquee (Above CTA) */}
            <div className="mt-6 relative overflow-hidden rounded-xl max-w-3xl border border-white/20 bg-white/5 p-1 backdrop-blur-md">
              <div className="flex whitespace-nowrap animate-ticker gap-3 py-1" style={{ animationDuration: "25s" }}>
                {[...marqueeImages, ...marqueeImages].map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="Railway operations"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=600&q=80";
                    }}
                    className="inline-block w-56 h-36 shrink-0 aspect-[16/10] object-cover rounded-2xl shadow-md border border-white/20"
                  />
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/flywheel" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition font-black text-sm">
                See the autonomous loop <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/command-center" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 transition font-black text-sm">
                <Globe className="w-4 h-4 text-amber-400" /> Try Command Center
              </Link>
            </div>
          </div>

          {/* Right Column: Video & Stats Tabs below it */}
          <div className="lg:col-span-5 flex flex-col gap-5 self-start w-full">
            <div className="relative h-[280px] sm:h-[340px] lg:h-[380px] overflow-hidden rounded-3xl bg-slate-950 shadow-2xl border border-white/20 ring-1 ring-white/10 hover:ring-amber-400/40 transition-all duration-300">
              <video
                src={netraVideo}
                autoPlay
                loop
                muted
                controls
                playsInline
                className="absolute inset-0 w-full h-full object-contain p-2"
              />
            </div>

            {/* Stats Tabs (Single Line, 4 Tabs with Solid Light Cards) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
              <div className="rounded-xl bg-white text-slate-900 p-2.5 flex flex-col items-center justify-center text-center shadow-md border border-slate-200">
                <span className="text-[10px] sm:text-xs font-black tracking-wider uppercase text-blue-700">Trains</span>
                <span className="text-sm sm:text-base font-black mt-0.5 text-slate-900">{summary?.pillar_b_summary?.total_trains || 500}+</span>
              </div>
              <div className="rounded-xl bg-white text-slate-900 p-2.5 flex flex-col items-center justify-center text-center shadow-md border border-slate-200">
                <span className="text-[10px] sm:text-xs font-black tracking-wider uppercase text-amber-700">Saved</span>
                <span className="text-sm sm:text-base font-black mt-0.5 text-slate-900">₹16.4Cr</span>
              </div>
              <div className="rounded-xl bg-white text-slate-900 p-2.5 flex flex-col items-center justify-center text-center shadow-md border border-slate-200">
                <span className="text-[10px] sm:text-xs font-black tracking-wider uppercase text-emerald-700">Pillars</span>
                <span className="text-sm sm:text-base font-black mt-0.5 text-slate-900">4 Active</span>
              </div>
              <div className="rounded-xl bg-white text-slate-900 p-2.5 flex flex-col items-center justify-center text-center shadow-md border border-slate-200">
                <span className="text-[10px] sm:text-xs font-black tracking-wider uppercase text-rose-700">Alerts</span>
                <span className="text-sm sm:text-base font-black mt-0.5 text-slate-900">{summary?.pillar_c_summary?.anomalies_detected || 111}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN WORKSPACE: Cream Background (Pillars on Left, Live Ops on Right) */}
      <section className="relative bg-background border-t border-slate-200/60 py-16">
        <div className="mx-auto max-w-7xl px-6">
          {/* Active Slow Zones Alert Banner */}
          {slowZones.length > 0 && (
            <div className="mb-8 bg-rose-50 border border-rose-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-pulse-once">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs uppercase font-extrabold text-rose-600 tracking-wider">Critical Infrastructure Advisory</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    Active Slow Zone: {slowZones[0].section} restricted to {slowZones[0].speed_limit} km/h
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {slowZones[0].reason} • Logged at {slowZones[0].timestamp}
                  </div>
                </div>
              </div>
              <button
                onClick={async () => {
                  await clearSlowZone({ data: { section: slowZones[0].section } });
                  refreshSlowZones();
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition shadow-sm"
              >
                Lift Restriction
              </button>
            </div>
          )}

          <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: The Four Pillars (2x2 grid) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-saffron-foreground font-semibold">The Four Pillars</div>
                <h2 className="mt-1 text-3xl font-display font-bold text-foreground">A unified autonomous flywheel</h2>
                <p className="mt-1 text-muted-foreground text-sm max-w-xl">
                  Each pillar is independently world-class. Together they form a self-healing loop that no human dispatcher ever has to trigger.
                </p>
              </div>
              <Link to="/flywheel" className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-semibold">
                See the loop <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((p) => (
                <Link
                  key={p.to}
                  to={p.to}
                  className={`card-hover group relative rounded-2xl border p-5 transition flex flex-col justify-between shadow-sm hover:shadow-md ${p.cardBg}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[9px] tracking-widest font-extrabold uppercase px-2 py-0.5 rounded-md border ${p.chipBg}`}>
                        {p.chip}
                      </span>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform ${p.iconBg}`}>
                        <p.icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className={`text-base font-display font-black transition-colors ${p.textColor}`}>{p.title}</h3>
                    <p className={`mt-1.5 text-xs leading-relaxed ${p.descColor}`}>{p.desc}</p>
                  </div>
                  
                  <div className={`mt-4 inline-flex items-center gap-1 text-xs font-bold group-hover:underline ${p.actionColor}`}>
                    Open dashboard <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side: Live Network Ops */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-3xl border border-border bg-white text-foreground p-5 shadow-sm w-full">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-slate-900">Live Network Operations</div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Streaming telemetry across Indian Railways freight corridors.</p>
                </div>
                <span className="text-xs flex items-center gap-1.5 text-emerald font-bold shrink-0"><span className="live-dot" /> STREAMING</span>
              </div>
              <div className="mt-3.5 grid grid-cols-3 gap-2">
                <MiniMetric label="Active Trains" v={summary?.pillar_b_summary?.total_trains ? `${summary.pillar_b_summary.total_trains}` : "500"} color="text-saffron-foreground" dark={false} desc="Active freight dispatches" />
                <MiniMetric label="Drone Sorties" v={summary?.pillar_d_summary?.total_missions ? `${summary.pillar_d_summary.total_missions}` : "80"} color="text-emerald" dark={false} desc="Autonomous aerial audits" />
                <MiniMetric label="Phone Sensors" v={summary?.pillar_c_summary?.total_sensor_readings ? `${(summary.pillar_c_summary.total_sensor_readings / 1000).toFixed(1)}k` : "2.0k"} color="text-purple-600" dark={false} desc="200Hz crowdsourced IMUs" />
              </div>

              {/* Area Chart: Throughput vs Savings */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wide">Network Throughput & Cost Savings</span>
                  <span className="text-[9px] text-muted-foreground font-mono">24h Variance</span>
                </div>
                <p className="text-[10px] text-slate-500 mb-2">Hourly throughput capacity (t/hr) vs cumulative demurrage cost savings (₹ Lakhs).</p>
                <div className="h-32">
                  <ResponsiveContainer>
                    <AreaChart data={tracker}>
                      <defs>
                        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="oklch(0.78 0.16 70)" stopOpacity={0.55} />
                          <stop offset="100%" stopColor="oklch(0.78 0.16 70)" strokeOpacity={0} />
                        </linearGradient>
                        <linearGradient id="g2" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="oklch(0.7 0.16 165)" stopOpacity={0.6} />
                          <stop offset="100%" stopColor="oklch(0.7 0.16 165)" strokeOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, background: "#ffffff", color: "#0f172a", border: "1px solid #e2e8f0" }} />
                      <Area type="monotone" dataKey="throughput" stroke="oklch(0.78 0.16 70)" fill="url(#g1)" strokeWidth={2} name="Throughput (t/h)" />
                      <Area type="monotone" dataKey="savings" stroke="oklch(0.7 0.16 165)" fill="url(#g2)" strokeWidth={2} name="Savings (₹ L)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Sub-Charts Grid */}
              <div className="mt-3 grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                <div className="rounded-xl border border-border bg-slate-50 p-3 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-900 font-extrabold">Corridor Throughput</div>
                    <p className="text-[9px] text-muted-foreground mt-0.5">Efficiency across WDFC, EDFC & Eastern freight lines.</p>
                  </div>
                  <div className="h-20 mt-2">
                    <ResponsiveContainer>
                      <BarChart data={corridorBars}>
                        <Tooltip contentStyle={{ fontSize: 11, background: "#ffffff", color: "#0f172a", border: "1px solid #e2e8f0" }} />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]} name="Efficiency %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-slate-50 p-3 grid place-items-center text-center">
                  <div className="self-start w-full text-left">
                    <div className="text-[10px] uppercase tracking-wider text-slate-900 font-extrabold">Network Health Index</div>
                    <p className="text-[9px] text-muted-foreground mt-0.5">Composite telemetry safety rating.</p>
                  </div>
                  <div className="relative w-20 h-20 my-1">
                    <ResponsiveContainer>
                      <RadialBarChart innerRadius="70%" outerRadius="100%" data={health} startAngle={90} endAngle={-270}>
                        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                        <RadialBar dataKey="value" cornerRadius={20} background={{ fill: "rgba(0,0,0,0.06)" }} />
                      </RadialBarChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 grid place-items-center font-display font-extrabold text-emerald text-lg">96%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Why it matters & Ribbon */}
      <section className="relative bg-[#0b1329] border-t border-white/10 text-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { i: Zap, t: "Sub-second decisions", d: "Edge inference and JSSP heuristics resolve precedence in under 800 ms.", c: "bg-white/10 border-white/20", ic: "text-amber-400" },
              { i: Shield, t: "Zero-touch safety", d: "IMU anomalies trigger drone audits and slow zones without a human in the loop.", c: "bg-white/10 border-white/20", ic: "text-emerald-400" },
              { i: Brain, t: "Self-improving", d: "Evolutionary heuristics + AKNN vector indexing learn from every run.", c: "bg-white/10 border-white/20", ic: "text-violet-400" },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl border border-white/15 bg-[#121c38]/80 p-5 shadow-lg backdrop-blur-md">
                <div className={`w-10 h-10 rounded-xl grid place-items-center mb-3 ${x.c} ${x.ic} shadow-sm`}><x.i className="w-5 h-5" /></div>
                <div className="font-display font-extrabold text-white text-base">{x.t}</div>
                <p className="text-sm text-slate-300 font-medium mt-1">{x.d}</p>
              </div>
            ))}
          </div>

          {/* Flywheel ribbon */}
          <div className="mt-12 relative h-20">
            <svg viewBox="0 0 1200 80" className="absolute inset-0 w-full h-full">
              <path
                d="M40 40 C 220 -20, 420 100, 600 40 S 980 -20, 1160 40"
                fill="none"
                stroke="url(#rib)"
                strokeWidth="2.5"
                strokeDasharray="6 8"
                className="animate-dash"
              />
              <defs>
                <linearGradient id="rib" x1="0" x2="1">
                  <stop offset="0%" stopColor="oklch(0.34 0.08 250)" />
                  <stop offset="50%" stopColor="oklch(0.6 0.2 295)" />
                  <stop offset="100%" stopColor="oklch(0.78 0.16 70)" />
                </linearGradient>
              </defs>
              {[100, 400, 700, 1000].map((x, i) => (
                <g key={i}>
                  <circle cx={x} cy={40} r={11} fill="#0b1329" stroke="oklch(0.78 0.16 70)" strokeWidth={2} />
                  <circle cx={x} cy={40} r={4} fill="oklch(0.78 0.16 70)" />
                </g>
              ))}
            </svg>
          </div>
        </div>
      </section>

      {/* FLYWHEEL SIMULATION */}
      <section className="border-t border-slate-200/60 bg-background py-16">
        <Flywheel noShell dark={false} />
      </section>

      {/* COMMAND CENTER */}
      <section className="border-t border-border bg-background py-16">
        <CommandCenter noShell dark={false} />
      </section>
    </Shell>
  );
}

function MiniMetric({ label, v, color, dark, desc }: { label: string; v: string; color: string; dark?: boolean; desc?: string }) {
  return (
    <div className={`rounded-xl border p-2.5 flex flex-col justify-between ${dark ? "bg-white/5 border-white/10" : "bg-slate-50 border-border"}`}>
      <div>
        <div className={`text-[9px] font-extrabold uppercase tracking-wider ${dark ? "text-slate-400" : "text-slate-700"}`}>{label}</div>
        <div className={`text-xl font-display font-black mt-0.5 ${color}`}>{v}</div>
      </div>
      {desc && <div className="text-[8.5px] text-muted-foreground mt-1 leading-tight font-medium">{desc}</div>}
    </div>
  );
}
