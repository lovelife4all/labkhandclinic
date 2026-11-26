"use client";
import { useState } from "react";
import { PageHeader, Card } from "@/components/ui";
import { useDemo } from "@/lib/demo/store";

export default function GalleryPage() {
  const { gallery } = useDemo();
  const [cat, setCat] = useState("همه");
  const visible = gallery.filter((g) => g.published && g.consent && (cat === "همه" || g.category === cat));
  const cats = ["همه", ...Array.from(new Set(gallery.map((g) => g.category)))];
  return (
    <div>
      <PageHeader title="گالری نمونه‌کارها" sub="تصاویر نمایشی — نمونه‌کار واقعی نیستند. انتشار هر تصویر واقعی نیازمند رضایت مستند بیمار است." />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-2 text-sm font-semibold ${cat === c ? "bg-primary text-white" : "bg-white border border-slate-200"}`}>{c}</button>
          ))}
        </div>
        {visible.length === 0 ? (
          <Card className="mt-6 text-center text-muted">در این دسته نمونه‌کاری منتشر نشده است.</Card>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {visible.map((g) => (
              <div key={g.id} className="rounded-2xl bg-gradient-to-br from-primary-light to-white border border-slate-100 p-6 text-center">
                <div className="text-3xl">🦷</div>
                <p className="text-sm font-semibold mt-2">{g.title}</p>
                <p className="text-xs text-muted">{g.category}</p>
                <p className="text-[11px] text-muted mt-1">قبل / بعد — تصویر آزمایشی</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
