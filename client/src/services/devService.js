import Api from '@/services/api'

export default {

  async heartbeat () {
    return Api().get(`heartbeat`)
    .then(response => response.data)
  },

}