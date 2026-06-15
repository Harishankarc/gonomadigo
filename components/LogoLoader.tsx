"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

let cachedAnimationData: object | null = null;

export default function LogoLoader({
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
    fetch("/logo-draw.json")
      .then((res) => res.json())
      .then((data) => {
        cachedAnimationData = data;
        setAnimationData(data);
      })
      .catch(() => {});
  }, []);

  if (!animationData) return null;

  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay
      onComplete={onComplete}
      className={className}
      rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
    />
  );
}
