import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ContactCta } from "@/components/site/contact-cta";
import { SiteShell } from "@/components/site/shell";
import { LIME } from "@/components/site/theme";
import { buttonGhost, buttonPrimary, SectionHead, Tags } from "@/components/site/ui";
import { brickyard, engagements, faq, moreWork, process, services, stack } from "@/lib/games-data";
import { absoluteUrl, person } from "@/lib/seo";

const title = "Browser Games & Interactive 3D";
const description =
  "I build browser games and interactive 3D that load from a link and run on laptops and phones: WebGPU, three.js shaders, Rust → WebAssembly engines and automated playtests.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "browser game developer",
    "hire game developer",
    "web game development",
    "three.js developer",
    "WebGPU",
    "WebAssembly",
    "interactive 3D website",
    "brand game",
    "playable ad",
    "Metin Jakupi",
  ],
  alternates: { canonical: "/games" },
  openGraph: {
    url: "/games",
    title: `${title} | Metin Jakupi`,
    description,
    images: [{ url: "/games/games-og.jpg", width: 1200, height: 630, alt: "Brickyard, a brick-building game in the browser" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Metin Jakupi`,
    description,
    creator: "@mjakupiiii",
    images: ["/games/games-og.jpg"],
  },
};

const games = [
  {
    "@type": "VideoGame",
    name: brickyard.title,
    url: brickyard.href,
    description: brickyard.pitch,
    image: absoluteUrl(brickyard.hero.src.src),
    genre: ["Construction", "Puzzle", "Casual"],
    gamePlatform: "Web browser",
    applicationCategory: "Game",
    operatingSystem: "Any",
    author: { "@id": absoluteUrl("/#person") },
  },
  ...moreWork.map((g) => ({
    "@type": g.type.includes("game") ? "VideoGame" : "CreativeWork",
    name: g.title,
    url: g.href,
    description: g.summary,
    image: absoluteUrl(g.image.src.src),
    ...(g.type.includes("game") ? { gamePlatform: "Web browser", applicationCategory: "Game", operatingSystem: "Any" } : {}),
    author: { "@id": absoluteUrl("/#person") },
  })),
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    person,
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: title, item: absoluteUrl("/games") },
      ],
    },
    {
      "@type": "Service",
      "@id": absoluteUrl("/games#service"),
      name: "Browser game and interactive 3D development",
      serviceType: "Game development",
      description,
      provider: { "@id": absoluteUrl("/#person") },
      areaServed: "Worldwide",
      url: absoluteUrl("/games"),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Ways to work together",
        itemListElement: engagements.map((e) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: e.title, description: e.points.join(". ") },
        })),
      },
    },
    { "@type": "ItemList", name: "Games and interactive 3D by Metin Jakupi", itemListElement: games.map((item, i) => ({ "@type": "ListItem", position: i + 1, item })) },
    {
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

export default function Games() {
  return (
    <SiteShell>
      <JsonLd data={structuredData} />

      {/* hero */}
      <section className="mx-auto max-w-6xl space-y-8 px-5 pb-16 pt-16 md:pt-24">
        <p className="font-mono text-sm text-zinc-500">
          <span style={{ color: LIME }}>❯</span> ls ~/games <span className="text-zinc-400">→ brickyard/ kebap-haus/ micro-24/</span>
        </p>
        <h1 className="max-w-4xl text-[2.6rem] font-semibold leading-[1.03] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl">
          I build browser games and interactive 3D — <span style={{ color: LIME }}>playable from a link, on any laptop or phone.</span>
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-zinc-400">
          From the first playable prototype to a polished, tested release. The same engineering I bring to production web software — fast
          pages, clean architecture, automated tests — applied to games people actually enjoy.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href={brickyard.href} target="_blank" rel="noreferrer" className={buttonPrimary} style={{ background: LIME }}>▶ Play Brickyard</Link>
          <Link href="#contact" className={buttonGhost}>Start a project</Link>
        </div>
        <figure className="space-y-3 pt-4">
          <Link href={brickyard.href} target="_blank" rel="noreferrer" className="group block overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_120px_-40px_rgba(163,230,53,0.35)]">
            <Image src={brickyard.hero.src} alt={brickyard.hero.alt} priority placeholder="blur" sizes="(min-width: 1152px) 1112px, 100vw" className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.01]" />
          </Link>
          <figcaption className="font-mono text-xs text-zinc-500">{"//"} {brickyard.hero.caption}</figcaption>
        </figure>
      </section>

      {/* facts */}
      <section aria-label="Brickyard in numbers" className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 md:grid-cols-4">
        {brickyard.facts.map((f) => (
          <div key={f.label} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-6">
            <p className="font-mono text-3xl font-semibold" style={{ color: LIME }}>{f.value}</p>
            <p className="mt-1.5 text-sm leading-6 text-zinc-400">{f.label}</p>
          </div>
        ))}
      </section>

      {/* case study */}
      <section className="mx-auto max-w-6xl space-y-10 px-5 pt-28">
        <SectionHead kicker="case study" title="Brickyard, under the hood" note={brickyard.pitch} />
        <ol className="grid gap-5 md:grid-cols-2">
          {brickyard.underTheHood.map((item, i) => (
            <li key={item.title} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-6">
              <p className="font-mono text-xs" style={{ color: LIME }}>{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{item.body}</p>
            </li>
          ))}
        </ol>
        <div className="grid gap-5 sm:grid-cols-2">
          {brickyard.gallery.map((shot) => (
            <figure key={shot.caption} className="space-y-2.5">
              <Image src={shot.src} alt={shot.alt} placeholder="blur" sizes="(min-width: 640px) 50vw, 100vw" className="h-auto w-full rounded-xl border border-white/[0.07]" />
              <figcaption className="text-sm leading-6 text-zinc-500">{shot.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* more games */}
      <section className="mx-auto max-w-6xl space-y-8 px-5 pt-28">
        <SectionHead kicker="more games" title="Kebap Haus and Micro/24" />
        <div className="grid gap-5 md:grid-cols-2">
          {moreWork.map((g) => (
            <Link key={g.slug} href={g.href} target="_blank" rel="noreferrer" className="group flex flex-col overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02] transition hover:-translate-y-0.5 hover:border-[#a3e635]/40">
              <div className="overflow-hidden border-b border-white/[0.07]">
                <Image src={g.image.src} alt={g.image.alt} placeholder="blur" sizes="(min-width: 768px) 50vw, 100vw" className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
              <div className="flex flex-1 flex-col gap-2.5 p-6">
                <Tags items={[g.type, ...g.tech.split(/,\s*/)].slice(0, 3)} />
                <h3 className="text-xl font-semibold text-white">{g.title}</h3>
                <p className="text-sm leading-6 text-zinc-400">{g.summary}</p>
                <p className="mt-auto pt-2 text-sm font-medium text-zinc-300 group-hover:text-[#a3e635]">{g.cta} →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* what I build */}
      <section className="mx-auto max-w-6xl space-y-8 px-5 pt-28">
        <SectionHead kicker="what I build" title="Games and 3D for brands, products and people" />
        <div className="grid gap-5 sm:grid-cols-2">
          {services.map((s) => (
            <article key={s.title} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-6">
              <h3 className="font-semibold text-white">{s.title}</h3>
              <p className="mt-2 leading-7 text-zinc-400">{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* how I build */}
      <section className="mx-auto max-w-6xl space-y-8 px-5 pt-28">
        <SectionHead kicker="how I build" title="From prototype to launch" />
        <ol className="grid gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07] md:grid-cols-5">
          {process.map((step, i) => (
            <li key={step.title} className="bg-[#0c0c0f] p-5">
              <p className="font-mono text-xs text-zinc-500"><span style={{ color: LIME }}>{String(i + 1).padStart(2, "0")}</span> · {step.when}</p>
              <h3 className="mt-2 font-semibold text-white">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-zinc-400">{step.body}</p>
            </li>
          ))}
        </ol>
        <ul className="flex flex-wrap gap-2" aria-label="Tools">
          {stack.map((t) => <li key={t} className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-zinc-400">{t}</li>)}
        </ul>
      </section>

      {/* ways to work */}
      <section className="mx-auto max-w-6xl space-y-8 px-5 pt-28">
        <SectionHead kicker="ways to work" title="Pick what fits" />
        <div className="grid gap-5 md:grid-cols-3">
          {engagements.map((e) => (
            <article key={e.title} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-6">
              <p className="font-mono text-xs uppercase tracking-wider" style={{ color: LIME }}>{e.length}</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{e.title}</h3>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-zinc-400">
                {e.points.map((p) => (
                  <li key={p} className="flex gap-2"><span style={{ color: LIME }}>+</span>{p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* faq */}
      <section className="mx-auto max-w-6xl space-y-8 px-5 pt-28">
        <SectionHead kicker="faq" title="Questions people ask" />
        <div className="divide-y divide-white/[0.07] rounded-xl border border-white/[0.07]">
          {faq.map((item) => (
            <details key={item.q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-white">
                {item.q}
                <span className="font-mono text-sm transition-transform group-open:rotate-45" style={{ color: LIME }}>+</span>
              </summary>
              <p className="max-w-3xl pt-3 leading-7 text-zinc-400">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <ContactCta title="Have a game or a 3D idea? Let's talk." />
    </SiteShell>
  );
}
