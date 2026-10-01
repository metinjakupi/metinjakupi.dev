import type { StaticImageData } from "next/image";
import brickyardBuild from "@/public/games/brickyard-build.jpg";
import brickyardUnbox from "@/public/games/brickyard-unbox.jpg";
import brickyardCatalog from "@/public/games/brickyard-catalog.jpg";
import brickyardBooklet from "@/public/games/brickyard-booklet.jpg";
import brickyardTown from "@/public/games/brickyard-town.jpg";
import kebapHaus from "@/public/games/kebap-haus.jpg";
import micro24 from "@/public/games/micro-24.jpg";
import rinseRush from "@/public/games/rinse-rush.jpg";

// Content for /games. Edit the copy here; the page only lays it out.

export type Shot = { src: StaticImageData; alt: string; caption: string };

export type GameItem = {
  slug: string;
  title: string;
  type: string;
  tech: string;
  href: string;
  cta: string;
  summary: string;
  image: Shot;
};

export const brickyard = {
  title: "Brickyard",
  href: "https://brickyard-three.vercel.app",
  pitch:
    "A brick-building game in the browser. Buy a set from the catalog, open the box, and build it step by step from its instruction booklet — then watch it move into your town.",
  hero: {
    src: brickyardBuild,
    alt: "Brickyard: a half-built house on a baseplate, the instruction booklet open on the left and the parts tray below",
    caption: "Building from the booklet: glowing guides show where each piece goes.",
  } as Shot,
  gallery: [
    { src: brickyardUnbox, alt: "The set box tipped over, pieces pouring out onto the baseplate", caption: "Unboxing: pieces pour out, tumble and settle — real physics, real impact sounds." },
    { src: brickyardBooklet, alt: "A booklet page with orange arrows pointing at pieces that attach from underneath", caption: "Generated instructions, with arrows for pieces that click on from underneath." },
    { src: brickyardCatalog, alt: "The catalog with a featured set and a shelf of trending sets", caption: "A catalog of 17 sets with a weekly featured deal and coins to earn." },
    { src: brickyardTown, alt: "A town of finished sets on green lots with roads and street signs", caption: "Every finished set moves into your town, grouped into streets." },
  ] as Shot[],
  facts: [
    { value: "9.6 KB", label: "Rust → WebAssembly brick engine" },
    { value: "60 fps", label: "WebGPU, with a WebGL 2 fallback" },
    { value: "17 / 17", label: "sets built end-to-end by an automated playtest" },
    { value: "0", label: "audio files — every click is synthesised" },
  ],
  underTheHood: [
    {
      title: "An engine that knows the rules",
      body: "A small Rust engine compiled to WebAssembly tracks every stud: collisions, what clicks onto what, what falls when you knock a brick out — and it writes each set's instruction booklet automatically.",
    },
    {
      title: "Shaders written once, running everywhere",
      body: "Materials are written in three.js TSL: plastic with textured slopes, glass, glowing guides, a wooden table. They compile to WGSL on WebGPU and to GLSL on the WebGL 2 fallback.",
    },
    {
      title: "Feel and sound",
      body: "The unboxing is a tiny rigid-body simulation; landing sounds come from the actual impacts. The brick click-clack is synthesised from the resonances of a hollow plastic brick, so no two clicks sound the same.",
    },
    {
      title: "Tested like production software",
      body: "A playtest bot opens every box, builds every set with the booklet in a real browser and writes a visual report — box art, unboxing, booklet pages, the finished model, frame times and console errors.",
    },
  ],
};

export const moreWork: GameItem[] = [
  {
    slug: "rinse-rush",
    title: "Rinse Rush",
    type: "Car-wash arcade game",
    tech: "Three.js, TypeScript, Blender",
    href: "https://car-wash-game-ten.vercel.app",
    cta: "Play Rinse Rush",
    summary:
      "Take over Grandpa Gus’s car wash: rinse, foam and polish dirty cars, clean interiors, hire a crew and grow the business while taking on rival chains.",
    image: { src: rinseRush, alt: "Rinse Rush: the blue car-wash garage with a washer, turntable and game menu", caption: "Rinse Rush" },
  },
  {
    slug: "kebap-haus",
    title: "Kebap Haus",
    type: "First-person game",
    tech: "Three.js, WebGPU, TSL",
    href: "https://kebap-shop.vercel.app",
    cta: "Open the shop",
    summary:
      "Run a 1:1 döner kebap shop on a Berlin corner: take orders, slice the spit, build every order by hand through the lunch and dinner rush, then lock up.",
    image: { src: kebapHaus, alt: "Kebap Haus: the inside of a döner shop with menu boards and a counter", caption: "Kebap Haus" },
  },
  {
    slug: "micro-24",
    title: "Micro/24",
    type: "Interactive 3D",
    tech: "Three.js, WebGPU, TSL",
    href: "https://micro-apartment.vercel.app",
    cta: "Open the apartment",
    summary:
      "A 27 m² apartment that rebuilds itself around the rhythm of a day — workspace, kitchen, entertaining space and bedroom — with a timeline you can scrub.",
    image: { src: micro24, alt: "Micro/24: a compact apartment at night seen from above, with a day timeline below", caption: "Micro/24" },
  },
];

export const services = [
  {
    title: "Brand & campaign games",
    body: "A short, replayable game that carries your brand — for a launch, a holiday, an event or a playable ad. Shareable as a link, embeddable anywhere.",
  },
  {
    title: "Interactive 3D showcases",
    body: "Products, spaces and architecture people can explore, configure and play with in the browser, like Micro/24.",
  },
  {
    title: "Kids & learning games",
    body: "Friendly controls, guided steps and instant feedback — the patterns behind Brickyard's instruction booklet and glowing guides.",
  },
  {
    title: "Game features for your product",
    body: "Mini-games, rewards, 3D viewers and playful onboarding built into an existing React or Next.js app.",
  },
];

export const process = [
  {
    title: "Playable prototype",
    when: "days",
    body: "You get a link to something you can play, not a slide deck. We decide what's fun with the game in our hands.",
  },
  {
    title: "Rules & engine",
    when: "week 1–2",
    body: "Game logic lives in its own tested module; heavy lifting moves to Rust → WebAssembly when it pays off.",
  },
  {
    title: "Look, feel & sound",
    when: "ongoing",
    body: "Custom shaders, animation and synthesised sound, tuned on real laptops and phones until it feels right.",
  },
  {
    title: "Automated playtests",
    when: "every change",
    body: "A bot plays the whole game in a real browser after each change and produces a screenshot report, so nothing ships broken.",
  },
  {
    title: "Ship & grow",
    when: "launch",
    body: "Static hosting on a global CDN. New levels, sets and seasons slot in without a rewrite.",
  },
];

export const stack = [
  "Three.js",
  "WebGPU",
  "TSL shaders",
  "WebGL 2",
  "Rust",
  "WebAssembly",
  "WebAudio",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Vercel",
];

export const engagements = [
  {
    title: "Prototype sprint",
    length: "1–2 weeks",
    points: ["A playable prototype on a private link", "The core loop proven on real devices", "A plan and estimate for the full build"],
  },
  {
    title: "Full game or 3D experience",
    length: "4–12 weeks",
    points: ["Design, build, sound and polish", "A new playable build every week", "Automated playtests and launch on your domain"],
  },
  {
    title: "Content & care",
    length: "ongoing",
    points: ["New levels, sets or seasonal events", "Performance tuning and analytics", "Updates as browsers and devices move on"],
  },
];

export const faq = [
  {
    q: "Does it work on phones?",
    a: "Yes. Games use WebGPU where the browser has it and fall back to WebGL 2 everywhere else, with touch controls and layouts tested at phone size.",
  },
  {
    q: "Do players need to install anything?",
    a: "No. It's a link. It can live on its own domain, on a page of your site, or inside a campaign.",
  },
  {
    q: "How big and fast are these games?",
    a: "Brickyard's whole rules engine is 9.6 KB and it runs at 60 fps; its only dependency is three.js. Small, fast pages are part of the job, not an afterthought.",
  },
  {
    q: "What do you need from me to start?",
    a: "An idea and who it's for. A rough sketch, a reference game or a brand guide helps; the first prototype will tell us the rest.",
  },
];
