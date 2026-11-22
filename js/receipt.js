
/* ==========================================
   TAMU DIGITAL
   SUBMISSION RECEIPT
========================================== */

document.addEventListener("DOMContentLoaded", () => {
    initializeReceipt();
});


// ==========================================
// INITIALIZE RECEIPT
// ==========================================

function initializeReceipt() {

    const receiptSection = document.getElementById(
        "submission-receipt"
    );

    const reviewSection = document.getElementById(
        "report-review"
    );

    const reportForm = document.getElementById(
        "guest-report-form"
    );

    const referenceNumber = document.getElementById(
        "reference-number"
    );

    const receiptInformation = document.getElementById(
        "receipt-information"
    );

    const newReportButton = document.getElementById(
        "new-report"
    );

    if (!receiptSection || !referenceNumber) {
        console.error(
            "TAMU DIGITAL: Receipt elements tidak ditemukan."
        );
        return;
    }


    // ======================================
    // SHOW RECEIPT
    // ======================================

    function showReceipt(result, reportData = {}) {

        if (!result || result.success !== true) {
            console.error(
                "TAMU DIGITAL: Respons laporan tidak valid."
            );
            return;
        }

        const reference =
            result.referenceNumber ||
            result.reference_number ||
            result.reference ||
            result.data?.referenceNumber ||
            result.data?.reference_number;

        if (!reference) {
            console.error(
                "TAMU DIGITAL: Nomor referensi tidak ditemukan."
            );
            return;
        }

        // Tampilkan nomor referensi
        referenceNumber.textContent = reference;

        // Buat informasi tanda terima
        renderReceiptInformation(
            reportData,
            result
        );

        // Atur tampilan halaman
        if (reportForm) {
            reportForm.hidden = true;
        }

        if (reviewSection) {
            reviewSection.hidden = true;
        }

        receiptSection.hidden = false;

        receiptSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        console.log(
            "TAMU DIGITAL: Receipt displayed."
        );
    }


    // ======================================
    // RENDER RECEIPT INFORMATION
    // ======================================

    function renderReceiptInformation(data, result) {

        if (!receiptInformation) return;

        receiptInformation.replaceChildren();

        const submittedAt =
            result.submittedAt ||
            result.submitted_at ||
            result.data?.submittedAt ||
            result.data?.submitted_at;

        const dateText = submittedAt
            ? formatDate(submittedAt)
            : formatDate(new Date());

        const information = [
            ["Status Laporan", "Berhasil dikirim"],
            ["RT Tujuan", data.rt || "-"],
            ["Nama Tamu", data.guestName || "-"],
            ["Jumlah Tamu", data.guestCount
                ? `${data.guestCount} orang`
                : "-"],
            ["Tanggal Pengiriman", dateText]
        ];

        information.forEach(([label, value]) => {

            const item = document.createElement("div");
            item.className = "receipt-item";

            const title = document.createElement("strong");
            title.textContent = label;

            const content = document.createElement("p");
            content.textContent = value;

            item.append(title, content);

            receiptInformation.appendChild(item);

        });
    }


    // ======================================
    // FORMAT DATE
    // ======================================

    function formatDate(value) {

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return String(value);
        }

        return new Intl.DateTimeFormat("id-ID", {
            dateStyle: "long",
            timeStyle: "short",
            timeZone: "Asia/Jakarta"
        }).format(date) + " WIB";
    }


    // ======================================
    // NEW REPORT
    // ======================================

    function createNewReport() {

        if (reportForm) {

            reportForm.reset();

            reportForm.hidden = false;

        }

        if (reviewSection) {
            reviewSection.hidden = true;
        }

        receiptSection.hidden = true;

        // Bersihkan nomor referensi
        referenceNumber.textContent = "-";

        if (receiptInformation) {
            receiptInformation.replaceChildren();
        }

        const formStatus = document.getElementById(
            "form-status"
        );

        if (formStatus) {
            formStatus.textContent = "";
        }

        document.getElementById("report")?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        console.log(
            "TAMU DIGITAL: New report form ready."
        );
    }


    // ======================================
    // BUTTON EVENT
    // ======================================

    if (newReportButton) {
        newReportButton.addEventListener(
            "click",
            createNewReport
        );
    }


    // ======================================
    // PUBLIC FUNCTIONS
    // ======================================

    window.TamuDigital = window.TamuDigital || {};

    window.TamuDigital.showReceipt = showReceipt;

    window.TamuDigital.createNewReport = createNewReport;

    console.log(
        "TAMU DIGITAL: Receipt module initialized."
    );

}
