import { Link } from "@tanstack/react-router";
import { Train, Bell, Shield } from "lucide-react";
import { TrainTrack } from "./TrainTrack";
import { useEffect, useState } from "react";

const links = [
  { to: "/", label: "Overview" },
  { to: "/pillar-a", label: "Pillar A" },
  { to: "/pillar-b", label: "Pillar B" },
  { to: "/pillar-c", label: "Pillar C" },
  { to: "/pillar-d", label: "Pillar D" },
  { to: "/flywheel", label: "Flywheel" },
  { to: "/command-center", label: "Command Center" },
] as const;

const tickerItems = [
  "🚆 Vande Bharat #VB-12 · Western DFC · ON TIME",
  "⚓ MV Himalaya · Mundra · ETA 22 min",
  "🛰 IMU anomaly cleared · Itarsi KM 092",
  "🤖 Drone GRN-03 · 62% inspection complete",
  "📈 Section throughput · 94 trains/hr",
  "💹 ₹2.3 Cr saved today · freight sync",
];

export function Nav() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const u = () => setTime(new Date().toLocaleTimeString("en-IN", { hour12: false }));
    u();
    const t = setInterval(u, 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-border">
      <TrainTrack className="h-5" />
      <div className="mx-auto max-w-7xl px-6 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 group">
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
        <nav className="hidden md:flex items-center gap-0.5 ml-2">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-1.5 text-sm rounded-full text-muted-foreground hover:text-primary hover:bg-cream transition-colors"
              activeProps={{ className: "px-3 py-1.5 text-sm rounded-full bg-primary text-primary-foreground shadow-sm" }}
              activeOptions={{ exact: true }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-cream-bg text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
            <span>System Status · All Pillars Active</span>
            <div className="flex items-center gap-1 ml-1">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="live-dot" style={{ animationDelay: `${i * 0.25}s` }} />
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
            {time} IST
          </div>
          <button className="relative w-9 h-9 grid place-items-center rounded-full border border-border bg-white hover:bg-cream transition">
            <Bell className="w-4 h-4 text-primary" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive animate-pulse" />
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
