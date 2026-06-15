"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMapPin, FiX } from "react-icons/fi";
import Map3D from "@/components/Map3D";

type Point = [number, number];

function cubicBezier(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
  const mt = 1 - t;
  const x = mt ** 3 * p0[0] + 3 * mt ** 2 * t * p1[0] + 3 * mt * t ** 2 * p2[0] + t ** 3 * p3[0];
  const y = mt ** 3 * p0[1] + 3 * mt ** 2 * t * p1[1] + 3 * mt * t ** 2 * p2[1] + t ** 3 * p3[1];
  return [x, y];
}

const SEGMENT_1: [Point, Point, Point, Point] = [[6, 90], [24, 90], [30, 56], [48, 58]];
const SEGMENT_2: [Point, Point, Point, Point] = [[48, 58], [66, 60], [74, 30], [85, 15]];

const PATH_D = "M 6 90 C 24 90, 30 56, 48 58 C 66 60, 74 30, 85 15";

// Densely sample both bezier segments so the pin glides along the exact
// curve drawn by PATH_D instead of cutting corners between sparse points.
const STEPS_PER_SEGMENT = 9;

const CURVE_POINTS: Point[] = [];
[SEGMENT_1, SEGMENT_2].forEach((seg, segIndex) => {
  const start = segIndex === 0 ? 0 : 1;
  for (let i = start; i <= STEPS_PER_SEGMENT; i++) {
    CURVE_POINTS.push(cubicBezier(seg[0], seg[1], seg[2], seg[3], i / STEPS_PER_SEGMENT));
  }
});

const WAYPOINTS = CURVE_POINTS.map(([x, y], i) => ({
  left: `${x}%`,
  top: `${y}%`,
  time: i / (CURVE_POINTS.length - 1),
}));

const GLINT_INDICES = [0, 5, 9, 14, WAYPOINTS.length - 1];
const GLINTS = GLINT_INDICES.map((i) => WAYPOINTS[i]);

const DEST = WAYPOINTS[WAYPOINTS.length - 1];
const TRAVEL_DURATION = 2.4;
const AUTO_CLOSE_MS = 3400;

export default function LocationPathOverlay({
  open,
  onClose,
  mapHref,
  transparent = false,
}: {
  open: boolean;
  onClose: () => void;
  mapHref: string;
  transparent?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => {
      window.open(mapHref, "_blank", "noopener,noreferrer");
      onClose();
    }, AUTO_CLOSE_MS);
    return () => window.clearTimeout(timer);
  }, [open, onClose, mapHref]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={`fixed inset-0 z-[10001] overflow-hidden ${transparent ? "" : "bg-[#04140a]"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* 3D map backdrop */}
          {!transparent && (
            <>
              <Map3D className="absolute inset-0 w-full h-full" />
              <div className="absolute inset-0 bg-[#04140a]/55" />
            </>
          )}

          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/50 transition-colors duration-300"
          >
            <FiX className="w-4 h-4" />
          </button>

          {/* Dotted route path */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <motion.path
              d={PATH_D}
              fill="none"
              stroke="#74B026"
              strokeWidth="0.35"
              strokeDasharray="1.5 2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: TRAVEL_DURATION, ease: "easeInOut" }}
            />
          </svg>

          {/* Waypoint glints */}
          {GLINTS.map((wp, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#74B026]"
              style={{ left: wp.left, top: wp.top }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0.4], scale: [0, 1.4, 1] }}
              transition={{ duration: 0.5, delay: wp.time * TRAVEL_DURATION }}
            />
          ))}

          {/* Traveling pin */}
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-full"
            initial={{ left: WAYPOINTS[0].left, top: WAYPOINTS[0].top, opacity: 0 }}
            animate={{
              left: WAYPOINTS.map((w) => w.left),
              top: WAYPOINTS.map((w) => w.top),
              opacity: 1,
            }}
            transition={{
              duration: TRAVEL_DURATION,
              ease: "linear",
              times: WAYPOINTS.map((w) => w.time),
              opacity: { duration: 0.2 },
            }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 0.4, repeat: 6, ease: "easeInOut" }}
            >
              <FiMapPin className="w-10 h-10 text-[#74B026] drop-shadow-[0_4px_14px_rgba(116,176,38,0.7)]" />
            </motion.div>
          </motion.div>

          {/* Landing ripple */}
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#74B026]"
            style={{ left: DEST.left, top: DEST.top }}
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={{ width: 90, height: 90, opacity: [0, 0.6, 0] }}
            transition={{
              delay: TRAVEL_DURATION + 0.1,
              duration: 1.2,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: 0.4,
            }}
          />

          {/* Destination label */}
          <motion.div
            className="absolute -translate-x-1/2 text-center rounded-xl bg-black/40 backdrop-blur-md px-4 py-2"
            style={{ left: DEST.left, top: DEST.top, marginTop: "1rem" }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: TRAVEL_DURATION + 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm font-medium text-white whitespace-nowrap">Gonomadigo</p>
            <p className="text-[11px] text-[#74B026] tracking-wide whitespace-nowrap">
              Opening Google Maps&hellip;
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
