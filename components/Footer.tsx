"use client";

import {
  FiInstagram,
  FiMessageSquare,
  FiGlobe,
  FiMail,
  FiSend,
} from "react-icons/fi";
import Link from "next/link";

const SOCIALS = [
  { Icon: FiMessageSquare, href: "https://wa.me/919567130348" },
  { Icon: FiInstagram, href: "https://www.instagram.com/gonomadigo/" },
  { Icon: FiGlobe, href: "https://www.gonomadigo.com" },
  { Icon: FiMail, href: "mailto:gonomadigo@gmail.com" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="
        relative
        overflow-hidden
        border-t
        border-[var(--border)]
        bg-[var(--surface)]
        text-[var(--text)]
      "
    >
      {/* Glow */}
      <div
        className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          w-[700px]
          h-[300px]
          bg-[#74B026]/8
          blur-[180px]
          pointer-events-none
        "
      />

      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          md:px-16
          py-24
          relative
          z-10
        "
      >
        {/* Top Section */}
        <div
          className="
            grid
            lg:grid-cols-4
            gap-12
            mb-20
          "
        >
          {/* Brand */}
          <div className="lg:col-span-2">
            <h2
              className="
                font-display
                text-4xl
                sm:text-5xl
                md:text-6xl
                italic
                mb-6
              "
            >
              Gonomadigo
            </h2>

            <p
              className="
                text-[var(--muted-3)]
                max-w-lg
                leading-8
              "
            >
              Gonomadigo is a Kerala-born travel and expedition
              company crafting unforgettable journeys across the
              world — from budget backpacking and solo expeditions
              to fully customized luxury experiences.
            </p>

            {/* Social */}
            <div className="flex gap-4 mt-8">
              {SOCIALS.map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-12
                    h-12
                    rounded-full
                    glass
                    flex
                    items-center
                    justify-center
                    text-[var(--muted-2)]
                    hover:text-[var(--text)]
                    hover:scale-110
                    transition-all
                    duration-300
                  "
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="
                text-[var(--text)]
                font-semibold
                mb-6
              "
            >
              Explore
            </h3>

            <div className="space-y-4">
              {[
                { name: "About", href: "/#about" },
                { name: "Packages", href: "/#packages" },
                { name: "Gallery", href: "/gallery" },
                { name: "Shopping", href: "/shopping" },
                { name: "Contact", href: "/#contact" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="
                    block
                    text-[var(--muted-3)]
                    hover:text-[var(--text)]
                    transition-colors
                  "
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3
              className="
                text-[var(--text)]
                font-semibold
                mb-6
              "
            >
              Newsletter
            </h3>

            <p
              className="
                text-[var(--muted-3)]
                text-sm
                mb-5
              "
            >
              Get travel inspiration, curated itineraries,
              and exclusive offers from Gonomadigo.
            </p>

            <div
              className="
                glass
                rounded-full
                p-2
                flex
                items-center
              "
            >
              <input
                type="email"
                placeholder="Email address"
                className="
                  flex-1
                  bg-transparent
                  outline-none
                  px-4
                  text-sm
                  text-[var(--text)]
                "
              />

              <button
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-[var(--btn-bg)]
                  text-[var(--btn-text)]
                  flex
                  items-center
                  justify-center
                "
              >
                <FiSend />
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[var(--border)] mb-8" />

        {/* Bottom */}
        <div
          className="
            flex
            flex-col
            md:flex-row
            justify-between
            items-center
            gap-4
          "
        >
          <p className="text-[var(--muted-5)] text-sm">
            © {currentYear} Gonomadigo.
            All rights reserved.
          </p>

          <div
            className="
              flex
              gap-6
              text-sm
            "
          >
            <a
              href="#"
              className="
                text-[var(--muted-5)]
                hover:text-[var(--text)]
                transition-colors
              "
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="
                text-[var(--muted-5)]
                hover:text-[var(--text)]
                transition-colors
              "
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      {/* Huge Background Text */}
      <div
        className="
          absolute
          bottom-[-40px]
          left-1/2
          -translate-x-1/2
          text-[12vw]
          font-display
          italic
          text-[var(--ghost)]
          whitespace-nowrap
          pointer-events-none
          select-none
        "
      >
        GONOMADIGO
      </div>
    </footer>
  );
}
