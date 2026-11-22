
/* ==========================================
   TAMU DIGITAL
   API CONFIGURATION
   Google Apps Script Integration
========================================== */


// ==========================================
// API CONFIGURATION
// ==========================================

const API_CONFIG = {

    // URL backend akan dimasukkan saat tahap finishing.
        ENDPOINT: "https://script.google.com/macros/s/AKfycbx1NFf0LlabnlBAqNBLOe0eB7IvbtURKngh6yVC21Zt3UQggwYW4CP1gWaBjnBNN7YM/exec",

    // Batas waktu menunggu respons server.
    TIMEOUT: 30000,

    // Mode pengiriman data.
    METHOD: "POST"

};


// ==========================================
// API STATE
// ==========================================

let isSubmittingReport = false;


// ==========================================
// API ERROR
// ==========================================

class TamuDigitalAPIError extends Error {

    constructor(message, code = "API_ERROR") {
        super(message);

        this.name = "TamuDigitalAPIError";
        this.code = code;
    }

}


// ==========================================
// VALIDATE REPORT DATA
// ==========================================

function validateReportData(data) {

    if (!data || typeof data !== "object") {
        throw new TamuDigitalAPIError(
            "Data laporan tidak ditemukan.",
            "INVALID_DATA"
        );
    }

    const requiredFields = [
        "rt",
        "guestName",
        "guestOrigin",
        "residentName",
        "visitPurpose",
        "destinationAddress",
        "guestCount",
        "arrivalDate",
        "arrivalTime"
    ];

    for (const field of requiredFields) {

        if (
            data[field] === undefined ||
            data[field] === null ||
            String(data[field]).trim() === ""
        ) {
            throw new TamuDigitalAPIError(
                `Kolom ${field} wajib diisi.`,
                "MISSING_FIELD"
            );
        }

    }

    // Periksa RT
    const validRT = [
        "RT001",
        "RT002",
        "RT003",
        "RT004"
    ];

    if (!validRT.includes(data.rt)) {
        throw new TamuDigitalAPIError(
            "Pilihan RT tidak valid.",
            "INVALID_RT"
        );
    }

    // Periksa jumlah tamu
    const guestCount = Number(data.guestCount);

    if (
        !Number.isInteger(guestCount) ||
        guestCount < 1 ||
        guestCount > 100
    ) {
        throw new TamuDigitalAPIError(
            "Jumlah tamu harus antara 1 sampai 100 orang.",
            "INVALID_GUEST_COUNT"
        );
    }

    // Periksa persetujuan privasi
    if (data.privacyAgreement !== true) {
        throw new TamuDigitalAPIError(
            "Persetujuan privasi wajib diberikan.",
            "PRIVACY_REQUIRED"
        );
    }

    return true;

}


// ==========================================
// PREPARE REPORT PAYLOAD
// ==========================================

function prepareReportPayload(data) {

    validateReportData(data);

    return {

        application: "TAMU DIGITAL",

        version: "1.0",

        report: {

            rt: String(data.rt).trim(),

            guest_name: String(data.guestName).trim(),

            guest_phone: String(
                data.guestPhone || ""
            ).trim(),

            guest_origin: String(
                data.guestOrigin
            ).trim(),

            resident_name: String(
                data.residentName
            ).trim(),

            visit_purpose: String(
                data.visitPurpose
            ).trim(),

            destination_address: String(
                data.destinationAddress
            ).trim(),

            guest_count: Number(
                data.guestCount
            ),

            arrival_date: String(
                data.arrivalDate
            ).trim(),

            arrival_time: String(
                data.arrivalTime
            ).trim(),

            timezone: "Asia/Jakarta",

            privacy_agreement: true

        }

    };

}


// ==========================================
// SEND REPORT TO BACKEND
// ==========================================

async function sendGuestReport(data) {

    if (isSubmittingReport) {
        throw new TamuDigitalAPIError(
            "Laporan sedang diproses. Mohon tunggu.",
            "DUPLICATE_SUBMISSION"
        );
    }

    if (!API_CONFIG.ENDPOINT) {
        throw new TamuDigitalAPIError(
            "URL backend belum dikonfigurasi. Silakan lakukan pengaturan pada tahap finishing.",
            "ENDPOINT_NOT_CONFIGURED"
        );
    }

    const payload = prepareReportPayload(data);

    const controller = new AbortController();

    const timeoutId = window.setTimeout(() => {
        controller.abort();
    }, API_CONFIG.TIMEOUT);

    isSubmittingReport = true;

    try {

        const response = await fetch(
            API_CONFIG.ENDPOINT,
            {

                method: API_CONFIG.METHOD,

                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },

                body: JSON.stringify(payload),

                signal: controller.signal,

                redirect: "follow"

            }
        );

        if (!response.ok) {
            throw new TamuDigitalAPIError(
                `Server memberikan respons HTTP ${response.status}.`,
                "HTTP_ERROR"
            );
        }

        const result = await response.json();

        if (!result || result.success !== true) {
            throw new TamuDigitalAPIError(
                result?.message ||
                "Server tidak dapat memproses laporan.",
                result?.code || "SERVER_ERROR"
            );
        }

        return result;

    } catch (error) {

        if (error.name === "AbortError") {

            throw new TamuDigitalAPIError(
                "Waktu tunggu habis. Periksa koneksi internet Anda.",
                "TIMEOUT"
            );

        }

        if (error instanceof TamuDigitalAPIError) {
            throw error;
        }

        console.error(
            "TAMU DIGITAL API Error:",
            error
        );

        throw new TamuDigitalAPIError(
            "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
            "NETWORK_ERROR"
        );

    } finally {

        window.clearTimeout(timeoutId);

        isSubmittingReport = false;

    }

}


// ==========================================
// PUBLIC API FUNCTIONS
// ==========================================

window.TamuDigital = window.TamuDigital || {};

window.TamuDigital.sendGuestReport = sendGuestReport;

window.TamuDigital.validateReportData = validateReportData;

window.TamuDigital.prepareReportPayload = prepareReportPayload;

window.TamuDigital.isSubmitting = function () {
    return isSubmittingReport;
};

window.TamuDigital.getAPIStatus = function () {

    return {

        configured: API_CONFIG.ENDPOINT !== "",

        endpoint: API_CONFIG.ENDPOINT
            ? "Configured"
            : "Not configured",

        timeout: API_CONFIG.TIMEOUT

    };

};


// ==========================================
// INITIALIZATION
// ==========================================

console.log(
    "TAMU DIGITAL: API module initialized."
);

console.log(
    "TAMU DIGITAL: Backend status:",
    window.TamuDigital.getAPIStatus()
);
