import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Inter, JetBrains_Mono } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { ACCENT, SectionLabel } from "@/components/section-label";
import { brickyard, engagements, faq, moreWork, process, services, stack } from "@/lib/games-data";
import { absoluteUrl, person } from "@/lib/seo";

const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], display: "swap", variable: "--font-mono" });
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });

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

const monoStyle = { fontFamily: "var(--font-mono)" };

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
    <div
      className={`${mono.variable} ${inter.variable} relative min-h-[100dvh] bg-[#0a0a0a] text-neutral-300`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)" }}
      />

      <JsonLd data={structuredData} />
      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-20 px-4 py-12 sm:px-6 md:py-20">
        {/* ---------- hero ---------- */}
        <section aria-labelledby="games-heading" className="space-y-10">
          <nav style={monoStyle} className="text-sm">
            <Link href="/" className="text-neutral-500 hover:text-neutral-200">
              <span style={{ color: ACCENT }}>~</span> cd ..
            </Link>
          </nav>
          <div style={monoStyle} className="space-y-1 text-sm leading-7">
            <p className="text-neutral-500">
              <span style={{ color: ACCENT }}>~/games</span> ls
            </p>
            <p className="text-neutral-200">brickyard/ kebap-haus/ micro-24/</p>
          </div>
          <h1
            id="games-heading"
            className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            I build browser games and interactive 3D —{" "}
            <span style={{ color: ACCENT }}>playable from a link, on any laptop or phone.</span>
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-neutral-400">
            From the first playable prototype to a polished, tested release. The same engineering I bring to production
            web software — fast pages, clean architecture, automated tests — applied to games people actually enjoy.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={brickyard.href}
              target="_blank"
              rel="noreferrer"
              style={{ ...monoStyle, background: ACCENT }}
              className="inline-flex h-11 items-center px-5 text-sm font-medium text-neutral-950 hover:opacity-90"
            >
              ▶ play brickyard
            </Link>
            <Link
              href="#contact"
              style={monoStyle}
              className="inline-flex h-11 items-center border border-neutral-700 px-5 text-sm font-medium text-neutral-200 hover:border-neutral-400"
            >
              ./start-a-project
            </Link>
          </div>
          <figure className="space-y-3">
            <Link href={brickyard.href} target="_blank" rel="noreferrer" className="group block overflow-hidden ring-1 ring-neutral-800">
              <Image
                src={brickyard.hero.src}
                alt={brickyard.hero.alt}
                priority
                placeholder="blur"
                sizes="(min-width: 1024px) 992px, 100vw"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.015]"
              />
            </Link>
            <figcaption style={monoStyle} className="text-xs text-neutral-500">
              {"//"} {brickyard.hero.caption}
            </figcaption>
          </figure>
        </section>

        {/* ---------- facts ---------- */}
        <section aria-label="Brickyard in numbers" className="grid gap-px bg-neutral-800 sm:grid-cols-2 md:grid-cols-4">
          {brickyard.facts.map((f) => (
            <div key={f.label} className="space-y-1 bg-[#0a0a0a] p-6">
              <p style={{ ...monoStyle, color: ACCENT }} className="text-3xl font-bold">
                {f.value}
              </p>
              <p className="text-sm leading-6 text-neutral-400">{f.label}</p>
            </div>
          ))}
        </section>

        {/* ---------- case study ---------- */}
        <section aria-labelledby="case-heading" className="space-y-8">
          <SectionLabel num="01" label="case_study // brickyard" id="case-heading" />
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-start">
            <div className="space-y-5">
              <h3 className="text-3xl font-bold leading-tight text-white">{brickyard.title}</h3>
              <p className="leading-7 text-neutral-400">{brickyard.pitch}</p>
              <Link href={brickyard.href} target="_blank" rel="noreferrer" style={{ ...monoStyle, color: ACCENT }} className="inline-block text-sm hover:opacity-80">
                open brickyard-three.vercel.app →
              </Link>
            </div>
            <ol className="space-y-6">
              {brickyard.underTheHood.map((item, i) => (
                <li key={item.title} className="grid grid-cols-[32px_minmax(0,1fr)] gap-3">
                  <span style={{ ...monoStyle, color: ACCENT }} className="pt-0.5 text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="space-y-1">
                    <h4 className="font-bold text-white">{item.title}</h4>
                    <p className="text-sm leading-6 text-neutral-400">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {brickyard.gallery.map((shot) => (
              <figure key={shot.caption} className="space-y-2">
                <Image src={shot.src} alt={shot.alt} placeholder="blur" sizes="(min-width: 640px) 50vw, 100vw" className="h-auto w-full ring-1 ring-neutral-800" />
                <figcaption className="text-sm leading-6 text-neutral-500">{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ---------- more work ---------- */}
        <section aria-labelledby="more-heading" className="space-y-6">
          <SectionLabel num="02" label={`more_games[${moreWork.length}]`} id="more-heading" />
          <div className="grid gap-6 md:grid-cols-2">
            {moreWork.map((g) => (
              <Link key={g.slug} href={g.href} target="_blank" rel="noreferrer" className="group block space-y-4">
                <div className="overflow-hidden ring-1 ring-neutral-800">
                  <Image src={g.image.src} alt={g.image.alt} placeholder="blur" sizes="(min-width: 768px) 50vw, 100vw" className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#a3e635]">{g.title}</h3>
                  <p style={monoStyle} className="text-xs uppercase tracking-wider text-neutral-500">
                    {g.type} {"//"} {g.tech}
                  </p>
                  <p className="text-sm leading-6 text-neutral-400">{g.summary}</p>
                  <p style={monoStyle} className="pt-1 text-xs text-neutral-300 group-hover:text-[#a3e635]">
                    {g.cta} →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ---------- services ---------- */}
        <section aria-labelledby="services-heading" className="space-y-6">
          <SectionLabel num="03" label="what_i_build" id="services-heading" />
          <div className="grid gap-px bg-neutral-800 md:grid-cols-2">
            {services.map((s) => (
              <article key={s.title} className="space-y-2 bg-[#0a0a0a] p-6">
                <h3 className="font-bold text-white">{s.title}</h3>
                <p className="leading-7 text-neutral-400">{s.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- process ---------- */}
        <section aria-labelledby="process-heading" className="space-y-6">
          <SectionLabel num="04" label="how_i_build.log" id="process-heading" />
          <ol className="space-y-4">
            {process.map((step, i) => (
              <li
                key={step.title}
                className="grid gap-2 border-l-2 pl-5 md:grid-cols-[180px_minmax(0,1fr)] md:items-baseline md:gap-6"
                style={{ borderLeftColor: ACCENT }}
              >
                <p style={monoStyle} className="text-sm text-neutral-500">
                  [{String(i + 1).padStart(2, "0")} · {step.when}]
                </p>
                <div className="space-y-1">
                  <h3 className="font-bold text-white">{step.title}</h3>
                  <p className="leading-7 text-neutral-400">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <ul style={monoStyle} className="flex flex-wrap gap-2 pt-2" aria-label="Tools">
            {stack.map((t) => (
              <li key={t} className="border border-neutral-800 px-3 py-1 text-xs text-neutral-300">
                {t}
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- engagements ---------- */}
        <section aria-labelledby="work-heading" className="space-y-6">
          <SectionLabel num="05" label="ways_to_work" id="work-heading" />
          <div className="grid gap-px bg-neutral-800 md:grid-cols-3">
            {engagements.map((e) => (
              <article key={e.title} className="space-y-3 bg-[#0a0a0a] p-6">
                <p style={{ ...monoStyle, color: ACCENT }} className="text-xs uppercase tracking-wider">
                  {e.length}
                </p>
                <h3 className="text-lg font-bold text-white">{e.title}</h3>
                <ul className="space-y-1.5 text-sm leading-6 text-neutral-400">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span style={{ color: ACCENT }}>+</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- faq ---------- */}
        <section aria-labelledby="faq-heading" className="space-y-6">
          <SectionLabel num="06" label="faq" id="faq-heading" />
          <div className="divide-y divide-neutral-800 border-y border-neutral-800">
            {faq.map((item) => (
              <details key={item.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-white">
                  {item.q}
                  <span style={{ ...monoStyle, color: ACCENT }} className="text-sm transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="max-w-3xl pt-2 leading-7 text-neutral-400">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ---------- contact ---------- */}
        <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-8 space-y-6">
          <SectionLabel num="07" label="start_a_project" id="contact-heading" />
          <div className="space-y-6">
            <p className="max-w-2xl text-2xl font-bold leading-snug text-white">
              Have a game or a 3D idea? <span style={{ color: ACCENT }}>Tell me who it&apos;s for and what should feel great.</span>
            </p>
            <div style={monoStyle} className="space-y-2 text-sm">
              <p>
                <span className="text-neutral-500">$</span> message{" "}
                <Link href="https://x.com/mjakupiiii" target="_blank" rel="noreferrer" style={{ color: ACCENT }} className="underline-offset-4 hover:underline">
                  x.com/mjakupiiii
                </Link>
              </p>
              <p>
                <span className="text-neutral-500">$</span> open{" "}
                <Link href="https://github.com/metinjakupi" target="_blank" rel="noreferrer" style={{ color: ACCENT }} className="underline-offset-4 hover:underline">
                  github.com/metinjakupi
                </Link>
              </p>
              <p className="pt-3 text-neutral-500">
                <Link href="/" className="hover:text-neutral-200">
                  <span style={{ color: ACCENT }}>~</span> cd ..
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
