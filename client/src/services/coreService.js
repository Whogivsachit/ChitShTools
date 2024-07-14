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

    // Download Media
    async downloadMedia (body) {
        return Api().post(`downloadMedia`, body)
        .then(response => response.data)
    },

    // SMTP Email
    async sendEmail (body) {
        return Api().post(`sendEmail`, body)
        .then(response => response.data)
    },

    async generateWorkshop(body) {
        return Api().post(`generateWorkshop`, body)
        .then(response => response.data)
    }

}