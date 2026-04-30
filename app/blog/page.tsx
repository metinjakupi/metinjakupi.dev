import Link from "next/link";
import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import { getPosts } from "@/lib/portfolio-data";

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

const blogDescription =
  "Technical writing by Metin Jakupi on React, Next.js, frontend architecture, and product engineering.";

export const metadata: Metadata = {
  title: "Blog",
  description: blogDescription,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Metin Jakupi",
    description: blogDescription,
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Metin Jakupi",
    description: blogDescription,
    images: ["/twitter-image"],
  },
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div
      className={`${mono.variable} ${inter.variable} relative flex min-h-[100dvh] flex-col bg-[#0a0a0a] text-neutral-300`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)",
        }}
      />

      <main className="relative z-10 mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 md:py-20">
        <div className="mb-10">
          <Link
            href="/"
            style={{ fontFamily: "var(--font-mono)" }}
            className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-[#a3e635]"
          >
            <span style={{ color: ACCENT }}>~</span> cd ../
            <span className="text-neutral-600">·</span>
            <span>back to home</span>
          </Link>
        </div>

        <div className="mb-10 space-y-3">
          <p
            style={{ fontFamily: "var(--font-mono)", color: ACCENT }}
            className="text-xs uppercase tracking-[0.2em]"
          >
            §writing
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Blog
          </h1>
          <p className="max-w-2xl leading-7 text-neutral-400">
            {blogDescription}
          </p>
        </div>

        <ul className="divide-y divide-neutral-800 border-y border-neutral-800">
          {posts.map((post, i) => (
            <li key={post.slug} className="py-6">
              <Link href={`/blog/${post.slug}`} className="group block space-y-2">
                <div className="flex items-baseline gap-3">
                  <span
                    style={{ fontFamily: "var(--font-mono)", color: ACCENT }}
                    className="text-xs"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p
                    style={{ fontFamily: "var(--font-mono)" }}
                    className="text-xs text-neutral-500"
                  >
                    {post.date}
                  </p>
                </div>
                <h2 className="max-w-2xl text-2xl font-bold leading-snug text-white group-hover:text-[#a3e635]">
                  {post.title}
                </h2>
                <p className="max-w-2xl leading-7 text-neutral-400">
                  {post.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
