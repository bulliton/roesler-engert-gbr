"use client";

import Image from "next/image";

type VideoBackgroundProps = {
  posterSrc?: string;
  videoSrc?: string;
  className?: string;
  imageClassName?: string;
  overlay?: boolean;
};

export function VideoBackground({
  posterSrc = "/images/hero-poster.jpg",
  videoSrc,
  className = "",
  imageClassName = "object-cover",
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
        className={`${imageClassName} ${videoSrc ? "md:hidden" : ""}`}
        sizes="100vw"
        quality={90}
      />
      {overlay && (
        <>
          {/* Desktop: angled scrim — legibility on the left, image breathes on the right */}
          <div
            className="absolute inset-0 hidden md:block"
            style={{
              background:
                "linear-gradient(102deg, rgba(23,23,23,0.84) 0%, rgba(23,23,23,0.58) 30%, rgba(23,23,23,0.14) 52%, transparent 68%)",
            }}
          />
          {/* Mobile: bottom-weighted scrim */}
          <div
            className="absolute inset-0 md:hidden"
            style={{
              background:
                "linear-gradient(to top, rgba(23,23,23,0.9) 0%, rgba(23,23,23,0.55) 42%, rgba(23,23,23,0.18) 68%, transparent 100%)",
            }}
          />
          {/* Soft top edge for transparent header */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, transparent 18%)",
            }}
          />
          <div className="hero-grain absolute inset-0" aria-hidden="true" />
        </>
      )}
    </div>
  );
}
