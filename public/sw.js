/* Labkhand PWA service worker.
   SAFETY: never cache private pages (patient/admin/secretary), auth, or API.
   Only the offline fallback and static shell assets are cached. */
const CACHE = "labkhand-v1";
const SHELL = ["/offline", "/icon.svg"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(clients.claim());
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  // Never intercept private or API routes
  if (url.pathname.startsWith("/patient") || url.pathname.startsWith("/admin") ||
      url.pathname.startsWith("/secretary") || url.pathname.startsWith("/api") ||
      url.pathname.startsWith("/login")) return;
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request).then((r) => r || caches.match("/offline")))
  );
});
