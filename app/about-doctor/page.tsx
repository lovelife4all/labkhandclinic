import { PageHeader, Card, Btn } from "@/components/ui";
import { CLINIC } from "@/lib/demo/seed";

export default function AboutDoctorPage() {
  return (
    <div>
      <PageHeader title={`درباره ${CLINIC.doctor}`} sub={CLINIC.name} />
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-4">
        <Card>
          <div className="w-20 h-20 rounded-full bg-primary-light grid place-items-center text-3xl font-black text-primary">د</div>
          <h2 className="text-xl font-bold mt-4 text-brand">{CLINIC.doctor}</h2>
          <p className="leading-8 mt-3 text-muted">
            اطلاعات سوابق تحصیلی، تخصص و مجوزهای حرفه‌ای پس از تأیید و ارائه مستندات توسط پزشک در این بخش منتشر می‌شود.
            در نسخه آزمایشی، از درج اطلاعات تأییدنشده خودداری شده است.
          </p>
          <div className="mt-6"><Btn href="/booking">رزرو نوبت</Btn></div>
        </Card>
      </div>
    </div>
  );
}
