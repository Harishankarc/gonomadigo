"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

let cachedAnimationData: object | null = null;

export default function LogoRevealLoader({
  className = "w-full h-full",
  loop = true,
  onComplete,
}: {
  className?: string;
  loop?: boolean;
  onComplete?: () => void;
}) {
  const [animationData, setAnimationData] = useState<object | null>(cachedAnimationData);

  useEffect(() => {
    if (cachedAnimationData) return;
    fetch("/logo-reveal.json")
      .then((res) => res.json())
      .then((data) => {
        cachedAnimationData = data;
        setAnimationData(data);
      })
      .catch(() => {});
  }, []);

  if (!animationData) return null;

  return (
    <div className={`${className} relative`}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay
        onComplete={onComplete}
        className="w-full h-full"
        rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
      />
      <div className="absolute inset-x-0 bottom-[10%] flex justify-center pointer-events-none">
        <span
          className={`text-[10px] sm:text-xs md:text-sm tracking-[0.25em] uppercase text-[#74B026] opacity-0 ${
            loop ? "animate-tagline-loop" : "animate-tagline-once"
          }`}
        >
          Born in Kerala. Made for the world.
        </span>
      </div>
    </div>
  );
}
