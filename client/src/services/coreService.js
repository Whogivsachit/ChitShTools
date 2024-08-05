/*
    Generally I would recommend to seperate each major call into a seperate service file.
    For example all Discord related calls in a discordService.js file. ( Similar to our I handled controllers on the backend )
    I have combined all the calls into a single file due to how simple the calls are.
*/

import Api from '@/services/api'

export default {

    // Discord Webhook
    async sendWebhook (body) {
        return Api().post(`sendWebhook`, body)
        .then(response => response.data)
    },

    // GameServer Information
    async fetchServerInfo (body) {
        return Api().post(`fetchServerInfo`, body)
        .then(response => response.data)
    },

    // SMTP Email
    async sendEmail (body) {
        return Api().post(`sendEmail`, body)
        .then(response => response.data)
    },

    // Generate Workshop
    async generateWorkshop(body) {
        return Api().post(`generateWorkshop`, body)
        .then(response => response.data)
    },

    // Url Shortener
    async generateShortUrl(body) {
        return Api().post(`shorten`, body)
        .then(response => response.data)
    },

    // Generate QR Code
    async generateQrCode(body) {
        return Api().post(`generateQRCode`, body)
        .then(response => response.data)
    },

    // Download Media
    async downloadMedia(body) {
        return Api().post(`downloadMedia`, body)
        .then(response => response.data)
    },

    // Test Upload Speed
    async testUpload(body) {
        return Api().post(`testUpload`, body, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(response => response.data)
    },

    // Test Download Speed
    async testDownload() { 
        return Api().get(`testDownload`)
        .then(response => response.data)
    },

    // Convert PDF
    async convertToPdf(body) {
        return Api().post(`convertToPdf`, body, { 
            headers: { 'Content-Type': 'multipart/form-data' },
            responseType: 'blob' 
        })
        .then(response => response.data)
    },

    // Convert Image
    async convertImage(body) {
        return Api().post(`convertImage`, body, { 
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(response => response.data)
    },

    // Convert Video
    async convertVideo(body) {
        return Api().post(`convertVideo`, body, { 
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(response => response.data)
    }
}