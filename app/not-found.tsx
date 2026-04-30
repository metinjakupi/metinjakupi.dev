import Link from "next/link";
import { JetBrains_Mono, Inter } from "next/font/google";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const ACCENT = "#a3e635";

export default function NotFound() {
  return (
    <div
      className={`${mono.variable} ${inter.variable} relative flex min-h-[100dvh] items-center bg-[#0a0a0a] text-neutral-300`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)",
        }}
      />

      <main className="relative z-10 mx-auto w-full max-w-2xl px-4 py-16 sm:px-6">
        <div
          style={{ fontFamily: "var(--font-mono)" }}
          className="space-y-1 text-sm leading-7"
        >
          <p className="text-neutral-500">
            <span style={{ color: ACCENT }}>~</span> ls {`<requested-path>`}
          </p>
          <p className="text-red-400">
            ls: cannot access: No such file or directory
          </p>
          <p className="text-neutral-500">
            <span style={{ color: ACCENT }}>~</span> echo $?
          </p>
          <p className="text-neutral-200">404</p>
        </div>

        <h1 className="mt-10 text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
          Page <span style={{ color: ACCENT }}>not found.</span>
        </h1>

        <p className="mt-6 max-w-xl leading-7 text-neutral-400">
          The page you requested doesn&apos;t exist — it may have moved, or the
          URL may be wrong. Head back home and try again.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/"
            style={{ fontFamily: "var(--font-mono)", background: ACCENT }}
            className="inline-flex h-10 items-center px-5 text-sm font-medium text-neutral-950 hover:opacity-90"
          >
            cd ~
          </Link>
          <Link
            href="/blog"
            style={{ fontFamily: "var(--font-mono)" }}
            className="inline-flex h-10 items-center border border-neutral-700 px-5 text-sm font-medium text-neutral-200 hover:border-neutral-400"
          >
            ./blog
          </Link>
        </div>
      </main>
    </div>
  );
}
