"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
    FiInstagram,
    FiMail,
    FiGlobe,
    FiMessageSquare,
    FiArrowUpRight,
    FiCompass,
    FiMapPin
} from "react-icons/fi";
import MouseGlow from "@/components/MouseGlow";
import CustomCursor from "@/components/CustomCursor";
import LocationPathOverlay from "@/components/LocationPathOverlay";
import { useTheme } from "@/components/ThemeProvider";

const LOCATION_HREF = "https://maps.app.goo.gl/Kv9Ahi9aPUJ1Tahc9?g_st=awb";

const SOCIAL_LINKS = [
    {
        title: "Chat on WhatsApp",
        subtitle: "Inquire about tours, packages, and direct bookings",
        href: "https://wa.me/919567130348",
        icon: <FiMessageSquare className="w-[18px] h-[18px]" />,
        isMap: false
    },
    {
        title: "Follow on Instagram",
        subtitle: "View snapshots, stories, and visual travel diaries",
        href: "https://www.instagram.com/gonomadigo/",
        icon: <FiInstagram className="w-[18px] h-[18px]" />,
        isMap: false
    },
    {
        title: "Official Website",
        subtitle: "Explore detailed itineraries and travel galleries",
        href: "https://www.gonomadigo.com",
        icon: <FiGlobe className="w-[18px] h-[18px]" />,
        isMap: false
    },
    {
        title: "Our Location",
        subtitle: "Find us on Google Maps",
        href: LOCATION_HREF,
        icon: <FiMapPin className="w-[18px] h-[18px]" />,
        isMap: true
    },
    {
        title: "Email Us",
        subtitle: "Send business inquiries or customized itinerary requests",
        href: "mailto:gonomadigo@gmail.com",
        icon: <FiMail className="w-[18px] h-[18px]" />,
        isMap: false
    }
];

export default function ContactLink() {
    const { theme } = useTheme();
    const [mapOpen, setMapOpen] = useState(false);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
    };

    return (
        <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col justify-between items-center relative overflow-hidden px-6 py-12 grain">
            <MouseGlow />
            <CustomCursor />
            <LocationPathOverlay open={mapOpen} onClose={() => setMapOpen(false)} mapHref={LOCATION_HREF} transparent />

            {/* Grid Background Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#74B026]/8 blur-[220px] pointer-events-none" />

            {/* Main Content */}
            <div className="w-full max-w-[440px] flex-1 flex flex-col justify-center items-center relative z-10 py-8">

                {/* Branding Header */}
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col items-center text-center mb-12"
                >
                    <div className="relative w-4xl md:w-27 h-12 mb-5">
                        <Image
                            src="/gonomadigologo.png"
                            alt="Gonomadigo"
                            fill
                            className="object-contain"
                            style={{ filter: theme === "dark" ? "brightness(0) invert(1)" : "none" }}
                            priority
                        />
                    </div>

                    <h1 className="font-display text-3xl italic mb-3">
                        Gono<span className="text-[#74B026]">madigo</span>
                    </h1>

                    <div className="h-px w-10 bg-[#74B026]/40 mb-3" />

                    <p className="text-[var(--muted-4)] text-sm font-light max-w-[300px] leading-relaxed">
                        Curated safaris, tropical retreats, and moments beyond the trail.
                    </p>
                </motion.div>

                {/* Links */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="w-full flex flex-col gap-3"
                >
                    {SOCIAL_LINKS.map((link, index) => {
                        const itemContent = (
                            <>
                                {/* Index */}
                                <span className="hidden sm:block font-mono text-[11px] text-[var(--muted-6)] tracking-[0.15em] shrink-0 group-hover:text-[#74B026]/60 transition-colors duration-300">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                {/* Icon */}
                                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-[var(--border)] flex items-center justify-center shrink-0 text-[var(--muted-3)] group-hover:text-[#74B026] group-hover:border-[#74B026]/25 transition-colors duration-300">
                                    {link.icon}
                                </div>

                                {/* Text */}
                                <div className="flex-1 text-left min-w-0">
                                    <h4 className="text-sm font-medium text-[var(--text)] leading-tight">
                                        {link.title}
                                    </h4>
                                    <p className="text-[11px] text-[var(--muted-5)] font-light truncate mt-0.5 leading-none">
                                        {link.subtitle}
                                    </p>
                                </div>

                                {/* Arrow */}
                                <FiArrowUpRight className="w-4 h-4 text-[var(--muted-6)] group-hover:text-[#74B026] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
                            </>
                        );

                        return (
                            <motion.div key={link.title} variants={itemVariants}>
                                {link.isMap ? (
                                    <button
                                        type="button"
                                        onClick={() => setMapOpen(true)}
                                        className="flex items-center gap-4 w-full p-4 rounded-2xl border border-[var(--border)] bg-white/[0.02] backdrop-blur-md transition-all duration-300 hover:border-[#74B026]/35 hover:bg-[#74B026]/[0.04] group text-left"
                                    >
                                        {itemContent}
                                    </button>
                                ) : (
                                    <Link
                                        href={link.href}
                                        target={link.href.startsWith("http") || link.href.startsWith("mailto") ? "_blank" : undefined}
                                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        className="flex items-center gap-4 w-full p-4 rounded-2xl border border-[var(--border)] bg-white/[0.02] backdrop-blur-md transition-all duration-300 hover:border-[#74B026]/35 hover:bg-[#74B026]/[0.04] group"
                                    >
                                        {itemContent}
                                    </Link>
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            {/* Footer Backlink */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="relative z-10 flex flex-col items-center gap-3 pt-6 border-t border-[var(--border)] w-full max-w-[240px] text-center"
            >
                <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-[11px] text-[var(--muted-5)] hover:text-[#74B026] tracking-widest font-mono uppercase transition-colors duration-300"
                >
                    <FiCompass className="w-3.5 h-3.5" />
                    <span>gonomadigo.com</span>
                </Link>
            </motion.div>
        </div>
    );
}
