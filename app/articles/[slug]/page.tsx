import ArticleClient from "./ArticleClient";
import { seedArticles } from "@/lib/demo/seed";

export function generateStaticParams() {
  return seedArticles.filter((a) => a.status === "published").map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ArticleClient slug={slug} />;
}
