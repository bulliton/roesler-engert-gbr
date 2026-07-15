import { type ReactNode } from "react";
import Image from "next/image";
import { Link } from "@/lib/navigation";

type MegaMenuPanelProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function MegaMenuPanel({ open, onClose, children }: MegaMenuPanelProps) {
  if (!open) return null;

  return (
    <div
      className="mega-menu-panel absolute inset-x-0 top-full z-50 border-t border-primary/10 bg-white shadow-[0_16px_48px_rgba(0,70,70,0.1)]"
      onMouseLeave={onClose}
    >
      <div className="mx-auto max-w-[var(--page-max-width)] px-[var(--section-padding-x)] py-9">
        {children}
      </div>
    </div>
  );
}

type MegaMenuColumnProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function MegaMenuColumn({
  title,
  children,
  className = "",
}: MegaMenuColumnProps) {
  return (
    <div className={className}>
      <p className="mega-menu-heading">{title}</p>
      {children}
    </div>
  );
}

type MegaMenuLinkProps = {
  href: Parameters<typeof Link>[0]["href"];
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

export function MegaMenuLink({
  href,
  children,
  onClick,
  className = "",
}: MegaMenuLinkProps) {
  return (
    <Link href={href} className={`mega-menu-link ${className}`} onClick={onClick}>
      {children}
    </Link>
  );
}

type MegaMenuFeatureProps = {
  src: string;
  alt: string;
  caption: string;
  href?: Parameters<typeof Link>[0]["href"];
  onClick?: () => void;
};

export function MegaMenuFeature({
  src,
  alt,
  caption,
  href = "/diamonds",
  onClick,
}: MegaMenuFeatureProps) {
  const image = (
    <div className="relative aspect-[3/4] min-h-[18rem] overflow-hidden bg-primary-light lg:min-h-[20rem]">
      <Image src={src} alt={alt} fill className="object-cover" sizes="320px" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
      <p className="absolute right-4 bottom-4 left-4 font-display text-xl leading-snug text-white">
        {caption}
      </p>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="group block overflow-hidden"
        onClick={onClick}
      >
        <div className="transition-transform duration-500 group-hover:scale-[1.02]">
          {image}
        </div>
      </Link>
    );
  }

  return image;
}
