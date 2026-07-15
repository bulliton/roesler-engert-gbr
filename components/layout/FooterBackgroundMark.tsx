import { CIRCULAR_LOGO_DIAMOND_PATH } from "@/lib/brand/circular-logo-paths";

export function FooterBackgroundMark() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 1638 1687"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -right-[18%] -bottom-[32%] h-[min(120vw,56rem)] w-auto text-white opacity-[0.07] select-none sm:-right-[14%] sm:-bottom-[28%] lg:-right-[10%] lg:-bottom-[24%] lg:h-[48rem] xl:h-[54rem]"
      >
        <path d={CIRCULAR_LOGO_DIAMOND_PATH} fill="currentColor" />
      </svg>
    </div>
  );
}
