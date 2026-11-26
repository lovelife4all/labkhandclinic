import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const routes = ["", "/services", "/pricing", "/about-doctor", "/about-clinic", "/gallery", "/articles", "/faq", "/contact", "/booking", "/terms", "/privacy"];
  return routes.map((r) => ({ url: base + r, lastModified: new Date() }));
}
