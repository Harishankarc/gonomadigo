"use client";

import { useEffect, useRef } from "react";

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const move = (e: MouseEvent) => {
      const glow = glowRef.current;
      if (!glow) return;

      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
      glow.style.opacity = "1";
    };

    window.addEventListener("mousemove", move);

    return () =>
      window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={glowRef}
      className="
      hidden
      md:block
      fixed
      w-[500px]
      h-[500px]
      rounded-full
      pointer-events-none
      blur-[160px]
      bg-[#F3FFE7]/25
      -translate-x-1/2
      -translate-y-1/2
      z-0
      "
      style={{ opacity: 0, transition: "opacity 0.6s ease" }}
    />
  );
}
