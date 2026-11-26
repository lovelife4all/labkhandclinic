import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "کلینیک دندانپزشکی لبخند",
    short_name: "لبخند",
    description: "رزرو آنلاین نوبت کلینیک دندانپزشکی لبخند — کازرون",
    lang: "fa",
    dir: "rtl",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#0D9488",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
