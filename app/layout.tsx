import type { Metadata } from "next";
import "./globals.css";
import { DemoProvider } from "@/lib/demo/store";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { DemoBanner } from "@/components/ui";
import { PwaRegister } from "@/components/PwaRegister";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: { default: "کلینیک دندانپزشکی لبخند | دکتر محمد درخواه — کازرون", template: "%s | کلینیک لبخند" },
  description: "کلینیک دندانپزشکی لبخند در کازرون — دکتر محمد درخواه. رزرو آنلاین نوبت، ایمپلنت، کامپوزیت، لمینت و خدمات دندانپزشکی.",
  openGraph: { type: "website", locale: "fa_IR", siteName: "کلینیک دندانپزشکی لبخند" },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "کلینیک دندانپزشکی لبخند",
  founder: { "@type": "Person", name: "دکتر محمد درخواه" },
  address: { "@type": "PostalAddress", addressLocality: "کازرون", addressRegion: "فارس", addressCountry: "IR", streetAddress: "خیابان سلمان فارسی" },
  telephone: "+98-71-42225667",
  url: "https://www.instagram.com/dr_dorkhah/",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <DemoProvider>
          <DemoBanner />
          <Header />
          <main className="pb-20 lg:pb-0">{children}</main>
          <Footer />
          <BottomNav />
          <PwaRegister />
        </DemoProvider>
      </body>
    </html>
  );
}
