
/* ==========================================
   TAMU DIGITAL
   BILINGUAL LANGUAGE SYSTEM
   Indonesian & English
========================================== */

(() => {
    "use strict";

    const DEFAULT_LANGUAGE = "id";
    const SUPPORTED_LANGUAGES = ["id", "en"];
    const STORAGE_KEY = "tamuDigitalLanguage";

    // ======================================
    // TRANSLATION DICTIONARY
    // ======================================

    const translations = {
        id: {
            // Navbar
            "nav-home": "Beranda",
            "nav-report": "Pelaporan",
            "nav-guide": "Panduan",
            "nav-rt": "Informasi RT",
            "nav-about": "Tentang",
            "nav-label": "Navigasi utama",
            "nav-brand-label": "TAMU DIGITAL - Beranda",
            "language-label": "Pilih bahasa",

            // Hero
            "hero-label": "DESA SUMBERDIREN",
            "hero-title": "Selamat Datang di TAMU DIGITAL",
            "hero-description": "Sistem pelaporan kedatangan tamu yang praktis, terintegrasi, dan mudah digunakan untuk lingkungan RT di Desa Sumberdiren.",
            "hero-button": "Buat Laporan Sekarang",
            "hero-guide": "Pelajari Panduan",
            "hero-info-one": "Dalam satu sistem",
            "hero-info-two": "Batas pelaporan",
            "hero-info-three": "Pelaporan praktis",

            // RT selection
            "rt-label": "PILIH WILAYAH",
            "rt-title": "Pilih RT Tujuan Pelaporan",
            "rt-description": "Pilih wilayah RT yang sesuai dengan tempat tinggal warga yang akan dikunjungi.",
            "rt-location": "Desa Sumberdiren",
            "rt-selection-status": "Silakan pilih salah satu wilayah RT.",

            // Report form
            "report-label": "FORMULIR DIGITAL",
            "report-title": "Formulir Pelaporan Tamu",
            "report-description": "Lengkapi informasi kedatangan tamu dengan benar sebelum mengirimkan laporan.",

            "group-guest": "01. Identitas Tamu",
            "group-visit": "02. Informasi Kunjungan",
            "group-arrival": "03. Informasi Kedatangan",
            "group-guest-description": "INFORMASI IDENTITAS PENGUNJUNG",
            "group-visit-description": "INFORMASI TUJUAN KUNJUNGAN",
            "group-arrival-description": "INFORMASI WAKTU DAN KEDATANGAN",

            "guest-name": "Nama Lengkap",
            "guest-phone": "Nomor Telepon",
            "guest-origin": "Alamat Asal",
            "resident-name": "Nama Warga yang Dikunjungi",
            "visit-purpose": "Tujuan Kunjungan",
            "destination-address": "Alamat Tujuan",
            "guest-count": "Jumlah Tamu",
            "arrival-date": "Tanggal Kedatangan",
            "arrival-time": "Waktu Kedatangan",

            "placeholder-guest-name": "Masukkan nama lengkap",
            "placeholder-guest-phone": "Contoh: 08xxxxxxxxxx",
            "placeholder-guest-origin": "Masukkan alamat asal tamu",
            "placeholder-resident-name": "Nama warga tujuan",
            "placeholder-visit-purpose": "Pilih tujuan kunjungan",
            "placeholder-destination": "Masukkan alamat lengkap warga yang dikunjungi",
            "placeholder-guest-count": "Contoh: 2",

            "purpose-family": "Keluarga",
            "purpose-social": "Silaturahmi",
            "purpose-work": "Pekerjaan",
            "purpose-education": "Pendidikan",
            "purpose-personal": "Keperluan pribadi",
            "purpose-other": "Lainnya",

            "timezone-note": "Menggunakan zona waktu WIB (UTC+7).",
            "privacy-agreement": "Saya menyatakan bahwa informasi yang diberikan sudah benar dan menyetujui penggunaan data untuk keperluan administrasi pelaporan tamu.",
            "privacy-note": "Data laporan hanya digunakan untuk keperluan administrasi lingkungan RT dan tidak ditampilkan secara publik.",

            "reset-form": "Reset Formulir",
            "review-report": "Periksa Laporan",

            // Review
            "review-label": "KONFIRMASI DATA",
            "review-title": "Periksa Kembali Laporan",
            "review-description": "Pastikan seluruh informasi sudah sesuai sebelum laporan dikirimkan.",
            "edit-report": "Kembali dan Edit",
            "submit-report": "Kirim Laporan",

            // Receipt
            "receipt-label": "BUKTI PELAPORAN",
            "receipt-title": "Laporan Berhasil Diproses",
            "receipt-description": "Simpan nomor referensi berikut sebagai bukti identitas laporan.",
            "reference-label": "Nomor Referensi",
            "reference-waiting": "Menunggu nomor referensi...",
            "receipt-information": "Informasi status laporan akan ditampilkan di sini.",
            "new-report": "Buat Laporan Baru",

            // Guide
            "guide-label": "PANDUAN PENGGUNAAN",
            "guide-title": "Bagaimana Cara Melapor?",
            "guide-description": "Ikuti langkah sederhana berikut untuk menyelesaikan pelaporan kedatangan tamu.",
            "guide-step-one-title": "Pilih Wilayah RT",
            "guide-step-one-description": "Pilih RT secara manual atau pindai QR Code sesuai wilayah tujuan.",
            "guide-step-two-title": "Isi Formulir",
            "guide-step-two-description": "Masukkan identitas tamu dan informasi kunjungan secara lengkap.",
            "guide-step-three-title": "Periksa Data",
            "guide-step-three-description": "Pastikan informasi yang dimasukkan sudah benar sebelum dikirimkan.",
            "guide-step-four-title": "Kirim Laporan",
            "guide-step-four-description": "Kirim laporan dan simpan nomor referensi sebagai bukti pelaporan.",
            "deadline-title": "Batas Waktu Pelaporan",
            "deadline-description": "Pelaporan kedatangan tamu wajib dilakukan paling lambat 1 × 24 jam sejak kedatangan, sesuai ketentuan simulasi lingkungan Desa Sumberdiren.",

            // RT information
            "information-label": "INFORMASI WILAYAH",
            "information-title": "Informasi RT Desa Sumberdiren",
            "information-description": "Sistem pelaporan terpusat untuk empat wilayah RT.",
            "information-rt": "Wilayah RT",
            "information-note": "Informasi nama ketua RT, alamat, dan kontak resmi dapat ditambahkan setelah data tersedia.",

            // About
            "about-label": "TENTANG SISTEM",
            "about-title": "Mengenal TAMU DIGITAL",
            "about-paragraph-one": "TAMU DIGITAL merupakan konsep sistem pelaporan kedatangan tamu berbasis website yang dirancang untuk membantu proses administrasi lingkungan RT di Desa Sumberdiren.",
            "about-paragraph-two": "Dengan satu platform terpusat, pelaporan dapat dilakukan melalui pemilihan wilayah RT maupun pemindaian QR Code. Informasi laporan tersimpan secara digital dan diteruskan kepada ketua RT terkait.",
            "feature-one": "Satu website untuk empat RT",
            "feature-two": "Akses melalui QR Code",
            "feature-three": "Pelaporan digital",
            "feature-four": "Mendukung perangkat mobile",

            // Footer
            "footer-description": "Sistem pelaporan kedatangan tamu berbasis website untuk kebutuhan administrasi lingkungan.",
            "footer-rights": "© 2026 TAMU DIGITAL. Hak cipta dilindungi.",

            // PWA install banner
            "install-title": "Pasang TAMU DIGITAL",
            "install-message": "Akses pelaporan tamu lebih mudah langsung dari layar utama perangkatmu.",
            "install-button": "Install Aplikasi",
            "install-dismiss": "Tutup rekomendasi instalasi",

            // General messages
            "required-fields": "Mohon lengkapi seluruh kolom yang wajib diisi.",
            "select-rt-warning": "Silakan pilih RT tujuan terlebih dahulu.",
            "invalid-guest-count": "Jumlah tamu harus antara 1 sampai 100 orang.",
            "invalid-phone": "Periksa kembali nomor telepon Anda.",
            "sending": "Mengirim laporan...",
            "send-success": "Laporan berhasil dikirim.",
            "send-error": "Laporan gagal dikirim. Silakan coba kembali.",
            "select-rt-first": "Silakan pilih salah satu wilayah RT."
        },

        en: {
            // Navbar
            "nav-home": "Home",
            "nav-report": "Reporting",
            "nav-guide": "Guide",
            "nav-rt": "RT Information",
            "nav-about": "About",
            "nav-label": "Main navigation",
            "nav-brand-label": "TAMU DIGITAL - Home",
            "language-label": "Select language",

            // Hero
            "hero-label": "SUMBERDIREN VILLAGE",
            "hero-title": "Welcome to TAMU DIGITAL",
            "hero-description": "A practical, integrated, and easy-to-use guest arrival reporting system for the neighborhood areas of Sumberdiren Village.",
            "hero-button": "Create a Report",
            "hero-guide": "Read the Guide",
            "hero-info-one": "One integrated system",
            "hero-info-two": "Reporting deadline",
            "hero-info-three": "Practical reporting",

            // RT selection
            "rt-label": "SELECT AREA",
            "rt-title": "Select Destination RT",
            "rt-description": "Select the RT area based on the address of the resident you are visiting.",
            "rt-location": "Sumberdiren Village",
            "rt-selection-status": "Please select one of the RT areas.",

            // Report form
            "report-label": "DIGITAL FORM",
            "report-title": "Guest Reporting Form",
            "report-description": "Please complete the guest arrival information accurately before submitting the report.",

            "group-guest": "01. Guest Identity",
            "group-visit": "02. Visit Information",
            "group-arrival": "03. Arrival Information",
            "group-guest-description": "VISITOR IDENTITY INFORMATION",
            "group-visit-description": "VISIT PURPOSE INFORMATION",
            "group-arrival-description": "ARRIVAL DATE AND TIME INFORMATION",

            "guest-name": "Full Name",
            "guest-phone": "Phone Number",
            "guest-origin": "Origin Address",
            "resident-name": "Name of Resident Being Visited",
            "visit-purpose": "Purpose of Visit",
            "destination-address": "Destination Address",
            "guest-count": "Number of Guests",
            "arrival-date": "Arrival Date",
            "arrival-time": "Arrival Time",

            "placeholder-guest-name": "Enter full name",
            "placeholder-guest-phone": "Example: 08xxxxxxxxxx",
            "placeholder-guest-origin": "Enter the guest's origin address",
            "placeholder-resident-name": "Name of the resident",
            "placeholder-visit-purpose": "Select the purpose of visit",
            "placeholder-destination": "Enter the full address of the resident being visited",
            "placeholder-guest-count": "Example: 2",

            "purpose-family": "Family",
            "purpose-social": "Social Visit",
            "purpose-work": "Work",
            "purpose-education": "Education",
            "purpose-personal": "Personal Matters",
            "purpose-other": "Other",

            "timezone-note": "Uses Western Indonesia Time (WIB, UTC+7).",
            "privacy-agreement": "I confirm that the information provided is accurate and agree to its use for guest reporting administration.",
            "privacy-note": "Report data is used only for neighborhood administrative purposes and is not publicly displayed.",

            "reset-form": "Reset Form",
            "review-report": "Review Report",

            // Review
            "review-label": "DATA CONFIRMATION",
            "review-title": "Review Your Report",
            "review-description": "Please make sure all information is correct before submitting the report.",
            "edit-report": "Back and Edit",
            "submit-report": "Submit Report",

            // Receipt
            "receipt-label": "REPORT RECEIPT",
            "receipt-title": "Report Successfully Processed",
            "receipt-description": "Keep the following reference number as your report identification.",
            "reference-label": "Reference Number",
            "reference-waiting": "Waiting for reference number...",
            "receipt-information": "Report status information will appear here.",
            "new-report": "Create New Report",

            // Guide
            "guide-label": "USER GUIDE",
            "guide-title": "How to Submit a Report",
            "guide-description": "Follow these simple steps to complete a guest arrival report.",
            "guide-step-one-title": "Select RT Area",
            "guide-step-one-description": "Select an RT manually or scan the QR Code for the destination area.",
            "guide-step-two-title": "Complete the Form",
            "guide-step-two-description": "Enter the guest's identity and visit information completely.",
            "guide-step-three-title": "Review Information",
            "guide-step-three-description": "Make sure all entered information is correct before submission.",
            "guide-step-four-title": "Submit the Report",
            "guide-step-four-description": "Submit the report and keep the reference number as proof of submission.",
            "deadline-title": "Reporting Deadline",
            "deadline-description": "Guest arrivals must be reported no later than 1 × 24 hours after arrival, according to the Sumberdiren Village simulation rules.",

            // RT information
            "information-label": "AREA INFORMATION",
            "information-title": "Sumberdiren Village RT Information",
            "information-description": "A centralized reporting system for four RT areas.",
            "information-rt": "RT Area",
            "information-note": "The RT chairperson's name, address, and official contact details can be added once the information is available.",

            // About
            "about-label": "ABOUT THE SYSTEM",
            "about-title": "About TAMU DIGITAL",
            "about-paragraph-one": "TAMU DIGITAL is a website-based guest arrival reporting system concept designed to support neighborhood administrative processes in Sumberdiren Village.",
            "about-paragraph-two": "Through one centralized platform, reports can be submitted by selecting an RT area or scanning a QR Code. Report information is stored digitally and forwarded to the relevant RT chairperson.",
            "feature-one": "One website for four RTs",
            "feature-two": "QR Code access",
            "feature-three": "Digital reporting",
            "feature-four": "Mobile-friendly access",

            // Footer
            "footer-description": "A website-based guest arrival reporting system for neighborhood administrative needs.",
            "footer-rights": "© 2026 TAMU DIGITAL. All rights reserved.",

            // PWA install banner
            "install-title": "Install TAMU DIGITAL",
            "install-message": "Access guest reporting more easily directly from your device's home screen.",
            "install-button": "Install App",
            "install-dismiss": "Close installation recommendation",

            // General messages
            "required-fields": "Please complete all required fields.",
            "select-rt-warning": "Please select a destination RT first.",
            "invalid-guest-count": "The number of guests must be between 1 and 100.",
            "invalid-phone": "Please check your phone number.",
            "sending": "Submitting report...",
            "send-success": "Report submitted successfully.",
            "send-error": "The report could not be submitted. Please try again.",
            "select-rt-first": "Please select one of the RT areas."
        }
    };

    // ======================================
    // GET SAVED LANGUAGE
    // ======================================

    function getSavedLanguage() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);

            if (SUPPORTED_LANGUAGES.includes(saved)) {
                return saved;
            }
        } catch (error) {
            console.warn("TAMU DIGITAL: Unable to read saved language.", error);
        }

        return DEFAULT_LANGUAGE;
    }

    // ======================================
    // APPLY LANGUAGE
    // ======================================

    function applyLanguage(language) {
        if (!SUPPORTED_LANGUAGES.includes(language)) {
            language = DEFAULT_LANGUAGE;
        }

        const dictionary = translations[language];

        document.documentElement.lang = language;

        // Translate text content
        document.querySelectorAll("[data-i18n]").forEach(element => {
            const key = element.dataset.i18n;

            if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
                element.textContent = dictionary[key];
            } else {
                console.warn("TAMU DIGITAL: Missing translation key:", key);
            }
        });

        // Translate placeholders
        document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
            const key = element.dataset.i18nPlaceholder;

            if (dictionary[key] !== undefined) {
                element.placeholder = dictionary[key];
            }
        });

        // Translate title attributes
        document.querySelectorAll("[data-i18n-title]").forEach(element => {
            const key = element.dataset.i18nTitle;

            if (dictionary[key] !== undefined) {
                element.title = dictionary[key];
            }
        });

        // Translate accessible labels
        document.querySelectorAll("[data-i18n-aria-label]").forEach(element => {
            const key = element.dataset.i18nAriaLabel;

            if (dictionary[key] !== undefined) {
                element.setAttribute("aria-label", dictionary[key]);
            }
        });

        // Save selected language
        try {
            localStorage.setItem(STORAGE_KEY, language);
        } catch (error) {
            console.warn("TAMU DIGITAL: Unable to save language.", error);
        }

        // Update language dropdown
        const languageSelect = document.querySelector("#language-select");

        if (languageSelect) {
            languageSelect.value = language;
        }

        // Notify other JavaScript modules
        window.dispatchEvent(new CustomEvent("tamuLanguageChanged", {
            detail: { language }
        }));

        console.log("TAMU DIGITAL: Active language:", language);
    }

    // ======================================
    // INITIALIZE LANGUAGE
    // ======================================

    function initializeLanguage() {
        const languageSelect = document.querySelector("#language-select");

        // Restore previously selected language
        applyLanguage(getSavedLanguage());

        if (languageSelect) {
            languageSelect.addEventListener("change", () => {
                applyLanguage(languageSelect.value);
            });
        }

        console.log("TAMU DIGITAL: Bilingual system initialized.");
    }

    // ======================================
    // PUBLIC FUNCTIONS
    // ======================================

    window.TamuDigital = window.TamuDigital || {};

    window.TamuDigital.applyLanguage = applyLanguage;

    window.TamuDigital.getLanguage = function () {
        return document.documentElement.lang || DEFAULT_LANGUAGE;
    };

    window.TamuDigital.getTranslation = function (key) {
        const language = window.TamuDigital.getLanguage();
        return translations[language][key] || key;
    };

    window.TamuDigital.translations = translations;

    document.addEventListener("DOMContentLoaded", initializeLanguage);

})();
