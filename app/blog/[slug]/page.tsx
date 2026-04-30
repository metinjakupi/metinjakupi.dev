import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import { absoluteUrl, siteName } from "@/lib/seo";

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

        <main className="relative z-10 mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 md:py-20">
          <div className="mb-10">
            <Link
              href="/blog"
              style={{ fontFamily: "var(--font-mono)" }}
              className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-[#a3e635]"
            >
              <span style={{ color: ACCENT }}>~</span> cd ../
              <span className="text-neutral-600">·</span>
              <span>back to blog</span>
            </Link>
          </div>

          <article>
            <header className="mb-12 space-y-4">
              <p
                style={{ fontFamily: "var(--font-mono)", color: ACCENT }}
                className="text-xs uppercase tracking-[0.2em]"
              >
                {data.date}
              </p>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
                {data.title}
              </h1>
              {data.description && (
                <p className="max-w-2xl text-lg leading-8 text-neutral-400">
                  {data.description}
                </p>
              )}
            </header>

            <div
              dangerouslySetInnerHTML={{ __html: htmlContent }}
              className="prose prose-invert prose-lg max-w-none
                         prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-white
                         prose-p:leading-7 prose-p:text-neutral-300
                         prose-strong:text-white
                         prose-a:text-[#a3e635] prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-4
                         prose-code:rounded prose-code:bg-neutral-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-neutral-200 prose-code:before:content-none prose-code:after:content-none
                         prose-pre:max-w-full prose-pre:overflow-x-auto prose-pre:rounded-none prose-pre:border prose-pre:border-neutral-800 prose-pre:bg-[#050505] prose-pre:p-5 prose-pre:text-neutral-200
                         prose-blockquote:border-l-2 prose-blockquote:border-l-[#a3e635] prose-blockquote:bg-neutral-900/40 prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:not-italic prose-blockquote:text-neutral-300
                         prose-hr:border-neutral-800
                         prose-img:rounded-none prose-img:border prose-img:border-neutral-800
                         prose-li:text-neutral-300"
            />
          </article>
        </main>
      </div>
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
