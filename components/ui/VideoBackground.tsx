"use client";

import Image from "next/image";

type VideoBackgroundProps = {
  posterSrc?: string;
  videoSrc?: string;
  className?: string;
  overlay?: boolean;
};

export function VideoBackground({
  posterSrc = "/images/hero-poster.jpg",
  videoSrc,
  className = "",
  overlay = true,
}: VideoBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {videoSrc ? (
        <video
          className="hidden h-full w-full object-cover md:block"
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}
      <Image
        src={posterSrc}
        alt=""
        fill
        priority
        className={`object-cover ${videoSrc ? "md:hidden" : ""}`}
        sizes="100vw"
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-primary/30" />
      )}
    </div>
  );
}
