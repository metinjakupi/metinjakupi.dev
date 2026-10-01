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

/** What people can hire Metin for. `icon` is an SVG path on a 24×24 grid. */
export const services = [
  { title: "Web products & apps", body: "React and Next.js front ends that stay fast and easy to change: dashboards, customer apps, booking and shop flows.", icon: "M4 5h16v11H4zM8 20h8M12 16v4" },
  { title: "Browser games", body: "Casual, brand and learning games that open from a link and run on laptops and phones, like Brickyard and Kebap Haus.", icon: "M6 12h4M8 10v4M15 11h.01M18 13h.01M7 6h10a5 5 0 0 1 5 5v2a5 5 0 0 1-9 3H11a5 5 0 0 1-9-3v-2a5 5 0 0 1 5-5z" },
  { title: "Interactive 3D", body: "Spaces and products people can explore in the browser, built with WebGPU and three.js, like Micro/24.", icon: "M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5" },
  { title: "Sites & Shopify", body: "Marketing sites and Shopify storefronts that look sharp and load quickly, like Hotel Desaret and Faith Connexion.", icon: "M3 7h18l-2 12H5zM8 7a4 4 0 0 1 8 0" },
];
