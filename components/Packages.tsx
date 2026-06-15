"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FiMapPin, FiClock, FiUsers, FiArrowUpRight,
  FiChevronLeft, FiChevronRight
} from "react-icons/fi";
import SectionTag from "@/components/SectionTag";

const packages = [
  {
    id: 0,
    title: "Kenya Safari Expedition",
    location: "Nairobi, Kenya",
    duration: "7 Days",
    group: "12 People",
    price: "₹89,999",
    tag: "SAFARI",
    category: "safari",
    desc: "Witness the Great Migration across the Maasai Mara — lions, elephants and endless golden savanna at dawn.",
    image: "/kenya.jpg",
  },
  {
    id: 1,
    title: "Thailand Island Escape",
    location: "Phuket & Krabi, Thailand",
    duration: "6 Days",
    group: "15 People",
    price: "₹42,999",
    tag: "BEACH & CULTURE",
    category: "beach",
    desc: "Limestone karsts, turquoise lagoons, floating markets and temple trails through the heart of Southeast Asia.",
    image: "/thailand.jpg",
  },
  {
    id: 2,
    title: "Lakshadweep Lagoon Dive",
    location: "Lakshadweep, India",
    duration: "5 Days",
    group: "10 People",
    price: "₹34,999",
    tag: "ISLAND",
    category: "island",
    desc: "Crystal-clear coral atolls, untouched white sand and some of India's most pristine underwater worlds.",
    image: "/lakshadeep.jpg",
  },
  {
    id: 3,
    title: "Rajasthan Desert Journey",
    location: "Jaisalmer & Jodhpur, Rajasthan",
    duration: "6 Days",
    group: "14 People",
    price: "₹22,999",
    tag: "DESERT",
    category: "desert",
    desc: "Camel trails through the Thar, golden-hour dunes, fortress sunsets and starlit camps beneath the Rajasthani sky.",
    image: "/rajastan.jpg",
  },
];

/* ── 3-D tilt card ── */
function PackageCard({ pkg, index }: { pkg: typeof packages[0]; index: number }) {
  const router = useRouter();
  const outerRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const outer = outerRef.current;
    const tilt = tiltRef.current;
    if (!outer || !tilt) return;
    const r = outer.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 18;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * -18;
    tilt.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${y}deg) scale3d(1.03,1.03,1.03)`;
  };

  const onLeave = () => {
    if (tiltRef.current)
      tiltRef.current.style.transform =
        "perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
    setHovered(false);
  };

  return (
    <div
      ref={outerRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      className="relative flex-shrink-0 w-[320px] md:w-[360px] h-[480px] rounded-[28px] overflow-hidden cursor-pointer group"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Tilting layer — kept separate from the rounded/overflow-hidden
          shell so the corner clipping doesn't flicker during 3D transforms */}
      <div
        ref={tiltRef}
        className="absolute inset-0"
        style={{
          transition: "transform 0.15s ease-out",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Image */}
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 85vw, 360px"
        />

        {/* Dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        {/* Top row */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          {/* Tag */}
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#003215]/70 backdrop-blur-md border border-[#74B026]/30 text-[10px] tracking-[0.18em] text-[#74B026] uppercase font-light">
            <span className="w-1 h-1 rounded-full bg-[#74B026]" />
            {pkg.tag}
          </span>
          {/* Price */}
          <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs font-light">
            {pkg.price}
          </span>
        </div>

        {/* Bottom panel */}
        <div
          className="absolute inset-x-0 bottom-0 p-5"
          style={{ transform: "translateZ(20px)" }}
        >
          {/* Description — slides up on hover */}
          <div className={`overflow-hidden transition-all duration-400 ${hovered ? "max-h-[80px] opacity-100 mb-3" : "max-h-0 opacity-0"}`}>
            <p className="text-white/70 text-xs font-light leading-relaxed">
              {pkg.desc}
            </p>
          </div>

          {/* Title */}
          <h3 className="font-display text-xl text-white leading-tight mb-2">
            {pkg.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 mb-3">
            <FiMapPin className="w-3 h-3 text-[#74B026]" />
            <span className="text-white/50 text-xs font-light">{pkg.location}</span>
          </div>

          {/* Pills row */}
          <div className="flex items-center gap-2 mb-4">
            {[
              { icon: <FiClock className="w-3 h-3" />, label: pkg.duration },
              { icon: <FiUsers className="w-3 h-3" />, label: pkg.group },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.07] border border-white/10 text-white/60 text-[11px] font-light">
                <span className="text-[#74B026]">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => router.push(`/packages/${pkg.id}`)}
            className="group/btn flex items-center gap-2 w-full justify-center py-2.5 rounded-full bg-[#74B026] hover:bg-[#8DC93A] text-white text-sm font-medium tracking-wide transition-all duration-300 hover:scale-[1.02]"
          >
            View Details
            <FiArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:rotate-45" />
          </button>
        </div>
      </div>

      {/* Green glow on hover — sits on the static shell so it stays crisp */}
      <div className="absolute inset-0 rounded-[28px] border border-transparent group-hover:border-[#74B026]/40 transition-all duration-500 pointer-events-none" />
      <div className="absolute -inset-[1px] rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: "0 0 30px rgba(116,176,38,0.15), inset 0 0 30px rgba(116,176,38,0.05)" }}
      />
    </div>
  );
}

/* ── Main Section ── */
export default function Packages() {
  const [visible, setVisible] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Fade-in on scroll
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Drag-to-scroll
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    let isDown = false, startX = 0, scrollLeft = 0;

    const onDown = (e: MouseEvent) => {
      isDown = true;
      el.style.cursor = "grabbing";
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };
    const onUp = () => { isDown = false; el.style.cursor = "grab"; };
    const onMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      el.scrollLeft = scrollLeft - (x - startX) * 1.5;
    };

    el.addEventListener("mousedown", onDown);
    el.addEventListener("mouseleave", onUp);
    el.addEventListener("mouseup", onUp);
    el.addEventListener("mousemove", onMove);
    return () => {
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("mouseleave", onUp);
      el.removeEventListener("mouseup", onUp);
      el.removeEventListener("mousemove", onMove);
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!stripRef.current) return;
    stripRef.current.scrollBy({ left: dir === "right" ? 380 : -380, behavior: "smooth" });
  };

  return (
    <section
      id="packages"
      ref={sectionRef}
      className="relative py-28 overflow-hidden bg-[#020d05]"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#74B026]/5 blur-[180px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* ── Section Header ── */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div>
            <SectionTag index={2} label="Our Packages" className="mb-5" />

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-white leading-none">
              Explore the
              <span className="italic ml-3 text-[#74B026]">World</span>
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <p className="text-white/40 text-sm font-light">
              {packages.length.toString().padStart(2, "0")} destinations
            </p>
            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="w-11 h-11 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md flex items-center justify-center text-white/50 hover:text-white hover:border-[#74B026]/40 hover:bg-[#74B026]/10 transition-all duration-300"
              >
                <FiChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-11 h-11 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md flex items-center justify-center text-white/50 hover:text-white hover:border-[#74B026]/40 hover:bg-[#74B026]/10 transition-all duration-300"
              >
                <FiChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Card Strip ── */}
        <div
          ref={stripRef}
          className={`flex gap-5 overflow-x-auto pb-6 scroll-smooth select-none transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            cursor: "grab",
            scrollSnapType: "x mandatory",
          }}
        >
          {packages.map((pkg, i) => (
            <div key={pkg.id} style={{ scrollSnapAlign: "start" }}>
              <PackageCard pkg={pkg} index={i} />
            </div>
          ))}
        </div>

        {/* ── Dot indicators ── */}
        <div className="flex justify-center gap-2 mt-6">
          {packages.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (!stripRef.current) return;
                const cardWidth = 360 + 20; // card width + gap
                stripRef.current.scrollTo({ left: i * cardWidth, behavior: "smooth" });
              }}
              className="w-1.5 h-1.5 rounded-full bg-white/20 hover:bg-[#74B026]/60 transition-all duration-300"
            />
          ))}
        </div>

      </div>
    </section>
  );
}
