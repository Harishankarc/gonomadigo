"use client";

import { useEffect, useRef } from "react";

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!glowRef.current) return;

      glowRef.current.style.left = `${e.clientX}px`;
      glowRef.current.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", move);

    return () =>
      window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={glowRef}
      className="
      fixed
      w-[500px]
      h-[500px]
      rounded-full
      pointer-events-none
      blur-[160px]
      bg-white/10
      -translate-x-1/2
      -translate-y-1/2
      z-0
      "
    />
  );
}