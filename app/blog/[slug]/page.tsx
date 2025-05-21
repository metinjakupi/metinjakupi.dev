import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';

interface BlogDetailProps {
  params: { slug: string };
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const filePath = path.join(process.cwd(), 'content', `${params.slug}.md`);
  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    const htmlContent = marked(content);

    return (
      <main className="flex justify-center items-start min-h-screen bg-white">
        <article className="prose prose-lg max-w-3xl w-full mt-16 mb-24 px-4 sm:px-6 relative">
          <div className="flex justify-center mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-gray-600 text-sm font-medium shadow-sm hover:bg-gray-100 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label="Back to blog posts"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Back to Blog
            </Link>
          </div>
          <h1 className="text-4xl font-bold mb-3 text-center leading-tight">{data.title}</h1>
          <p className="text-gray-500 text-sm text-center mb-6">{data.date}</p>
          {data.description && (
            <p className="text-gray-600 text-center mb-10 italic text-lg leading-relaxed">{data.description}</p>
          )}
          <div 
            dangerouslySetInnerHTML={{ __html: htmlContent }} 
            className="prose prose-lg prose-slate max-w-none w-full leading-relaxed
                       prose-headings:font-semibold prose-headings:leading-tight
                       prose-p:leading-7 prose-p:my-6 prose-p:text-gray-800
                       prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                       prose-img:rounded-lg prose-img:shadow-md
                       prose-blockquote:text-gray-700 prose-blockquote:border-l-4 prose-blockquote:border-gray-300
                       prose-blockquote:pl-4 prose-blockquote:py-1 prose-blockquote:italic prose-blockquote:bg-gray-50
                       prose-hr:my-8 prose-hr:border-gray-200
                       prose-code:px-1 prose-code:rounded
                       prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg
                      " 
          />
        </article>
      </main>
    );
  } catch (e) {
    notFound();
  }
}

export async function generateMetadata({ params }: BlogDetailProps): Promise<Metadata> {
  const filePath = path.join(process.cwd(), 'content', `${params.slug}.md`);
  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data } = matter(fileContent);
    return {
      title: data.title || 'Blog Post',
      description: data.description || '',
      openGraph: {
        title: data.title || 'Blog Post',
        description: data.description || '',
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: data.title || 'Blog Post',
        description: data.description || '',
      },
    };
  } catch {
    return {
      title: 'Blog Post',
      description: '',
    };
  }
}