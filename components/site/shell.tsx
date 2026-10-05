import Link from "next/link";
import { LIME } from "@/components/site/theme";
import { contact } from "@/lib/showcase";

const NAV: [string, string][] = [
  ["Work", "/#work"],
  ["Games", "/games"],
  ["Expertise", "/#services"],
  ["Experience", "/#experience"],
  ["Blog", "/blog"],
];

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 font-semibold text-white">
      <span className="grid h-7 w-7 place-items-center rounded-md font-mono text-[13px] font-bold text-zinc-950" style={{ background: LIME }}>
        {">_"}
      </span>
      Metin Jakupi
    </Link>
  );
}

/** A soft lime glow and a fine grid behind the top of every page. */
function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[900px] overflow-hidden">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 30%, transparent 75%)",
        }}
      />
      <div className="absolute left-1/2 top-[-280px] h-[560px] w-[900px] -translate-x-1/2 rounded-full opacity-25 blur-3xl" style={{ background: `radial-gradient(closest-side, ${LIME}, transparent)` }} />
    </div>
  );
}

function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#09090b]/75 backdrop-blur-xl">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center gap-8 px-5">
        <Logo />
        <div className="hidden items-center gap-7 text-sm text-zinc-400 md:flex">
          {NAV.map(([label, href]) => (
            <Link key={label} href={href} className="transition-colors hover:text-white">{label}</Link>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-4">
          <span className="hidden items-center gap-2 text-xs text-zinc-400 lg:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for projects
          </span>
          <Link href="/#contact" className="inline-flex h-9 items-center rounded-lg px-4 text-sm font-semibold text-zinc-950 transition hover:brightness-110" style={{ background: LIME }}>
            Hire me
          </Link>
        </div>
      </nav>
    </header>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div className="space-y-3">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">{title}</p>
      <ul className="space-y-2 text-sm">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link href={href} className="text-zinc-400 transition-colors hover:text-white">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SiteFooter() {
  const elsewhere: [string, string][] = [["GitHub", contact.github], ["X", contact.x]];
  if (contact.email) elsewhere.push(["Email", `mailto:${contact.email}`]);
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm leading-6 text-zinc-500">Senior frontend engineer building web products and browser games.</p>
        </div>
        <FooterCol title="Navigate" links={NAV} />
        <FooterCol title="Elsewhere" links={elsewhere} />
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 border-t border-white/[0.06] px-5 py-6 font-mono text-xs text-zinc-500">
        <span>© {new Date().getFullYear()} Metin Jakupi</span>
        <span>Built with Next.js · Hosted on Vercel</span>
      </div>
    </footer>
  );
}

/** Every page: backdrop, sticky nav, the page itself, footer. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-[100dvh]">
      <Backdrop />
      <SiteNav />
      <main id="top" className="relative">{children}</main>
      <SiteFooter />
    </div>
  );
}
