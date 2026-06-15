"use client";

import { useEffect, useRef } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { gsap } from "@/src/lib/gsap";
import SectionTag from "@/components/SectionTag";

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
          bg-[#74B026]/10
          blur-[180px]
        "
      />

      {/* Header */}
      <div className="max-w-7xl mx-auto">

        <SectionTag index={1} label="Our Story" className="about-badge mb-10" />

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
                text-4xl
                sm:text-5xl
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
                text-4xl
                sm:text-5xl
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
                text-[var(--muted-2)]
                text-base
                md:text-lg
                leading-8
                max-w-xl
                mb-5
              "
            >
              Gonomadigo is a Kerala-born travel and expedition company creating unforgettable journeys across the world. From budget backpacking adventures and solo expeditions to luxury holidays and fully customized travel experiences, we design trips that match every travel style.
            </p>

            <p
              className="
                about-text
                text-[var(--muted-2)]
                text-base
                md:text-lg
                leading-8
                max-w-xl
                mb-5
              "
            >
              Whether your dream destination is 10 km away or 10,000 km across the globe, our mission is to make it happen. We tailor every journey to your needs, budget, and dreams — and we&apos;re especially passionate about welcoming travelers to Kerala and India, offering authentic local experiences beyond the typical tourist route through local connections, cultural immersion, and carefully curated journeys.
            </p>

            <p
              className="
                about-text
                text-[#74B026]
                text-sm
                md:text-base
                italic
                tracking-wide
                max-w-xl
              "
            >
              Gonomadigo — Your Dream Journey, Your Way.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div
            className="
              about-image
              relative
              h-[320px]
              sm:h-[400px]
              md:h-[500px]
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
            flex
            justify-center
            mt-16
            md:mt-24
          "
        >
          <div
            className="
              stat-card
              glass
              rounded-3xl
              px-10
              sm:px-16
              py-8
              sm:py-10
              text-center
            "
          >
            <div
              className="
                text-4xl
                sm:text-5xl
                md:text-6xl
                font-display
                mb-3
                gradient-text
              "
            >
              {statsInView && (
                <CountUp end={5000} duration={3} suffix="+" />
              )}
            </div>

            <p className="text-[var(--muted-3)] text-sm tracking-[0.2em] uppercase">
              Happy Travelers
            </p>
          </div>
        </div>

        {/* Founder */}
        <div className="mt-32">
          <SectionTag index={2} label="About the Founder" className="about-badge mb-10" />

          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* LEFT — Founder identity */}
            <div className="lg:col-span-1">
              <div
                className="
                  about-image
                  relative
                  w-full
                  max-w-[300px]
                  aspect-[4/5]
                  rounded-[32px]
                  overflow-hidden
                  mb-8
                  mx-auto
                  lg:mx-0
                "
              >
                <img
                  src="/founder.jpg"
                  alt="Maheen S — Founder of Gonomadigo"
                  className="w-full h-full object-cover"
                />
              </div>

              <h3
                className="
                  about-heading
                  font-display
                  text-3xl
                  sm:text-4xl
                  md:text-5xl
                  leading-tight
                  mb-2
                "
              >
                Maheen S
              </h3>

              <p className="about-text text-[#74B026] text-xs sm:text-sm tracking-[0.25em] uppercase font-light mb-8">
                Founder &amp; Adventure Traveller
              </p>

              <div className="about-text flex flex-wrap gap-3">
                {[
                  "112+ Countries",
                  "6 Continents",
                  "30+ Media Outlets",
                  "BBC · CNN · Al Jazeera",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full border border-[var(--border)] text-[11px] sm:text-xs tracking-[0.15em] uppercase text-[var(--muted-3)] font-light"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT — Founder bio */}
            <div className="lg:col-span-2 space-y-6">
              <p className="about-text text-[var(--muted-2)] text-base md:text-lg leading-8">
                Maheen S is the Founder of Gonomadigo, a Kerala-born travel and expedition company built on a simple belief: travel has the power to connect people, cultures, and perspectives beyond borders.
              </p>

              <p className="about-text text-[var(--muted-2)] text-base md:text-lg leading-8">
                A passionate traveler, adventurer, and storyteller, Maheen has explored more than 112 countries across six continents, experiencing some of the world&apos;s most remote, challenging, and culturally significant destinations. His journeys have taken him from horseback expeditions across the vast steppes of Mongolia to navigating the Amazon, from kayaking long-distance rivers in Poland to traveling through regions affected by conflict and political instability.
              </p>

              <p className="about-text text-[var(--muted-2)] text-base md:text-lg leading-8">
                Over the years, he has also worked as a field reporter and contributor with more than 30 international media organizations, collaborating on stories and reports that reached global audiences through outlets including BBC, CNN, and Al Jazeera. His work has focused on documenting people, cultures, humanitarian situations, and life in places often overlooked by mainstream tourism.
              </p>

              <p className="about-text text-[var(--muted-2)] text-base md:text-lg leading-8">
                His travels have included visits to Afghanistan during Taliban rule, journeys through Iraq, Sudan, Israel and Palestine during periods of regional tension, and many other destinations that required resilience, adaptability, and a deep respect for local communities. Along the way, he has faced extraordinary challenges, including periods of detention in Afghanistan and Iraq due to misunderstandings while traveling and reporting. These experiences further strengthened his understanding of different cultures and the importance of human connection.
              </p>

              <p className="about-text text-[var(--muted-2)] text-base md:text-lg leading-8">
                Born and raised in Kerala, India, Maheen takes immense pride in his roots. Throughout his travels, he found that many visitors were eager to experience the authentic culture, traditions, food, and hospitality of Kerala and India beyond the typical tourist trail. This realization became one of the inspirations behind the creation of Gonomadigo.
              </p>

              <p className="about-text text-[var(--muted-2)] text-base md:text-lg leading-8">
                Through Gonomadigo, Maheen aims to help people from Kerala discover the world through meaningful and unforgettable journeys while also welcoming international travelers to experience the true spirit of Kerala and India. His vision is not only to organize trips but to create genuine cultural exchanges that bring people closer together.
              </p>

              <p className="about-text text-[var(--muted-2)] text-base md:text-lg leading-8">
                Today, Gonomadigo reflects Maheen&apos;s lifelong passion for exploration, adventure, storytelling, and cultural connection. Whether it is a backpacking expedition, a luxury holiday, an overland adventure, or a once-in-a-lifetime cultural experience, his mission remains the same: to inspire people to see the world with curiosity, respect, and an open mind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
