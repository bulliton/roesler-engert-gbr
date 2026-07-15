export const leftNavItems = [
  { key: "diamonds" as const, href: "/diamonds" as const, mega: true },
  { key: "jewelry" as const, href: "/jewelry" as const, mega: true },
  { key: "services" as const, href: "/services" as const },
] as const;

export const jewelrySubItems = [
  {
    key: "earrings" as const,
    href: { pathname: "/jewelry" as const, hash: "earrings" },
  },
  {
    key: "rings" as const,
    href: { pathname: "/jewelry" as const, hash: "rings" },
  },
  {
    key: "necklaces" as const,
    href: { pathname: "/jewelry" as const, hash: "necklaces" },
  },
] as const;

export const rightNavItems = [
  { key: "partnership" as const, href: "/partnership" as const },
  { key: "about" as const, href: "/about" as const },
  { key: "contact" as const, href: "/contact" as const },
] as const;

export const utilityNavItems = [
  { key: "catalog" as const, href: "/catalog" as const },
  { key: "visit" as const, href: "/visit" as const },
  { key: "faq" as const, href: "/faq" as const },
] as const;
