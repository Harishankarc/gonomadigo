"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/src/lib/gsap";
import {
  FiArrowUpRight,
  FiMail,
  FiInstagram,
  FiMapPin,
  FiMessageSquare,
} from "react-icons/fi";
import SectionTag from "@/components/SectionTag";
import LocationPathOverlay from "@/components/LocationPathOverlay";

const LOCATION_HREF = "https://maps.app.goo.gl/Kv9Ahi9aPUJ1Tahc9?g_st=awb";

const CONTACT_CHANNELS = [
  {
    label: "WhatsApp",
    value: "Chat with us directly",
    href: "https://wa.me/919567130348",
    icon: FiMessageSquare,
    isMap: false,
  },
  {
    label: "Email",
    value: "gonomadigo@gmail.com",
    href: "mailto:gonomadigo@gmail.com",
    icon: FiMail,
    isMap: false,
  },
  {
    label: "Instagram",
    value: "@gonomadigo",
    href: "https://www.instagram.com/gonomadigo/",
    icon: FiInstagram,
    isMap: false,
  },
  {
    label: "Location",
    value: "Find us on Maps",
    href: LOCATION_HREF,
    icon: FiMapPin,
    isMap: true,
  },
];

const STATS = [
  { value: "5000+", label: "Happy Travelers" },
  { value: "100+", label: "Destinations" },
  { value: "98%", label: "Positive Reviews" },
];

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mapOpen, setMapOpen] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".contact-badge", {
        opacity: 0,
        y: 40,
        duration: 1,
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 80%",
        },
      });

      gsap.from(".contact-title", {
        opacity: 0,
        y: 60,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 80%",
        },
      });

      gsap.from(".contact-card", {
        opacity: 0,
        y: 40,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-card",
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="contact-section relative py-24 md:py-36 overflow-hidden px-6"
    >
      <LocationPathOverlay open={mapOpen} onClose={() => setMapOpen(false)} mapHref={LOCATION_HREF} transparent />
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[#74B026]/10 blur-[220px] pointer-events-none" />

      {/* Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto">
        <SectionTag index={4} label="Get In Touch" className="contact-badge mb-10 md:mb-16" />

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left — Heading & Stats */}
          <div className="contact-title">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6 [font-family:var(--font-display)]">
              Your Next{" "}
              <span className="italic bg-gradient-to-r from-[var(--text)] to-[#74B026] bg-clip-text text-transparent">
                Adventure Awaits
              </span>
            </h2>

            <p className="text-[var(--muted-3)] text-base md:text-lg leading-relaxed max-w-lg mb-10">
              From budget backpacking to fully customized luxury travel, Gonomadigo
              designs journeys that match every travel style. Have a question or a
              custom itinerary in mind? We&apos;d love to hear from you.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-10 max-w-lg">
              {STATS.map((stat) => (
                <div key={stat.label} className="border-l border-[var(--border)] pl-4">
                  <h3 className="text-2xl md:text-3xl font-medium mb-1 [font-family:var(--font-display)]">
                    {stat.value}
                  </h3>
                  <p className="text-[var(--muted-4)] text-xs md:text-sm leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <button className="group inline-flex items-center gap-4 bg-[var(--btn-bg)] text-[var(--btn-text)] px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:bg-[var(--btn-bg-hover)]">
              Book Your Adventure
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--btn-icon-bg)] transition-transform duration-300 group-hover:rotate-45">
                <FiArrowUpRight size={16} />
              </span>
            </button>
          </div>

          {/* Right — Contact Card */}
          <div className="contact-card relative rounded-[32px] border border-[var(--border)] bg-[#74B026]/[0.04] backdrop-blur-xl p-8 md:p-10">
            <div className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-[#74B026]/40 to-transparent" />

            <h3 className="text-xl md:text-2xl font-medium mb-2 [font-family:var(--font-display)]">
              Reach Out Directly
            </h3>
            <p className="text-[var(--muted-4)] text-sm mb-8">
              Pick whichever&apos;s easiest — our team usually replies within a few hours.
            </p>

            <div className="flex flex-col gap-3">
              {CONTACT_CHANNELS.map((channel) => {
                const channelContent = (
                  <>
                    <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-[var(--border)] flex items-center justify-center shrink-0 text-[var(--muted-3)] group-hover:text-[#74B026] group-hover:border-[#74B026]/25 transition-colors duration-300">
                      <channel.icon className="w-[18px] h-[18px]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-[var(--text)]">{channel.label}</h4>
                      <p className="text-xs text-[var(--muted-5)] truncate mt-0.5">{channel.value}</p>
                    </div>

                    <FiArrowUpRight className="w-4 h-4 text-[var(--muted-6)] group-hover:text-[#74B026] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
                  </>
                );

                if (channel.isMap) {
                  return (
                    <button
                      key={channel.label}
                      type="button"
                      onClick={() => setMapOpen(true)}
                      className="flex items-center gap-4 p-4 rounded-2xl border border-[var(--border)] bg-white/[0.02] transition-all duration-300 hover:border-[#74B026]/35 hover:bg-[#74B026]/[0.06] group text-left"
                    >
                      {channelContent}
                    </button>
                  );
                }

                return (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target={
                      channel.href.startsWith("http") || channel.href.startsWith("mailto")
                        ? "_blank"
                        : undefined
                    }
                    rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-[var(--border)] bg-white/[0.02] transition-all duration-300 hover:border-[#74B026]/35 hover:bg-[#74B026]/[0.06] group"
                  >
                    {channelContent}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
