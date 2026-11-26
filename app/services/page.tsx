"use client";
import Link from "next/link";
import { PageHeader, Card, PriceLabel } from "@/components/ui";
import { useDemo } from "@/lib/demo/store";

export default function ServicesPage() {
  const { services } = useDemo();
  const active = services.filter((s) => s.active).sort((a, b) => a.sortOrder - b.sortOrder);
  return (
    <div>
      <PageHeader title="خدمات دندانپزشکی" sub="تعرفه‌ها تقریبی و مشروط به معاینه و تشخیص پزشک هستند." />
      <div className="max-w-6xl mx-auto px-4 py-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {active.map((s) => (
          <Card key={s.id}>
            <span className="text-xs bg-primary-light text-primary rounded-full px-2 py-1">{s.category}</span>
            <h2 className="font-bold text-lg mt-3 text-brand">{s.title}</h2>
            <p className="text-sm text-muted mt-2 leading-7">{s.short}</p>
            <p className="text-sm mt-3 font-semibold text-primary"><PriceLabel priceType={s.priceType} price={s.price} priceMin={s.priceMin} priceMax={s.priceMax} /></p>
            <div className="flex gap-3 mt-4">
              <Link href={`/services/${s.slug}`} className="text-primary font-semibold text-sm">جزئیات خدمت</Link>
              {s.bookable && <Link href="/booking" className="text-brand font-semibold text-sm">رزرو این خدمت</Link>}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
