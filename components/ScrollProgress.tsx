"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handle = () => {
      const total =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const current = window.scrollY;

      setProgress((current / total) * 100);
    };

    window.addEventListener("scroll", handle);

    return () =>
      window.removeEventListener("scroll", handle);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[2px] bg-white z-[9999]"
      style={{ width: `${progress}%` }}
    />
  );
}