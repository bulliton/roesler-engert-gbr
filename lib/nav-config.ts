export const leftNavItems = [
  { key: "diamonds" as const, href: "/diamonds" as const, mega: true },
  { key: "jewelry" as const, href: "/jewelry" as const, mega: true },
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
  { key: "about" as const, href: "/about" as const },
  { key: "contact" as const, href: "/contact" as const },
] as const;
