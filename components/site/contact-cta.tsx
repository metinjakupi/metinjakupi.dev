import Link from "next/link";
import { LIME } from "@/components/site/theme";
import { buttonGhost, buttonPrimary } from "@/components/site/ui";
import { contact } from "@/lib/showcase";

/** The closing call to action, shared by the homepage and /games. */
export function ContactCta({ title = "Have a product or a game to build? Let's talk." }: { title?: string }) {
  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-28">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 p-8 md:p-14" style={{ background: "radial-gradient(120% 140% at 0% 0%, rgba(163,230,53,0.14), transparent 55%), #0c0c0f" }}>
        <p className="font-mono text-sm text-zinc-500"><span style={{ color: LIME }}>$</span> ./contact --start-project</p>
        <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-white md:text-6xl">{title}</h2>
        <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-400">Open to freelance frontend and browser-game projects — from a first prototype to a full launch.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          {contact.email ? <Link href={`mailto:${contact.email}`} className={buttonPrimary} style={{ background: LIME }}>Email me</Link> : null}
          <Link href={contact.x} target="_blank" rel="noreferrer" className={contact.email ? buttonGhost : buttonPrimary} style={contact.email ? undefined : { background: LIME }}>Message me on X</Link>
          <Link href={contact.github} target="_blank" rel="noreferrer" className={buttonGhost}>GitHub</Link>
        </div>
      </div>
    </section>
  );
}
