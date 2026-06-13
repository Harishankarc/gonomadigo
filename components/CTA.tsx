"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/src/lib/gsap";
import { FiArrowUpRight } from "react-icons/fi";

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".cta-badge", {
        opacity: 0,
        y: 40,
        duration: 1,
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top 80%",
        },
      });

      gsap.from(".cta-title", {
        opacity: 0,
        y: 100,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top 80%",
        },
      });

      gsap.from(".cta-card", {
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cta-card",
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
      className="
        cta-section
        relative
        min-h-screen
        flex
        items-center
        justify-center
        overflow-hidden
        px-6
      "
    >
      {/* Background Glow */}
      <div
        className="
          absolute
          w-[900px]
          h-[900px]
          rounded-full
          bg-[#74B026]/15
          blur-[220px]
          animate-pulse
        "
      />

      <div
        className="
          absolute
          top-20
          left-20
          w-48
          h-48
          rounded-full
          bg-[#74B026]/8
          blur-3xl
          animate-float
        "
      />

      <div
        className="
          absolute
          bottom-20
          right-20
          w-64
          h-64
          rounded-full
          bg-white/5
          blur-3xl
          animate-float
        "
      />

      {/* Content */}
      <div
        className="
          relative
          z-10
          max-w-6xl
          mx-auto
          text-center
        "
      >
        {/* Badge */}
        <div
          className="
            cta-badge
            inline-flex
            items-center
            gap-3
            px-5
            py-2
            rounded-full
            glass
            mb-8
          "
        >
          <div className="w-2 h-2 rounded-full bg-[#74B026]" />

          <span
            className="
              uppercase
              tracking-[4px]
              text-xs
              text-white/70
            "
          >
            Start Your Journey
          </span>
        </div>

        {/* Heading */}
        <h2
          className="
            cta-title
            font-display
            text-5xl
            md:text-8xl
            leading-none
            mb-8
          "
        >
          Your Next
          <br />

          <span className="gradient-text italic">
            Adventure Awaits
          </span>
        </h2>

        <p
          className="
            text-white/60
            text-lg
            md:text-xl
            max-w-2xl
            mx-auto
            mb-16
          "
        >
          Discover hidden trails, breathtaking
          mountain views, and unforgettable
          experiences with Gonomadigo.
        </p>

        {/* Glass Card */}
        <div
          className="
            cta-card
            glass
            max-w-4xl
            mx-auto
            rounded-[40px]
            p-8
            md:p-14
          "
        >
          <div
            className="
              grid
              md:grid-cols-3
              gap-8
              mb-10
            "
          >
            <div>
              <h3 className="font-display text-4xl mb-2">
                5000+
              </h3>
              <p className="text-white/60">
                Travelers Guided
              </p>
            </div>

            <div>
              <h3 className="font-display text-4xl mb-2">
                120+
              </h3>
              <p className="text-white/60">
                Hiking Trails
              </p>
            </div>

            <div>
              <h3 className="font-display text-4xl mb-2">
                98%
              </h3>
              <p className="text-white/60">
                Positive Reviews
              </p>
            </div>
          </div>

          <button
            className="
              group
              inline-flex
              items-center
              gap-4
              bg-white
              text-[#002215]
              px-8
              py-4
              rounded-full
              font-medium
              transition-all
              duration-300
              hover:scale-105
            "
          >
            Book Your Adventure

            <span
              className="
                transition-transform
                duration-300
                group-hover:rotate-45
              "
            >
              <FiArrowUpRight size={20} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

