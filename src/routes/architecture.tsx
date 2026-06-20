import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell, PageHeader } from "@/components/netra/Shell";
import {
  ShieldAlert,
  FileText,
  Database,
  Cpu,
  Layers,
  CheckCircle2,
  TrainTrack,
  Ship,
  Smartphone,
  Bot,
  Globe,
  Award,
  BookOpen,
  ArrowRight,
  GitBranch,
  Network,
  Download
} from "lucide-react";
import { downloadExecutiveHTMLReport } from "@/lib/utils/generateExecutiveReport";

export const Route = createFileRoute("/architecture")({
  head: () => ({
    meta: [
      { title: "System Architecture & Technical Foundations · NETRA-RAIL" },
      { name: "description", content: "Official technical architecture, 4-pillar matrix, research proofs, class diagrams, and team details for Far Away Hackathon 2026." },
    ],
  }),
  component: ArchitecturePage,
});

export function ArchitecturePage() {
  return (
    <Shell>
      <PageHeader
        eyebrow="Technical Proposal & Research Foundation"
        title="NETRA-RAIL Architecture & Multi-Agent Framework"
        description="A Closed-Loop Autonomous Multi-Agent Platform for Unified Industrial Freight Logistics, Dynamic Rail Traffic Orchestration, and Predictive Infrastructure Safety."
        icon={<Layers className="w-6 h-6" />}
      />

      <div className="mx-auto max-w-6xl px-6 py-8 space-y-10">
        {/* Submission Metadata Card */}
        <div className="rounded-3xl border border-white/20 bg-slate-900/90 text-white p-6 md:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
            <div>
              <div className="flex items-center gap-2 text-saffron text-xs font-bold uppercase tracking-widest mb-1">
                <Award className="w-4 h-4" /> Far Away Hackathon 2026 · Theme: Railways
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-extrabold text-white">
                Team Japan Buddies
              </h2>
              <p className="text-sm text-slate-300 mt-1 font-medium">
                Indore Institute of Science and Technology, Indore
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-slate-200">
                  Manasvi Gangrade (Team Lead)
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-slate-200">
                  Navneet Kaur
                </span>
                <span className="px-3 py-1 rounded-full bg-saffron/20 border border-saffron/30 text-xs font-bold text-saffron">
                  Suhani Sharma
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-slate-200">
                  Muskan Lodhi
                </span>
              </div>
              <button
                onClick={() => downloadExecutiveHTMLReport(
                  {
                    title: "NETRA-RAIL Official Technical Architecture Dossier",
                    subtitle: "Full System Architecture · 4-Pillar Matrix · Evolutionary JSSP & AKNN Proofs",
                    category: "Technical Architecture Proposal"
                  },
                  `NETRA_RAIL_Technical_Architecture_Proposal_${Date.now()}.html`
                )}
                className="mt-1 px-4 py-2 rounded-xl bg-saffron hover:bg-saffron/90 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg transition active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Export Technical Proposal Dossier (HTML)</span>
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-slate-400 font-extrabold uppercase text-[9px]">Network Scope</div>
              <div className="text-sm font-bold text-white mt-0.5">68,000+ Route KM</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-slate-400 font-extrabold uppercase text-[9px]">Daily Operational Scale</div>
              <div className="text-sm font-bold text-white mt-0.5">13,000+ Trains</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-slate-400 font-extrabold uppercase text-[9px]">Annual Freight Transports</div>
              <div className="text-sm font-bold text-white mt-0.5">1.4 Billion Tonnes</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-slate-400 font-extrabold uppercase text-[9px]">Multilingual Accessibility</div>
              <div className="text-sm font-bold text-emerald-400 mt-0.5">230+ Languages</div>
            </div>
          </div>
        </div>

        {/* 4 SIH Problem Statements Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-saffron" />
            <h3 className="text-xl font-display font-extrabold text-white">
              The 4 Ministry Problem Statements Solved Simultaneously
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Problem 1 */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold bg-primary/20 text-sky-400 border border-primary/30">
                  PILLAR A · Port Intermodal Logistics
                </span>
                <Ship className="w-4 h-4 text-sky-400" />
              </div>
              <h4 className="font-bold text-white text-base">
                Intermodal Freight Synchronisation
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Addressing severe coordination mismatches between maritime vessel arrival schedules at industrial ports (Mundra, JNPT, Vizag) and freight train dispatches, eliminating cascading demurrage losses and idle wagon costs.
              </p>
              <div className="pt-2 border-t border-white/10 text-[11px] font-bold text-saffron flex items-center gap-1">
                Solved by Pillar A Engine <ArrowRight className="w-3 h-3" />
              </div>
            </div>

            {/* Problem 2 */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold bg-saffron/20 text-saffron border border-saffron/30">
                  PILLAR B · Rail Corridor JSSP
                </span>
                <TrainTrack className="w-4 h-4 text-saffron" />
              </div>
              <h4 className="font-bold text-white text-base">
                Dynamic Section Throughput Maximisation
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Solving the Job Shop Scheduling Problem (JSSP) for high-density corridors operating mixed-speed rolling stock (Vande Bharat @ 160km/h vs Freight @ 40km/h) using LLM-driven dynamic precedence heuristics with sub-second overrides.
              </p>
              <div className="pt-2 border-t border-white/10 text-[11px] font-bold text-saffron flex items-center gap-1">
                Solved by Pillar B Engine <ArrowRight className="w-3 h-3" />
              </div>
            </div>

            {/* Problem 3 */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  PILLAR C · Smartphone IMU Telemetry
                </span>
                <Smartphone className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="font-bold text-white text-base">
                Cost-Prohibitive Infrastructure Anomaly Detection
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Replacing expensive, periodic geometry car inspections with crowdsourced 3-axis smartphone IMU sensor telemetry from passenger phones. Raw vector streams are indexed using AKNN algorithms with formal accuracy guarantees.
              </p>
              <div className="pt-2 border-t border-white/10 text-[11px] font-bold text-saffron flex items-center gap-1">
                Solved by Pillar C Engine <ArrowRight className="w-3 h-3" />
              </div>
            </div>

            {/* Problem 4 */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  PILLAR D · Garun Drone CV Inspection
                </span>
                <Bot className="w-4 h-4 text-rose-400" />
              </div>
              <h4 className="font-bold text-white text-base">
                Hazardous Manual Track Component Auditing
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Eliminating trackmen exposure to hazardous rail environments through Garun autonomous drone dispatch. Real-time convolutional CV models inspect laser-marked QR codes on track fittings, joint bars, and surface fissures.
              </p>
              <div className="pt-2 border-t border-white/10 text-[11px] font-bold text-saffron flex items-center gap-1">
                Solved by Pillar D Engine <ArrowRight className="w-3 h-3" />
              </div>
            </div>

            {/* Problem 5 - Role Adaptive Mobile UX Layer */}
            <div className="md:col-span-2 rounded-2xl border border-saffron/30 bg-saffron/10 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold bg-saffron text-slate-950">
                  STRUCTURAL GAP 5 · UNIFIED HUMAN INTERFACE
                </span>
                <Globe className="w-4 h-4 text-saffron" />
              </div>
              <h4 className="font-bold text-white text-base">
                NETRA-RAIL MOBILE: Single-Binary Role-Adaptive Application Framework
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                No autonomous system can operate as a black box. NETRA-RAIL MOBILE reshapes its navigation, dashboard, permissions, and visual language around 4 stakeholder identities at login:
                <br /><strong>1. Passenger (Human Sensor):</strong> 1-tap IMU telemetry contribution, explainable delay narrative, Guardian score.
                <br /><strong>2. Freight Coordinator:</strong> Live vessel-ETA push alerts, demurrage-risk meter, 1-tap dispatch approval/override with reason capture.
                <br /><strong>3. Station Master (Precedence Co-Pilot):</strong> Real-time JSSP loop-line decision feed with manual reclaim authority.
                <br /><strong>4. Trackman & Crew:</strong> Offline-capable geo-tagged drone defect work orders & 1-tap resolution clearance.
              </p>
              <div className="pt-2 border-t border-saffron/20 text-[11px] font-bold text-saffron flex items-center gap-1">
                Solved by Shared Multilingual Role-Adaptive Mobile Core <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>

        {/* Research Papers & Mathematical Foundations */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-display font-extrabold text-white">
              Research Foundations & Mathematical Frameworks
            </h3>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="text-xs font-bold text-saffron uppercase tracking-wider">
                  Pillar B Research Foundation
                </div>
                <h5 className="font-bold text-white text-sm">
                  Automating Heuristic Design with Large Language Models
                </h5>
                <p className="text-xs text-slate-300">
                  Deploys evolutionary mutation and crossover operators to generate dynamic JSSP scheduling heuristics with elitism convergence guarantees on benchmark corridors.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="text-xs font-bold text-primary uppercase tracking-wider">
                  Pillar C Research Foundation
                </div>
                <h5 className="font-bold text-white text-sm">
                  Similarity Search on High-Dimensional Vector Data
                </h5>
                <p className="text-xs text-slate-300">
                  Transforms 3-axis IMU streams into high-dimensional geometric vectors using Approximate K-Nearest Neighbour (AKNN) with rate-distortion bounds & Johnson-Lindenstrauss projections.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Pillar D Research Foundation
                </div>
                <h5 className="font-bold text-white text-sm">
                  Garun Geospatial AI & Municipal Smart City CV
                </h5>
                <p className="text-xs text-slate-300">
                  Originally engineered for Indore Municipal Corporation's illegal construction detection under Smart City, retrained for railway track fasteners, joint bars, and surface fissures.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Multilingual Layer Research Foundation
                </div>
                <h5 className="font-bold text-white text-sm">
                  IndicTrans2 Multilingual Translation Framework
                </h5>
                <p className="text-xs text-slate-300">
                  Demonstrated live at Bharat Mandapam (New Delhi), supporting natural language interaction in 230+ Indic and global dialects for frontline railway operators.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Closed-Loop Autonomous Flywheel Flow Diagram */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xl font-display font-extrabold text-white">
              Data Flow & Autonomous System Architecture (DFD)
            </h3>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950 p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center text-xs">
              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/30 text-white space-y-1">
                <Ship className="w-6 h-6 text-primary mx-auto" />
                <div className="font-bold">1. Vessel Arrival</div>
                <div className="text-[10px] text-slate-400">ETA ingested at Mundra/JNPT</div>
              </div>

              <div className="p-4 rounded-2xl bg-saffron/10 border border-saffron/30 text-white space-y-1">
                <TrainTrack className="w-6 h-6 text-saffron mx-auto" />
                <div className="font-bold">2. JSSP Corridor Entry</div>
                <div className="text-[10px] text-slate-400">Mainline precedence solved in 218ms</div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-white space-y-1">
                <Smartphone className="w-6 h-6 text-amber-400 mx-auto" />
                <div className="font-bold">3. IMU Vibration Flag</div>
                <div className="text-[10px] text-slate-400">22.3°N, 73.1°E isolated by AKNN</div>
              </div>

              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-white space-y-1">
                <ShieldAlert className="w-6 h-6 text-rose-500 mx-auto" />
                <div className="font-bold">4. Slow Zone Enforced</div>
                <div className="text-[10px] text-slate-400">30 km/h applied automatically</div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-white space-y-1">
                <Bot className="w-6 h-6 text-emerald-400 mx-auto" />
                <div className="font-bold">5. Garun Drone Clearance</div>
                <div className="text-[10px] text-slate-400">Aerial CV verification & restriction lift</div>
              </div>
            </div>

            <div className="text-center pt-2">
              <Link
                to="/flywheel"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-saffron text-white font-bold hover:shadow-lg transition-all"
              >
                Launch Interactive Flywheel Simulator <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
