
/* =========================================
   TAMU DIGITAL
   Main JavaScript
   Navigation & RT Selection
========================================= */


/* =========================================
   01. INITIALIZATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // Jalankan seluruh fitur utama website
    initializeNavigation();
    initializeRTSelection();
    initializeQRSelection();

});


/* =========================================
   02. NAVIGATION
========================================= */

function initializeNavigation() {

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    // Pastikan elemen navigasi tersedia
    if (!menuToggle || !navMenu) {
        console.warn("Elemen navigasi tidak ditemukan.");
        return;
    }


    // Membuka dan menutup menu hamburger
    menuToggle.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
        );

    });


    // Menutup menu setelah tautan navigasi diklik
    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            closeNavigation();

        });

    });


    // Menutup menu ketika pengguna menekan tombol Escape
    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeNavigation();

        }

    });


    // Menutup menu ketika pengguna mengeklik area di luar navigasi
    document.addEventListener("click", event => {

        const clickedInsideMenu = navMenu.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {

            closeNavigation();

        }

    });


    // Menutup menu jika layar berubah menjadi desktop
    window.addEventListener("resize", () => {

        if (window.innerWidth > 760) {

            closeNavigation();

        }

    });


    // Fungsi untuk menutup menu
    function closeNavigation() {

        navMenu.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Buka menu navigasi"
        );

    }

}


/* =========================================
   03. RT SELECTION
========================================= */

function initializeRTSelection() {

    const rtCards = document.querySelectorAll(".rt-card");

    const selectedRTInput = document.getElementById("selected-rt");

    const rtStatus = document.getElementById("rt-selection-status");


    // Pastikan elemen pemilihan RT tersedia
    if (
        rtCards.length === 0 ||
        !selectedRTInput ||
        !rtStatus
    ) {

        console.warn("Elemen pemilihan RT tidak ditemukan.");
        return;

    }


    // Daftar RT yang tersedia
    const availableRT = [
        "RT001",
        "RT002",
        "RT003",
        "RT004"
    ];


    // Fungsi memilih RT
    function selectRT(rtID, source = "manual") {

        // Pastikan RT termasuk dalam daftar yang tersedia
        if (!availableRT.includes(rtID)) {

            rtStatus.textContent = "Wilayah RT tidak valid.";

            return false;

        }


        // Simpan RT yang dipilih ke input tersembunyi
        selectedRTInput.value = rtID;


        // Perbarui tampilan seluruh kartu RT
        rtCards.forEach(card => {

            const cardRT = card.dataset.rt;

            const isSelected = cardRT === rtID;

            card.setAttribute(
                "aria-pressed",
                String(isSelected)
            );

            card.classList.toggle(
                "selected",
                isSelected
            );

        });


        // Tampilkan status pemilihan
        const rtNumber = rtID.replace("RT", "");

        if (source === "qr") {

            rtStatus.textContent =
                `RT ${rtNumber} dipilih melalui QR Code. Silakan periksa kembali wilayah sebelum melanjutkan.`;

        } else {

            rtStatus.textContent =
                `Wilayah RT ${rtNumber} berhasil dipilih.`;

        }


        return true;

    }


    // Event ketika kartu RT diklik
    rtCards.forEach(card => {

        card.addEventListener("click", () => {

            const selectedRT = card.dataset.rt;

            selectRT(selectedRT, "manual");

        });

    });


    // Simpan fungsi agar dapat digunakan oleh fitur QR Code
    window.TamuDigital = window.TamuDigital || {};

    window.TamuDigital.selectRT = selectRT;

}


/* =========================================
   04. QR CODE RT SELECTION
========================================= */

function initializeQRSelection() {

    // Membaca parameter URL
    const urlParams = new URLSearchParams(window.location.search);

    // Mengambil nilai parameter bernama "rt"
    const qrRT = urlParams.get("rt");


    // Jika tidak ada parameter QR, pengguna memilih secara manual
    if (!qrRT) {

        return;

    }


    // Normalisasi format RT
    // Mendukung RT001, RT002, RT003, RT004
    // serta format 001, 002, 003, 004 dan 1, 2, 3, 4

    const normalizedRT = qrRT
        .trim()
        .toUpperCase()
        .replace(/\s+/g, "");


    const rtMapping = {

        "1": "RT001",
        "001": "RT001",
        "RT001": "RT001",

        "2": "RT002",
        "002": "RT002",
        "RT002": "RT002",

        "3": "RT003",
        "003": "RT003",
        "RT003": "RT003",

        "4": "RT004",
        "004": "RT004",
        "RT004": "RT004"

    };


    // Cari RT berdasarkan parameter URL
    const selectedRT = rtMapping[normalizedRT];


    // Pastikan fungsi pemilihan RT sudah tersedia
    if (
        !selectedRT ||
        !window.TamuDigital ||
        typeof window.TamuDigital.selectRT !== "function"
    ) {

        const rtStatus = document.getElementById(
            "rt-selection-status"
        );

        if (rtStatus) {

            rtStatus.textContent =
                "QR Code tidak memiliki kode wilayah RT yang valid. Silakan pilih RT secara manual.";

        }

        console.warn("Parameter QR Code tidak valid.");

        return;

    }


    // Pilih RT secara otomatis melalui QR Code
    window.TamuDigital.selectRT(selectedRT, "qr");


    console.log(
        `TAMU DIGITAL: Wilayah ${selectedRT} dipilih melalui QR Code.`
    );

}


/* =========================================
   05. APPLICATION INFORMATION
========================================= */

console.log(
    "%cTAMU DIGITAL",
    "color: #174b36; font-size: 20px; font-weight: bold;"
);

console.log(
    "Multi-RT Guest Reporting System"
);

console.log(
    "Main JavaScript berhasil dimuat."
);
