"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMapPin,
  FiCamera,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiArrowLeft,
  FiCompass,
  FiMaximize2
} from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MouseGlow from "@/components/MouseGlow";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import SectionTag from "@/components/SectionTag";

// Dynamic gallery items
const GALLERY_ITEMS = [
  {
    id: 0,
    src: "/kenya.jpg",
    title: "Lion Pride of Maasai Mara",
    location: "Maasai Mara, Kenya",
    category: "safari",
    packageId: 0,
    packageTitle: "Kenya Safari Expedition",
    exif: {
      camera: "Sony α7R V",
      lens: "FE 200-600mm f/5.6-6.3 G OSS",
      settings: "600mm • f/6.3 • 1/1600s • ISO 400"
    }
  },
  {
    id: 1,
    src: "/thailand.jpg",
    title: "Phang Nga Bay Limestone Karsts",
    location: "Phuket & Krabi, Thailand",
    category: "beach",
    packageId: 1,
    packageTitle: "Thailand Island Escape",
    exif: {
      camera: "Canon EOS R5",
      lens: "RF 24-70mm f/2.8 L IS USM",
      settings: "28mm • f/8.0 • 1/250s • ISO 100"
    }
  },
  {
    id: 2,
    src: "/lakshadeep.jpg",
    title: "Turquoise Lagoon Underworld",
    location: "Bangaram Island, Lakshadweep",
    category: "island",
    packageId: 2,
    packageTitle: "Lakshadweep Lagoon Dive",
    exif: {
      camera: "GoPro HERO12 Black",
      lens: "Built-in Ultra Wide Lens",
      settings: "16mm • f/2.8 • 1/800s • ISO 100"
    }
  },
  {
    id: 3,
    src: "/rajastan.jpg",
    title: "Sam Dunes Camel Caravan",
    location: "Jaisalmer, Rajasthan",
    category: "desert",
    packageId: 3,
    packageTitle: "Rajasthan Desert Journey",
    exif: {
      camera: "Fujifilm X-T5",
      lens: "XF 50-140mm f/2.8 R LM OIS WR",
      settings: "85mm • f/5.6 • 1/1000s • ISO 160"
    }
  },
  {
    id: 4,
    src: "/kenya2.jpg",
    title: "The Wildebeest River Crossing",
    location: "Mara River, Kenya",
    category: "safari",
    packageId: 0,
    packageTitle: "Kenya Safari Expedition",
    exif: {
      camera: "Sony α7 IV",
      lens: "FE 100-400mm f/4.5-5.6 GM OSS",
      settings: "400mm • f/5.6 • 1/2000s • ISO 320"
    }
  },
  {
    id: 5,
    src: "/keyna3.jpg",
    title: "Milky Way over Savanna Camp",
    location: "Maasai Mara, Kenya",
    category: "safari",
    packageId: 0,
    packageTitle: "Kenya Safari Expedition",
    exif: {
      camera: "Sony α7S III",
      lens: "FE 14mm f/1.8 GM",
      settings: "14mm • f/1.8 • 15s • ISO 3200"
    }
  },
  {
    id: 6,
    src: "/keyna4.jpg",
    title: "Acacia Silhouette Sunrise",
    location: "Maasai Mara, Kenya",
    category: "safari",
    packageId: 0,
    packageTitle: "Kenya Safari Expedition",
    exif: {
      camera: "Nikon Z8",
      lens: "NIKKOR Z 24-120mm f/4 S",
      settings: "120mm • f/4.0 • 1/640s • ISO 200"
    }
  },
  {
    id: 7,
    src: "/mountain1.jpg",
    title: "Mist Valley Ridge Ascent",
    location: "Western Ghats, India",
    category: "island",
    packageId: 2,
    packageTitle: "Lakshadweep Lagoon Dive",
    exif: {
      camera: "Fujifilm GFX 100S",
      lens: "GF 32-64mm f/4 R LM WR",
      settings: "32mm • f/11 • 1/125s • ISO 100"
    }
  }
];

const CATEGORIES = [
  { key: "all", label: "All Moments" },
  { key: "safari", label: "Safari" },
  { key: "beach", label: "Beach & Culture" },
  { key: "island", label: "Island" },
  { key: "desert", label: "Desert" }
];

// Asymmetrical Grid Class Helper for Bento Layout
const getGridClass = (index: number) => {
  const classes = [
    "md:col-span-2 md:row-span-2 h-[380px] md:h-[620px]", // Large
    "md:col-span-1 md:row-span-1 h-[240px] md:h-[298px]", // Normal
    "md:col-span-1 md:row-span-1 h-[240px] md:h-[298px]", // Normal
    "md:col-span-1 md:row-span-2 h-[380px] md:h-[620px]", // Tall
    "md:col-span-2 md:row-span-1 h-[240px] md:h-[298px]", // Wide
    "md:col-span-1 md:row-span-1 h-[240px] md:h-[298px]", // Normal
    "md:col-span-1 md:row-span-1 h-[240px] md:h-[298px]", // Normal
    "md:col-span-1 md:row-span-2 h-[380px] md:h-[620px]", // Tall
  ];
  return classes[index % classes.length];
};

/* ── Individual Grid Card Component (with 3D tilt effect) ── */
function GalleryCard({
  item,
  index,
  onClick
}: {
  item: typeof GALLERY_ITEMS[0];
  index: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -12;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 12;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    setHovered(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      className={`relative cursor-pointer group ${getGridClass(index)}`}
      onClick={onClick}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full relative rounded-[32px] overflow-hidden border border-white/5"
        style={{
          transition: "transform 0.15s ease-out, box-shadow 0.4s ease",
          transformStyle: "preserve-3d",
          willChange: "transform"
        }}
      >
        {/* Main Image */}
        <Image
          src={item.src}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 95vw, 600px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority={index < 3}
        />

        {/* Hover Sheen overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-300 opacity-60 group-hover:opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Green Accent Border & Glow */}
        <div className="absolute inset-0 rounded-[32px] border border-transparent group-hover:border-[#74B026]/30 transition-all duration-500 pointer-events-none" />
        <div
          className="absolute -inset-[1px] rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow:
              "0 0 30px rgba(116,176,38,0.12), inset 0 0 20px rgba(116,176,38,0.04)"
          }}
        />

        {/* Dynamic Details Content (Slides up slightly on Hover) */}
        <div
          className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end"
          style={{ transform: "translateZ(30px)" }}
        >
          {/* Tag Category */}
          <span className="self-start px-2.5 py-0.5 rounded-full bg-[#003215]/80 border border-[#74B026]/35 text-[9px] tracking-[0.2em] font-mono text-[#74B026] uppercase mb-2">
            {item.category}
          </span>

          <h3 className="font-display text-xl md:text-2xl text-white mb-2 leading-tight">
            {item.title}
          </h3>

          <div className="flex items-center gap-1.5 text-white/50 text-xs font-light">
            <FiMapPin className="w-3 h-3 text-[#74B026]" />
            <span>{item.location}</span>
          </div>
        </div>

        {/* Expand Icon Hover Indicator */}
        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/40 opacity-0 group-hover:opacity-100 hover:text-white transition-all duration-300">
          <FiMaximize2 className="w-3.5 h-3.5" />
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Gallery Page Component ── */
export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filtered gallery items
  const filteredItems = GALLERY_ITEMS.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  // Lightbox Navigation functions
  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => ((prev as number) + 1) % filteredItems.length);
  }, [lightboxIndex, filteredItems]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      ((prev as number) - 1 + filteredItems.length) % filteredItems.length
    );
  }, [lightboxIndex, filteredItems]);

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  // Keyboard navigation inside lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handleNext, handlePrev, handleClose]);

  // Lock scroll when Lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  const currentLightboxItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] overflow-x-hidden">
      <ScrollProgress />
      <MouseGlow />
      <CustomCursor />
      <Navbar />

      {/* ── Page Hero Header ── */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-[var(--bg)]">
        {/* Subtle grid lines background overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#74B026]/5 blur-[200px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          {/* Breadcrumb Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[var(--muted-4)] hover:text-[var(--text)] mb-8 group transition-colors duration-300"
          >
            <FiArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="text-xs font-mono tracking-widest uppercase">
              Back to Home
            </span>
          </Link>

          {/* Section Headings */}
          <div className="max-w-3xl mb-12">
            <SectionTag index={1} label="Moments Captured" className="mb-5" />

            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-light text-[var(--text)] leading-none mb-6">
              Adventure <span className="italic text-[#74B026]">Gallery</span>
            </h1>

            <p className="text-[var(--muted-4)] text-base md:text-lg font-light leading-relaxed">
              Explore vivid, high-definition captures from expeditions across the Savannas, tropical shorelines, and desert expanses. Select categories below to view snapshots from each territory.
            </p>
          </div>

          {/* ── Category Filter bar ── */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none border-b border-[var(--border)]">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex-shrink-0 px-6 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 border ${
                  activeCategory === cat.key
                    ? "bg-[#74B026] border-[#74B026] text-white shadow-[0_0_20px_rgba(116,176,38,0.35)]"
                    : "border-[var(--border)] text-[var(--muted-5)] hover:text-[var(--text)] hover:border-[var(--muted-6)] bg-white/[0.02]"
                }`}
              >
                {cat.label}
              </button>
            ))}
            <span className="ml-auto text-[var(--muted-5)] text-xs font-mono hidden md:block">
              {filteredItems.length.toString().padStart(2, "0")} images found
            </span>
          </div>
        </div>
      </section>

      {/* ── Bento Masonry Grid Section ── */}
      <section className="pb-32 max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={index}
                onClick={() => setLightboxIndex(index)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <Footer />

      {/* ── Full Screen Lightbox Overlay ── */}
      <AnimatePresence>
        {currentLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-xl flex flex-col"
          >
            {/* Top Toolbar */}
            <div className="w-full px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <FiCompass className="w-4 h-4 text-[#74B026]" />
                <span className="text-white/50 text-[10px] tracking-widest uppercase font-mono">
                  Lightbox • {lightboxIndex! + 1} / {filteredItems.length}
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            {/* Core Swiper / Image Container Area */}
            <div className="flex-1 flex items-center justify-between px-4 md:px-12 relative">
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-3 md:left-12 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-[#74B026]/25 border border-white/10 text-white/60 hover:text-white flex items-center justify-center hover:border-[#74B026]/40 transition-all duration-300"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-3 md:right-12 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-[#74B026]/25 border border-white/10 text-white/60 hover:text-white flex items-center justify-center hover:border-[#74B026]/40 transition-all duration-300"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>

              {/* Image Frame */}
              <div className="relative w-full h-[55vh] md:h-[65vh] max-w-5xl mx-auto flex items-center justify-center">
                <motion.div
                  key={currentLightboxItem.id}
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.96, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="w-full h-full relative rounded-2xl overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.8)] border border-white/5"
                >
                  <Image
                    src={currentLightboxItem.src}
                    alt={currentLightboxItem.title}
                    fill
                    className="object-contain"
                    quality={90}
                  />
                </motion.div>
              </div>
            </div>

            {/* Bottom Meta Bar (Details & Backlink) */}
            <div className="w-full bg-black/50 border-t border-white/5 backdrop-blur-md px-6 py-6 z-10">
              <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
                {/* Details text */}
                <div>
                  <span className="text-[#74B026] text-[10px] tracking-widest uppercase font-mono block mb-1">
                    {currentLightboxItem.category}
                  </span>
                  <h2 className="font-display text-2xl md:text-3xl text-white leading-tight mb-2">
                    {currentLightboxItem.title}
                  </h2>
                  <div className="flex items-center gap-2 text-white/50 text-xs font-light">
                    <FiMapPin className="w-3.5 h-3.5 text-[#74B026]" />
                    <span>{currentLightboxItem.location}</span>
                  </div>
                </div>

                {/* Exif Camera settings & Package backlink details */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  {/* Camera EXIF Details */}
                  <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-white/60 font-mono">
                    <FiCamera className="w-4 h-4 text-[#74B026] shrink-0" />
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-white/30 block leading-none mb-1">
                        {currentLightboxItem.exif.camera}
                      </span>
                      <span className="text-[10px] text-white/70 block leading-none font-sans">
                        {currentLightboxItem.exif.lens} ({currentLightboxItem.exif.settings})
                      </span>
                    </div>
                  </div>

                  {/* Package conversion Link */}
                  <Link
                    href={`/packages/${currentLightboxItem.packageId}`}
                    onClick={handleClose}
                    className="flex items-center justify-between gap-4 px-5 py-3 rounded-full bg-[#74B026] hover:bg-[#8DC93A] text-white text-xs font-medium tracking-wide transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_15px_rgba(116,176,38,0.2)]"
                  >
                    <div>
                      <span className="text-[8px] uppercase tracking-widest text-white/60 block font-light leading-none mb-1">
                        Expedition Package
                      </span>
                      <span className="leading-none text-[11px] block">
                        {currentLightboxItem.packageTitle}
                      </span>
                    </div>
                    <FiChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
