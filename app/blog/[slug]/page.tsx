import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { absoluteUrl, person, siteName } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { SiteShell } from "@/components/site/shell";
import { LIME } from "@/components/site/theme";
interface BlogDetailProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "content", `${slug}.md`);
  try {
    const fileContent = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContent);
    // Content is authored markdown from /content/, trusted source.
    const htmlContent = marked(content);

    return (
      <SiteShell>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: data.title,
            description: data.description,
            datePublished: data.date,
            url: absoluteUrl(`/blog/${slug}`),
            mainEntityOfPage: absoluteUrl(`/blog/${slug}`),
            image: absoluteUrl("/opengraph-image"),
            author: person,
            publisher: { "@id": absoluteUrl("/#person") },
          }}
        />
        <article className="mx-auto max-w-3xl px-5 pb-28 pt-12 md:pt-20">
          <Link href="/blog" className="inline-flex items-center gap-2 font-mono text-xs text-zinc-500 hover:text-[#a3e635]">
            <span style={{ color: LIME }}>←</span> back to the blog
          </Link>
          <header className="mb-12 mt-8 space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: LIME }}>{data.date}</p>
            <h1 className="text-4xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-5xl">{data.title}</h1>
            {data.description && <p className="max-w-2xl text-lg leading-8 text-zinc-400">{data.description}</p>}
          </header>

          <div
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            className="prose prose-invert prose-lg max-w-none
                       prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-white
                       prose-p:leading-7 prose-p:text-zinc-300
                       prose-strong:text-white
                       prose-a:text-[#a3e635] prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-4
                       prose-code:rounded prose-code:bg-white/[0.06] prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-zinc-200 prose-code:before:content-none prose-code:after:content-none
                       prose-pre:max-w-full prose-pre:overflow-x-auto prose-pre:rounded-xl prose-pre:border prose-pre:border-white/[0.08] prose-pre:bg-[#0c0c0f] prose-pre:p-5 prose-pre:font-mono prose-pre:text-zinc-200
                       prose-blockquote:border-l-2 prose-blockquote:border-l-[#a3e635] prose-blockquote:bg-white/[0.02] prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:not-italic prose-blockquote:text-zinc-300
                       prose-hr:border-white/[0.08]
                       prose-img:rounded-xl prose-img:border prose-img:border-white/[0.08]
                       prose-li:text-zinc-300"
          />
        </article>
      </SiteShell>
    );
  } catch {
    notFound();
  }
}

export async function generateMetadata({
  params,
}: BlogDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "content", `${slug}.md`);
  try {
    const fileContent = await fs.readFile(filePath, "utf8");
    const { data } = matter(fileContent);
    return {
      title: data.title || "Blog Post",
      description: data.description || "",
      alternates: {
        canonical: `/blog/${slug}`,
      },
      openGraph: {
        title: data.title || "Blog Post",
        description: data.description || "",
        url: `/blog/${slug}`,
        siteName,
        type: "article",
        publishedTime: data.date,
        images: [
          {
            url: absoluteUrl("/opengraph-image"),
            width: 1200,
            height: 630,
            alt: data.title || "Blog Post",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: data.title || "Blog Post",
        description: data.description || "",
        images: [absoluteUrl("/twitter-image")],
      },
    };
  } catch {
    return {
      title: "Blog Post",
      description: "",
    };
  }
}
