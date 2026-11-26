import { PageHeader } from "@/components/ui";
import { faqs } from "@/lib/demo/seed";

export default function FaqPage() {
  return (
    <div>
      <PageHeader title="سؤالات متداول" />
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-3">
        {faqs.map((f) => (
          <details key={f.q} className="bg-white border border-slate-200 rounded-xl p-4">
            <summary className="font-semibold cursor-pointer">{f.q}</summary>
            <p className="text-sm text-muted mt-2 leading-7">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
