// The site is served from www (the apex domain 308-redirects there), so canonical URLs,
// the sitemap and robots.txt must use www too, or search engines see every canonical as
// a redirect.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.metinjakupi.dev";

export const siteName = "Metin Jakupi";

export const siteTitle = "Metin Jakupi | Senior Frontend Engineer & Game Developer";

export const siteDescription =
  "Senior frontend engineer building React and Next.js products, iGaming and sports-data software, and browser games with WebGPU, three.js and WebAssembly.";

export const profiles = {
  github: "https://github.com/metinjakupi",
  x: "https://x.com/mjakupiiii",
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

/** schema.org Person for Metin, reused wherever a page needs an author or provider. */
export const person = {
  "@type": "Person",
  "@id": absoluteUrl("/#person"),
  name: siteName,
  url: absoluteUrl("/"),
  image: absoluteUrl("/mjakupi.jpg"),
  jobTitle: "Senior Frontend Engineer",
  sameAs: [profiles.github, profiles.x],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Frontend architecture",
    "iGaming software",
    "Sports data integrations",
    "Browser games",
    "three.js",
    "WebGPU",
    "WebAssembly",
  ],
};
