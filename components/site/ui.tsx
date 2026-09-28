import Image from "next/image";
import Link from "next/link";
import { LIME } from "@/components/site/theme";
import type { WorkItem } from "@/lib/showcase";

export function SectionHead({ kicker, title, note, as: Tag = "h2" }: { kicker: string; title: string; note?: string; as?: "h1" | "h2" }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
          <span style={{ color: LIME }}>{"//"}</span> {kicker}
        </p>
        <Tag className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">{title}</Tag>
      </div>
      {note ? <p className="max-w-sm text-sm text-zinc-400">{note}</p> : null}
    </div>
  );
}

export function Tags({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <span key={t} className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-zinc-400">{t}</span>
      ))}
    </div>
  );
}

export function WorkCard({ item }: { item: WorkItem }) {
  const tags = [item.kind, ...item.tech.split(/,\s*/)].slice(0, 3);
  const body = (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02] transition duration-300 hover:-translate-y-0.5 hover:border-[#a3e635]/40">
      {item.image ? (
        <div className="overflow-hidden border-b border-white/[0.07]">
          <Image src={item.image} alt={item.alt ?? item.title} placeholder="blur" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]" />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <Tags items={tags} />
        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
        <p className="text-sm leading-6 text-zinc-400">{item.summary}</p>
        {item.cta ? (
          <p className="mt-auto flex items-center gap-1.5 pt-2 text-sm font-medium text-zinc-300 group-hover:text-[#a3e635]">
            {item.cta} <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </p>
        ) : null}
      </div>
    </article>
  );
  return item.href ? <Link href={item.href} target="_blank" rel="noreferrer" className="block h-full">{body}</Link> : body;
}

export const buttonPrimary = "inline-flex h-12 items-center gap-2 rounded-lg px-6 font-semibold text-zinc-950 transition hover:brightness-110";
export const buttonGhost = "inline-flex h-12 items-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-6 font-semibold text-white transition hover:border-white/30";
