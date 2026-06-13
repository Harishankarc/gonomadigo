"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function Hero() {
  useEffect(() => {
    gsap.from(".hero-title", {
      y: 150,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
    });

    gsap.from(".hero-subtitle", {
      y: 50,
      opacity: 0,
      delay: 0.5,
      duration: 1,
    });
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">

      <video
        autoPlay
        muted
        loop
        playsInline
        className="
        absolute
        inset-0
        w-full
        h-full
        object-cover
        scale-110
        "
      >
        <source src="/bgtest.mp4" />
      </video>

      <div className="absolute inset-0 bg-black/50" />

      <div
        className="
        relative
        z-10
        h-full
        flex
        flex-col
        justify-center
        items-center
        text-center
        px-6
        "
      >
        <p className="hero-subtitle uppercase tracking-[2px] text-sm">
          Made for the world
        </p>

        <h1
          className="
          hero-title
          text-7xl
          md:text-8xl
          font-display
          italic
          "
        >
          Curating unforgettable journeys
          <br />
          Across the worlds
        </h1>

      </div>
    </section>
  );
}

