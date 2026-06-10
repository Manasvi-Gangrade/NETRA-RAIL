import { Train } from "lucide-react";

export function TrainTrack({ className = "" }: { className?: string }) {
  return (
    <div className={`relative h-6 w-full overflow-hidden ${className}`}>
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-[oklch(0.34_0.08_250/0.3)]" />
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] track-bg opacity-70" />
      <div className="absolute top-1/2 -translate-y-1/2 animate-train">
        <div className="flex items-center gap-1 text-[oklch(0.34_0.08_250)]">
          <div className="h-2 w-3 rounded-sm bg-saffron" />
          <div className="h-3 w-6 rounded-md bg-primary" />
          <div className="h-3 w-4 rounded-sm bg-primary/80" />
          <div className="h-3 w-4 rounded-sm bg-primary/60" />
          <Train className="w-4 h-4 text-primary" />
        </div>
      </div>
    </div>
  );
}
