
// ==========================================
// TAMU DIGITAL - SERVICE WORKER
// Progressive Web App
// ==========================================

// Nama cache dan versi aplikasi
const CACHE_PREFIX = "tamu-digital-";
const CACHE_NAME = `${CACHE_PREFIX}v1.0.4`;

// File utama yang disimpan ketika instalasi
const APP_SHELL = [
    "./",
    "./index.html",
    "./manifest.json",
    "./assets/icons/icon-192.png",
    "./assets/icons/icon-512.png",
    "./css/style.css",
    "./js/script.js",
    "./js/form.js",
    "./js/language.js",
    "./js/api.js",
    "./js/receipt.js",
    "./js/pwa.js",
    "./assets/images/ndalem-soekarni.webp",
    "./assets/images/taman-soekarni.jpg",
];

// ==========================================
// 1. INSTALL EVENT
// ==========================================

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log("TAMU DIGITAL: Menyimpan aset aplikasi.");

                return cache.addAll(APP_SHELL);
            })
            .then(() => self.skipWaiting())
            .catch((error) => {
                console.error(
                    "TAMU DIGITAL: Instalasi cache gagal.",
                    error
                );

                throw error;
            })
    );
});

// ==========================================
// 2. ACTIVATE EVENT
// ==========================================

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        // Hapus cache versi lama milik aplikasi ini
                        if (
                            cacheName.startsWith(CACHE_PREFIX) &&
                            cacheName !== CACHE_NAME
                        ) {
                            console.log(
                                "TAMU DIGITAL: Menghapus cache lama:",
                                cacheName
                            );

                            return caches.delete(cacheName);
                        }

                        return Promise.resolve(false);
                    })
                );
            })
            .then(() => self.clients.claim())
    );
});

// ==========================================
// 3. FETCH EVENT
// ==========================================

self.addEventListener("fetch", (event) => {
    const request = event.request;

    // Hanya tangani permintaan GET
    if (request.method !== "GET") {
        return;
    }

    const requestURL = new URL(request.url);

    // Jangan menyimpan atau menangani permintaan
    // menuju Google Apps Script atau domain eksternal
    if (requestURL.origin !== self.location.origin) {
        return;
    }

    // --------------------------------------
    // A. NETWORK FIRST UNTUK HALAMAN
    // --------------------------------------

    if (request.mode === "navigate") {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    if (response && response.ok) {
                        const responseCopy = response.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(request, responseCopy);
                            });
                    }

                    return response;
                })
                .catch(async () => {
                    const cachedPage = await caches.match(request);

                    if (cachedPage) {
                        return cachedPage;
                    }

                    const cachedIndex = await caches.match(
                        "./index.html"
                    );

                    if (cachedIndex) {
                        return cachedIndex;
                    }

                    return new Response(
                        "TAMU DIGITAL sedang offline. Hubungkan perangkat ke internet untuk membuka aplikasi.",
                        {
                            status: 503,
                            headers: {
                                "Content-Type": "text/plain; charset=utf-8"
                            }
                        }
                    );
                })
        );

        return;
    }

    // --------------------------------------
    // B. CACHE FIRST UNTUK ASET STATIS
    // --------------------------------------

    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(request)
                    .then((response) => {
                        if (
                            response &&
                            response.ok &&
                            response.type === "basic"
                        ) {
                            const responseCopy = response.clone();

                            caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(request, responseCopy);
                                });
                        }

                        return response;
                    });
            })
    );
});

console.log("TAMU DIGITAL Service Worker siap.");
