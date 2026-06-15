"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import LogoLoader from "@/components/LogoLoader";

type Phase = "idle" | "covering" | "covered" | "revealing";

type TransitionContextValue = {
  runTransition: (action?: () => void) => void;
};

const TransitionContext = createContext<TransitionContextValue>({
  runTransition: (action) => action?.(),
});

export function useSectionTransition() {
  return useContext(TransitionContext);
}

const COVER_MS = 450;

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const busy = useRef(false);
  const pendingAction = useRef<(() => void) | undefined>(undefined);
  const [phase, setPhase] = useState<Phase>("idle");

  // Same-page section navigation: cover, run the scroll action underneath,
  // then wait for the logo animation to finish before revealing.
  const runTransition = useCallback((action?: () => void) => {
    if (busy.current) {
      action?.();
      return;
    }
    busy.current = true;
    pendingAction.current = action;
    setPhase("covering");

    window.setTimeout(() => {
      pendingAction.current?.();
      pendingAction.current = undefined;
      setPhase("covered");
    }, COVER_MS);
  }, []);

  // Route navigation: the new page has already mounted by the time pathname
  // changes, so cover instantly and wait for the logo animation to finish.
  useEffect(() => {
    if (pathname === prevPathname.current) return;
    prevPathname.current = pathname;

    busy.current = true;
    setPhase("covered");
  }, [pathname]);

  // The next section/page is only revealed once the logo animation fully plays.
  const handleAnimationComplete = useCallback(() => {
    setPhase("revealing");

    window.setTimeout(() => {
      setPhase("idle");
      busy.current = false;
    }, COVER_MS);
  }, []);

  return (
    <TransitionContext.Provider value={{ runTransition }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {phase !== "idle" && (
        <motion.div
          className="fixed inset-0 w-screen h-screen z-[10000] flex items-center justify-center bg-white/[0.02] backdrop-blur-md border-t border-white/5 pointer-events-none"
          initial={{ y: "100%" }}
          animate={{ y: phase === "revealing" ? "-100%" : "0%" }}
          transition={{ duration: COVER_MS / 1000, ease: [0.76, 0, 0.24, 1] }}
        >
          <LogoLoader
            className="w-64 sm:w-96 aspect-[1008/400]"
            loop={false}
            onComplete={handleAnimationComplete}
          />
        </motion.div>
      )}
    </TransitionContext.Provider>
  );
}
