"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

let cachedAnimationData: object | null = null;

export default function CarLoader({
  className = "w-full h-full",
}: {
  className?: string;
}) {
  const [animationData, setAnimationData] = useState<object | null>(cachedAnimationData);

  useEffect(() => {
    if (cachedAnimationData) return;
    fetch("/lottie-map.json")
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
      loop
      autoplay
      className={`${className} grayscale`}
      style={{ width: "30vh", height: "30vh" }}
      rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
    />
  );
}
