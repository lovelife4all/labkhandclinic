/** @type {import('next').NextConfig} */
const isPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(isPages
    ? {
        output: "export",
        basePath: "/labkhandclinic",
        images: { unoptimized: true },
      }
    : {
        images: { formats: ["image/avif", "image/webp"] },
        async headers() {
          return [
            {
              source: "/:path*",
              headers: [
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "X-Frame-Options", value: "SAMEORIGIN" },
                { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
              ],
            },
            {
              // Private/demo panels must never be cached publicly
              source: "/(patient|admin|secretary)/:path*",
              headers: [{ key: "Cache-Control", value: "private, no-store" }],
            },
          ];
        },
      }),
};

export default nextConfig;
