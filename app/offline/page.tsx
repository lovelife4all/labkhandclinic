import { PageHeader, Card, Btn } from "@/components/ui";
export default function OfflinePage() {
  return <div><PageHeader title="شما آفلاین هستید" /><div className="max-w-3xl mx-auto px-4 py-10"><Card><p className="leading-8">اتصال اینترنت برقرار نیست. لطفاً دوباره تلاش کنید یا با مطب تماس بگیرید.</p><div className="mt-4"><Btn href="/">بازگشت به خانه</Btn></div></Card></div></div>;
}
