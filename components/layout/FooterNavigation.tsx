import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/navigation";
import { FooterLabel } from "@/components/ui/FooterLabel";

const linkClass =
  "font-body text-[15px] leading-snug text-white/85 transition-colors hover:text-secondary";

export async function FooterNavigation() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");

  const groups = [
    {
      title: t("navGroups.collections"),
      links: [
        { href: "/diamonds" as const, label: nav("diamonds") },
        {
          href: { pathname: "/jewelry" as const, hash: "earrings" },
          label: nav("earrings"),
        },
        {
          href: { pathname: "/jewelry" as const, hash: "rings" },
          label: nav("rings"),
        },
        {
          href: { pathname: "/jewelry" as const, hash: "necklaces" },
          label: nav("necklaces"),
        },
        { href: "/catalog" as const, label: nav("catalog") },
      ],
    },
    {
      title: t("navGroups.company"),
      links: [
        { href: "/" as const, label: "Home" },
        { href: "/about" as const, label: nav("about") },
        { href: "/partnership" as const, label: nav("partnership") },
        { href: "/contact" as const, label: nav("contact") },
      ],
    },
    {
      title: t("navGroups.expertise"),
      links: [
        { href: "/diamonds" as const, label: t("gemology") },
        { href: "/ethics" as const, label: t("ethics") },
        { href: "/services" as const, label: nav("services") },
        { href: "/visit" as const, label: nav("visit") },
        { href: "/about" as const, label: t("heritage") },
      ],
    },
    {
      title: t("navGroups.service"),
      links: [
        { href: "/faq" as const, label: t("faq") },
        { href: { pathname: "/faq" as const, hash: "returns" }, label: t("returns") },
        { href: "/imprint" as const, label: t("imprint") },
        { href: "/privacy" as const, label: t("privacy") },
        { href: "/cookies" as const, label: t("cookies") },
      ],
    },
  ];

  return (
    <nav aria-label={t("pages")} className="min-w-0 flex-1">
      <FooterLabel className="mb-6">{t("pages")}</FooterLabel>

      <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-x-5 lg:gap-x-4 xl:gap-x-8">
        {groups.map((group) => (
          <div key={group.title} className="min-w-0">
            <FooterLabel className="mb-3 text-white/55">{group.title}</FooterLabel>
            <ul className="space-y-2.5">
              {group.links.map((link) => (
                <li key={`${group.title}-${link.label}`}>
                  <Link href={link.href as "/"} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
