import { PageHeader, Card } from "@/components/ui";
import { CLINIC } from "@/lib/demo/seed";

export default function AboutClinicPage() {
  return (
    <div>
      <PageHeader title="درباره کلینیک" sub={CLINIC.name} />
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-4">
        <Card>
          <p className="leading-8">{CLINIC.slogan}. کلینیک دندانپزشکی لبخند در {CLINIC.address} با مدیریت {CLINIC.doctor} خدمات دندانپزشکی ارائه می‌دهد.</p>
          <p className="leading-8 mt-3 text-muted">معرفی کامل امکانات و تجهیزات پس از تأیید پزشک تکمیل می‌شود (نسخه آزمایشی).</p>
        </Card>
      </div>
    </div>
  );
}
