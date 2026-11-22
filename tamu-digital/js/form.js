
/* ==========================================
   TAMU DIGITAL
   FORM + API + RECEIPT INTEGRATION
========================================== */

document.addEventListener("DOMContentLoaded", () => {
    initializeGuestReportForm();
});


// ==========================================
// INITIALIZATION
// ==========================================

function initializeGuestReportForm() {

    const form = document.getElementById("guest-report-form");

    const selectedRTInput = document.getElementById("selected-rt");

    const formStatus = document.getElementById("form-status");
    const reviewStatus = document.getElementById("review-status");

    const reviewSection = document.getElementById("report-review");
    const reviewContent = document.getElementById("review-content");

    const reviewButton = document.getElementById("review-report");
    const editButton = document.getElementById("edit-report");
    const submitButton = document.getElementById("submit-report");

    if (!form || !selectedRTInput) {
        console.error("TAMU DIGITAL: Form tidak ditemukan.");
        return;
    }

    // Mencegah form melakukan reload halaman
    form.addEventListener("submit", (event) => {
        event.preventDefault();
    });


    // ======================================
    // FORM INPUT
    // ======================================

    form.addEventListener("input", (event) => {

        if (event.target.matches("input, select, textarea")) {
            event.target.setCustomValidity("");
        }

        setStatus(formStatus, "");

    });

    form.addEventListener("change", () => {
        setStatus(formStatus, "");
    });


    // ======================================
    // RESET FORM
    // ======================================

    form.addEventListener("reset", () => {

        window.setTimeout(() => {

            const selectedCard = document.querySelector(
                '.rt-card[aria-pressed="true"]'
            );

            selectedRTInput.value = selectedCard
                ? selectedCard.dataset.rt
                : "";

            form.hidden = false;

            if (reviewSection) {
                reviewSection.hidden = true;
            }

            setStatus(formStatus, "");
            setStatus(reviewStatus, "");

        }, 0);

    });


    // ======================================
    // REVIEW BUTTON
    // ======================================

    if (reviewButton) {
        reviewButton.addEventListener("click", handleReviewReport);
    }


    // ======================================
    // EDIT BUTTON
    // ======================================

    if (editButton) {

        editButton.addEventListener("click", () => {

            form.hidden = false;
            reviewSection.hidden = true;

            setStatus(
                formStatus,
                "Silakan periksa kembali data laporan Anda."
            );

            form.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    }


    // ======================================
    // SUBMIT BUTTON
    // ======================================

    if (submitButton) {

        submitButton.addEventListener("click", async () => {

            if (window.TamuDigital.isSubmitting()) {
                return;
            }

            setStatus(reviewStatus, "");

            submitButton.disabled = true;
            submitButton.textContent = "Mengirim...";

            try {

                const reportData = getReportData();

                // Kirim laporan ke backend
                const result = await window.TamuDigital.sendGuestReport(
                    reportData
                );

                // Tampilkan tanda terima
                window.TamuDigital.showReceipt(
                    result,
                    reportData
                );

            } catch (error) {

                console.error(
                    "TAMU DIGITAL: Pengiriman gagal.",
                    error
                );

                setStatus(
                    reviewStatus,
                    error.message ||
                    "Terjadi kesalahan saat mengirim laporan."
                );

            } finally {

                submitButton.disabled = false;
                submitButton.textContent = "Kirim Laporan";

            }

        });

    }


    // ======================================
    // REVIEW REPORT
    // ======================================

    function handleReviewReport() {

        setStatus(formStatus, "");
        setStatus(reviewStatus, "");

        // Periksa pilihan RT
        if (!selectedRTInput.value) {

            setStatus(
                formStatus,
                "Silakan pilih RT tujuan terlebih dahulu."
            );

            document.getElementById("rt-selection")?.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            return;
        }

        // Periksa jumlah tamu
        const guestCountInput = document.getElementById("guest-count");

        if (guestCountInput) {

            const count = Number(guestCountInput.value);

            if (
                !Number.isInteger(count) ||
                count < 1 ||
                count > 100
            ) {

                guestCountInput.setCustomValidity(
                    "Jumlah tamu harus antara 1 sampai 100 orang."
                );

                guestCountInput.reportValidity();
                return;

            }

        }

        // Periksa nomor telepon jika diisi
        const phoneInput = document.getElementById("guest-phone");

        if (phoneInput && phoneInput.value.trim() !== "") {

            const digits = phoneInput.value.replace(/\D/g, "");

            if (digits.length < 8 || digits.length > 15) {

                phoneInput.setCustomValidity(
                    "Nomor telepon harus memiliki 8 sampai 15 angka."
                );

                phoneInput.reportValidity();
                return;

            }

        }

        // Periksa seluruh kolom wajib
        if (!form.checkValidity()) {

            form.reportValidity();

            setStatus(
                formStatus,
                "Mohon lengkapi data yang masih diperlukan."
            );

            return;

        }

        // Ambil data
        const data = getReportData();

        // Tampilkan ringkasan
        renderReportReview(data);

        form.hidden = true;
        reviewSection.hidden = false;

        reviewSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    // ======================================
    // GET REPORT DATA
    // ======================================

    function getReportData() {

        return {

            rt: selectedRTInput.value,

            guestName: getValue("guest-name"),
            guestPhone: getValue("guest-phone"),
            guestOrigin: getValue("guest-origin"),

            residentName: getValue("resident-name"),
            visitPurpose: getSelectedText("visit-purpose"),

            destinationAddress: getValue("destination-address"),
            guestCount: getValue("guest-count"),

            arrivalDate: formatArrivalDate(
                getValue("arrival-date")
            ),

            arrivalTime: getValue("arrival-time"),

            privacyAgreement: document.getElementById(
                "privacy-agreement"
            )?.checked || false

        };

    }


    // ======================================
    // RENDER REVIEW
    // ======================================

    function renderReportReview(data) {

        if (!reviewContent) return;

        reviewContent.replaceChildren();

        const items = [

            ["RT Tujuan", data.rt],

            ["Nama Tamu", data.guestName],

            ["Nomor Telepon", data.guestPhone || "Tidak diisi"],

            ["Alamat Asal", data.guestOrigin],

            ["Nama Warga", data.residentName],

            ["Tujuan Kunjungan", data.visitPurpose],

            ["Alamat Tujuan", data.destinationAddress],

            ["Jumlah Tamu", `${data.guestCount} orang`],

            ["Tanggal Kedatangan", data.arrivalDate],

            ["Waktu Kedatangan", `${data.arrivalTime} WIB`],

            ["Persetujuan Privasi", data.privacyAgreement
                ? "Disetujui"
                : "Belum disetujui"]

        ];

        items.forEach(([label, value]) => {

            const item = document.createElement("div");
            item.className = "review-item";

            const title = document.createElement("strong");
            title.textContent = label;

            const content = document.createElement("p");
            content.textContent = value;

            item.append(title, content);

            reviewContent.appendChild(item);

        });

    }


    // ======================================
    // HELPER FUNCTIONS
    // ======================================

    function getValue(id) {

        const element = document.getElementById(id);

        return element ? element.value.trim() : "";

    }


    function getSelectedText(id) {

        const element = document.getElementById(id);

        if (!element || element.selectedIndex < 0) {
            return "";
        }

        return element.options[
            element.selectedIndex
        ].textContent.trim();

    }


    function formatArrivalDate(value) {

        if (!value) return "";

        const parts = value.split("-");

        if (parts.length !== 3) return value;

        const [year, month, day] = parts;

        const months = [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember"
        ];

        return `${Number(day)} ${months[Number(month) - 1]} ${year}`;

    }


    function setStatus(element, message) {

        if (!element) return;

        element.textContent = message;

    }


    console.log(
        "TAMU DIGITAL: Form integration initialized."
    );

}
