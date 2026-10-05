import Link from "next/link";
import { LIME } from "@/components/site/theme";
import { services } from "@/lib/showcase";

export function Expertise() {
  return (
    <section id="services" aria-labelledby="expertise-title" className="mx-auto max-w-6xl scroll-mt-24 px-5 pt-28">
      <div className="grid gap-10 border-t border-white/15 pt-10 md:gap-16 lg:grid-cols-[0.9fr_1.3fr] lg:pt-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">Expertise</p>
          <h2 id="expertise-title" className="mt-5 max-w-lg text-4xl font-medium leading-[1.1] tracking-[-0.04em] text-white sm:text-5xl">
            Products.<br />
            Platforms.<br />
            <span style={{ color: LIME }}>Interactive experiences.</span>
          </h2>
          <p className="mt-6 max-w-sm text-base leading-7 text-zinc-400">
            I build software for the web, mobile and desktop — from the first prototype to the next release.
          </p>
          <Link href="#contact" className="group mt-6 inline-flex min-h-11 items-center gap-3 text-sm font-medium text-white transition-colors hover:text-[#a3e635] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a3e635]">
            Discuss a project
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none">↗</span>
          </Link>
        </div>

        <ol className="border-t border-white/10 lg:border-t-0">
          {services.map((service, index) => (
            <li key={service.title} className="grid grid-cols-[1.5rem_1fr] gap-4 border-b border-white/10 py-7 first:lg:pt-0 sm:grid-cols-[2rem_1fr] sm:gap-6 sm:py-8">
              <span aria-hidden="true" className="pt-1 font-mono text-xs text-zinc-500">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-xl font-medium tracking-[-0.02em] text-white sm:text-2xl">{service.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">{service.body}</p>
                <div className="mt-3 flex flex-wrap gap-x-5">
                  {service.examples.map((example) => {
                    const external = example.href.startsWith("https://");
                    return (
                      <Link key={example.label} href={example.href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className="group inline-flex min-h-11 items-center gap-2 text-sm text-zinc-300 transition-colors hover:text-[#a3e635] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a3e635]">
                        {example.label}
                        <span aria-hidden="true" className="text-zinc-500 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#a3e635] motion-reduce:transform-none motion-reduce:transition-none">{external ? "↗" : "↓"}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
