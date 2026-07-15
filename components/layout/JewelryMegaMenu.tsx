"use client";

import { useTranslations } from "next-intl";
import { jewelrySubItems } from "@/lib/nav-config";
import { SITE_IMAGES } from "@/lib/site-images";
import {
  MegaMenuColumn,
  MegaMenuFeature,
  MegaMenuLink,
  MegaMenuPanel,
} from "./MegaMenuPrimitives";

type JewelryMegaMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function JewelryMegaMenu({ open, onClose }: JewelryMegaMenuProps) {
  const t = useTranslations("nav.jewelryMenu");
  const nav = useTranslations("nav");

  return (
    <MegaMenuPanel open={open} onClose={onClose}>
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr_minmax(15rem,18rem)] lg:gap-12">
        <MegaMenuColumn title={t("collections")}>
          <ul className="space-y-2.5">
            {jewelrySubItems.map((item) => (
              <li key={item.key}>
                <MegaMenuLink href={item.href} onClick={onClose}>
                  {nav(item.key)}
                </MegaMenuLink>
              </li>
            ))}
            <li className="pt-2">
              <MegaMenuLink
                href="/jewelry"
                onClick={onClose}
                className="!text-secondary"
              >
                {nav("allCollections")}
              </MegaMenuLink>
            </li>
          </ul>
        </MegaMenuColumn>

        <MegaMenuColumn title={t("craft")}>
          <ul className="space-y-2.5">
            <li>
              <MegaMenuLink href="/about" onClick={onClose}>
                {t("manufacturing")}
              </MegaMenuLink>
            </li>
            <li>
              <MegaMenuLink href="/about" onClick={onClose}>
                {t("heritage")}
              </MegaMenuLink>
            </li>
            <li>
              <MegaMenuLink href="/contact" onClick={onClose}>
                {t("partnership")}
              </MegaMenuLink>
            </li>
          </ul>
        </MegaMenuColumn>

        <MegaMenuFeature
          src={SITE_IMAGES.ringFinishing}
          alt=""
          caption={t("imageCaption")}
          href="/jewelry"
          onClick={onClose}
        />
      </div>
    </MegaMenuPanel>
  );
}
