"use client";

import { AnimatedCircularLogo } from "@/components/ui/AnimatedCircularLogo";

export function RouteLoadingIndicator() {
  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-primary"
      aria-busy="true"
      aria-label="Loading"
    >
      <AnimatedCircularLogo size={120} animate={false} />
    </div>
  );
}
