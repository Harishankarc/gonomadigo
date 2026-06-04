"use client";

import { useEffect, useRef } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { gsap } from "@/src/lib/gsap";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".about-badge", {
        opacity: 0,
        y: 40,
        duration: 1,
        scrollTrigger: {
          trigger: ".about-badge",
          start: "top 85%",
        },
      });

      gsap.from(".about-heading", {
        opacity: 0,
        y: 80,
        duration: 1.2,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".about-heading",
          start: "top 80%",
        },
      });

      gsap.from(".about-text", {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 80%",
        },
      });

      gsap.from(".about-image", {
        scale: 1.2,
        opacity: 0,
        duration: 1.5,
        scrollTrigger: {
          trigger: ".about-image",
          start: "top 80%",
        },
      });

      gsap.from(".stat-card", {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".stats-grid",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="
        relative
        min-h-screen
        py-32
        px-6
        md:px-16
        overflow-hidden
      "
    >
      {/* Background Glow */}
      <div
        className="
          absolute
          top-20
          left-1/2
          -translate-x-1/2
          w-[700px]
          h-[700px]
          rounded-full
          bg-orange-500/10
          blur-[180px]
        "
      />

      {/* Header */}
      <div className="max-w-7xl mx-auto">

        <div
          className="
            about-badge
            inline-flex
            items-center
            gap-3
            px-5
            py-2
            rounded-full
            glass
            mb-10
          "
        >
          <div className="w-2 h-2 rounded-full bg-orange-400" />
          <span className="text-xs tracking-[4px] uppercase text-white/70">
            Our Story
          </span>
        </div>

        <div
          className="
            grid
            lg:grid-cols-2
            gap-16
            items-center
          "
        >
          {/* LEFT */}
          <div>
            <h2
              className="
                about-heading
                font-display
                text-5xl
                md:text-7xl
                leading-none
                mb-6
              "
            >
              Born In Kerala
            </h2>

            <h2
              className="
                about-heading
                font-display
                text-5xl
                md:text-6xl
                italic
                gradient-text
                leading-none
                mb-10
              "
            >
              Made for the World.
            </h2>

            <p
              className="
                about-text
                text-white/70
                text-lg
                leading-8
                max-w-xl
              "
            >
              Gonomadigo is a Kerala-born travel & expedition collective curating unforgettable journeys across the world. From backpacking trails to group trips and fully customised adventures — every journey we design is built around you.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div
            className="
              about-image
              relative
              h-[500px]
              rounded-[40px]
              overflow-hidden
            "
          >
            <img
              src="/logo.jpg"
              alt="Mountain"
              className="
                w-full
                h-full
                object-cover
                hover:scale-110
                transition-all
                duration-1000
              "
            />

            


          </div>
        </div>

        {/* STATS */}
        <div
          ref={statsRef}
          className="
            stats-grid
            grid
            md:grid-cols-4
            gap-6
            mt-24
          "
        >
          {[
            {
              number: 5000,
              suffix: "+",
              label: "Happy Travelers",
            },
            {
              number: 120,
              suffix: "+",
              label: "Mountain Trails",
            },
            {
              number: 8,
              suffix: "+",
              label: "Years Experience",
            },
            {
              number: 98,
              suffix: "%",
              label: "Positive Reviews",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="
                stat-card
                glass
                rounded-3xl
                p-8
                text-center
              "
            >
              <div
                className="
                  text-5xl
                  font-display
                  mb-3
                  gradient-text
                "
              >
                {statsInView && (
                  <CountUp
                    end={item.number}
                    duration={3}
                    suffix={item.suffix}
                  />
                )}
              </div>

              <p className="text-white/60 text-sm tracking-wider uppercase">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div
          className="
            mt-32
            max-w-4xl
            mx-auto
            text-center
          "
        >
          <h3
            className="
              font-display
              text-4xl
              md:text-6xl
              leading-tight
            "
          >
            “The mountains are not a destination.
            They are a feeling.”
          </h3>

          <p className="mt-6 text-white/50 tracking-[3px] uppercase text-sm">
            Gonomadigo Philosophy
          </p>
        </div>
      </div>
    </section>
  );
}