import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Shell, PageHeader } from "@/components/netra/Shell";
import {
  Radar,
  Ship,
  TrainTrack,
  Smartphone,
  Bot,
  ShieldAlert,
  CheckCircle2,
  Radio,
  Layers,
  MapPin,
  Activity,
  Zap,
  RefreshCw,
  Search,
  Users,
  Wifi,
  Download
} from "lucide-react";
import { getCollaborationLiveUpdates, simulateRemoteOperatorAction } from "@/lib/api/datasets.functions";
import { downloadExecutiveHTMLReport } from "@/lib/utils/generateExecutiveReport";
import { GarunDroneScanner } from "@/components/netra/GarunDroneScanner";

export const Route = createFileRoute("/radar")({
  head: () => ({
    meta: [
      { title: "Geospatial Rail-Grid Radar · NETRA-RAIL" },
      { name: "description", content: "Real-time spatial radar tracking maritime ports, JSSP train traffic corridors, crowdsourced IMU sensor flags, and Garun drone missions." },
    ],
  }),
  component: RadarPage,
});

type GISPin = {
  id: string;
  name: string;
  type: "port" | "train" | "imu" | "drone";
  x: number; // percentage
  y: number; // percentage
  status: string;
  details: string;
  metricLabel: string;
  metricValue: string;
  locationName: string;
};

const initialPins: GISPin[] = [
  {
    id: "pin-1",
    name: "Mundra Port Logistics Terminal",
    type: "port",
    x: 24,
    y: 42,
    status: "OPTIMISED",
    details: "MV Himalaya docked · 48,200T Iron Ore · Dwell reduction: 86.9%",
    metricLabel: "Active Cargo Vessels",
    metricValue: "18 Ships",
    locationName: "Gujarat Maritime Hub",
  },
  {
    id: "pin-2",
    name: "JNPT Port Cargo Complex",
    type: "port",
    x: 29,
    y: 64,
    status: "SYNCED",
    details: "MV Konkan docked · 26,100T Containers · Freight Queue Ready",
    metricLabel: "Container Yard Fill",
    metricValue: "42%",
    locationName: "Navi Mumbai Terminal",
  },
  {
    id: "pin-3",
    name: "WDFC Freight Corridor",
    type: "train",
    x: 34,
    y: 38,
    status: "CLEAR",
    details: "JSSP Priority Active · 24.2 trains/h · Mean solve speed: 218.7ms",
    metricLabel: "Section Velocity",
    metricValue: "92 km/h",
    locationName: "Rewari–Palanpur Line",
  },
  {
    id: "pin-4",
    name: "Vande Bharat Express (Train #20901)",
    type: "train",
    x: 32,
    y: 52,
    status: "EXPRESS PASS",
    details: "Overriding Freight #FD-408 at Loop Line 3 · Zero delay minutes",
    metricLabel: "Corridor Velocity",
    metricValue: "158 km/h",
    locationName: "Vadodara–Surat Section",
  },
  {
    id: "pin-5",
    name: "Section 7 Vibration Anomaly Flag",
    type: "imu",
    x: 33,
    y: 56,
    status: "SLOW ZONE 30 KM/H",
    details: "AKNN Vector Cluster isolated · GPS: 21.1702 N, 72.8311 E · Peak Z-axis: 3.42g",
    metricLabel: "Sensor Anomaly Peak",
    metricValue: "3.42 g",
    locationName: "Surat Junction South",
  },
  {
    id: "pin-6",
    name: "Garun Inspection Drone (GRN-03)",
    type: "drone",
    x: 35,
    y: 57,
    status: "DEFECT CONFIRMED",
    details: "CV inference confirmed Transverse Track Fissure · Model confidence: 96.4%",
    metricLabel: "CV Confidence",
    metricValue: "96.4%",
    locationName: "Surat–Valsad Track Inspection",
  },
  {
    id: "pin-7",
    name: "Vishakhapatnam Port Terminal",
    type: "port",
    x: 68,
    y: 62,
    status: "OPTIMISED",
    details: "MV Coromandel docked · 34,000T Coal · Train Dispatch Queue Synced",
    metricLabel: "Demurrage Savings",
    metricValue: "₹4.2 Cr",
    locationName: "East Coast Terminal",
  },
  {
    id: "pin-8",
    name: "EDFC Eastern Freight Corridor",
    type: "train",
    x: 62,
    y: 34,
    status: "CLEAR",
    details: "Dhanbad Coal Corridor · 28.6 trains/h · Zero scheduling conflicts",
    metricLabel: "Throughput Boost",
    metricValue: "+45.6%",
    locationName: "Ludhiana–Dankuni Line",
  },
];

export function RadarPage() {
  const [pins, setPins] = useState<GISPin[]>(initialPins);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "port" | "train" | "imu" | "drone">("all");
  const [activePin, setActivePin] = useState<GISPin>(initialPins[4]); // Default to Section 7 IMU flag
  const [simulating, setSimulating] = useState(false);
  const [liveStreamNotice, setLiveStreamNotice] = useState<string | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<string>("");

  const filteredPins = pins.filter((p) => selectedFilter === "all" || p.type === selectedFilter);

  // Challenge #279: Non-Disruptive Spatial GIS Radar Live Update Loop
  useEffect(() => {
    // BroadcastChannel for instant real-time GIS Radar update across windows/tabs
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      const bc = new BroadcastChannel("netra_grid_collaboration");
      bc.onmessage = (event) => {
        if (event.data?.payload) {
          const payload = event.data.payload;
          setLiveStreamNotice(`⚡ Live Sync (Broadcast): ${payload.action_triggered || "Remote Operator Action"}`);
          setTimeout(() => setLiveStreamNotice(null), 4000);

          const newSpatialPin: GISPin = {
            id: `broadcast-pin-${Date.now()}`,
            name: `REMOTE OVERRIDE: ${payload.action_triggered || "Zonal Command"}`,
            type: "imu",
            x: 28 + Math.floor(Math.random() * 35),
            y: 35 + Math.floor(Math.random() * 35),
            status: "REMOTE DIRECTIVE SYNCED",
            details: payload.user_query || "Remote Zonal Operator Action synced live across grid.",
            metricLabel: "Sync Status",
            metricValue: "REAL-TIME",
            locationName: "Zonal Grid Coordination",
          };
          setPins((prev) => [newSpatialPin, ...prev]);
        }
      };
      return () => bc.close();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data: any = await getCollaborationLiveUpdates();
        if (data && data.slow_zones) {
          setLastSyncTime(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
          
          if (data.slow_zones.length > 0) {
            const latestZone = data.slow_zones[data.slow_zones.length - 1];
            setPins((prevPins) => {
              const exists = prevPins.some((p) => p.name.includes(latestZone.section));
              if (!exists) {
                const newSpatialPin: GISPin = {
                  id: `remote-pin-${Date.now()}`,
                  name: `REMOTE OVERRIDE: ${latestZone.section}`,
                  type: "imu",
                  x: 30 + Math.floor(Math.random() * 30),
                  y: 40 + Math.floor(Math.random() * 30),
                  status: `SLOW ZONE ${latestZone.speed_limit} KM/H`,
                  details: `Enforced by remote zonal master · ${latestZone.reason} · Non-disruptive grid sync`,
                  metricLabel: "Speed Limit",
                  metricValue: `${latestZone.speed_limit} km/h`,
                  locationName: latestZone.section,
                };
                setLiveStreamNotice(`⚡ Live Sync (Challenge #279): Remote zonal update received for ${latestZone.section}`);
                setTimeout(() => setLiveStreamNotice(null), 4000);
                return [newSpatialPin, ...prevPins];
              }
              return prevPins;
            });
          }
        }
      } catch (e) {
        // Non-disruptive background stream
      }
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const triggerEmergencySim = async () => {
    setSimulating(true);
    try {
      await simulateRemoteOperatorAction();
      setLiveStreamNotice("⚡ Live Sync (Challenge #279): Remote Operator Action simulated across Zonal Grid!");
      setTimeout(() => setLiveStreamNotice(null), 4000);
    } catch (e) {
      console.error(e);
    } finally {
      setSimulating(false);
    }
  };

  return (
    <Shell>
      <PageHeader
        eyebrow="Geospatial Intelligence & Spatial Monitoring"
        title="Rail-Grid GIS Telemetry Radar"
        description="Real-time spatial visualization mapping maritime port freight terminals, JSSP train traffic corridors, crowdsourced IMU sensor flags, and Garun drone missions across Indian Railways."
        icon={<Radar className="w-6 h-6" />}
      />

      <div className="mx-auto max-w-6xl px-6 py-6 space-y-6">
        {/* Challenge #279: Multi-Operator Co-Pilot Grid Banner */}
        <div className="rounded-2xl border border-emerald-500/30 bg-slate-900 p-4 shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 grid place-items-center text-emerald-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 font-display font-extrabold text-sm text-white">
                <span>Multi-Operator Zonal Command Grid</span>
                <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  CHALLENGE #279 LIVE SYNC
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5 font-medium">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Mundra Port Dispatcher</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" /> Vadodara JSSP Control</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" /> Surat Telemetry Node</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" /> Garun Drone Pilot</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {liveStreamNotice && (
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/30 animate-pulse">
                {liveStreamNotice}
              </span>
            )}
            <button
              onClick={triggerEmergencySim}
              disabled={simulating}
              className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition active:scale-95 disabled:opacity-50"
            >
              <ShieldAlert className={`w-4 h-4 ${simulating ? "animate-spin" : ""}`} />
              {simulating ? "Syncing Grid Event..." : "Simulate Remote Zonal Event"}
            </button>
          </div>
        </div>

        {/* Controls & Filter Bar */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-3.5 py-1.5 rounded-full border transition ${
                selectedFilter === "all"
                  ? "bg-white text-slate-900 border-white shadow-md"
                  : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
              }`}
            >
              All Layers ({pins.length})
            </button>

            <button
              onClick={() => setSelectedFilter("port")}
              className={`px-3 py-1.5 rounded-full border flex items-center gap-1.5 transition ${
                selectedFilter === "port"
                  ? "bg-primary text-white border-primary shadow-md"
                  : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
              }`}
            >
              <Ship className="w-3.5 h-3.5" /> Ports (Pillar A)
            </button>

            <button
              onClick={() => setSelectedFilter("train")}
              className={`px-3 py-1.5 rounded-full border flex items-center gap-1.5 transition ${
                selectedFilter === "train"
                  ? "bg-saffron text-white border-saffron shadow-md"
                  : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
              }`}
            >
              <TrainTrack className="w-3.5 h-3.5" /> JSSP Trains (Pillar B)
            </button>

            <button
              onClick={() => setSelectedFilter("imu")}
              className={`px-3 py-1.5 rounded-full border flex items-center gap-1.5 transition ${
                selectedFilter === "imu"
                  ? "bg-amber-500 text-slate-950 border-amber-500 shadow-md font-bold"
                  : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" /> IMU Sensors (Pillar C)
            </button>

            <button
              onClick={() => setSelectedFilter("drone")}
              className={`px-3 py-1.5 rounded-full border flex items-center gap-1.5 transition ${
                selectedFilter === "drone"
                  ? "bg-emerald-500 text-slate-950 border-emerald-500 shadow-md font-bold"
                  : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
              }`}
            >
              <Bot className="w-3.5 h-3.5" /> Garun Drones (Pillar D)
            </button>
            <div className="flex items-center gap-2">
            <button
              onClick={() => downloadExecutiveHTMLReport(
                {
                  title: "NETRA-RAIL Spatial Telemetry & Radar Dossier",
                  subtitle: "Geospatial GIS Tracking · 4-Pillar Integrated Network Audit",
                  category: "Geospatial Radar Dossier"
                },
                `NETRA_RAIL_Spatial_Radar_Dossier_${Date.now()}.html`
              )}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shadow-sm"
              title="Download Standalone HTML Spatial Dossier"
            >
              <Download className="w-3.5 h-3.5 text-saffron" />
              <span>Export Spatial Dossier</span>
            </button>
          </div>
          </div>

          {/* Crisis Simulator Button */}
          <button
            onClick={triggerEmergencySim}
            disabled={simulating}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition active:scale-95 disabled:opacity-50 ml-auto"
          >
            <ShieldAlert className={`w-4 h-4 ${simulating ? "animate-spin" : ""}`} />
            {simulating ? "Injecting Sensor Anomaly..." : "Inject Simulated Anomaly"}
          </button>
        </div>

        {/* Main Radar Map & GIS Inspector Grid */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Spatial Radar Container (Left 7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl border border-white/15 bg-slate-950 p-5 shadow-2xl relative overflow-hidden min-h-[440px] flex flex-col justify-between">
            {/* Radar Grid Lines Background */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
            
            {/* Animated Rotating Radar Sweep Line */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-[450px] h-[450px] rounded-full border border-primary/20 relative animate-pulse">
                <div className="absolute inset-0 rounded-full border border-primary/10 scale-75" />
                <div className="absolute inset-0 rounded-full border border-primary/10 scale-50" />
                <div className="absolute top-1/2 left-0 right-0 h-px bg-primary/20" />
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/20" />
              </div>
            </div>

            {/* Header Overlay */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  India Rail-Grid GIS Sweep · 68,000 Route KM
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                {filteredPins.length} Active Spatial Nodes
              </span>
            </div>

            {/* Interactive Pins Overlay */}
            <div className="relative z-10 my-12 h-[340px] w-full">
              {filteredPins.map((pin) => {
                const isActive = activePin.id === pin.id;
                let bgClass = "bg-primary text-white border-white";
                if (pin.type === "train") bgClass = "bg-saffron text-white border-white";
                if (pin.type === "imu") bgClass = "bg-amber-500 text-slate-950 border-white";
                if (pin.type === "drone") bgClass = "bg-emerald-500 text-slate-950 border-white";

                return (
                  <button
                    key={pin.id}
                    onClick={() => setActivePin(pin)}
                    style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 z-20 ${
                      isActive ? "scale-125 z-30" : "hover:scale-110"
                    }`}
                  >
                    <div className="relative flex items-center justify-center">
                      <span className={`absolute -inset-2 rounded-full opacity-40 animate-ping ${
                        pin.type === "imu" ? "bg-amber-500" : pin.type === "drone" ? "bg-emerald-500" : "bg-primary"
                      }`} />
                      <div className={`w-8 h-8 rounded-full border-2 grid place-items-center shadow-lg font-bold text-xs ${bgClass}`}>
                        {pin.type === "port" && <Ship className="w-4 h-4" />}
                        {pin.type === "train" && <TrainTrack className="w-4 h-4" />}
                        {pin.type === "imu" && <Smartphone className="w-4 h-4" />}
                        {pin.type === "drone" && <Bot className="w-4 h-4" />}
                      </div>
                    </div>
                    {/* Hover Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap px-2.5 py-1 rounded-md bg-slate-900 text-white text-[10px] font-bold border border-white/20 shadow-xl pointer-events-none">
                      {pin.name}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Radar Status Bar */}
            <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 font-mono border-t border-white/10 pt-3">
              <span>LAT: 20.5937° N | LON: 78.9629° E</span>
              <span className="text-emerald-400 font-bold">Closed-Loop Autonomous Flywheel Active</span>
            </div>
          </div>

          {/* GIS Node Inspector Card (Right 5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl border border-white/15 bg-slate-900 p-6 shadow-2xl flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-saffron" />
                  <h3 className="font-display font-bold text-white text-base">Node Inspector</h3>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-saffron/10 text-saffron border border-saffron/20">
                  {activePin.status}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Selected Telemetry Node</div>
                  <h4 className="text-lg font-display font-extrabold text-white mt-0.5">{activePin.name}</h4>
                  <div className="text-xs font-semibold text-primary mt-0.5">{activePin.locationName}</div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">{activePin.metricLabel}</span>
                    <span className="text-base font-extrabold font-mono text-emerald-400">{activePin.metricValue}</span>
                  </div>
                  <div className="border-t border-white/10 pt-2 text-xs text-slate-300 leading-relaxed font-medium">
                    {activePin.details}
                  </div>
                </div>

                {/* Pillar Specific Actions */}
                <div className="space-y-2 pt-2">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Pillar Actuator Integration</div>
                  {activePin.type === "port" && (
                    <Link
                      to="/pillar-a"
                      className="w-full py-2.5 rounded-xl bg-primary text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary/90 transition shadow-md"
                    >
                      Open Pillar A Freight Logistics <Ship className="w-4 h-4" />
                    </Link>
                  )}
                  {activePin.type === "train" && (
                    <Link
                      to="/pillar-b"
                      className="w-full py-2.5 rounded-xl bg-saffron text-white font-bold text-xs flex items-center justify-center gap-2 hover:opacity-90 transition shadow-md"
                    >
                      Open Pillar B JSSP Throughput <TrainTrack className="w-4 h-4" />
                    </Link>
                  )}
                  {activePin.type === "imu" && (
                    <Link
                      to="/pillar-c"
                      className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 hover:bg-amber-400 transition shadow-md"
                    >
                      Open Pillar C IMU Telemetry <Smartphone className="w-4 h-4" />
                    </Link>
                  )}
                  {activePin.type === "drone" && (
                    <Link
                      to="/pillar-d"
                      className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 hover:bg-emerald-400 transition shadow-md"
                    >
                      Open Pillar D Garun Drone Audit <Bot className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-center">
              <Link
                to="/command-center"
                className="text-xs text-slate-400 hover:text-white font-bold inline-flex items-center gap-1 transition"
              >
                Query node via Multilingual Console →
              </Link>
            </div>
          </div>
        </div>

        {/* Garun Autonomous Drone Track Scanner Segment */}
        <div className="space-y-3 pt-4">
          <div className="flex items-center gap-2 text-white font-extrabold text-lg">
            <Bot className="w-5 h-5 text-emerald-400" />
            <span>Garun CV Drone Live Aerial Track Inspection Stream</span>
          </div>
          <GarunDroneScanner dark={true} />
        </div>
      </div>
    </Shell>
  );
}
