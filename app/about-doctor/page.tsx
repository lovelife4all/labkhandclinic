import { PageHeader, Card, Btn } from "@/components/ui";
import { CLINIC } from "@/lib/demo/seed";

export default function AboutDoctorPage() {
  return (
    <div>
      <PageHeader title={`درباره ${CLINIC.doctor}`} sub={CLINIC.name} />
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-4">
        <Card>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-primary-light shadow-sm bg-primary-light shrink-0">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/doctor-dorkhah.jpg`}
                alt={CLINIC.doctor}
                width={136}
                height={126}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-brand">{CLINIC.doctor}</h2>
              <p className="leading-8 mt-3 text-muted">
                اطلاعات سوابق تحصیلی، تخصص و مجوزهای حرفه‌ای پس از تأیید و ارائه مستندات توسط پزشک در این بخش منتشر می‌شود.
                در نسخه آزمایشی، از درج اطلاعات تأییدنشده خودداری شده است.
              </p>
              <div className="mt-6"><Btn href="/booking">رزرو نوبت</Btn></div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
