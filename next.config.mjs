/** @type {import('next').NextConfig} */
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? "/labkhandclinic" : "";

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(isPages
    ? {
        output: "export",
        basePath,
        trailingSlash: true,
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
