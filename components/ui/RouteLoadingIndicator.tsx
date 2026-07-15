import Image from "next/image";

export function RouteLoadingIndicator() {
  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-primary"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="relative h-10 w-10 animate-spin motion-reduce:animate-none">
        <Image
          src="/brand/diamond-icon.png"
          alt=""
          fill
          className="object-contain brightness-0 invert"
        />
      </div>
    </div>
  );
}
