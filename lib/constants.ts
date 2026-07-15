export const CONTACT = {
  phone: "+49 (0) 931 45 25 28 92",
  phoneHref: "tel:+4993145252892",
  email: "info@roesler-engert.de",
  emailHref: "mailto:info@roesler-engert.de",
  instagramHref: "https://www.instagram.com/",
  linkedinHref: "https://www.linkedin.com/",
  address: {
    street: "Domstr. 18",
    city: "97070 Würzburg",
    country: "Deutschland",
  },
} as const;

export const SHOP_ENABLED = process.env.NEXT_PUBLIC_SHOP_ENABLED === "true";
