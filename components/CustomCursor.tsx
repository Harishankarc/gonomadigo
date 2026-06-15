"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => {
  const mql = window.matchMedia("(pointer: fine)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
};

const getSnapshot = () => window.matchMedia("(pointer: fine)").matches;
const getServerSnapshot = () => false;

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (!enabled) return;

    let targetX = 0;
    let targetY = 0;
    let ringX = 0;
    let ringY = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      const dot = dotRef.current;
      if (dot) {
        dot.style.left = `${targetX}px`;
        dot.style.top = `${targetY}px`;
        dot.style.opacity = "1";
      }

      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, input, textarea, [role='button']");
      const ring = ringRef.current;
      if (ring) {
        ring.style.opacity = "1";
        ring.style.transform = interactive
          ? "translate(-50%, -50%) scale(1.6)"
          : "translate(-50%, -50%) scale(1)";
        ring.style.borderColor = interactive
          ? "rgba(116, 176, 38, 0.9)"
          : "rgba(116, 176, 38, 0.5)";
      }
    };

    const tick = () => {
      ringX += (targetX - ringX) * 0.15;
      ringY += (targetY - ringY) * 0.15;
      const ring = ringRef.current;
      if (ring) {
        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: 0, transition: "opacity 0.3s ease" }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ opacity: 0, transition: "opacity 0.3s ease, transform 0.2s ease, border-color 0.2s ease" }}
      />
    </>
  );
}
