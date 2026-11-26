import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return {
    name: "کلینیک دندانپزشکی لبخند",
    short_name: "لبخند",
    description: "رزرو آنلاین نوبت کلینیک دندانپزشکی لبخند — کازرون",
    lang: "fa",
    dir: "rtl",
    start_url: `${base}/`,
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#0D9488",
    icons: [{ src: `${base}/icon.svg`, sizes: "any", type: "image/svg+xml" }],
  };
}
