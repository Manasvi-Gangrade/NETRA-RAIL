import { Link } from "@tanstack/react-router";
import { Train, Clock, MapPin, Cloud, Volume2, VolumeX } from "lucide-react";
import { TrainTrack } from "./TrainTrack";
import { useEffect, useState } from "react";
import { useTTS, GoogleTranslateWidget } from "@/components/netra/TTSProvider";

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
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-border">
      <TrainTrack className="h-5" />
      <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-primary/10 grid place-items-center shadow-sm border border-border">
            <Train className="w-5 h-5 text-primary" />
          </div>
          <div className="leading-tight">
            <div className="font-display font-extrabold text-base tracking-tight">
              <span className="text-primary">NETRA-RAIL</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">Autonomous Rail-Grid</div>
          </div>
        </Link>

        {/* Dynamic Header Widget */}
        <div className="flex items-center gap-2 md:gap-3 ml-auto">
          {/* Capsule */}
          <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 rounded-full border border-border bg-[#f0f4f9]/85 text-[10px] md:text-xs font-semibold text-slate-700 shadow-sm">
            {/* Time */}
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span className="font-mono text-slate-800">{currentTime}</span>
            </div>
            <div className="h-3.5 w-px bg-slate-300" />
            
            {/* Date */}
            <div className="text-slate-600 truncate max-w-[80px] md:max-w-none">{currentDate}</div>
            <div className="h-3.5 w-px bg-slate-300" />
            
            {/* Location */}
            <div className="flex items-center gap-0.5">
              <MapPin className="w-3.5 h-3.5 text-destructive" />
              <span className="text-slate-800">New Delhi</span>
            </div>
            <div className="h-3.5 w-px bg-slate-300" />
            
            {/* Weather */}
            <div className="flex items-center gap-0.5">
              <Cloud className="w-3.5 h-3.5 text-sky-500" />
              <span className="text-slate-800">34.2°C</span>
            </div>
          </div>

          {/* Speaker Button */}
          <button
            onClick={() => setTtsEnabled(!ttsEnabled)}
            className={`w-9 h-9 rounded-xl grid place-items-center transition border shrink-0 ${
              ttsEnabled
                ? "bg-[#e0ebff] text-[#0052cc] border-[#b3d4ff] hover:bg-[#c2dcff]"
                : "bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100"
            }`}
            title={ttsEnabled ? "Disable Text-to-Speech Hover Reader" : "Enable Text-to-Speech Hover Reader"}
          >
            {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          
          <div className="h-4 w-px bg-border hidden sm:block shrink-0" />

          {/* Google Translate Widget */}
          <div className="flex items-center shrink-0">
            <GoogleTranslateWidget />
          </div>
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
          <div className="mt-1">Team Japan Buddies — Manasvi Gangrade · Navneet Kaur · Muskan Lodhi</div>
        </div>
        <div className="text-xs md:text-right">
          <div className="font-semibold text-foreground mb-1">System Status</div>
          <div className="flex md:justify-end items-center gap-2">
            <span className="live-dot" /> All four pillars · 99.97% uptime
          </div>
        </div>
      </div>
    </footer>
  );
}
