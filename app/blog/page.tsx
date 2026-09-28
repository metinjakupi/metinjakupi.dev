import Link from "next/link";
import type { Metadata } from "next";
import { SiteShell } from "@/components/site/shell";
import { LIME } from "@/components/site/theme";
import { SectionHead } from "@/components/site/ui";
import { getPosts } from "@/lib/portfolio-data";

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
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Blog | Metin Jakupi" }],
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
    <SiteShell>
      <section className="mx-auto max-w-3xl space-y-10 px-5 pb-28 pt-16 md:pt-24">
        <SectionHead kicker="writing" title="Blog" as="h1" />
        <p className="-mt-4 max-w-2xl leading-7 text-zinc-400">{blogDescription}</p>
        <ul className="divide-y divide-white/[0.07] rounded-xl border border-white/[0.07]">
          {posts.map((post, i) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block space-y-2 p-6 transition-colors hover:bg-white/[0.02]">
                <p className="font-mono text-xs text-zinc-500">
                  <span style={{ color: LIME }}>{String(i + 1).padStart(2, "0")}</span> · {post.date}
                </p>
                <h2 className="text-2xl font-semibold leading-snug tracking-tight text-white group-hover:text-[#a3e635]">{post.title}</h2>
                <p className="leading-7 text-zinc-400">{post.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </SiteShell>
  );
}
