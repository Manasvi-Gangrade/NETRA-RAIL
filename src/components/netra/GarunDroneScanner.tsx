import { useState, useEffect } from "react";
import { Bot, ShieldAlert, CheckCircle2, Radio, Zap, Scan, Crosshair, AlertTriangle } from "lucide-react";

export interface DroneDefect {
  id: string;
  component: string;
  confidence: string;
  status: "CRITICAL Crack" | "LOOSE Fastener" | "OK Fastener";
  bbox: { top: number; left: number; width: number; height: number };
}

export function GarunDroneScanner({ dark = true }: { dark?: boolean }) {
  const [scanning, setScanning] = useState(true);
  const [scanLaserY, setScanLaserY] = useState(10);
  const [altitude, setAltitude] = useState(14.2);
  const [defectsFound, setDefectsFound] = useState(3);
  const [droneState, setDroneState] = useState<"PATROLLING" | "SCANNING ANOMALY" | "SLOW ZONE ENFORCED">("PATROLLING");

  // Animate scanning laser beam up & down
  useEffect(() => {
    const interval = setInterval(() => {
      setScanLaserY((prev) => (prev >= 85 ? 10 : prev + 3));
    }, 80);
    return () => clearInterval(interval);
  }, []);

  // Slight altitude drift simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setAltitude((prev) => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`rounded-3xl border p-6 shadow-2xl relative overflow-hidden transition-all ${
      dark ? "bg-slate-950 border-emerald-500/30 text-white" : "bg-slate-900 border-emerald-500/20 text-white"
    }`}>
      {/* Background Cyber Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Drone Header HUD */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 grid place-items-center text-emerald-400 relative">
            <Bot className="w-5 h-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-2 font-display font-extrabold text-base text-white">
              <span>Garun Autonomous Drone GRN-04</span>
              <span className="text-[10px] uppercase font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Pillar D CV Scanner
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono mt-0.5 flex items-center gap-3">
              <span>ALT: <strong className="text-emerald-400">{altitude}m</strong></span>
              <span>BATTERY: <strong className="text-emerald-400">88%</strong></span>
              <span>5G MESH: <strong className="text-emerald-400">12ms</strong></span>
              <span>GPS: <strong className="text-emerald-400">22.31°N, 73.18°E</strong></span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-extrabold flex items-center gap-1.5 ${
            droneState === "PATROLLING"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              : "bg-rose-500/10 border-rose-500/30 text-rose-400 animate-pulse"
          }`}>
            <Radio className="w-3.5 h-3.5 animate-spin" /> {droneState}
          </span>
        </div>
      </div>

      {/* Visual Live Inspection Viewport */}
      <div className="relative w-full h-64 rounded-2xl border border-white/15 bg-slate-900 overflow-hidden shadow-inner group">
        {/* Track Line Representation */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Dual Parallel Steel Rails */}
          <div className="w-full h-24 relative flex flex-col justify-between py-2 bg-slate-950/80 border-y border-white/10">
            {/* Rail 1 */}
            <div className="w-full h-3 bg-gradient-to-r from-slate-600 via-slate-300 to-slate-600 shadow-lg relative">
              <div className="absolute inset-0 bg-emerald-400/20 animate-pulse" />
            </div>

            {/* Concrete Sleepers (Track Ties) */}
            <div className="w-full flex justify-between px-2 my-auto">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-4 h-12 bg-slate-800 border-x border-slate-700 rounded-sm shadow-md" />
              ))}
            </div>

            {/* Rail 2 */}
            <div className="w-full h-3 bg-gradient-to-r from-slate-600 via-slate-300 to-slate-600 shadow-lg relative">
              <div className="absolute inset-0 bg-emerald-400/20 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Scanning Laser Sweep Effect */}
        <div
          className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] transition-all duration-75 pointer-events-none z-20"
          style={{ top: `${scanLaserY}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-400 text-[9px] font-mono font-bold text-emerald-300 shadow-lg">
            GARUN LASER SPECTRUM SCANNER ACTIVE
          </div>
        </div>

        {/* AI Computer Vision Bounding Boxes (Simulated Track Defects) */}
        {/* Defect 1: Surface Fissure */}
        <div className="absolute top-16 left-[28%] w-20 h-16 border-2 border-rose-500 rounded-lg bg-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.4)] flex flex-col justify-between p-1 z-10 animate-pulse">
          <div className="text-[8px] font-mono font-bold bg-rose-600 text-white px-1 rounded w-fit">
            SURFACE CRACK #902
          </div>
          <div className="text-[8px] font-mono font-bold text-rose-300 text-right">
            CONF 99.4%
          </div>
        </div>

        {/* Defect 2: Fastener Loose */}
        <div className="absolute bottom-14 right-[35%] w-24 h-14 border-2 border-amber-400 rounded-lg bg-amber-400/10 shadow-[0_0_15px_rgba(251,191,36,0.3)] flex flex-col justify-between p-1 z-10">
          <div className="text-[8px] font-mono font-bold bg-amber-500 text-slate-950 px-1 rounded w-fit">
            FASTENER DEVIATION
          </div>
          <div className="text-[8px] font-mono font-bold text-amber-200 text-right">
            CONF 98.1%
          </div>
        </div>

        {/* Quadcopter Animated HUD Target Crosshair */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 opacity-70">
          <Crosshair className="w-16 h-16 text-emerald-400 animate-spin" style={{ animationDuration: "12s" }} />
        </div>

        {/* Bottom Telemetry Overlay */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-slate-300 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 z-30">
          <span className="flex items-center gap-1 text-emerald-400">
            <Scan className="w-3.5 h-3.5" /> FRAME RATE: 60 FPS
          </span>
          <span className="text-slate-400">MODEL: YOLO-Garun-V8-Rail</span>
          <span className="text-amber-400 font-bold">DEFECTS DETECTED: {defectsFound}</span>
        </div>
      </div>

      {/* Drone Action Controls */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-300 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Automated 30 km/h Slow Zone Enforced on Vadodara Corridor</span>
        </div>

        <button
          onClick={() => {
            setDroneState("SLOW ZONE ENFORCED");
            setDefectsFound((d) => d + 1);
            setTimeout(() => setDroneState("PATROLLING"), 3000);
          }}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg transition active:scale-95"
        >
          <Zap className="w-4 h-4" /> Trigger Garun Aerial Re-Inspection
        </button>
      </div>
    </div>
  );
}
