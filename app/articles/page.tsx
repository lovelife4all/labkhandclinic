"use client";
import Link from "next/link";
import { PageHeader, Card } from "@/components/ui";
import { useDemo } from "@/lib/demo/store";

export default function ArticlesPage() {
  const { articles } = useDemo();
  const published = articles.filter((a) => a.status === "published");
  return (
    <div>
      <PageHeader title="مقالات آموزشی" sub="مطالب پزشکی پیش از انتشار توسط پزشک بررسی می‌شوند." />
      <div className="max-w-6xl mx-auto px-4 py-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {published.map((a) => (
          <Card key={a.id}>
            <span className="text-xs bg-primary-light text-primary rounded-full px-2 py-1">{a.category}</span>
            <h2 className="font-bold mt-3">{a.title}</h2>
            <p className="text-sm text-muted mt-2 leading-7">{a.excerpt}</p>
            <div className="flex flex-wrap gap-1 mt-3">{a.tags.map((t) => <span key={t} className="text-[11px] bg-slate-100 rounded-full px-2 py-1">{t}</span>)}</div>
            <Link href={`/articles/${a.slug}`} className="text-primary text-sm font-semibold mt-3 inline-block">ادامه مطلب</Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
