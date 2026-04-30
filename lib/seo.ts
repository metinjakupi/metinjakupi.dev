export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://metinjakupi.dev";

export const siteName = "Metin Jakupi";

export const siteTitle = "Metin Jakupi | Senior Frontend Engineer";

export const siteDescription =
  "Senior frontend engineer building React, Next.js, iGaming, sports-data, Shopify, and product software.";

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}
