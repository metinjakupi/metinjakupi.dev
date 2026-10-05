import type { StaticImageData } from "next/image";
import { projects, experience } from "@/lib/portfolio-data";
import { brickyard, moreWork } from "@/lib/games-data";
import { profiles } from "@/lib/seo";
import hotelDesaret from "@/public/work/hotel-desaret.jpg";
import faithConnexion from "@/public/work/faith-connexion.jpg";
import activitea from "@/public/work/activitea.jpg";
import svg2icon from "@/public/work/svg2icon.jpg";
import cssFormatter from "@/public/work/css-formatter.jpg";
import vueMarquee from "@/public/work/vue-marquee.jpg";
import toccado from "@/public/work/toccado.jpg";
import kitchform from "@/public/work/kitchform.jpg";

// Everything the redesign options show, in one place, built from the existing data files.

export type WorkItem = {
  title: string;
  kind: string;
  tech: string;
  summary: string;
  href?: string;
  cta?: string;
  image?: StaticImageData;
  alt?: string;
};

const images: Record<string, [StaticImageData, string]> = {
  Kitchform: [kitchform, "Kitchform homepage with a warm kitchen illustration and a call to start designing"],
  Toccado: [toccado, "Toccado website with a playable 3D keyboard, oversized wordmark, and always-free Mac download"],
  "Hotel Desaret": [hotelDesaret, "Hotel Desaret website: a lakeside hotel on Lake Ohrid with a booking call to action"],
  "Faith Connexion": [faithConnexion, "Faith Connexion's Shopify boutique home page"],
  "Activitea Coffee": [activitea, "Three screens of the Activitea Coffee iOS app: menu, rewards and ordering ahead"],
  SVG2Icon: [svg2icon, "SVG2Icon: drag and drop SVG files to build an icon font"],
  "CSS Formatter": [cssFormatter, "CSS Wizard: paste CSS to format, minify or improve it"],
  "Vue Marquee Package": [vueMarquee, "The Vue Marquee npm package and its install command"],
};

export const games: WorkItem[] = [
  {
    title: brickyard.title,
    kind: "Browser game",
    tech: "Three.js, WebGPU, TSL, Rust → WebAssembly",
    summary: "Buy a set, open the box, and build it step by step from its instruction booklet. 17 sets, a town to fill, and a 9.6 KB rules engine.",
    href: brickyard.href,
    cta: "Play Brickyard",
    image: brickyard.hero.src,
    alt: brickyard.hero.alt,
  },
  ...moreWork.map((g) => ({ title: g.title, kind: g.type, tech: g.tech, summary: g.summary, href: g.href, cta: g.cta, image: g.image.src, alt: g.image.alt })),
];

/** Public client and personal work, most visual first. */
export const work: WorkItem[] = ["Toccado", "Kitchform", "Hotel Desaret", "Faith Connexion", "Activitea Coffee", "SVG2Icon", "CSS Formatter", "Vue Marquee Package"]
  .map((title) => projects.find((p) => p.title === title))
  .filter((p): p is (typeof projects)[number] => !!p)
  .map((p) => ({ title: p.title, kind: p.type, tech: p.tech, summary: p.summary, href: p.href, cta: p.cta, image: images[p.title]?.[0], alt: images[p.title]?.[1] }));

export const privateWork: WorkItem[] = projects
  .filter((p) => !p.href)
  .map((p) => ({ title: p.title, kind: p.type, tech: p.tech, summary: p.summary }));

export { experience };

export const contact = {
  // Add a public email here to show "Email me" buttons across the options.
  email: null as string | null,
  github: profiles.github,
  x: profiles.x,
};

export const numbers = [
  { value: "8+", label: "years shipping web software" },
  { value: String(games.length), label: "browser games & 3D apps live" },
  { value: String(work.length), label: "public products, sites and tools" },
  { value: "60 fps", label: "WebGPU games, WebGL 2 fallback" },
];

/** Capabilities, with examples from shipped work. */
function projectExamples(titles: string[]) {
  return titles.flatMap((title) => {
    const project = projects.find((p) => p.title === title);
    return project?.href ? [{ label: project.title, href: project.href }] : [];
  });
}

export const services = [
  {
    title: "Web & native applications",
    body: "Customer apps, internal tools and desktop software. Clear interfaces backed by maintainable architecture.",
    examples: projectExamples(["Toccado", "Activitea Coffee"]),
  },
  {
    title: "Websites & commerce",
    body: "Brand websites and Shopify storefronts, with care for product discovery, checkout and performance.",
    examples: projectExamples(["Hotel Desaret", "Faith Connexion"]),
  },
  {
    title: "Games & interactive 3D",
    body: "Playable browser games, product configurators and spaces people can explore. No installation required.",
    examples: [
      { label: "Brickyard", href: brickyard.href },
      ...projectExamples(["Kitchform"]),
    ],
  },
  {
    title: "Platforms & integrations",
    body: "Sportsbook platforms, live data feeds and business workflows. Reliable updates across connected systems.",
    examples: [
      { label: "Sportsbook & sports-data experience", href: "#experience" },
    ],
  },
];
