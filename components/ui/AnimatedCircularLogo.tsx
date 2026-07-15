"use client";

import { motion } from "framer-motion";
import {
  CIRCULAR_LOGO_CENTER,
  CIRCULAR_LOGO_DIAMOND_PATH,
  CIRCULAR_LOGO_TEXT_PATHS,
} from "@/lib/brand/circular-logo-paths";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

type AnimatedCircularLogoProps = {
  size?: number;
  className?: string;
  reducedMotion?: boolean;
  animate?: boolean;
};

export function AnimatedCircularLogo({
  size = 128,
  className = "",
  reducedMotion = false,
  animate = true,
}: AnimatedCircularLogoProps) {
  const shouldAnimate = animate && !reducedMotion;
  const { x: cx, y: cy } = CIRCULAR_LOGO_CENTER;
  const origin = `${cx}px ${cy}px`;

  return (
    <motion.svg
      viewBox="0 0 1638 1687"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-white ${className}`}
      role="img"
      aria-label="Rösler & Engert"
      initial={shouldAnimate ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={
        shouldAnimate
          ? { duration: 0.6, ease: EASE_OUT }
          : { duration: 0.2 }
      }
    >
      <motion.g
        style={{ transformOrigin: origin }}
        initial={shouldAnimate ? { opacity: 0, scale: 0.94 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={
          shouldAnimate
            ? { duration: 0.9, ease: EASE_OUT }
            : { duration: 0.2 }
        }
      >
        <path d={CIRCULAR_LOGO_DIAMOND_PATH} fill="currentColor" />
      </motion.g>

      <g transform={`translate(${cx} ${cy})`}>
        <motion.g
          className={shouldAnimate ? "logo-text-orbit" : undefined}
          initial={shouldAnimate ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={
            shouldAnimate
              ? { duration: 0.8, delay: 0.15, ease: EASE_OUT }
              : { duration: 0.2 }
          }
        >
          <g transform={`translate(${-cx} ${-cy})`}>
            {CIRCULAR_LOGO_TEXT_PATHS.map((path, index) => (
              <path key={index} d={path} fill="currentColor" />
            ))}
          </g>
        </motion.g>
      </g>
    </motion.svg>
  );
}
