import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

interface PostMeta {
  slug: string;
  title?: string;
  date?: string;
  description?: string;
}

export default async function BlogPage() {
  const contentDir = path.join(process.cwd(), 'content');
  const files = await fs.readdir(contentDir);
  const posts: PostMeta[] = await Promise.all(
    files.filter(f => f.endsWith('.md')).map(async (file) => {
      const filePath = path.join(contentDir, file);
      const fileContent = await fs.readFile(filePath, 'utf8');
      const { data } = matter(fileContent);
      return {
        slug: file.replace(/\.md$/, ''),
        title: data.title,
        date: data.date,
        description: data.description,
      };
    })
  );

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#f5f5f5] text-foreground relative">

      <div
        className="absolute inset-0 z-0"
        style={
          {
            "--line": "#e0e0e0",
            "--size": "50px",
            background: `
        linear-gradient(90deg, var(--line) 1px, transparent 1px var(--size)) 50% 50% / var(--size) var(--size),
        linear-gradient(var(--line) 1px, transparent 1px var(--size)) 50% 50% / var(--size) var(--size)
      `,
            mask: "linear-gradient(-20deg, transparent 50%, white)",
          } as React.CSSProperties
        }
      ></div>
      <main className="max-w-2xl mx-auto p-8 relative z-10">
        <div className="flex justify-start mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-gray-600 text-sm font-medium shadow-sm hover:bg-gray-100 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Back to home page"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l-7 7 7 7" /></svg>
            Back to Home
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-8">Blog</h1>
        <ul className="space-y-6">
          {posts.map(post => (
            <li key={post.slug} className="border-b pb-4">
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                <h2 className="text-xl font-semibold">{post.title}</h2>
              </Link>
              <p className="text-gray-500 text-xs mb-1">{post.date}</p>
              <p className="text-gray-700 text-sm">{post.description}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>

  );
} 