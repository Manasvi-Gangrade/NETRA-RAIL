import { useEffect, useState } from "react";

export function useCountUp(target: number, duration = 1600, decimals = 0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString("en-IN");
}

export function useTicker(initial: number, deltaRange = 2, intervalMs = 3000) {
  const [v, setV] = useState(initial);
  useEffect(() => {
    const id = setInterval(() => {
      setV((x) => Math.max(0, x + (Math.random() * 2 - 1) * deltaRange));
    }, intervalMs);
    return () => clearInterval(id);
  }, [deltaRange, intervalMs]);
  return v;
}
