import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site/shell";
import { LIME } from "@/components/site/theme";
import { buttonGhost, buttonPrimary } from "@/components/site/ui";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-3xl px-5 pb-28 pt-20 md:pt-28">
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0c0c0f]">
          <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="space-y-1 p-5 font-mono text-sm leading-7">
            <p className="text-zinc-500"><span style={{ color: LIME }}>❯</span> <span className="text-zinc-200">cd {"<requested-page>"}</span></p>
            <p className="text-red-400">cd: no such file or directory</p>
            <p className="text-zinc-500"><span style={{ color: LIME }}>❯</span> <span className="text-zinc-200">echo $?</span></p>
            <p className="text-zinc-300">404</p>
          </div>
        </div>
        <h1 className="mt-10 text-5xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-6xl">
          Page <span style={{ color: LIME }}>not found.</span>
        </h1>
        <p className="mt-5 max-w-xl leading-7 text-zinc-400">The page you asked for doesn&apos;t exist. It may have moved, or the link may be wrong.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/" className={buttonPrimary} style={{ background: LIME }}>Back home</Link>
          <Link href="/games" className={buttonGhost}>See the games</Link>
        </div>
      </section>
    </SiteShell>
  );
}
