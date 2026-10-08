import { useEffect, useRef, useState } from "react";

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

/**
 * Shared 0→1 progress for milestone count-up. Starts once when `active`
 * becomes true. Respects prefers-reduced-motion.
 */
export function useCountUpProgress(active, durationMs = 2100) {
  const [progress, setProgress] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return undefined;
    startedRef.current = true;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setProgress(1);
      return undefined;
    }

    let frame = 0;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / durationMs);
      setProgress(easeOutCubic(t));
      if (t < 1) {
        frame = window.requestAnimationFrame(tick);
      } else {
        setProgress(1);
      }
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [active, durationMs]);

  return progress;
}

export function scaledCount(target, progress) {
  const n = Number(target) || 0;
  if (progress >= 1) return n;
  return Math.round(n * progress);
}
