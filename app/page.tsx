import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { SiteShell } from "@/components/site/shell";
import { LIME } from "@/components/site/theme";
import { ContactCta } from "@/components/site/contact-cta";
import { buttonGhost, buttonPrimary, SectionHead, Tags, WorkCard } from "@/components/site/ui";
import { brickyard, process as buildProcess } from "@/lib/games-data";
import { getPosts } from "@/lib/portfolio-data";
import { absoluteUrl, person, siteDescription, siteName, siteTitle } from "@/lib/seo";
import { experience, games, numbers, privateWork, services, work } from "@/lib/showcase";

export const metadata: Metadata = {
  title: { absolute: siteTitle },
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: siteTitle, description: siteDescription },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: "@mjakupiiii",
    images: ["/twitter-image"],
  },
};

const stack = ["React", "Next.js", "TypeScript", "Node.js", "three.js", "WebGPU", "Rust", "WebAssembly", "Shopify"];

export default async function Home() {
  const posts = await getPosts();
  const [, ...otherGames] = games;
  return (
    <SiteShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            person,
            { "@type": "WebSite", "@id": absoluteUrl("/#website"), url: absoluteUrl("/"), name: siteName, description: siteDescription, publisher: { "@id": absoluteUrl("/#person") } },
          ],
        }}
      />

      {/* hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-16 md:pt-24 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-7">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] py-1 pl-1 pr-4 text-sm text-zinc-300">
            <Image src="/mjakupi.jpg" alt="Metin Jakupi" width={64} height={64} priority className="h-7 w-7 rounded-full object-cover" />
            Senior Frontend Engineer · 8+ years
          </div>
          <h1 className="text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.035em] text-white sm:text-6xl lg:text-[4.25rem]">
            I build fast, maintainable web products and <span style={{ color: LIME }}>browser games</span>.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-zinc-400">
            React and Next.js products, iGaming and sports-data platforms, and WebGPU games like Brickyard — designed, built and tested end
            to end.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="#work" className={buttonPrimary} style={{ background: LIME }}>View work</Link>
            <Link href={brickyard.href} target="_blank" rel="noreferrer" className={buttonGhost}>
              <span style={{ color: LIME }}>▶</span> Play Brickyard
            </Link>
          </div>
        </div>
        <Terminal />
      </section>

      {/* stack strip + numbers */}
      <section className="mx-auto max-w-6xl space-y-10 px-5">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-white/[0.06] py-5">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">Stack</span>
          {stack.map((t) => <span key={t} className="font-mono text-sm text-zinc-400">{t}</span>)}
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {numbers.map((n) => (
            <div key={n.label} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-6">
              <p className="text-3xl font-semibold tracking-tight text-white md:text-4xl">{n.value}</p>
              <p className="mt-1.5 text-sm text-zinc-400">{n.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* featured: Brickyard, then the other games */}
      <section id="games" className="mx-auto max-w-6xl scroll-mt-24 space-y-8 px-5 pt-28">
        <SectionHead kicker="featured" title="Games and interactive 3D" note="Playable from a link, on any laptop or phone." />
        <div className="grid items-center gap-10 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-4 md:p-6 lg:grid-cols-[1.25fr_1fr]">
          <Link href={brickyard.href} target="_blank" rel="noreferrer" className="group block overflow-hidden rounded-xl border border-white/10 shadow-[0_30px_80px_-30px_rgba(163,230,53,0.35)]">
            <Image src={brickyard.hero.src} alt={brickyard.hero.alt} placeholder="blur" sizes="(min-width: 1024px) 640px, 100vw" className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.02]" />
          </Link>
          <div className="space-y-5 px-2 pb-2">
            <Tags items={["Browser game", "WebGPU", "Rust → WASM"]} />
            <h3 className="text-3xl font-semibold tracking-tight text-white">Brickyard</h3>
            <p className="leading-7 text-zinc-400">{brickyard.pitch}</p>
            <dl className="grid grid-cols-2 gap-3">
              {brickyard.facts.map((f) => (
                <div key={f.label} className="rounded-lg border border-white/[0.07] p-3">
                  <dt className="font-mono text-lg font-semibold" style={{ color: LIME }}>{f.value}</dt>
                  <dd className="mt-0.5 text-xs leading-5 text-zinc-400">{f.label}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link href={brickyard.href} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center rounded-lg px-4 text-sm font-semibold text-zinc-950" style={{ background: LIME }}>Play it</Link>
              <Link href="/games" className="inline-flex h-10 items-center rounded-lg border border-white/15 px-4 text-sm font-semibold text-white hover:border-white/30">Read the case study</Link>
            </div>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {otherGames.map((g) => <WorkCard key={g.title} item={g} />)}
        </div>
      </section>

      {/* selected work */}
      <section id="work" className="mx-auto max-w-6xl scroll-mt-24 space-y-8 px-5 pt-28">
        <SectionHead kicker="work" title="Selected work" note="Client sites, apps and developer tools." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {work.map((w) => <WorkCard key={w.title} item={w} />)}
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {privateWork.map((p) => (
            <article key={p.title} className="rounded-xl border border-dashed border-white/[0.12] p-6">
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-500">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
                {p.kind}
              </p>
              <h3 className="mt-2 font-semibold text-white">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-zinc-400">{p.summary}</p>
            </article>
          ))}
        </div>
      </section>

      {/* services + process */}
      <section id="services" className="mx-auto max-w-6xl scroll-mt-24 space-y-8 px-5 pt-28">
        <SectionHead kicker="services" title="What I can build for you" note="From a playable prototype to a tested launch." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <article key={s.title} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-6 transition hover:border-white/15">
              <span className="grid h-10 w-10 place-items-center rounded-lg border border-white/10" style={{ color: LIME }}>
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={s.icon} /></svg>
              </span>
              <h3 className="mt-5 font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{s.body}</p>
            </article>
          ))}
        </div>
        <ol className="grid gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07] md:grid-cols-5">
          {buildProcess.map((step, i) => (
            <li key={step.title} className="bg-[#0c0c0f] p-5">
              <p className="font-mono text-xs text-zinc-500"><span style={{ color: LIME }}>{String(i + 1).padStart(2, "0")}</span> · {step.when}</p>
              <h3 className="mt-2 font-semibold text-white">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-zinc-400">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* experience */}
      <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 space-y-8 px-5 pt-28">
        <SectionHead kicker="experience" title="Eight years of shipping web software" />
        <ol className="relative space-y-8 border-l border-white/10 pl-8">
          {experience.map((e) => (
            <li key={e.company} className="relative">
              <span className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-[#09090b]" style={{ background: LIME }} />
              <p className="font-mono text-xs text-zinc-500">{e.period}</p>
              <h3 className="mt-1 font-semibold text-white">{e.role} <span className="font-normal text-zinc-400">· {e.company}</span></h3>
              <p className="mt-1.5 max-w-3xl leading-7 text-zinc-400">{e.description}</p>
            </li>
          ))}
        </ol>
        {posts[0] ? (
          <Link href={`/blog/${posts[0].slug}`} className="group flex flex-wrap items-baseline justify-between gap-2 rounded-xl border border-white/[0.07] p-5 hover:border-white/15">
            <span className="text-sm text-zinc-400">
              <span className="mr-3 font-mono text-xs uppercase tracking-wider text-zinc-500">Latest post</span>
              <span className="text-white group-hover:underline">{posts[0].title}</span>
            </span>
            <span className="font-mono text-xs text-zinc-500">{posts[0].date} →</span>
          </Link>
        ) : null}
      </section>

      <ContactCta />
    </SiteShell>
  );
}

// The hero's terminal: real facts, a blinking cursor, no JavaScript.
function Terminal() {
  const lines: [string, string][] = [
    ["whoami", "metin jakupi — senior frontend engineer"],
    ["cat stack.txt", "react · next.js · typescript · node · three.js · webgpu · rust/wasm"],
    ["ls ~/shipped", "brickyard/  kebap-haus/  micro-24/  hotel-desaret/  activitea/  svg2icon/"],
    ["uptime", "8+ years shipping web software"],
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0c0c0f]/90 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)] backdrop-blur" role="img" aria-label="Terminal: Metin Jakupi, senior frontend engineer; React, Next.js, TypeScript, Node, three.js, WebGPU, Rust and WebAssembly; 8+ years shipping web software">
      <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-zinc-500">~/metin — zsh</span>
      </div>
      <div className="space-y-3 p-5 font-mono text-[13px] leading-6 [overflow-wrap:anywhere] sm:text-sm">
        {lines.map(([cmd, out]) => (
          <div key={cmd}>
            <p className="text-zinc-500"><span style={{ color: LIME }}>❯</span> <span className="text-zinc-200">{cmd}</span></p>
            <p className="text-zinc-400">{out}</p>
          </div>
        ))}
        <p className="text-zinc-500"><span style={{ color: LIME }}>❯</span> <span className="inline-block h-4 w-2 translate-y-0.5 animate-pulse" style={{ background: LIME }} /></p>
      </div>
    </div>
  );
}
