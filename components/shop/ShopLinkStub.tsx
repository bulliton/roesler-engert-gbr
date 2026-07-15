import { SHOP_ENABLED } from "@/lib/constants";

/** Reserved for future B2B shop integration. */
export function ShopLinkStub() {
  if (!SHOP_ENABLED) return null;

  return null;
}
