"use client";
import { PageHeader, Card, PriceLabel } from "@/components/ui";
import { useDemo } from "@/lib/demo/store";

export default function PricingPage() {
  const { services } = useDemo();
  const active = services.filter((s) => s.active).sort((a, b) => a.sortOrder - b.sortOrder);
  return (
    <div>
      <PageHeader title="تعرفه خدمات" sub="مبالغ به تومان و تقریبی هستند؛ مبلغ نهایی پس از معاینه مشخص می‌شود." />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Card className="p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-primary-light"><tr><th className="p-3 text-right">خدمت</th><th className="p-3 text-right">مدت جلسه</th><th className="p-3 text-right">تعرفه تقریبی</th></tr></thead>
            <tbody>
              {active.map((s) => (
                <tr key={s.id} className="border-t border-slate-100">
                  <td className="p-3 font-semibold">{s.title}</td>
                  <td className="p-3">{s.durationMin} دقیقه</td>
                  <td className="p-3 text-primary font-semibold"><PriceLabel priceType={s.priceType} price={s.price} priceMin={s.priceMin} priceMax={s.priceMax} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <p className="text-xs text-muted mt-4">تعرفه‌ها در نسخه آزمایشی نمایشی هستند و پس از تأیید پزشک به‌روزرسانی می‌شوند.</p>
      </div>
    </div>
  );
}
