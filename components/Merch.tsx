"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiArrowUpRight, FiX, FiClock } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MouseGlow from "@/components/MouseGlow";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import SectionTag from "@/components/SectionTag";

type Product = {
  id: number;
  title: string;
  price: number;
  color: string;
  desc: string;
};

const SIZES = ["S", "M", "L", "XL"];

const PRODUCTS: Product[] = [
  {
    id: 0,
    title: "Wanderer Tee",
    price: 1299,
    color: "Forest",
    desc: "Heavyweight 240gsm cotton tee with a minimalist back print — soft, durable, and built to layer through every climate.",
  },
  {
    id: 1,
    title: "Summit Tee",
    price: 1299,
    color: "Cream",
    desc: "A clean, breathable everyday tee in our signature cream — pairs with everything from trail boots to city sneakers.",
  },
  {
    id: 2,
    title: "Trailhead Tee",
    price: 1399,
    color: "Olive",
    desc: "Earth-toned tee inspired by the forest trails — garment-dyed for a lived-in feel right out of the box.",
  },
  {
    id: 3,
    title: "Nomad Tee",
    price: 1499,
    color: "Lime",
    desc: "Our boldest colorway — a statement piece for travelers who like to stand out in a crowd.",
  },
  {
    id: 4,
    title: "Basecamp Tee",
    price: 1399,
    color: "Charcoal",
    desc: "Understated and versatile — a charcoal essential tee built for early starts and late-night campfires.",
  },
  {
    id: 5,
    title: "Voyager Tee",
    price: 1349,
    color: "Sand",
    desc: "Warm sand tone reminiscent of desert dunes — a soft, broken-in feel from the very first wear.",
  },
];

function formatPrice(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

/* ── Product Card ── */
function ProductCard({ product, onOpen }: { product: Product; onOpen: () => void }) {
  return (
    <div
      onClick={onOpen}
      className="relative cursor-pointer group rounded-[28px] overflow-hidden border border-white/5 h-[360px] sm:h-[400px] transition-transform duration-500 hover:-translate-y-1"
    >
      <Image
        src="/tshirt.jpg"
        alt={product.title}
        fill
        sizes="(max-width: 768px) 90vw, 400px"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

      <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-[10px] tracking-[0.18em] uppercase font-light text-white/80">
          <span className="w-1 h-1 rounded-full bg-[#74B026]" />
          T-SHIRT
        </span>
        <span className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-xs font-light text-white/80">
          {formatPrice(product.price)}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between gap-3">
        <div>
          <h3 className="text-lg sm:text-xl font-medium leading-tight text-[#F3FFE7]">
            {product.title}
          </h3>
          <p className="text-xs font-light text-[#F3FFE7]/70">{product.color}</p>
        </div>

        <span className="shrink-0 w-10 h-10 rounded-full bg-white/10 border border-white/15 backdrop-blur-md flex items-center justify-center text-white/70 group-hover:bg-[#74B026] group-hover:text-white group-hover:border-[#74B026] group-hover:rotate-45 transition-all duration-300">
          <FiArrowUpRight className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
}

/* ── Product Detail Modal ── */
function ProductModal({
  product,
  onClose,
  onPurchase,
}: {
  product: Product;
  onClose: () => void;
  onPurchase: () => void;
}) {
  const [size, setSize] = useState("M");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[32px] bg-[var(--surface)] border border-[var(--border)] grid md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300"
        >
          <FiX className="w-4 h-4" />
        </button>

        {/* Image */}
        <div className="relative h-[220px] md:h-full">
          <Image
            src="/tshirt.jpg"
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Details */}
        <div className="p-6 md:p-10 flex flex-col">
          <span className="flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-[#003215]/70 border border-[#74B026]/30 text-[10px] tracking-[0.18em] text-[#74B026] uppercase font-light mb-4">
            <span className="w-1 h-1 rounded-full bg-[#74B026]" />
            T-SHIRT — {product.color}
          </span>

          <h2 className="text-3xl md:text-4xl font-medium leading-tight mb-2">{product.title}</h2>

          <p className="text-2xl text-[#74B026] mb-5">{formatPrice(product.price)}</p>

          <p className="text-[var(--muted-3)] text-sm leading-relaxed mb-6">{product.desc}</p>

          <div className="mb-8">
            <p className="text-[var(--muted-5)] text-xs uppercase tracking-[0.2em] mb-2.5">
              Size {size && <span className="text-[var(--muted-2)]">— {size}</span>}
            </p>
            <div className="flex items-center gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-10 h-10 rounded-full text-xs font-medium border transition-all duration-200 ${
                    size === s
                      ? "bg-[#74B026] border-[#74B026] text-white"
                      : "border-[var(--border)] text-[var(--muted-3)] hover:border-[var(--muted-6)] hover:text-[var(--text)]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onPurchase}
            className="mt-auto w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#74B026] hover:bg-[#8DC93A] text-white text-sm font-medium tracking-wide transition-all duration-300 hover:scale-[1.01]"
          >
            Purchase
            <FiArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Coming Soon Popup ── */
function ComingSoonPopup({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[2200] bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 10 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-sm rounded-[24px] bg-[var(--surface)] border border-[var(--border)] p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[var(--ghost)] hover:bg-[var(--hover-bg)] flex items-center justify-center text-[var(--muted-4)] hover:text-[var(--text)] transition-colors duration-200"
        >
          <FiX className="w-3.5 h-3.5" />
        </button>

        <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#74B026]/10 border border-[#74B026]/30 flex items-center justify-center">
          <FiClock className="w-6 h-6 text-[#74B026]" />
        </div>

        <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
        <p className="text-[var(--muted-4)] text-sm leading-relaxed">
          Online purchasing isn&apos;t live just yet — we&apos;re putting the finishing
          touches on checkout. Check back soon!
        </p>

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 rounded-full border border-[var(--border)] text-sm font-medium text-[var(--muted-2)] hover:text-[var(--text)] hover:border-[#74B026]/40 hover:bg-[#74B026]/10 transition-all duration-300"
        >
          Got it
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Page ── */
export default function Merch() {
  const [selected, setSelected] = useState<Product | null>(null);
  const [comingSoon, setComingSoon] = useState(false);

  useEffect(() => {
    document.body.style.overflow = selected || comingSoon ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected, comingSoon]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (comingSoon) setComingSoon(false);
      else if (selected) setSelected(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selected, comingSoon]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] overflow-x-hidden">
      <ScrollProgress />
      <MouseGlow />
      <CustomCursor />
      <Navbar />

      {/* ── Hero Header ── */}
      <section className="relative pt-36 pb-16 overflow-hidden bg-[var(--bg)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#74B026]/5 blur-[200px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">

          <SectionTag index={1} label="Gonomadigo Merch" className="mb-5" />

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-light leading-none mb-6">
            Wear the <span className="italic text-[#74B026]">Journey.</span>
          </h1>

          <p className="text-[var(--muted-4)] text-base md:text-lg font-light leading-relaxed max-w-2xl">
            A small collection of travel-inspired tees — minimal, durable, and made for
            the road. Pick a size, tap purchase, and we&apos;ll let you know the moment
            checkout opens.
          </p>
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section className="pb-32 max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} onOpen={() => setSelected(product)} />
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <ProductModal
            product={selected}
            onClose={() => setSelected(null)}
            onPurchase={() => setComingSoon(true)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {comingSoon && <ComingSoonPopup onClose={() => setComingSoon(false)} />}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
