"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { getLenis } from "@/components/SmoothScroll";
import { useSectionTransition } from "@/components/PageTransition";
import BookingModal from "@/components/BookingModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const pathname = usePathname();
  const { runTransition } = useSectionTransition();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setMobileOpen(false);

    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) return;

    const targetPath = href.slice(0, hashIndex) || "/";
    const hash = href.slice(hashIndex + 1);

    if (pathname === targetPath) {
      e.preventDefault();
      runTransition(() => {
        const el = document.getElementById(hash);
        if (el) {
          getLenis()?.scrollTo(el, { offset: -80, immediate: true });
          window.history.pushState(null, "", `#${hash}`);
        }
      });
    } else {
      // Navigating from another page — resume the smooth scroll once landed
      sessionStorage.setItem("scrollTarget", hash);
    }
  };

  const links = [
    {
      name: "About",
      href: "/#about",
    },
    {
      name: "Packages",
      href: "/#packages",
    },
    {
      name: "Gallery",
      href: "/#gallery",
    },
    {
      name: "Shopping",
      href: "/shopping",
    },
    {
      name: "Contact",
      href: "/#contact",
    },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`
          fixed
          top-0
          left-0
          right-0
          z-[1000]
          transition-all
          duration-500
        `}
      >
        <div
          className={`
            mx-auto
            mt-4
            max-w-[1400px]
            px-4
            md:px-8
          `}
        >
          <div
            className={`
              flex
              items-center
              justify-between
              rounded-full
              border
              transition-all
              duration-500
              ${scrolled
                ? "bg-black/50 backdrop-blur-2xl border-white/10 py-3"
                : "bg-transparent border-transparent py-4"
              }
            `}
          >
            {/* Logo */}
            <Link href="/" className="pl-4 sm:pl-6 mt-0!">
              <Image
                src="/gonomadigologo.png"
                alt="Gonomadigo"
                width={180}
                height={60}
                className="h-8 sm:h-10 md:h-[60px] w-auto object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
                priority
              />
            </Link>

            {/* Desktop Menu */}
            <div
              className="
                hidden
                lg:flex
                items-center
                gap-2
                glass
                rounded-full
                px-2
                py-2
              "
            >
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="
                    px-5
                    py-2
                    rounded-full
                    text-sm
                    text-white/70
                    transition-all
                    duration-300
                    hover:text-white
                    hover:bg-white/10
                  "
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3 pr-4">
              <button
                onClick={() => setBookingOpen(true)}
                className="
                  group
                  flex
                  items-center
                  gap-3
                  rounded-full
                  bg-white
                  px-5
                  py-3
                  text-[#002215]
                  font-medium
                  transition-all
                  duration-300
                  hover:scale-105
                "
              >
                Book Adventure

                <span
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-black/10
                    transition-all
                    duration-300
                    group-hover:rotate-45
                  "
                >
                  <FiArrowUpRight />
                </span>
              </button>
            </div>

            {/* Mobile Toggle */}
            <button
              className="
                lg:hidden
                mr-4
                text-2xl
              "
              onClick={() =>
                setMobileOpen(!mobileOpen)
              }
            >
              {mobileOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
        }}
        className="
          fixed
          inset-0
          z-[999]
          bg-black/90
          backdrop-blur-xl
          lg:hidden
        "
      >
        <div
          className="
            flex
            h-full
            flex-col
            items-center
            justify-center
            gap-8
          "
        >
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="
                text-3xl
                font-light
                text-white/80
                hover:text-white
              "
            >
              {link.name}
            </Link>
          ))}

          <button
            onClick={() => {
              setMobileOpen(false);
              setBookingOpen(true);
            }}
            className="
              mt-4
              rounded-full
              bg-white
              px-8
              py-4
              text-[#002215]
              font-medium
            "
          >
            Book Adventure
          </button>
        </div>
      </motion.div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
