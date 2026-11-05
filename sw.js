/* Céim service worker: works offline after the first visit */
const CACHE = "ceim-v4";
const ASSETS = ["./", "./index.html", "./css/style.css", "./js/util.js", "./js/maths.js", "./js/english.js", "./js/gaeilge.js", "./js/maths2.js", "./js/english2.js", "./js/junior-maths.js", "./js/junior-english.js", "./js/junior-gaeilge.js", "./js/app.js",
  "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png", "./icons/apple-touch-icon.png"];
const FONT_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];
self.addEventListener("install", (e) => e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener("activate", (e) => e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", (e) => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (FONT_HOSTS.includes(url.hostname)) {
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => { const c = res.clone(); caches.open(CACHE).then((x) => x.put(req, c)); return res; }).catch(() => hit)));
    return;
  }
  if (url.origin !== self.location.origin) return;
  e.respondWith(caches.match(req, { ignoreSearch: true }).then((hit) => {
    const net = fetch(req).then((res) => { if (res && res.ok) { const c = res.clone(); caches.open(CACHE).then((x) => x.put(req, c)); } return res; })
      .catch(() => hit || (req.mode === "navigate" ? caches.match("./index.html") : undefined));
    return hit || net;
  }));
});
