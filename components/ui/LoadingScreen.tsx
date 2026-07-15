"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

function getReducedMotionPreference() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [reducedMotion] = useState(getReducedMotionPreference);

  useEffect(() => {
    const minDuration = reducedMotion ? 500 : 1800;
    const startedAt = performance.now();

    const complete = () => {
      const elapsed = performance.now() - startedAt;
      const delay = Math.max(0, minDuration - elapsed);
      window.setTimeout(() => setIsLoading(false), delay);
    };

    if (document.readyState === "complete") {
      complete();
    } else {
      window.addEventListener("load", complete, { once: true });
      return () => window.removeEventListener("load", complete);
    }
  }, [reducedMotion]);

  useEffect(() => {
    document.documentElement.classList.toggle("is-loading", isLoading);
    document.body.style.overflow = isLoading ? "hidden" : "";

    return () => {
      document.documentElement.classList.remove("is-loading");
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-primary"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.2 : 0.7, ease: EASE_OUT }}
          aria-hidden={!isLoading}
          aria-busy="true"
        >
          <div className="flex flex-col items-center gap-5">
            <motion.div
              className="relative h-11 w-11"
              animate={reducedMotion ? undefined : { rotate: 360 }}
              transition={
                reducedMotion
                  ? undefined
                  : { duration: 2.8, repeat: Infinity, ease: "linear" }
              }
            >
              <Image
                src="/brand/diamond-icon.png"
                alt="Rösler & Engert"
                fill
                priority
                className="object-contain brightness-0 invert"
              />
            </motion.div>

            <motion.div
              className="relative h-4 w-36 sm:h-5 sm:w-44"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: reducedMotion ? 0 : 0.7,
                ease: EASE_OUT,
              }}
            >
              <Image
                src="/brand/wordmark.png"
                alt=""
                fill
                priority
                className="object-contain brightness-0 invert opacity-90"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
