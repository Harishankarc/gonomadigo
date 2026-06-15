"use client";

import { useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiArrowLeft, FiMapPin, FiClock, FiUsers, FiArrowUpRight, FiPlay, FiChevronRight, FiCompass, FiCoffee, FiCamera, FiSunrise, FiActivity, FiCalendar, FiChevronDown, FiHeart } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import MouseGlow from "@/components/MouseGlow";
import CustomCursor from "@/components/CustomCursor";

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
    gallery: [
      {
        src: "/kenya.jpg",
        caption: "Maasai Mara at golden hour",
        title: "Golden Hour Safari",
        description: "As the sun dips below the acacia-lined horizon, the Maasai Mara transforms into a canvas of amber and gold — the perfect moment for a game drive.",
      },
      {
        src: "/kenya2.jpg",
        caption: "The Great Migration",
        title: "The Great Migration",
        description: "Over 1.5 million wildebeest thunder across the Mara River every year in one of nature's most spectacular wildlife events.",
      },
      {
        src: "/keyna3.jpg",
        caption: "Bush camp under the stars",
        title: "Starlit Bush Camp",
        description: "Fall asleep to the sounds of the savanna. Our tented camps are set deep in the wilderness, miles from any artificial light.",
      },
      {
        src: "/keyna4.jpg",
        caption: "Sunrise over the savanna",
        title: "Savanna Sunrise",
        description: "Wake before dawn for the most magical hour on the Mara — the air is cool, the light is soft, and the wildlife is at its most active.",
      },
    ],
    videos: [
      { src: "/kenya_video2.mp4", label: "Maasai Mara — The Awakening" },
      { src: "/Kenya_video2.mp4", label: "The Great Migration" },
      { src: "/kenya_video3.mp4", label: "Bush Life at Dusk" },
      { src: "/kenya_video3.mp4", label: "Sunrise on the Savanna" },
    ],
    highlights: [
      "Maasai Mara game drives at sunrise and sunset",
      "Bush camp under the stars",
      "Cultural visit to a Maasai village",
      "All meals and park fees included",
      "Expert wildlife naturalist guide",
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival in Nairobi", desc: "Airport pickup, welcome dinner, overnight in Nairobi." },
      { day: "Day 2", title: "Fly to Maasai Mara", desc: "Charter flight, afternoon game drive, camp setup." },
      { day: "Day 3–5", title: "Full Safari Days", desc: "Morning and evening game drives, bush walks, sundowners." },
      { day: "Day 6", title: "Cultural Experience", desc: "Maasai village visit, bead-work workshop, farewell dinner." },
      { day: "Day 7", title: "Departure", desc: "Return flight to Nairobi, international transfer." },
    ],
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
    gallery: [],
    highlights: [
      "Phi Phi Island private longtail boat tour",
      "Floating market & street food trail",
      "Kayaking through sea caves",
      "Rooftop sunset cocktail experience",
      "Traditional Thai cooking class",
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival in Phuket", desc: "Hotel check-in, evening beach walk and welcome dinner." },
      { day: "Day 2", title: "Phi Phi Islands", desc: "Full-day speedboat tour, snorkelling and beach time." },
      { day: "Day 3", title: "Floating Market & Culture", desc: "Morning market, temple visits, street food tour." },
      { day: "Day 4", title: "Krabi Transfer", desc: "Drive to Krabi, kayaking in mangroves and sea caves." },
      { day: "Day 5", title: "Railay Beach", desc: "Rock climbing or relaxing at Railay, sunset dinner." },
      { day: "Day 6", title: "Departure", desc: "Airport transfer and farewell." },
    ],
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
    gallery: [],
    highlights: [
      "Scuba diving in protected coral reefs",
      "Glass-bottom boat tour",
      "Kayaking across the lagoon at dawn",
      "Night bioluminescence walk",
      "Permit and ferry included",
    ],
    itinerary: [
      { day: "Day 1", title: "Kochi → Agatti", desc: "Flight to Agatti Island, lagoon welcome, beach evening." },
      { day: "Day 2", title: "Dive Day 1", desc: "Beginner or advanced scuba sessions, reef exploration." },
      { day: "Day 3", title: "Island Hop", desc: "Speed boat to Bangaram, glass-bottom boat, snorkelling." },
      { day: "Day 4", title: "Kayak & Relax", desc: "Sunrise kayak, free time, bioluminescence walk at night." },
      { day: "Day 5", title: "Departure", desc: "Morning swim, flight back to Kochi." },
    ],
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
    gallery: [],
    highlights: [
      "Camel safari into the Thar Desert",
      "Overnight tented camp under the stars",
      "Jaisalmer Fort guided tour",
      "Mehrangarh Fort sunset visit",
      "Traditional Rajasthani folk performance",
    ],
    itinerary: [
      { day: "Day 1", title: "Jodhpur Arrival", desc: "Explore the Blue City, Mehrangarh Fort at sunset." },
      { day: "Day 2", title: "Drive to Jaisalmer", desc: "Scenic desert drive, check-in to heritage haveli." },
      { day: "Day 3", title: "Jaisalmer Fort & Bazaar", desc: "Guided fort tour, local bazaar walk, rooftop dinner." },
      { day: "Day 4", title: "Desert Safari", desc: "Camel ride into the dunes, overnight tented camp, stargazing." },
      { day: "Day 5", title: "Sam Dunes & Return", desc: "Sunrise on dunes, drive back to Jaisalmer." },
      { day: "Day 6", title: "Departure", desc: "Train or flight from Jaisalmer/Jodhpur." },
    ],
  },
];

/* â”€â”€ 3-D tilt card with details overlay â”€â”€ */
type GalleryItem = {
  src: string;
  caption: string;
  title: string;
  description: string;
};

function TiltCard({ item, index }: { item: GalleryItem; index: number }) {
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
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04,1.04,1.04)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    setHovered(false);
  };

  const heights = ["h-[340px]", "h-[420px]", "h-[370px]", "h-[450px]"];
  const h = heights[index % heights.length];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative ${h} rounded-[28px] overflow-hidden cursor-pointer group`}
      style={{
        transition: "transform 0.15s ease-out, box-shadow 0.3s ease",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {/* image */}
      <Image
        src={item.src}
        alt={item.caption}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* gradient overlay — always slightly visible, deepens on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 opacity-60 group-hover:opacity-100" />

      {/* gloss sheen */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* â”€â”€ Details panel (rises from bottom on hover) â”€â”€ */}
      <div
        className="absolute inset-x-0 bottom-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400"
        style={{ transform: hovered ? "translateZ(28px) translateY(0)" : "translateZ(28px) translateY(10px)" }}
      >
        {/* glass card */}
        <div className="rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10 p-4 space-y-2">
          {/* top row — icon dot + caption tag */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#74B026] shrink-0" />
            <span className="text-[#74B026]/80 text-[10px] tracking-[0.2em] uppercase font-light">{item.caption}</span>
          </div>

          {/* title */}
          <h4 className="font-display text-xl text-white leading-tight">{item.title}</h4>

          {/* description */}
          <p className="text-white/55 text-xs font-light leading-relaxed">{item.description}</p>
        </div>
      </div>

      {/* top-right index badge */}
      <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/40 text-[10px] font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {String(index + 1).padStart(2, "0")}
      </div>
    </div>
  );
}

const getDayMetadata = (title: string, desc: string, location: string) => {
  const t = title.toLowerCase();
  const d = desc.toLowerCase();
  const loc = location.toLowerCase();

  let icon = FiActivity;
  let color = "from-[#74B026]/15 to-red-500/20";
  let textCol = "text-[#74B026]";
  let borderCol = "border-[#74B026]/30";
  let glowCol = "rgba(116,176,38,0.15)";
  let tag = "EXPLORE";
  let activity = "Moderate";
  let meals = "Breakfast included";
  let stay = "Boutique Stay";

  if (loc.includes("kenya") || loc.includes("nairobi")) {
    stay = "Luxury Safari Camp";
  } else if (loc.includes("thailand") || loc.includes("phuket") || loc.includes("krabi")) {
    stay = "Beachfront Resort";
  } else if (loc.includes("lakshadweep") || loc.includes("agatti")) {
    stay = "Coral Lagoon Resort";
  } else if (loc.includes("rajasthan") || loc.includes("jodhpur") || loc.includes("jaisalmer")) {
    stay = "Heritage Haveli";
  }

  // Override stay based on description content
  if (d.includes("camp") || d.includes("tent")) {
    stay = loc.includes("rajasthan") ? "Desert Tented Camp" : "Luxury Tented Camp";
  } else if (d.includes("haveli")) {
    stay = "Heritage Haveli";
  } else if (d.includes("hotel") || t.includes("nairobi")) {
    stay = "Premium Transit Hotel";
  } else if (d.includes("home") || t.includes("departure") || t.includes("international")) {
    stay = "None (Departure)";
  }

  // Icons, colors, activity level based on keywords
  if (t.includes("arrival") || t.includes("welcome")) {
    icon = FiCoffee;
    color = "from-blue-500/20 to-cyan-500/20";
    textCol = "text-cyan-400";
    borderCol = "border-cyan-500/30";
    glowCol = "rgba(6,182,212,0.15)";
    tag = "WELCOME";
    activity = "Relaxed";
    meals = "Welcome Dinner";
  } else if (t.includes("fly") || t.includes("transfer") || t.includes("drive") || t.includes("scenic")) {
    icon = FiCompass;
    color = "from-[#8DC93A]/20 to-[#74B026]/15";
    textCol = "text-[#74B026]";
    borderCol = "border-[#74B026]/30";
    glowCol = "rgba(116,176,38,0.15)";
    tag = "TRANSIT";
    activity = "Moderate";
    meals = "Breakfast & Dinner";
  } else if (t.includes("safari") || t.includes("game") || t.includes("bush") || d.includes("safari") || d.includes("game drive")) {
    icon = FiCamera;
    color = "from-emerald-500/20 to-teal-500/20";
    textCol = "text-emerald-400";
    borderCol = "border-emerald-500/30";
    glowCol = "rgba(16,185,129,0.15)";
    tag = "ADVENTURE";
    activity = "High";
    meals = "All Meals (B, L, D)";
  } else if (t.includes("dive") || t.includes("scuba") || t.includes("reef") || t.includes("snorkel") || d.includes("scuba") || d.includes("snorkelling")) {
    icon = FiCompass;
    color = "from-sky-500/20 to-blue-500/20";
    textCol = "text-sky-400";
    borderCol = "border-sky-500/30";
    glowCol = "rgba(14,165,233,0.15)";
    tag = "AQUATIC";
    activity = "High";
    meals = "All Meals (B, L, D)";
  } else if (t.includes("cultural") || t.includes("village") || t.includes("culture") || t.includes("experience") || t.includes("market") || t.includes("temple") || t.includes("bazaar") || t.includes("cook")) {
    icon = FiHeart;
    color = "from-fuchsia-500/20 to-rose-500/20";
    textCol = "text-rose-400";
    borderCol = "border-rose-500/30";
    glowCol = "rgba(244,63,94,0.15)";
    tag = "CULTURAL";
    activity = "Moderate";
    meals = "Breakfast & Local Lunch";
  } else if (t.includes("departure") || t.includes("farewell") || t.includes("return")) {
    icon = FiSunrise;
    color = "from-purple-500/20 to-indigo-500/20";
    textCol = "text-indigo-400";
    borderCol = "border-indigo-500/30";
    glowCol = "rgba(99,102,241,0.15)";
    tag = "FAREWELL";
    activity = "Relaxed";
    meals = "Breakfast included";
  } else {
    // general exploration
    icon = FiActivity;
    color = "from-[#8DC93A]/10 to-[#74B026]/10";
    textCol = "text-[#8DC93A]";
    borderCol = "border-[#8DC93A]/20";
    glowCol = "rgba(141,201,58,0.15)";
    tag = "EXPLORE";
    activity = "Moderate";
    meals = "Breakfast & Dinner";
  }

  return { icon, color, textCol, borderCol, glowCol, tag, stay, meals, activity };
};

export default function PackagesDetails({ id }: { id: string }) {
  const router = useRouter();
  const index = parseInt(id, 10);
  const pkg = packages[index];

  if (!pkg) {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col items-center justify-center gap-6">
        <p className="text-[var(--muted-4)] text-lg">Package not found.</p>
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--btn-bg)] text-[var(--btn-text)] font-medium hover:scale-105 transition-all"
        >
          <FiArrowLeft /> Back to Home
        </button>
      </div>
    );
  }

  const hasGallery = pkg.gallery && pkg.gallery.length > 0;
  const hasVideos = pkg.videos && pkg.videos.length > 0;

  const whatsappMessage = `Hi! I'm interested in booking the "${pkg.title}" package.`;
  const whatsappLink = `https://wa.me/919567130348?text=${encodeURIComponent(whatsappMessage)}`;

  // playlist state
  const [videoIndex, setVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // itinerary state
  const [activeDay, setActiveDay] = useState(0);

  const goToVideo = useCallback((i: number) => {
    setVideoIndex(i);
    // small delay lets React re-render the src before we play
    setTimeout(() => videoRef.current?.play(), 50);
  }, []);

  const handleVideoEnded = useCallback(() => {
    if (!pkg.videos) return;
    goToVideo((videoIndex + 1) % pkg.videos.length);
  }, [videoIndex, pkg.videos, goToVideo]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] overflow-x-hidden">
      <ScrollProgress />
      <MouseGlow />
      <CustomCursor />
      <Navbar />

      {/* ── HERO ── */}
      <div className="relative h-[70vh] overflow-hidden">
        <Image src={pkg.image} alt={pkg.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-black/30" />

        {/* hero text */}
        <div className="absolute bottom-12 left-8 md:left-16 z-10">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs tracking-[0.2em] text-white/60 uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#74B026] shadow-[0_0_8px_rgba(116,176,38,0.8)]" />
            {pkg.tag}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-light leading-[0.95] mb-4">{pkg.title}</h1>
          <div className="flex items-center gap-2 text-white/50">
            <FiMapPin className="w-3.5 h-3.5 text-[#74B026]" />
            <span className="text-sm font-light">{pkg.location}</span>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-20">

        {/* meta + CTA */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-20 pb-12 border-b border-[var(--border)]">
          <div className="flex flex-wrap gap-4">
            {[
              { icon: <FiClock className="w-4 h-4" />, label: pkg.duration },
              { icon: <FiUsers className="w-4 h-4" />, label: pkg.group },
              { icon: null, label: pkg.price },
            ].map(({ icon, label }, i) => (
              <div key={i} className="flex items-center gap-2.5 px-5 py-3 rounded-full border border-[var(--border)] bg-white/[0.04] backdrop-blur-md">
                {icon && <span className="text-[#74B026]">{icon}</span>}
                <span className="text-[var(--muted-2)] text-sm font-light">{label}</span>
              </div>
            ))}
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-[var(--btn-bg)] text-[var(--btn-text)] rounded-full px-7 py-4 text-sm font-medium tracking-wide hover:scale-105 transition-all duration-300 shrink-0"
          >
            Book This Trip
            <span className="flex items-center justify-center w-7 h-7 bg-[var(--btn-icon-bg)] rounded-full transition-transform duration-300 group-hover:rotate-45">
              <FiArrowUpRight />
            </span>
          </a>
        </div>

        {/* overview + highlights */}
        <div className="grid md:grid-cols-2 gap-16 mb-24">
          <div>
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[var(--border)] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#74B026]" />
              <span className="text-xs tracking-[0.2em] uppercase text-[var(--muted-4)]">Overview</span>
            </div>
            <p className="text-[var(--muted-2)] text-lg leading-8">{pkg.desc}</p>
          </div>

          <div>
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[var(--border)] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#74B026]" />
              <span className="text-xs tracking-[0.2em] uppercase text-[var(--muted-4)]">Highlights</span>
            </div>
            <ul className="space-y-4">
              {pkg.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-[var(--muted-2)]">
                  <span className="mt-2 w-1 h-1 rounded-full bg-[#74B026] shrink-0" />
                  <span className="text-base font-light leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── 3D GALLERY (only shown when gallery images exist) ── */}
        {hasGallery && (
          <div className="mb-24">
            {/* section header */}
            <div className="flex items-center gap-6 mb-12">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[var(--border)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#74B026]" />
                <span className="text-xs tracking-[0.2em] uppercase text-[var(--muted-4)]">Photo Gallery</span>
              </div>
              <div className="flex-1 h-px bg-[var(--border)]" />
            </div>

            {/* 2-column masonry-style grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {pkg.gallery.map((item, i) => (
                <TiltCard key={i} item={item} index={i} />
              ))}
            </div>

            {/* ambient glow behind gallery */}
            <div className="relative -mt-60 h-60 pointer-events-none">
              <div className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#74B026]/8 blur-[180px]" />
            </div>
          </div>
        )}

        {/* ── VIDEO PLAYLIST ── */}
        {hasVideos && (
          <div className="mb-24">
            {/* section header */}
            <div className="flex items-center gap-6 mb-12">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[var(--border)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#74B026]" />
                <span className="text-xs tracking-[0.2em] uppercase text-[var(--muted-4)]">Experience It</span>
              </div>
              <div className="flex-1 h-px bg-[var(--border)]" />
              <span className="text-[var(--muted-5)] text-xs font-light tracking-widest">
                {String(videoIndex + 1).padStart(2, "0")} / {String(pkg.videos!.length).padStart(2, "0")}
              </span>
            </div>

            <div className="flex gap-5">
              {/* ── Main player ── */}
              <div
                className="relative flex-1 rounded-[32px] overflow-hidden group"
                style={{
                  aspectRatio: "16/9",
                  transition: "transform 0.2s ease-out",
                  transformStyle: "preserve-3d"
                }}
                onMouseMove={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  const rect = el.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
                  const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
                  el.style.transform = `perspective(1200px) rotateY(${x}deg) rotateX(${y}deg) scale3d(1.02,1.02,1.02)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "perspective(1200px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
                }}
              >
                <video
                  ref={videoRef}
                  key={videoIndex}          /* forces remount on src change */
                  src={pkg.videos![videoIndex].src}
                  autoPlay
                  muted
                  playsInline
                  onEnded={handleVideoEnded}
                  className="w-full h-full object-cover"
                />

                {/* overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* bottom label */}
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/70 text-xs font-light tracking-wide">
                    <span className="w-2 h-2 rounded-full bg-[#74B026] animate-pulse" />
                    {pkg.videos![videoIndex].label}
                  </span>

                  {/* next button */}
                  <button
                    onClick={() => goToVideo((videoIndex + 1) % pkg.videos!.length)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/60 hover:text-white hover:bg-white/20 transition-all duration-300 text-xs font-light"
                  >
                    Next <FiChevronRight className="w-3 h-3" />
                  </button>
                </div>

                {/* corner glow */}
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#74B026]/15 blur-[80px] pointer-events-none" />
              </div>

              {/* ── Thumbnail sidebar ── */}
              <div className="hidden lg:flex flex-col gap-3 w-[200px] shrink-0">
                {pkg.videos!.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => goToVideo(i)}
                    className={`group relative rounded-2xl overflow-hidden transition-all duration-500 border text-left ${i === videoIndex
                      ? "h-[120px] border-white/30"
                      : "h-[64px] border-white/8 hover:border-white/20 hover:h-[80px]"
                      }`}
                    style={{ transition: "height 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.3s" }}
                  >
                    {/* first-frame thumbnail — loaded but not playing */}
                    <video
                      src={v.src}
                      preload="metadata"
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* semi-transparent overlay so play icon + label stay readable */}
                    <div className={`absolute inset-0 transition-colors duration-300 ${i === videoIndex ? "bg-black/40" : "bg-black/60 group-hover:bg-black/50"
                      }`} />

                    {/* play icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`flex items-center justify-center rounded-full transition-all duration-300 ${i === videoIndex
                        ? "w-9 h-9 bg-[#74B026]/80"
                        : "w-6 h-6 bg-white/15 group-hover:bg-white/25"
                        }`}>
                        <FiPlay className={`${i === videoIndex ? "w-4 h-4 text-white" : "w-3 h-3 text-white/60"
                          } ml-0.5`} />
                      </div>
                    </div>

                    {/* label */}
                    <div className="absolute inset-x-0 bottom-0 p-2.5">
                      <p className={`text-white leading-tight transition-all duration-300 line-clamp-2 ${i === videoIndex ? "text-xs opacity-100" : "text-[10px] opacity-50"
                        }`}>
                        {v.label}
                      </p>
                    </div>

                    {/* active progress bar */}
                    {i === videoIndex && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/15">
                        <div
                          key={`vp-${videoIndex}`}
                          className="h-full bg-[#74B026]"
                          style={{ animation: "videoProgress var(--vd, 30s) linear forwards" }}
                        />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* mobile dot indicators */}
            <div className="flex lg:hidden justify-center gap-2 mt-5">
              {pkg.videos!.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToVideo(i)}
                  className={`rounded-full transition-all duration-500 ${i === videoIndex ? "w-8 h-1.5 bg-[#74B026]" : "w-1.5 h-1.5 bg-[var(--muted-6)]"
                    }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* itinerary */}
        <div className="mb-24">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[var(--border)] mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#74B026]" />
            <span className="text-xs tracking-[0.2em] uppercase text-[var(--muted-4)]">Itinerary</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Interactive vertical timeline */}
            <div className="lg:col-span-5 relative space-y-4">
              {/* Glowing vertical connector line */}
              <div className="absolute left-10 top-6 bottom-6 w-[2px] bg-gradient-to-b from-white/5 via-white/10 to-transparent pointer-events-none hidden md:block" />
              {/* Dynamic filled line highlighting up to the active day */}
              <div
                className="absolute left-10 top-6 w-[2px] bg-gradient-to-b from-[#74B026] via-[#8DC93A] to-[#8DC93A] transition-all duration-500 ease-out pointer-events-none hidden md:block"
                style={{
                  height: `${(activeDay / (pkg.itinerary.length - 1)) * 100}%`,
                  maxHeight: "calc(100% - 48px)"
                }}
              />

              {pkg.itinerary.map((item, i) => {
                const meta = getDayMetadata(item.title, item.desc, pkg.location);
                const IconComponent = meta.icon;
                const isActive = i === activeDay;

                return (
                  <button
                    key={i}
                    onClick={() => setActiveDay(i)}
                    className={`w-full text-left group flex items-start gap-4 p-5 rounded-2xl transition-all duration-300 border ${isActive
                      ? "bg-white/[0.05] border-[var(--border)] shadow-[0_4px_30px_rgba(116,176,38,0.05)]"
                      : "bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/[0.05]"
                      }`}
                  >
                    {/* Day indicator with icon */}
                    <div className="relative shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#003215] z-10">
                      {/* Glow background for active item */}
                      {isActive && (
                        <div className="absolute inset-0 rounded-full bg-[#74B026]/20 animate-ping" />
                      )}

                      <div className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${isActive
                        ? "bg-gradient-to-br from-[#74B026] to-[#8DC93A] border-[#74B026] text-white shadow-[0_0_12px_rgba(116,176,38,0.4)]"
                        : "bg-white/[0.02] border-[var(--border)] text-[var(--muted-5)] group-hover:text-[var(--muted-2)] group-hover:border-[var(--muted-6)]"
                        }`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] tracking-widest font-mono uppercase ${isActive ? "text-[#74B026] font-medium" : "text-[var(--muted-5)]"}`}>
                          {item.day}
                        </span>
                        {isActive && (
                          <span className={`text-[9px] px-2 py-0.5 rounded-full border font-light tracking-wide uppercase ${meta.borderCol} ${meta.textCol} bg-white/[0.02]`}>
                            {meta.tag}
                          </span>
                        )}
                      </div>
                      <h4 className={`font-display text-lg leading-snug transition-colors duration-300 ${isActive ? "text-[var(--text)]" : "text-[var(--muted-3)] group-hover:text-[var(--muted-1)]"
                        }`}>
                        {item.title}
                      </h4>

                      {/* Mobile Expandable Content */}
                      <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${isActive ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"}`}>
                        <div className="space-y-4 pt-4 border-t border-[var(--border)]">
                          <p className="text-[var(--muted-2)] text-sm leading-relaxed font-light font-sans">
                            {item.desc}
                          </p>

                          {/* Specs in mobile */}
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { label: "Stay", value: meta.stay },
                              { label: "Meals", value: meta.meals },
                              { label: "Pace", value: meta.activity }
                            ].map((spec, index) => (
                              <div key={index} className="p-2 rounded-lg bg-white/[0.02] border border-[var(--border)] text-center">
                                <span className="text-[8px] uppercase tracking-wider text-[var(--muted-5)] block font-light">
                                  {spec.label}
                                </span>
                                <span className="text-[10px] text-[var(--muted-1)] font-medium truncate block font-sans">
                                  {spec.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Immersive selected day details showcase (Desktop only) */}
            <div className="hidden lg:block lg:col-span-7 h-full">
              <div className="relative rounded-[28px] overflow-hidden bg-white/[0.03] border border-[var(--border)] p-6 md:p-8 backdrop-blur-xl">
                {/* Ambient dynamic radial glow matching the active day category */}
                <div
                  className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-[120px] opacity-40 transition-all duration-500 pointer-events-none animate-pulse"
                  style={{
                    backgroundColor: getDayMetadata(
                      pkg.itinerary[activeDay].title,
                      pkg.itinerary[activeDay].desc,
                      pkg.location
                    ).glowCol.replace('rgba', 'rgb').replace(',0.15)', '')
                  }}
                />

                {/* Card header */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--border)]">
                  <div className="space-y-1">
                    <span className="text-[#74B026]/80 font-mono text-xs tracking-[0.2em] uppercase font-light">
                      Detailed Plan • {pkg.itinerary[activeDay].day}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl text-[var(--text)] font-light">
                      {pkg.itinerary[activeDay].title}
                    </h3>
                  </div>

                  {/* Icon badge */}
                  <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${getDayMetadata(pkg.itinerary[activeDay].title, pkg.itinerary[activeDay].desc, pkg.location).color} border ${getDayMetadata(pkg.itinerary[activeDay].title, pkg.itinerary[activeDay].desc, pkg.location).borderCol} ${getDayMetadata(pkg.itinerary[activeDay].title, pkg.itinerary[activeDay].desc, pkg.location).textCol}`}>
                    {(() => {
                      const Icon = getDayMetadata(pkg.itinerary[activeDay].title, pkg.itinerary[activeDay].desc, pkg.location).icon;
                      return <Icon className="w-6 h-6" />;
                    })()}
                  </div>
                </div>

                {/* Day description */}
                <div className="relative z-10 py-6">
                  <p className="text-[var(--muted-1)] text-base leading-relaxed font-light font-sans">
                    {pkg.itinerary[activeDay].desc}
                  </p>
                </div>

                {/* Specs grid */}
                <div className="relative z-10 grid grid-cols-3 gap-4 pt-6 border-t border-[var(--border)] mb-6">
                  {[
                    { label: "Accommodation", value: getDayMetadata(pkg.itinerary[activeDay].title, pkg.itinerary[activeDay].desc, pkg.location).stay },
                    { label: "Meals Included", value: getDayMetadata(pkg.itinerary[activeDay].title, pkg.itinerary[activeDay].desc, pkg.location).meals },
                    { label: "Activity Level", value: getDayMetadata(pkg.itinerary[activeDay].title, pkg.itinerary[activeDay].desc, pkg.location).activity }
                  ].map((spec, i) => (
                    <div key={i} className="space-y-1.5 p-3 rounded-xl bg-white/[0.02] border border-[var(--border)]">
                      <span className="text-[10px] uppercase tracking-wider text-[var(--muted-5)] block font-light">
                        {spec.label}
                      </span>
                      <span className="text-xs text-[var(--muted-1)] font-medium leading-tight block font-sans">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Micro highlights block */}
                <div className="relative z-10 p-4 rounded-2xl bg-white/[0.02] border border-[var(--border)] flex gap-3.5 items-start">
                  <span className="mt-1 flex h-2 w-2 shrink-0 rounded-full bg-[#74B026] shadow-[0_0_8px_rgba(116,176,38,0.8)]" />
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono tracking-widest text-[#74B026] uppercase font-medium">Daily Highlights</span>
                    <p className="text-[var(--muted-3)] text-xs font-light leading-relaxed font-sans">
                      {pkg.itinerary[activeDay].desc.includes("game drive") || pkg.itinerary[activeDay].title.includes("Safari")
                        ? "Equipped with professional open-top safari cruisers for perfect 360-degree photography."
                        : pkg.itinerary[activeDay].title.includes("Arrival")
                          ? "Welcome pack includes local SIM card, physical map, water flask, and custom itinerary booklet."
                          : pkg.itinerary[activeDay].title.includes("Cultural") || pkg.itinerary[activeDay].title.includes("Culture")
                            ? "Interactive workshop supports the local Maasai community and respects tribal cultural guidelines."
                            : "Expert local host is available 24/7 to adjust travel speed and schedule coordinates."}
                    </p>
                  </div>
                </div>

                {/* Glass reflections */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* bottom CTA */}
        <div className="text-center py-20 border-t border-[var(--border)]">
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl italic mb-6">Ready to explore?</h2>
          <p className="text-[var(--muted-4)] mb-10 text-lg font-light">Spots fill fast — secure your adventure today.</p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-[var(--btn-bg)] text-[var(--btn-text)] rounded-full px-8 py-4 font-medium hover:scale-105 transition-all duration-300"
          >
            Book Your Spot
            <span className="flex items-center justify-center w-7 h-7 bg-[var(--btn-icon-bg)] rounded-full transition-transform duration-300 group-hover:rotate-45">
              <FiArrowUpRight />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
