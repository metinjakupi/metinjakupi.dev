import type { MetadataRoute } from "next";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const contentDir = path.join(process.cwd(), "content");
  const files = await fs.readdir(contentDir);
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const filePath = path.join(contentDir, file);
        const fileContent = await fs.readFile(filePath, "utf8");
        const { data } = matter(fileContent);

        return {
          url: absoluteUrl(`/blog/${file.replace(/\.md$/, "")}`),
          lastModified: data.date ? new Date(data.date) : now,
          changeFrequency: "monthly" as const,
          priority: 0.7,
        };
      })
  );

  return [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts,
  ];
}
