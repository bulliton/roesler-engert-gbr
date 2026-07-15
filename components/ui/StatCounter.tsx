"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type StatCounterProps = {
  value: string;
  label: string;
};

function parseValue(value: string): { num: number; suffix: string } {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { num: 0, suffix: value };
  return { num: parseInt(match[1], 10), suffix: match[2] };
}

export function StatCounter({ value, label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { num, suffix } = parseValue(value);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      requestAnimationFrame(() => setDisplay(num));
      return;
    }

    const duration = 1500;
    const start = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * num));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, num]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl font-normal text-primary md:text-5xl">
        {display}
        {suffix}
      </div>
      <p className="mt-2 text-sm text-muted md:text-base">{label}</p>
    </div>
  );
}
