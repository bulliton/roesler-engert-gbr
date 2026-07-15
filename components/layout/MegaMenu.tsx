"use client";

import { useTranslations } from "next-intl";
import {
  DIAMOND_CUT_KEYS,
  diamondCutIcons,
} from "@/lib/diamond-cuts";
import {
  MegaMenuColumn,
  MegaMenuFeature,
  MegaMenuLink,
  MegaMenuPanel,
} from "./MegaMenuPrimitives";

type MegaMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MegaMenu({ open, onClose }: MegaMenuProps) {
  const t = useTranslations("nav.megaMenu");

  return (
    <MegaMenuPanel open={open} onClose={onClose}>
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr_0.85fr_minmax(15rem,18rem)] lg:gap-12">
        <MegaMenuColumn title={t("shopByShape")}>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
            {DIAMOND_CUT_KEYS.map((cut) => {
              const Icon = diamondCutIcons[cut];
              return (
                <li key={cut}>
                  <MegaMenuLink
                    href="/diamonds"
                    onClick={onClose}
                    className="flex items-center gap-2.5"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-primary/50" />
                    {t(`cuts.${cut}`)}
                  </MegaMenuLink>
                </li>
              );
            })}
          </ul>
        </MegaMenuColumn>

        <MegaMenuColumn title={t("learnMore")}>
          <ul className="space-y-2.5">
            <li>
              <MegaMenuLink href="/diamonds" onClick={onClose}>
                {t("features")}
              </MegaMenuLink>
            </li>
            <li>
              <MegaMenuLink href="/diamonds" onClick={onClose}>
                {t("gemology")}
              </MegaMenuLink>
            </li>
            <li>
              <MegaMenuLink href="/about" onClick={onClose}>
                {t("ethical")}
              </MegaMenuLink>
            </li>
          </ul>
        </MegaMenuColumn>

        <MegaMenuColumn title={t("service")}>
          <ul className="space-y-2.5">
            <li>
              <MegaMenuLink href="/about" onClick={onClose}>
                {t("production")}
              </MegaMenuLink>
            </li>
            <li>
              <MegaMenuLink href="/about" onClick={onClose}>
                {t("quality")}
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
          src="https://images.unsplash.com/photo-1605100804763-247fc67f9958?w=640&q=80"
          alt=""
          caption={t("diamondsCaption")}
          href="/diamonds"
          onClick={onClose}
        />
      </div>
    </MegaMenuPanel>
  );
}
