import { Link } from "@tanstack/react-router";
import { Train, Clock, MapPin, Cloud, Volume2, VolumeX, Download, FileText } from "lucide-react";
import { TrainTrack } from "./TrainTrack";
import { useEffect, useState } from "react";
import { useTTS, GoogleTranslateWidget } from "@/components/netra/TTSProvider";
import { downloadExecutiveHTMLReport } from "@/lib/utils/generateExecutiveReport";

export function Nav() {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const { ttsEnabled, setTtsEnabled } = useTTS();

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-IN", { hour12: true, hour: "2-digit", minute: "2-digit", second: "2-digit" }).toLowerCase());
      setCurrentDate(now.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#0b1329]/95 backdrop-blur-md text-white border-b border-white/5 w-full overflow-hidden">
      <TrainTrack className="h-4" />
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-2.5 flex items-center justify-between gap-2 md:gap-4 w-full">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-white/10 grid place-items-center shadow-sm border border-white/20">
            <Train className="w-4 h-4 text-white" />
          </div>
          <div className="leading-tight shrink-0">
            <div className="font-display font-extrabold text-sm md:text-base tracking-tight text-white">
              NETRA-RAIL
            </div>
            <div className="text-[9px] uppercase tracking-[0.16em] text-white/70 font-semibold hidden sm:block">Autonomous Rail-Grid</div>
          </div>
        </Link>

        {/* Header Nav Links */}
        <nav className="hidden xl:flex items-center gap-1 text-xs font-bold text-white/80 shrink-0">
          <Link to="/" className="px-2.5 py-1.5 rounded-lg hover:bg-white/10 hover:text-white transition">
            Overview
          </Link>
          <Link to="/flywheel" className="px-2.5 py-1.5 rounded-lg hover:bg-white/10 hover:text-white transition">
            Flywheel
          </Link>
          <Link to="/radar" className="px-2.5 py-1.5 rounded-lg hover:bg-white/10 hover:text-white transition">
            GIS Radar
          </Link>
          <Link to="/command-center" className="px-2.5 py-1.5 rounded-lg hover:bg-white/10 hover:text-white transition">
            Command Center
          </Link>
          <Link to="/architecture" className="px-2.5 py-1.5 rounded-lg bg-saffron/20 border border-saffron/30 text-saffron hover:bg-saffron/30 transition">
            Architecture
          </Link>
        </nav>

        {/* Dynamic Header Widget Group */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {/* Capsule */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/10 text-[10px] md:text-xs font-semibold text-white shadow-sm shrink-0">
            {/* Time */}
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-white animate-pulse" />
              <span className="font-mono text-white">{currentTime}</span>
            </div>
            <div className="h-3 w-px bg-white/20 hidden xl:block" />
            
            {/* Location */}
            <div className="hidden xl:flex items-center gap-0.5">
              <MapPin className="w-3 h-3 text-white" />
              <span className="text-white">New Delhi</span>
            </div>
          </div>

          {/* Google Translate Widget */}
          <div className="flex items-center shrink-0">
            <GoogleTranslateWidget />
          </div>

          {/* Global HTML Executive Report Export Button */}
          <button
            onClick={async () => {
              try {
                const { getVesselFreight, getTrafficThroughput, getIMUSensors, getDroneInspections, getCommandHistory } = await import("@/lib/api/datasets.functions");
                const [vessels, throughput, imu, drones, history] = await Promise.all([
                  getVesselFreight().catch(() => []),
                  getTrafficThroughput().catch(() => []),
                  getIMUSensors().catch(() => []),
                  getDroneInspections().catch(() => []),
                  getCommandHistory().catch(() => []),
                ]);

                downloadExecutiveHTMLReport(
                  {
                    title: "IRPWM Track Inspection & Operational Audit Report",
                    subtitle: "Indian Railways Permanent Way Manual Standard · NETRA-RAIL Multi-Agent Grid Audit",
                    category: "Official IRPWM Audit",
                    vesselsData: vessels,
                    throughputData: throughput,
                    imuData: imu,
                    dronesData: drones,
                    historyData: history,
                  },
                  `NETRA_RAIL_IRPWM_Official_Audit_Report_${Date.now()}.html`
                );
              } catch (err) {
                downloadExecutiveHTMLReport({}, `NETRA_RAIL_IRPWM_Official_Audit_Report_${Date.now()}.html`);
              }
            }}
            className="px-3 py-1.5 rounded-xl bg-saffron hover:bg-saffron/90 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-lg transition active:scale-95 shrink-0"
            title="Download Official IRPWM Track Inspection & Operational Audit Report"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export Report</span>
          </button>

          {/* Speaker Button */}
          <button
            onClick={() => setTtsEnabled(!ttsEnabled)}
            className={`w-8 h-8 rounded-xl grid place-items-center transition border shrink-0 ${
              ttsEnabled
                ? "bg-white text-[#0b1329] border-white hover:bg-white/90"
                : "bg-white/10 text-white border-white/20 hover:bg-white/25"
            }`}
            title={ttsEnabled ? "Disable Text-to-Speech Hover Reader" : "Enable Text-to-Speech Hover Reader"}
          >
            {ttsEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-gradient-to-b from-cream-bg to-white">
      <div className="mx-auto max-w-7xl px-6 py-10 grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-cool grid place-items-center">
              <Train className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-foreground">NETRA-RAIL</span>
          </div>
          <p className="mt-2 text-xs">National Enterprise Traffic, Routing & Autonomous Rail-Grid — built for Indian Railways.</p>
        </div>
        <div className="text-xs">
          <div className="font-semibold text-foreground mb-1">Far Away Hackathon 2026</div>
          <div>Theme: Railways · Closed-loop autonomous AI</div>
          <div className="mt-1">Team Japan Buddies — Manasvi Gangrade · Navneet Kaur · Suhani Sharma · Muskan Lodhi</div>
        </div>
        <div className="text-xs md:text-right">
          <div className="font-semibold text-foreground mb-1">System Status</div>
          <div className="flex md:justify-end items-center gap-2">
            <span className="live-dot" /> All four pillars · 99.97% uptime
          </div>
          <div className="mt-2">
            <a
              href="http://127.0.0.1:8000/docs"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 font-extrabold text-[11px] hover:bg-emerald-500/20 transition"
              title="Open Python FastAPI Interactive OpenAPI Swagger Documentation"
            >
              🐍 Python FastAPI Docs (port 8000)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
