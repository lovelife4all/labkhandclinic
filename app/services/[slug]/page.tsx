import ServiceDetailClient from "./ServiceDetailClient";
import { seedServices } from "@/lib/demo/seed";

export function generateStaticParams() {
  return seedServices.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ServiceDetailClient slug={slug} />;
}
