"use client";

import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/src/lib/gsap";

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      smoothWheel: true,
    });
    lenisInstance = lenis;

    // Keep GSAP's pinned ScrollTrigger sections (e.g. Gallery) in sync
    // with Lenis's virtual scroll position.
    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Resume a scroll requested from another page via the navbar.
    // Give the layout (and pinned ScrollTrigger sections) a moment to
    // settle before measuring the target position.
    const target = sessionStorage.getItem("scrollTarget");
    if (target) {
      sessionStorage.removeItem("scrollTarget");
      setTimeout(() => {
        ScrollTrigger.refresh();
        const el = document.getElementById(target);
        if (el) lenis.scrollTo(el, { offset: -80 });
      }, 100);
    }

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}