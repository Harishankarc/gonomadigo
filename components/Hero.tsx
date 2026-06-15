"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiArrowDown } from "react-icons/fi";
import { gsap } from "@/src/lib/gsap";

const TITLE_LINE_1 = ["Curating", "unforgettable", "journeys"];
const TITLE_LINE_2 = ["across", "the", "world."];

const DESTINATIONS = ["Kerala", "Lakshadweep", "Rajasthan", "Thailand", "Kenya", "Himalayas"];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-badge", { opacity: 0, y: 20, duration: 0.8 })
        .from(".hero-eyebrow", { opacity: 0, y: 20, duration: 0.8 }, "-=0.5")
        .from(".hero-word", { opacity: 0, y: 40, duration: 1, stagger: 0.06 }, "-=0.4")
        .from(".hero-desc", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(".hero-cta", { opacity: 0, y: 20, duration: 0.8, stagger: 0.1 }, "-=0.5")
        .from(".hero-scroll, .hero-meta", { opacity: 0, duration: 1 }, "-=0.4");

      if (videoRef.current) {
        gsap.to(videoRef.current, {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      gsap.to(".hero-content", {
        opacity: 0,
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-110"
      >
        <source src="/bgtest.mp4" />
      </video>

      {/* Cinematic gradient */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#020d05] via-black/30 to-black/55" />

      {/* Grid texture */}
      <div className="absolute inset-0 z-[2] opacity-40 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Grain texture */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Brand glow */}
      <div className="absolute -bottom-32 -right-32 z-[4] w-[600px] h-[600px] rounded-full bg-[#74B026]/25 blur-[180px] mix-blend-screen pointer-events-none" />

      {/* Content */}
      <div className="hero-content relative z-10 h-full flex flex-col px-6 md:px-12">
        {/* Top row */}
        <div className="flex items-start justify-between pt-28 md:pt-32">



        </div>

        {/* Center */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <p className="hero-eyebrow uppercase tracking-[0.35em] text-xs md:text-sm mb-5 md:mb-6 text-white/60 font-light">
            Premium Adventure Travel
          </p>

          <h1 className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] leading-[1.1] md:leading-[1.05] [font-family:var(--font-display)]">
            <span className="block">
              {TITLE_LINE_1.map((word) => (
                <span key={word} className="hero-word inline-block mr-3 md:mr-5">
                  {word}
                </span>
              ))}
            </span>
            <span className="block italic">
              {TITLE_LINE_2.map((word, i) => (
                <span
                  key={word}
                  className={`hero-word inline-block mr-3 md:mr-5 ${
                    i === TITLE_LINE_2.length - 1
                      ? "bg-gradient-to-r from-white to-[#74B026] bg-clip-text text-transparent"
                      : ""
                  }`}
                >
                  {word}
                </span>
              ))}
            </span>
          </h1>

          <p className="hero-desc mt-6 md:mt-8 max-w-md md:max-w-xl text-white/60 text-sm md:text-base leading-relaxed font-light">
            Hand-crafted expeditions, hitchhiking trails, and immersive escapes —
            designed for travelers who want more than just a destination.
          </p>

          <div className="mt-9 md:mt-11 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#packages"
              className="hero-cta group inline-flex items-center gap-3 bg-white text-[#002215] px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:bg-[#F3FFE7]"
            >
              Explore Packages
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/10 transition-transform duration-300 group-hover:rotate-45">
                <FiArrowUpRight size={14} />
              </span>
            </Link>

            <Link
              href="/gallery"
              className="hero-cta inline-flex items-center gap-2 border border-white/20 text-white/80 px-7 py-3.5 rounded-full text-sm font-medium backdrop-blur-md bg-white/[0.02] transition-all duration-300 hover:border-white/40 hover:text-white hover:bg-white/[0.06]"
            >
              View Gallery
            </Link>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex items-end justify-between pb-10 md:pb-12 gap-6">
          <div className="hero-meta hidden md:block font-mono text-xs leading-relaxed tracking-[0.2em] text-white/40 text-left">
            08.5°N, 76.9°E
            <br />
            KERALA, INDIA
          </div>

          {/* Destination marquee */}
          <div className="hero-scroll hidden md:block overflow-hidden max-w-[40vw]">
            <motion.div
              className="flex whitespace-nowrap font-mono text-xs tracking-[0.25em] uppercase text-white/30"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            >
              {[...DESTINATIONS, ...DESTINATIONS].map((dest, i) => (
                <span key={i} className="flex items-center gap-8 pr-8">
                  {dest}
                  <span className="text-[#74B026]/50">✦</span>
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
