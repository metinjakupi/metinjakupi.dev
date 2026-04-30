import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JetBrains_Mono, Inter } from "next/font/google";
import { siteDescription, siteTitle } from "@/lib/seo";
import {
  domainExperience,
  experience,
  getPosts,
  projects,
} from "@/lib/portfolio-data";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-mono",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const ACCENT = "#a3e635";

export const metadata: Metadata = {
  title: {
    absolute: siteTitle,
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: "@mjakupiiii",
    images: ["/twitter-image"],
  },
};

export default async function Home() {
  const posts = await getPosts();
  const latest = posts[0];

  return (
    <div
      className={`${mono.variable} ${inter.variable} relative min-h-[100dvh] bg-[#0a0a0a] text-neutral-300`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)",
        }}
      />

      <main className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-20 px-4 py-16 sm:px-6 md:py-24">
        <section aria-labelledby="intro-heading" className="space-y-10">
          <div
            style={{ fontFamily: "var(--font-mono)" }}
            className="space-y-1 text-sm leading-7"
          >
            <p className="text-neutral-500">
              <span style={{ color: ACCENT }}>~</span> whoami
            </p>
            <p className="text-neutral-200">metin jakupi</p>
            <p className="text-neutral-500">
              <span style={{ color: ACCENT }}>~</span> cat role.txt
            </p>
            <p className="text-neutral-200">senior frontend engineer</p>
            <p className="text-neutral-500">
              <span style={{ color: ACCENT }}>~</span> ls stack/
            </p>
            <p className="text-neutral-200">
              react.tsx next.tsx node.ts typescript.ts
            </p>
            <p className="text-neutral-500">
              <span style={{ color: ACCENT }}>~</span> uptime
            </p>
            <p className="text-neutral-200">8+ years shipping web software</p>
          </div>

          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_140px] md:items-start">
            <h1
              id="intro-heading"
              className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              I build fast, maintainable web products —{" "}
              <span style={{ color: ACCENT }}>
                from developer tools to iGaming software and sports-data
                integrations.
              </span>
            </h1>
            <Image
              src="/me.png"
              alt="Metin Jakupi"
              className="h-28 w-28 rounded-full object-cover ring-1 ring-neutral-700 md:h-32 md:w-32 md:ml-auto"
              width={220}
              height={220}
              priority
              sizes="128px"
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="#projects"
              style={{ fontFamily: "var(--font-mono)", background: ACCENT }}
              className="inline-flex h-10 items-center px-5 text-sm font-medium text-neutral-950 hover:opacity-90"
            >
              ./view-work
            </Link>
            <Link
              href="#contact"
              style={{ fontFamily: "var(--font-mono)" }}
              className="inline-flex h-10 items-center border border-neutral-700 px-5 text-sm font-medium text-neutral-200 hover:border-neutral-400"
            >
              ./contact
            </Link>
          </div>
        </section>

        <section aria-labelledby="domains-heading" className="space-y-6">
          <SectionLabel num="01" label="domain_experience" />
          <div className="grid gap-px bg-neutral-800 md:grid-cols-2">
            {domainExperience.map((item) => (
              <article key={item.title} className="space-y-2 bg-[#0a0a0a] p-6">
                <h3 className="font-bold text-white">{item.title}</h3>
                <p className="leading-7 text-neutral-400">{item.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="experience-heading" className="space-y-6">
          <SectionLabel num="02" label="experience.log" />
          <div className="space-y-4">
            {experience.map((item) => (
              <article
                key={`${item.company}-${item.role}`}
                className="grid gap-3 border-l-2 pl-5 md:grid-cols-[160px_minmax(0,1fr)] md:items-baseline md:gap-6"
                style={{ borderLeftColor: ACCENT }}
              >
                <p
                  style={{ fontFamily: "var(--font-mono)" }}
                  className="text-sm text-neutral-500"
                >
                  [{item.period}]
                </p>
                <div className="space-y-1">
                  <h3 className="font-bold text-white">
                    {item.role}{" "}
                    <span className="font-normal text-neutral-500">
                      @ {item.company}
                    </span>
                  </h3>
                  <p className="leading-7 text-neutral-400">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="projects"
          aria-labelledby="projects-heading"
          className="scroll-mt-8 space-y-6"
        >
          <SectionLabel num="03" label={`projects[${projects.length}]`} />
          <ol className="divide-y divide-neutral-800 border-y border-neutral-800">
            {projects.map((project, i) => {
              const inner = (
                <div className="grid gap-3 py-5 md:grid-cols-[40px_minmax(0,1fr)_180px] md:items-baseline md:gap-6">
                  <span
                    style={{ fontFamily: "var(--font-mono)", color: ACCENT }}
                    className="text-sm"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-bold leading-tight text-white">
                      {project.title}
                    </h3>
                    <p
                      style={{ fontFamily: "var(--font-mono)" }}
                      className="text-xs uppercase tracking-wider text-neutral-500"
                    >
                      {project.type} {"//"} {project.tech}
                    </p>
                    <p className="max-w-2xl pt-1 text-sm leading-6 text-neutral-400">
                      {project.summary}
                    </p>
                  </div>
                  <span
                    style={{ fontFamily: "var(--font-mono)" }}
                    className="text-xs text-neutral-500 md:text-right"
                  >
                    {project.href ? (
                      <span className="text-neutral-300 group-hover:text-[#a3e635]">
                        {project.cta} →
                      </span>
                    ) : (
                      "-- private --"
                    )}
                  </span>
                </div>
              );
              return (
                <li key={project.title}>
                  {project.href ? (
                    <Link
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group block transition-colors hover:bg-neutral-900/40"
                    >
                      {inner}
                    </Link>
                  ) : (
                    inner
                  )}
                </li>
              );
            })}
          </ol>
        </section>

        <section aria-labelledby="blog-heading" className="space-y-6">
          <SectionLabel num="04" label="writing.md" />
          {latest ? (
            <article className="space-y-2">
              <p
                style={{ fontFamily: "var(--font-mono)" }}
                className="text-xs text-neutral-500"
              >
                {latest.date}
              </p>
              <Link
                href={`/blog/${latest.slug}`}
                className="group inline-block max-w-2xl"
              >
                <h3 className="text-2xl font-bold leading-snug text-white group-hover:text-[#a3e635]">
                  {latest.title}
                </h3>
              </Link>
              <p className="max-w-2xl pt-1 text-sm leading-6 text-neutral-400">
                {latest.description}
              </p>
              <Link
                href="/blog"
                style={{ fontFamily: "var(--font-mono)", color: ACCENT }}
                className="inline-block pt-2 text-xs hover:opacity-80"
              >
                cd ./blog →
              </Link>
            </article>
          ) : null}
        </section>

        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="scroll-mt-8 space-y-6"
        >
          <SectionLabel num="05" label="contact" />
          <div
            style={{ fontFamily: "var(--font-mono)" }}
            className="space-y-2 text-sm"
          >
            <p>
              <span className="text-neutral-500">$</span> open{" "}
              <Link
                href="https://github.com/metinjakupi"
                target="_blank"
                rel="noreferrer"
                style={{ color: ACCENT }}
                className="hover:underline underline-offset-4"
              >
                github.com/metinjakupi
              </Link>
            </p>
            <p>
              <span className="text-neutral-500">$</span> open{" "}
              <Link
                href="https://x.com/mjakupiiii"
                target="_blank"
                rel="noreferrer"
                style={{ color: ACCENT }}
                className="hover:underline underline-offset-4"
              >
                x.com/mjakupiiii
              </Link>
            </p>
            <p className="pt-3 text-neutral-500">
              <span style={{ color: ACCENT }}>~</span> exit
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-baseline gap-3 border-b border-neutral-800 pb-3">
      <span
        style={{ fontFamily: "var(--font-mono)", color: ACCENT }}
        className="text-xs"
      >
        §{num}
      </span>
      <h2
        style={{ fontFamily: "var(--font-mono)" }}
        className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-300"
      >
        {label}
      </h2>
    </div>
  );
}
