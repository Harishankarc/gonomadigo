"use client";

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

const SOCIAL_LINKS = [
    {
        id: "whatsapp",
        title: "Chat on WhatsApp",
        subtitle: "Inquire about tours, packages, and direct bookings",
        href: "https://wa.me/919567130348",
        icon: <FiMessageSquare className="w-5 h-5" />,
        color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400 hover:border-emerald-500/60"
    },
    {
        id: "instagram",
        title: "Follow on Instagram",
        subtitle: "View snapshots, stories, and visual travel diaries",
        href: "https://www.instagram.com/gonomadigo/",
        icon: <FiInstagram className="w-5 h-5" />,
        color: "from-pink-500/20 to-rose-500/10 border-pink-500/30 text-pink-400 hover:border-pink-500/60"
    },
    {
        id: "website",
        title: "Official Website",
        subtitle: "Explore detailed itineraries and travel galleries",
        href: "https://www.gonomadigo.com",
        icon: <FiGlobe className="w-5 h-5" />,
        color: "from-[#74B026]/20 to-[#8DC93A]/10 border-[#74B026]/30 text-[#74B026] hover:border-[#74B026]/60"
    },
    {
        id: "location",
        title: "Our Location",
        subtitle: "Find us on Google Maps",
        href: "https://maps.app.goo.gl/Kv9Ahi9aPUJ1Tahc9?g_st=awb",
        icon: <FiMapPin className="w-5 h-5" />,
        color: "from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400 hover:border-amber-500/60"
    },
    {
        id: "gmail",
        title: "Email Us",
        subtitle: "Send business inquiries or customized itinerary requests",
        href: "mailto:gonomadigo@gmail.com",
        icon: <FiMail className="w-5 h-5" />,
        color: "from-sky-500/20 to-blue-500/10 border-sky-500/30 text-sky-400 hover:border-sky-500/60"
    }
];

export default function ContactLink() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <div className="min-h-screen bg-[#020d05] text-white flex flex-col justify-between items-center relative overflow-hidden px-6 py-12">
            <MouseGlow />
            {/* Dynamic Grid Background Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

            {/* Floating Ambient Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#74B026]/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

            {/* Main Content Card Container */}
            <div className="w-full max-w-[480px] flex-1 flex flex-col justify-center items-center relative z-10 py-8">

                {/* Profile Branding Header */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col items-center text-center mb-10"
                >
                    {/* Logo Frame */}
                    <div className="relative w-44 h-16 mb-4 flex items-center justify-center p-3 rounded-2xl bg-white/[0.02] border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-md">
                        <Image
                            src="/gonomadigologo.png"
                            alt="Gonomadigo Logo"
                            fill
                            className="object-contain p-2"
                            style={{ filter: "brightness(0) invert(1)" }}
                            priority
                        />
                    </div>

                    <span className="text-[#74B026] font-mono text-xs tracking-[0.25em] uppercase font-light">
                        @gonomadigo
                    </span>

                    <p className="text-white/50 text-sm mt-3 font-light max-w-[280px] leading-relaxed">
                        Curated safaris, tropical retreats, and moments beyond the trail.
                    </p>
                </motion.div>

                {/* Dynamic Staggered Links Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="w-full space-y-4"
                >
                    {SOCIAL_LINKS.map((link) => (
                        <motion.div key={link.id} variants={itemVariants}>
                            <Link
                                href={link.href}
                                target={link.href.startsWith("http") || link.href.startsWith("mailto") ? "_blank" : undefined}
                                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                className={`flex items-center gap-4 w-full p-4.5 rounded-2xl border bg-gradient-to-br transition-all duration-300 hover:scale-[1.015] hover:shadow-[0_4px_25px_rgba(0,0,0,0.3)] backdrop-blur-md group ${link.color}`}
                            >
                                {/* Brand icon block */}
                                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/[0.06] transition-colors duration-300">
                                    {link.icon}
                                </div>

                                {/* Text titles block */}
                                <div className="flex-1 text-left min-w-0">
                                    <h4 className="text-sm font-semibold text-white/90 leading-tight">
                                        {link.title}
                                    </h4>
                                    <p className="text-[11px] text-white/40 font-light truncate mt-0.5 leading-none">
                                        {link.subtitle}
                                    </p>
                                </div>

                                {/* Arrow indicator */}
                                <FiArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Footer Branded Backlink */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="relative z-10 flex flex-col items-center gap-3 pt-6 border-t border-white/5 w-full max-w-[240px] text-center"
            >
                <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-[11px] text-white/30 hover:text-[#74B026] tracking-widest font-mono uppercase transition-colors duration-300"
                >
                    <FiCompass className="w-3.5 h-3.5" />
                    <span>gonomadigo.com</span>
                </Link>
            </motion.div>
        </div>
    );
}
