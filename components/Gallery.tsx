"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/src/lib/gsap";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const images = [
  "/kenya.jpg",
  "/thailand.jpg",
  "/lakshadeep.jpg",
  "/rajastan.jpg",
  "/kenya.jpg",
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const horizontalAnimation = gsap.to(trackRef.current, {
        x: () =>
          -(trackRef.current!.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () =>
            `+=${trackRef.current!.scrollWidth}`,
          scrub: 1,
          pin: true,
        },
      });

      gsap.utils.toArray(".gallery-image").forEach((img: any) => {
        gsap.fromTo(
          img,
          {
            scale: 1.2,
          },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "left center",
              end: "right center",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="
        relative
        h-screen
        overflow-hidden
        bg-[#003215]
      "
    >
      {/* Background Glow */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[900px]
          h-[900px]
          rounded-full
          bg-[#74B026]/8
          blur-[250px]
          pointer-events-none
        "
      />

      {/* Header */}
      <div
        className="
          absolute
          top-10
          left-1/2
          -translate-x-1/2
          z-20
          text-center
        "
      >
        <div
          className="
            glass
            px-5
            py-2
            rounded-full
            inline-flex
            items-center
            gap-3
            mb-5
          "
        >
          <div className="w-2 h-2 bg-[#74B026] rounded-full" />

          <span
            className="
              text-xs
              tracking-[4px]
              uppercase
              text-white/70
            "
          >
            Adventure Gallery
          </span>
        </div>

        <h2
          className="
            font-display
            text-5xl
            md:text-7xl
            text-white
          "
        >
          Moments Beyond
          <span className="gradient-text italic">
            {" "}
            The Trail
          </span>
        </h2>
      </div>

      {/* Gallery Track */}
      <div
        ref={trackRef}
        className="
          flex
          h-screen
          items-center
          gap-10
          px-[15vw]
          w-max
        "
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="
              relative
              w-[70vw]
              h-[75vh]
              rounded-[40px]
              overflow-hidden
              flex-shrink-0
              glass
            "
          >
            <img
              src={img}
              alt=""
              className="
                gallery-image
                absolute
                inset-0
                w-full
                h-full
                object-cover
              "
            />

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-[#003215]
                via-black/20
                to-transparent
              "
            />

            <div
              className="
                absolute
                bottom-10
                left-10
              "
            >
              <h3
                className="
                  font-display
                  text-4xl
                  md:text-5xl
                  mb-3
                "
              >
                Adventure {index + 1}
              </h3>

              <p
                className="
                  text-white/70
                  max-w-md
                "
              >
                Discover hidden trails,
                breathtaking landscapes,
                and unforgettable moments.
              </p>
            </div>
          </div>
        ))}

        {/* Explore Full Gallery CTA Card */}
        <div
          className="
            relative
            w-[50vw]
            md:w-[40vw]
            h-[75vh]
            rounded-[40px]
            overflow-hidden
            flex-shrink-0
            glass
            flex
            flex-col
            items-center
            justify-center
            text-center
            p-8
            border
            border-white/10
            group
          "
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/90 to-[#003215]/80 z-0" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[#74B026]/10 blur-[80px] group-hover:bg-[#74B026]/20 transition-all duration-700 z-0 pointer-events-none" />

          {/* Card Content */}
          <div className="relative z-10 flex flex-col items-center max-w-sm">
            {/* Glowing Icon Container */}
            <div className="w-16 h-16 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#74B026]/40 group-hover:bg-[#74B026]/10 transition-all duration-500 shadow-[0_0_15px_rgba(255,255,255,0.02)]">
              <FiArrowRight className="w-6 h-6 text-[#74B026] transition-transform duration-500 group-hover:translate-x-1.5" />
            </div>

            <h3 className="font-display text-4xl text-white mb-4 leading-tight">
              Captured<br />
              <span className="italic text-[#74B026]">Moments</span>
            </h3>

            <p className="text-white/50 text-sm font-light leading-relaxed mb-8">
              Step off the beaten path and browse our complete high-definition gallery of snapshots from across the globe.
            </p>

            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#74B026] hover:bg-[#8DC93A] text-white text-sm font-medium tracking-wide transition-all duration-300 hover:scale-[1.03] shadow-[0_4px_20px_rgba(116,176,38,0.25)]"
            >
              Explore Full Gallery
            </Link>
          </div>
        </div>
      </div>

      <div
        className="
          absolute
          bottom-8
          left-1/2
          -translate-x-1/2
          z-20
          text-white/50
          text-xs
          tracking-[6px]
          uppercase
        "
      >
        Scroll To Explore ’
      </div>
    </section>
  );
}

