import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  description: string;
};

export type DomainItem = {
  title: string;
  summary: string;
};

export type ProjectItem = {
  title: string;
  type: string;
  tech: string;
  role: string;
  href?: string;
  cta?: string;
  summary: string;
  detail: string;
};

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
};

export const experience: ExperienceItem[] = [
  {
    role: "Software Engineer",
    company: "Septor",
    period: "2026 - Present",
    description:
      "Building scalable web applications and leading frontend delivery with a focus on reliable UI architecture, maintainable systems, and polished user experiences.",
  },
  {
    role: "Software Engineer",
    company: "Hoyo Tech",
    period: "2024 - 2026",
    description:
      "Built scalable web applications and led frontend delivery with a focus on reliable UI architecture, maintainable systems, and polished user experiences.",
  },
  {
    role: "Lead Software Engineer",
    company: "Eagle IT Solutions",
    period: "2016 - 2024",
    description:
      "Grew from junior developer to lead engineer while shipping full-stack products, mentoring developers, and shaping architecture decisions across client and internal systems.",
  },
  {
    role: "Fullstack Developer",
    company: "Zappter",
    period: "2019",
    description:
      "Worked on a drag-and-drop application using PHP and jQuery, building interactive product workflows and strengthening practical UI implementation skills.",
  },
];

export const domainExperience: DomainItem[] = [
  {
    title: "iGaming Software",
    summary:
      "Experience building web software for iGaming environments, including player-facing flows, operational interfaces, integrations, and state-heavy product experiences where reliability and clarity matter.",
  },
  {
    title: "Sportsbook & Sports Data",
    summary:
      "Maintaining sportsbook platforms in the iGaming industry, with .NET 8 services and ExeFeed and Sportradar integrations for live events, odds, and market updates.",
  },
];

export const projects: ProjectItem[] = [
  {
    title: "Kitchform",
    type: "Kitchen design app",
    tech: "JavaScript, Three.js, SVG",
    role: "Built end-to-end",
    href: "https://kitchform.app/",
    cta: "Explore Kitchform",
    summary:
      "A browser-based kitchen planner with synchronized 3D views, floor plans, and wall elevations for designing rooms, arranging cabinets, and exploring finishes.",
    detail:
      "Combines precise dimensions, layout checks, material customization, and undo/redo with saved projects and exportable drawings, component schedules, and JSON backups.",
  },
  {
    title: "Toccado",
    type: "Free macOS app",
    tech: "Swift, SwiftUI, Three.js, TypeScript",
    role: "Designed, built, and shipped",
    href: "https://toccado.com/",
    cta: "Explore Toccado",
    summary:
      "A free Mac app that gives every keystroke a satisfying sound, with 25 profiles spanning mechanical switches, Keychron, and a classic typewriter.",
    detail:
      "Native menu bar app with offline audio and an Apple-notarized installer, paired with a playable 3D keyboard website and interactive sound previews.",
  },
  {
    title: "Vue Marquee Package",
    type: "Open-source package",
    tech: "Vue.js, JavaScript, npm",
    role: "Author and maintainer",
    href: "https://www.npmjs.com/package/@mjakupi/vue-marquee",
    cta: "View on npm",
    summary:
      "A reusable marquee component for Vue applications with configurable behavior and a developer-friendly API.",
    detail:
      "Shows package design, documentation thinking, and maintenance of a small public library.",
  },
  {
    title: "SVG2Icon",
    type: "Developer tool",
    tech: "Next.js",
    role: "Built end-to-end",
    href: "https://svg2icon.vercel.app/",
    cta: "Open tool",
    summary:
      "A focused conversion tool that turns SVG assets into Iconify-compatible icons for faster implementation work.",
    detail:
      "Reduces a repetitive handoff task into a small browser workflow for developers.",
  },
  {
    title: "CSS Formatter",
    type: "Developer utility",
    tech: "Next.js, Vercel, JavaScript",
    role: "Built and deployed",
    href: "https://css-formater.vercel.app/",
    cta: "Open formatter",
    summary:
      "A browser-based formatter for cleaning up CSS into readable, maintainable output.",
    detail:
      "Keeps the interface narrow and practical: paste CSS, format it, and get back to the code.",
  },
  {
    title: "Hotel Desaret",
    type: "Hospitality website",
    tech: "Website implementation",
    role: "Frontend and content structure",
    href: "https://hoteldesaret.mk/",
    cta: "Visit website",
    summary:
      "A public-facing website for Hotel Desaret, built around property presentation and visitor information.",
    detail:
      "Focuses on making the hotel easy to evaluate online: clear structure, direct navigation, and a straightforward path to key guest details.",
  },
  {
    title: "Faith Connexion",
    type: "Shopify ecommerce",
    tech: "Shopify, ecommerce UX",
    role: "Shopify development",
    href: "https://www.faithconnexion.com/",
    cta: "Visit shop",
    summary:
      "Shopify work for Faith Connexion's official online boutique, supporting a fashion ecommerce storefront.",
    detail:
      "Focused on storefront implementation concerns like navigation, product discovery, cart flow, and a polished shopping experience.",
  },
  {
    title: "Activitea Coffee",
    type: "iOS app",
    tech: "Mobile product delivery",
    role: "Customer-facing app work",
    href: "https://apps.apple.com/us/app/activitea-coffee/id6758887347",
    cta: "View on App Store",
    summary:
      "A public App Store release for Activitea Coffee, extending the brand experience into a customer-facing mobile app.",
    detail:
      "Adds a focused mobile surface for the coffee shop experience, with distribution through Apple App Store.",
  },
  {
    title: "iGaming Software",
    type: "Private product work",
    tech: "React, Node.js, ExeFeed, Sportradar",
    role: "Frontend and product engineering",
    summary:
      "Private software work for iGaming environments with player-facing flows, operational tooling, and sports-data integrations.",
    detail:
      "Focus areas include ExeFeed and Sportradar feed handling, reliability, clear state updates, fast UI feedback, and interfaces that support high-frequency actions.",
  },
  {
    title: "Sportsbook & Feed Integrations",
    type: "Private iGaming work",
    tech: ".NET 8, ExeFeed, Sportradar",
    role: "Sportsbook maintenance and feed integration",
    summary:
      "Maintaining sportsbook platforms and .NET 8 services, integrating ExeFeed and Sportradar data to keep live events, odds, and betting markets up to date.",
    detail:
      "Focus areas include reliable feed processing, timely market updates, message ordering, and error handling to keep sportsbook operations running smoothly as live data changes.",
  },
  {
    title: "Dentistry Software",
    type: "Private product work",
    tech: "React, Node.js, PostgreSQL",
    role: "Full-stack implementation",
    summary:
      "A private practice-management system for patient records, appointments, and billing workflows.",
    detail:
      "A domain-specific workflow product where clear data structure and predictable screens matter more than visual decoration.",
  },
];

export async function getPosts(): Promise<PostMeta[]> {
  const contentDir = path.join(process.cwd(), "content");
  const files = await fs.readdir(contentDir);
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const filePath = path.join(contentDir, file);
        const fileContent = await fs.readFile(filePath, "utf8");
        const { data } = matter(fileContent);
        return {
          slug: file.replace(/\.md$/, ""),
          title: data.title,
          date: data.date,
          description: data.description,
        } as PostMeta;
      })
  );
  posts.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  return posts;
}
