"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PageHeader, Card } from "@/components/ui";
import { useDemo } from "@/lib/demo/store";

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const { articles } = useDemo();
  const a = articles.find((x) => x.slug === slug && x.status === "published");
  if (!a) return <div className="max-w-3xl mx-auto px-4 py-16 text-center"><h1 className="text-xl font-bold">مقاله یافت نشد</h1><Link href="/articles" className="text-primary underline">بازگشت به مقالات</Link></div>;
  return (
    <div>
      <PageHeader title={a.title} sub={a.category} />
      <div className="max-w-3xl mx-auto px-4 py-10"><Card><p className="leading-9">{a.body}</p><div className="flex flex-wrap gap-1 mt-6">{a.tags.map((t) => <span key={t} className="text-[11px] bg-slate-100 rounded-full px-2 py-1">{t}</span>)}</div></Card></div>
    </div>
  );
}
