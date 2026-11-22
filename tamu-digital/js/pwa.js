
/* ==========================================
   TAMU DIGITAL - PWA INSTALLATION
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const installBanner = document.getElementById("install-banner");
    const installButton = document.getElementById("install-button");
    const installDismiss = document.getElementById("install-dismiss");
    const installMessage = document.getElementById("install-message");

    if (!installBanner || !installButton || !installDismiss) {
        return;
    }

    const DISMISS_KEY = "tamuDigitalInstallDismissed";

    let deferredInstallPrompt = null;

    // ======================================
    // DETEKSI STATUS APLIKASI
    // ======================================

    function isAppInstalled() {
        return (
            window.matchMedia("(display-mode: standalone)").matches ||
            window.navigator.standalone === true
        );
    }

    function isIOS() {
        return /iphone|ipad|ipod/i.test(navigator.userAgent);
    }

    function isSafari() {
        return (
            /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
        );
    }

    function wasDismissed() {
        try {
            return localStorage.getItem(DISMISS_KEY) === "true";
        } catch (error) {
            return false;
        }
    }

    function showInstallBanner() {
        if (isAppInstalled() || wasDismissed()) {
            return;
        }

        installBanner.hidden = false;
    }

    function hideInstallBanner() {
        installBanner.hidden = true;
    }

    // ======================================
    // REGISTRASI SERVICE WORKER
    // ======================================

    if ("serviceWorker" in navigator) {
        window.addEventListener("load", async () => {
            try {
                const registration =
                    await navigator.serviceWorker.register(
                        "./service-worker.js",
                        { scope: "./" }
                    );

                console.log(
                    "TAMU DIGITAL: Service Worker terdaftar.",
                    registration.scope
                );

            } catch (error) {
                console.error(
                    "TAMU DIGITAL: Gagal mendaftarkan Service Worker.",
                    error
                );
            }
        });
    }

    // ======================================
    // DETEKSI INSTALL PROMPT
    // ======================================

    window.addEventListener("beforeinstallprompt", (event) => {

        // Mencegah prompt otomatis dari browser
        event.preventDefault();

        // Simpan prompt agar dipanggil melalui tombol
        deferredInstallPrompt = event;

        installButton.textContent = "Install Aplikasi";
        installMessage.textContent =
            "Pasang TAMU DIGITAL agar lebih mudah diakses dari layar utama perangkatmu.";

        showInstallBanner();

    });

    // ======================================
    // TOMBOL INSTALL
    // ======================================

    installButton.addEventListener("click", async () => {

        // Android dan browser desktop yang mendukung prompt
        if (deferredInstallPrompt) {

            deferredInstallPrompt.prompt();

            const result = await deferredInstallPrompt.userChoice;

            console.log(
                "TAMU DIGITAL: Hasil instalasi:",
                result.outcome
            );

            deferredInstallPrompt = null;

            if (result.outcome === "accepted") {
                hideInstallBanner();
            }

            return;
        }

        // Petunjuk instalasi manual untuk iPhone
        if (isIOS() && isSafari()) {

            installMessage.textContent =
                'Untuk memasang aplikasi, tekan tombol Share di Safari, lalu pilih "Add to Home Screen" atau "Tambahkan ke Layar Utama".';

            installButton.textContent = "Mengerti";

            installButton.addEventListener(
                "click",
                hideInstallBanner,
                { once: true }
            );

            return;
        }

        installMessage.textContent =
            "Gunakan menu browser dan cari pilihan Install App atau Tambahkan ke Layar Utama jika tersedia.";

    });

    // ======================================
    // TOMBOL TUTUP
    // ======================================

    installDismiss.addEventListener("click", () => {

        hideInstallBanner();

        try {
            localStorage.setItem(DISMISS_KEY, "true");
        } catch (error) {
            console.warn(
                "TAMU DIGITAL: Preferensi tidak dapat disimpan."
            );
        }

    });

    // ======================================
    // APLIKASI BERHASIL DIINSTAL
    // ======================================

    window.addEventListener("appinstalled", () => {

        hideInstallBanner();

        deferredInstallPrompt = null;

        console.log(
            "TAMU DIGITAL berhasil dipasang."
        );

    });

    // ======================================
    // DETEKSI APLIKASI YANG SUDAH TERPASANG
    // ======================================

    if (isAppInstalled()) {
        hideInstallBanner();
        return;
    }

    // iPhone Safari tidak menyediakan beforeinstallprompt
    if (isIOS() && isSafari()) {

        installButton.textContent = "Cara Install";

        installMessage.textContent =
            "Pasang TAMU DIGITAL ke layar utama agar lebih mudah diakses.";

        showInstallBanner();

    }

});
