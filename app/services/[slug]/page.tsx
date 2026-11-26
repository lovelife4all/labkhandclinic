"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PageHeader, Card, Btn, PriceLabel } from "@/components/ui";
import { useDemo } from "@/lib/demo/store";

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { services } = useDemo();
  const s = services.find((x) => x.slug === slug);
  if (!s) return <div className="max-w-3xl mx-auto px-4 py-16 text-center"><h1 className="text-xl font-bold">خدمت یافت نشد</h1><Link href="/services" className="text-primary underline">بازگشت به خدمات</Link></div>;
  return (
    <div>
      <PageHeader title={s.title} sub={s.category} />
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-4">
        <Card>
          <p className="leading-8">{s.full}</p>
          <div className="grid sm:grid-cols-2 gap-3 mt-6 text-sm">
            <p><span className="text-muted">مدت تقریبی جلسه:</span> {s.durationMin} دقیقه</p>
            <p><span className="text-muted">تعرفه:</span> <span className="font-semibold text-primary"><PriceLabel priceType={s.priceType} price={s.price} priceMin={s.priceMin} priceMax={s.priceMax} /></span></p>
          </div>
          <p className="text-xs text-muted mt-4">تعرفه‌های تخمینی مشروط به معاینه و تشخیص پزشک است.</p>
          <div className="mt-6"><Btn href="/booking">رزرو این خدمت</Btn></div>
        </Card>
      </div>
    </div>
  );
}
