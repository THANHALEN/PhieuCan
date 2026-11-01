/* Service worker: lưu app shell để mở được khi mất mạng.
   Khi thay đổi index.html hoặc icon, đổi số phiên bản CACHE_NAME để trình duyệt cập nhật. */
const CACHE_NAME = "phieu-can-v2";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon/icon-192.png",
  "./icon/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  // Chỉ xử lý GET cùng nguồn; mọi lệnh gọi Supabase đi thẳng qua mạng
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;

  // Ưu tiên mạng để luôn có bản mới; mất mạng thì dùng bản đã lưu
  event.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        return res;
      })
      .catch(() => caches.match(req).then((hit) => hit || caches.match("./index.html")))
  );
});
