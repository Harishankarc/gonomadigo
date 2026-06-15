"use client";

import { motion } from "framer-motion";

const PULSE_DOTS = [
  { top: "26%", left: "22%", delay: 0 },
  { top: "64%", left: "72%", delay: 0.4 },
  { top: "46%", left: "58%", delay: 0.8 },
  { top: "78%", left: "32%", delay: 1.2 },
  { top: "18%", left: "68%", delay: 1.6 },
];

export default function Map3D({ className = "w-full h-full" }: { className?: string }) {
  return (
    <div className={`${className} relative overflow-hidden bg-[#04140a]`}>
      {/* Drifting grid floor */}
      <motion.div
        className="absolute -inset-1/2"
        style={{
          backgroundImage:
            "linear-gradient(rgba(116,176,38,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(116,176,38,0.16) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "48px 48px"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />

      {/* Glowing landmasses */}
      <div className="absolute top-[16%] left-[10%] w-[46%] h-[42%] rounded-[42%] bg-[#74B026]/[0.16] blur-2xl" />
      <div className="absolute bottom-[8%] right-[6%] w-[42%] h-[38%] rounded-[46%] bg-[#74B026]/[0.12] blur-2xl" />
      <div className="absolute top-[42%] right-[22%] w-[26%] h-[26%] rounded-full bg-[#74B026]/[0.14] blur-xl" />

      {/* Animated travel routes */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 12 72 Q 38 28 64 46 T 92 22"
          fill="none"
          stroke="#74B026"
          strokeWidth="0.4"
          strokeDasharray="2 3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.55 }}
          transition={{ duration: 1.6, delay: 0.35, ease: "easeOut" }}
        />
        <motion.path
          d="M 18 28 Q 48 58 82 70"
          fill="none"
          stroke="#74B026"
          strokeWidth="0.3"
          strokeDasharray="1.5 2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 1.8, delay: 0.55, ease: "easeOut" }}
        />
      </svg>

      {/* Pulsing city markers */}
      {PULSE_DOTS.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-[#74B026]"
          style={{ top: dot.top, left: dot.left }}
          animate={{ opacity: [0.35, 1, 0.35], scale: [1, 1.7, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: dot.delay, ease: "easeInOut" }}
        />
      ))}

      {/* Radar sweep */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(116,176,38,0.22), transparent 28%, transparent 100%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
