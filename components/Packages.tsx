"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { FiArrowUpRight, FiMapPin, FiClock, FiUsers, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const packages = [
  {
    title: "Kenya Safari Expedition",
    location: "Nairobi, Kenya",
    duration: "7 Days",
    group: "12 People",
    price: "₹89,999",
    tag: "SAFARI",
    desc: "Witness the Great Migration across the Maasai Mara — lions, elephants and endless golden savanna at dawn.",
    image: "/kenya.jpg",
  },
  {
    title: "Thailand Island Escape",
    location: "Phuket & Krabi, Thailand",
    duration: "6 Days",
    group: "15 People",
    price: "₹42,999",
    tag: "BEACH & CULTURE",
    desc: "Limestone karsts, turquoise lagoons, floating markets and temple trails through the heart of Southeast Asia.",
    image: "/thailand.jpg",
  },
  {
    title: "Lakshadweep Lagoon Dive",
    location: "Lakshadweep, India",
    duration: "5 Days",
    group: "10 People",
    price: "₹34,999",
    tag: "ISLAND",
    desc: "Crystal-clear coral atolls, untouched white sand and some of India's most pristine underwater worlds.",
    image: "/lakshadeep.jpg",
  },
  {
    title: "Rajasthan Desert Journey",
    location: "Jaisalmer & Jodhpur, Rajasthan",
    duration: "6 Days",
    group: "14 People",
    price: "₹22,999",
    tag: "DESERT",
    desc: "Camel trails through the Thar, golden-hour dunes, fortress sunsets and starlit camps beneath the Rajasthani sky.",
    image: "/rajastan.jpg",
  },
];

export default function Packages() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (index: number) => {
      if (animating || index === active) return;
      setAnimating(true);
      setPrev(active);
      setActive(index);
      setTimeout(() => {
        setPrev(null);
        setAnimating(false);
      }, 900);
    },
    [active, animating]
  );

  // Auto-advance every 5s
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      goTo((active + 1) % packages.length);
    }, 5000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [active, goTo]);

  // Reset timer on manual pick
  const manualGo = (i: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    goTo(i);
  };

  const pkg = packages[active];

  return (
    <section
      id="packages"
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "100vh" }}
    >
      {/* ── BACKGROUND LAYERS ── */}

      {/* Previous (fading out) */}
      {prev !== null && (
        <div
          className="absolute inset-0 z-0"
          style={{ animation: "bgFadeOut 0.9s ease forwards" }}
        >
          <Image
            src={packages[prev].image}
            alt={packages[prev].title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      {/* Active (fading + zooming in) */}
      <div
        key={active}
        className="absolute inset-0 z-0"
        style={{ animation: "bgReveal 1s cubic-bezier(0.22,1,0.36,1) forwards" }}
      >
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          className="object-cover"
          priority
          style={{ animation: "bgZoom 6s ease forwards" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </div>

      {/* Noise grain */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")" }} />

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 h-full flex flex-col justify-between px-8 md:px-16 lg:px-24 pt-36 pb-12">

        {/* Top — tag */}
        <div
          key={`tag-${active}`}
          className="flex items-center gap-3"
          style={{ animation: "slideUpFade 0.7s 0.1s ease both" }}
        >
          <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
          <span className="text-xs tracking-[0.22em] text-white/50 font-light uppercase">
            {pkg.tag}
          </span>
          <span className="text-white/20 text-xs">·</span>
          <span className="text-xs tracking-widest text-white/30 font-light uppercase">
            {String(active + 1).padStart(2, "0")} / {String(packages.length).padStart(2, "0")}
          </span>
        </div>

        {/* Middle — hero text */}
        <div className="flex items-end justify-between gap-8">
          {/* Left — title + desc */}
          <div className="flex-1 max-w-[640px]">
            <div
              key={`loc-${active}`}
              style={{ animation: "slideUpFade 0.7s 0.15s ease both" }}
              className="flex items-center gap-2 mb-4"
            >
              <FiMapPin className="text-orange-400 w-3 h-3" />
              <span className="text-white/50 text-sm font-light tracking-wide">{pkg.location}</span>
            </div>

            <h2
              key={`title-${active}`}
              style={{ animation: "slideUpFade 0.8s 0.2s cubic-bezier(0.22,1,0.36,1) both" }}
              className="text-[clamp(52px,8vw,110px)] font-light leading-[0.95] tracking-tight text-white mb-6"
            >
              {pkg.title}
            </h2>

            <p
              key={`desc-${active}`}
              style={{ animation: "slideUpFade 0.7s 0.35s ease both" }}
              className="text-white/50 text-base md:text-lg font-light leading-relaxed max-w-[480px] mb-8"
            >
              {pkg.desc}
            </p>

            {/* Meta pills */}
            <div
              key={`meta-${active}`}
              style={{ animation: "slideUpFade 0.7s 0.45s ease both" }}
              className="flex flex-wrap items-center gap-3 mb-10"
            >
              {[
                { icon: <FiClock className="w-3 h-3" />, label: pkg.duration },
                { icon: <FiUsers className="w-3 h-3" />, label: pkg.group },
                { icon: null, label: pkg.price },
              ].map(({ icon, label }, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                  {icon && <span className="text-orange-400">{icon}</span>}
                  <span className="text-white/70 text-sm font-light">{label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              key={`cta-${active}`}
              style={{ animation: "slideUpFade 0.7s 0.55s ease both" }}
              className="flex items-center gap-4"
            >
              <button className="group flex items-center gap-3 bg-white text-black rounded-full px-7 py-4 text-sm font-medium tracking-wide hover:scale-105 transition-all duration-300">
                Book This Trip
                <span className="flex items-center justify-center w-7 h-7 bg-black/10 rounded-full transition-transform duration-300 group-hover:rotate-45">
                  <FiArrowUpRight />
                </span>
              </button>
              <button className="text-white/50 text-sm font-light tracking-widest uppercase border-b border-white/20 pb-0.5 hover:text-white hover:border-white/50 transition-all duration-300">
                View Details
              </button>
            </div>
          </div>

          {/* Right — thumbnail strip */}
          <div className="hidden lg:flex flex-col gap-3 w-[220px] flex-shrink-0">
            {packages.map((p, i) => (
              <button
                key={i}
                onClick={() => manualGo(i)}
                className={`group relative rounded-2xl overflow-hidden transition-all duration-700 cursor-pointer border ${i === active
                    ? "h-[160px] border-white/30"
                    : "h-[72px] border-white/8 hover:border-white/20 hover:h-[88px]"
                  }`}
                style={{ transition: "height 0.7s cubic-bezier(0.22,1,0.36,1), border-color 0.3s" }}
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover"
                />
                <div className={`absolute inset-0 transition-all duration-500 ${i === active ? "bg-black/20" : "bg-black/60 group-hover:bg-black/40"
                  }`} />

                {/* Progress bar on active */}
                {i === active && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/15">
                    <div
                      key={`progress-${active}`}
                      className="h-full bg-white"
                      style={{ animation: "progressBar 5s linear forwards" }}
                    />
                  </div>
                )}

                <div className="absolute inset-0 p-3 flex flex-col justify-end">
                  <p className={`text-white font-light leading-tight transition-all duration-300 ${i === active ? "text-sm opacity-100" : "text-xs opacity-60"
                    }`}>
                    {p.title}
                  </p>
                  {i === active && (
                    <p className="text-white/50 text-xs mt-1 font-light">{p.location}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom — mobile dots + arrows */}
        <div className="flex items-center justify-between">
          {/* Dots (mobile) */}
          <div className="flex gap-2 lg:hidden">
            {packages.map((_, i) => (
              <button
                key={i}
                onClick={() => manualGo(i)}
                className={`rounded-full transition-all duration-500 ${i === active ? "w-8 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/30"
                  }`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex gap-3 ml-auto">
            <button
              onClick={() => manualGo((active - 1 + packages.length) % packages.length)}
              className="w-12 h-12 rounded-full border border-white/15 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all duration-300"
            >
              <FiChevronLeft />
            </button>
            <button
              onClick={() => manualGo((active + 1) % packages.length)}
              className="w-12 h-12 rounded-full border border-white/15 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all duration-300"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* ── KEYFRAMES ── */}
      <style>{`
        @keyframes bgReveal {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes bgFadeOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        @keyframes bgZoom {
          from { transform: scale(1.08); }
          to   { transform: scale(1); }
        }
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes progressBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}