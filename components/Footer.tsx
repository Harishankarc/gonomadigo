"use client";

import {
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiYoutube,
  FiSend,
} from "react-icons/fi";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="
        relative
        overflow-hidden
        border-t
        border-white/10
        bg-black
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
                text-5xl
                md:text-6xl
                italic
                mb-6
              "
            >
              Gonomadigo
            </h2>

            <p
              className="
                text-white/60
                max-w-lg
                leading-8
              "
            >
              Premium hiking adventures crafted for
              explorers who seek more than ordinary
              travel experiences. Discover mountains,
              forests, hidden trails, and unforgettable
              journeys.
            </p>

            {/* Social */}
            <div className="flex gap-4 mt-8">
              {[
                FiInstagram,
                FiFacebook,
                FiTwitter,
                FiYoutube,
              ].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="
                    w-12
                    h-12
                    rounded-full
                    glass
                    flex
                    items-center
                    justify-center
                    text-white/70
                    hover:text-white
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
                text-white
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
                { name: "Testimonials", href: "/#testimonials" },
                { name: "Contact", href: "/#contact" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="
                    block
                    text-white/60
                    hover:text-white
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
                text-white
                font-semibold
                mb-6
              "
            >
              Newsletter
            </h3>

            <p
              className="
                text-white/60
                text-sm
                mb-5
              "
            >
              Get hiking tips, travel inspiration,
              and exclusive adventure offers.
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
                  text-white
                "
              />

              <button
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-white
                  text-[#002215]
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
        <div className="h-px bg-white/10 mb-8" />

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
          <p className="text-white/40 text-sm">
            Â© {currentYear} Gonomadigo.
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
                text-white/40
                hover:text-white
                transition-colors
              "
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="
                text-white/40
                hover:text-white
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
          text-white/[0.03]
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

