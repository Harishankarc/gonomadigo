"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/src/lib/gsap";
import { FiStar } from "react-icons/fi";

const testimonials = [
  {
    name: "Arjun Menon",
    location: "Kerala",
    review:
      "The sunrise trek was absolutely breathtaking. Every detail was perfectly organized and the guides were exceptional.",
  },
  {
    name: "Sarah Wilson",
    location: "United Kingdom",
    review:
      "One of the best hiking experiences I've ever had. The landscapes, food, and people made this trip unforgettable.",
  },
  {
    name: "Rahul Sharma",
    location: "Bangalore",
    review:
      "Professional guides, stunning locations, and premium service. I will definitely book another adventure.",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".testimonial-header", {
        opacity: 0,
        y: 80,
        duration: 1,
        scrollTrigger: {
          trigger: ".testimonial-header",
          start: "top 80%",
        },
      });

      gsap.from(".testimonial-card", {
        opacity: 0,
        y: 80,
        stagger: 0.2,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testimonial-grid",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="
        relative
        py-32
        px-6
        md:px-16
        overflow-hidden
      "
    >
      {/* Glow */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[700px]
          h-[700px]
          rounded-full
          bg-[#74B026]/8
          blur-[220px]
        "
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="testimonial-header text-center mb-20">
          <div
            className="
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
              Testimonials
            </span>
          </div>

          <h2
            className="
              font-display
              text-5xl
              md:text-7xl
              mb-6
            "
          >
            Stories From
            <span className="gradient-text italic">
              {" "}
              Adventurers
            </span>
          </h2>

          <p
            className="
              text-white/60
              max-w-2xl
              mx-auto
              text-lg
            "
          >
            Thousands of travelers have explored
            mountains, forests, and hidden trails with us.
          </p>
        </div>

        {/* Cards */}
        <div
          className="
            testimonial-grid
            grid
            md:grid-cols-3
            gap-8
          "
        >
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="
                testimonial-card
                glass
                rounded-[32px]
                p-8
                hover:-translate-y-2
                transition-all
                duration-500
              "
            >
              {/* Stars */}
              <div className="flex gap-2 mb-6 text-[#74B026]">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    fill="currentColor"
                  />
                ))}
              </div>

              <p
                className="
                  text-white/70
                  leading-8
                  mb-8
                "
              >
                "{item.review}"
              </p>

              <div>
                <h4
                  className="
                    font-display
                    text-2xl
                    mb-1
                  "
                >
                  {item.name}
                </h4>

                <p className="text-white/50 text-sm">
                  {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Quote */}
        <div
          className="
            mt-28
            text-center
            max-w-4xl
            mx-auto
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
            “Every trail tells a story.
            Every summit creates a memory.”
          </h3>
        </div>
      </div>
    </section>
  );
}