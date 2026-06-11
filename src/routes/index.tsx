import { createFileRoute, Link } from "@tanstack/react-router";
import { Ship, TrainTrack as TrainTrackIcon, Train, Smartphone, Bot, ArrowRight, Activity, Globe, Zap, Shield, IndianRupee, Brain, Radio } from "lucide-react";
import { Shell } from "@/components/netra/Shell";
// @ts-ignore
import videoBg from "../../Videos/18626169-hd_1080_1920_30fps.mp4";
import { StatCard } from "@/components/netra/Stat";
import { Particles, NetworkMap } from "@/components/netra/Particles";
import { AreaChart, Area, ResponsiveContainer, BarChart, Bar, Tooltip, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

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
  { to: "/pillar-a", icon: Ship, chip: "Pillar A", title: "Intermodal Logistics Sync", desc: "Port-to-plant freight orchestration. Vessel ETAs → wagon dispatch in real time.", grad: "from-primary via-sky to-teal", img: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=70" },
  { to: "/pillar-b", icon: TrainTrackIcon, chip: "Pillar B", title: "Section Throughput Maximiser", desc: "LLM-driven JSSP scheduling. Sub-second loop-line precedence overrides.", grad: "from-saffron via-sun to-rose", img: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=70" },
  { to: "/pillar-c", icon: Smartphone, chip: "Pillar C", title: "IMU Sensor Telemetry", desc: "Every passenger phone becomes a track sensor. AKNN anomaly isolation.", grad: "from-violet via-rose to-saffron", img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=70" },
  { to: "/pillar-d", icon: Bot, chip: "Pillar D", title: "Garun CV Structural Auditor", desc: "Autonomous drone dispatch + on-device CV defect detection.", grad: "from-emerald via-teal to-primary", img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=70" },
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
  const marqueeImages = [
    "https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1532103054090-334e6e60ab29?auto=format&fit=crop&w=400&q=70",
    "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=400&q=70",
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=70",
    "https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?auto=format&fit=crop&w=400&q=70",
    "https://images.unsplash.com/photo-1615433995805-4c07c4273df1?auto=format&fit=crop&w=400&q=80",
  ];

  return (
    <Shell>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            src={videoBg}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-[0.15] filter contrast-125 brightness-105"
          />
          {/* Blend overlay */}
          <div className="absolute inset-0 bg-[#fafbf8]/50" />
        </div>
        <div className="absolute inset-0 mesh-bg mix-blend-multiply opacity-70" />
        <NetworkMap />
        <Particles count={36} />
        <div className="relative mx-auto max-w-7xl px-6 pt-6 pb-12 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <h1 className="mt-2 text-5xl md:text-7xl font-display font-extrabold tracking-tight leading-[1.02] flex items-center gap-3">
              <span>
                <span className="text-primary">NETRA</span>
                <span className="text-saffron">-</span>
                <span className="text-saffron">RAIL</span>
              </span>
              <span className="text-4xl md:text-6xl">🚂</span>
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-foreground/70">
              National Enterprise Traffic, Routing & Autonomous Rail-Grid
            </p>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              India's first closed-loop autonomous intelligence platform for Indian Railways — unifying freight, traffic, telemetry and structural safety into a single self-healing flywheel.
            </p>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
              {[
                { t: "LLM-driven JSSP", c: "bg-primary text-white" },
                { t: "Crowdsourced IMU", c: "bg-violet text-white" },
                { t: "Autonomous drones", c: "bg-emerald text-white" },
                { t: "230+ languages", c: "bg-saffron text-white" },
              ].map((x) => (
                <div key={x.t} className={`px-4 py-2.5 rounded-xl text-center font-bold text-[11px] shadow-sm border border-black/5 ${x.c}`}>
                  {x.t}
                </div>
              ))}
            </div>

            {/* Photo Marquee */}
            <div className="mt-5 relative overflow-hidden rounded-xl border border-border bg-white p-1 max-w-2xl">
              <div className="flex whitespace-nowrap animate-ticker gap-2 py-0.5" style={{ animationDuration: "24s" }}>
                {[...marqueeImages, ...marqueeImages].map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="Railway operations"
                    className="inline-block w-24 h-16 object-cover rounded-lg border border-border/40"
                  />
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/flywheel" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground shadow-md hover:shadow-lg transition">
                See the autonomous loop <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/command-center" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-white hover:border-primary/40 transition">
                <Globe className="w-4 h-4 text-saffron-foreground" /> Try Command Center
              </Link>
            </div>
          </div>
          {/* Live ops globe panel */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-border bg-white/80 backdrop-blur p-5 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Live Network Ops</div>
                <span className="text-xs flex items-center gap-1.5 text-emerald font-semibold"><span className="live-dot" /> STREAMING</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <MiniMetric label="Trains" v="13,427" color="text-primary" />
                <MiniMetric label="Drones" v="3 / 12" color="text-emerald" />
                <MiniMetric label="Sensors" v="12.8k" color="text-violet" />
              </div>
              <div className="mt-4 h-32">
                <ResponsiveContainer>
                  <AreaChart data={tracker}>
                    <defs>
                      <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="oklch(0.34 0.08 250)" stopOpacity={0.55} />
                        <stop offset="100%" stopColor="oklch(0.34 0.08 250)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="g2" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="oklch(0.78 0.16 70)" stopOpacity={0.6} />
                        <stop offset="100%" stopColor="oklch(0.78 0.16 70)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                    <Area type="monotone" dataKey="throughput" stroke="oklch(0.34 0.08 250)" fill="url(#g1)" strokeWidth={2} />
                    <Area type="monotone" dataKey="savings" stroke="oklch(0.78 0.16 70)" fill="url(#g2)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border p-3">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Corridor Throughput</div>
                  <div className="h-20">
                    <ResponsiveContainer>
                      <BarChart data={corridorBars}>
                        <Tooltip contentStyle={{ fontSize: 11 }} />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="rounded-xl border border-border p-3 grid place-items-center">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground self-start">Network Health</div>
                  <div className="relative w-20 h-20">
                    <ResponsiveContainer>
                      <RadialBarChart innerRadius="70%" outerRadius="100%" data={health} startAngle={90} endAngle={-270}>
                        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                        <RadialBar dataKey="value" cornerRadius={20} background={{ fill: "oklch(0.95 0.02 80)" }} />
                      </RadialBarChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 grid place-items-center font-display font-bold text-emerald">96%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="TRAINS MONITORED / DAY" value={13427} suffix=" +" icon={<TrainTrackIcon className="w-4 h-4" />} />
            <StatCard label="ROUTE KM COVERED" value={68000} icon={<Train className="w-4 h-4 text-saffron-foreground" />} accent="saffron" />
            <StatCard label="AUTONOMOUS PILLARS ACTIVE" value={4} icon={<Bot className="w-4 h-4 text-emerald" />} accent="emerald" />
            <StatCard label="LANGUAGES SUPPORTED" value={230} suffix=" +" icon={<Smartphone className="w-4 h-4 text-primary" />} />
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="relative mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-saffron-foreground font-semibold">The Four Pillars</div>
            <h2 className="mt-1 text-3xl md:text-4xl font-display font-bold">A unified autonomous flywheel</h2>
            <p className="mt-1 text-muted-foreground max-w-2xl text-sm">Each pillar is independently world-class. Together they form a self-healing loop that no human dispatcher ever has to trigger.</p>
          </div>
          <Link to="/flywheel" className="hidden md:inline-flex items-center gap-1 text-sm text-primary hover:underline">
            See the loop <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {pillars.map((p) => (
            <Link
              key={p.to}
              to={p.to}
              className="card-hover group relative rounded-2xl border border-border bg-white overflow-hidden"
            >
              <div className="relative h-28 overflow-hidden">
                <img src={p.img} alt={p.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className={`absolute inset-0 bg-gradient-to-br ${p.grad} mix-blend-multiply opacity-80`} />
                <div className="absolute inset-0 bg-black/15" />
                <div className="absolute top-3 left-3 text-[10px] tracking-widest font-bold text-white bg-black/30 backdrop-blur px-2 py-0.5 rounded">{p.chip}</div>
                <div className="absolute bottom-2 right-2 w-10 h-10 rounded-xl bg-white/95 grid place-items-center text-primary animate-drone">
                  <p.icon className="w-5 h-5" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-display font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Open dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Why it matters */}
        <div className="mt-14 grid md:grid-cols-3 gap-4">
          {[
            { i: Zap, t: "Sub-second decisions", d: "Edge inference and JSSP heuristics resolve precedence in under 800 ms.", c: "from-saffron/20 to-saffron/5", ic: "text-saffron-foreground" },
            { i: Shield, t: "Zero-touch safety", d: "IMU anomalies trigger drone audits and slow zones without a human in the loop.", c: "from-emerald/20 to-emerald/5", ic: "text-emerald" },
            { i: Brain, t: "Self-improving", d: "Evolutionary heuristics + AKNN vector indexing learn from every run.", c: "from-violet/20 to-violet/5", ic: "text-violet" },
          ].map((x) => (
            <div key={x.t} className={`rounded-2xl border border-border bg-gradient-to-br ${x.c} p-5`}>
              <div className={`w-10 h-10 rounded-xl bg-white grid place-items-center mb-3 ${x.ic} shadow-sm`}><x.i className="w-5 h-5" /></div>
              <div className="font-display font-bold">{x.t}</div>
              <p className="text-sm text-muted-foreground mt-1">{x.d}</p>
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
                <circle cx={x} cy={40} r={11} fill="white" stroke="oklch(0.78 0.16 70)" strokeWidth={2} />
                <circle cx={x} cy={40} r={4} fill="oklch(0.78 0.16 70)" />
              </g>
            ))}
          </svg>
        </div>
      </section>
    </Shell>
  );
}

function MiniMetric({ label, v, color }: { label: string; v: string; color: string }) {
  return (
    <div className="rounded-xl border border-border bg-white p-2.5">
      <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`text-lg font-display font-bold ${color}`}>{v}</div>
    </div>
  );
}
