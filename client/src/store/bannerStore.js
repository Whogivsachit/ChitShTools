export default {
    strict: true,
    state: {
        bannerVisible: localStorage.getItem('bannerDismissed') !== 'true',
    },

    mutations: {
        dismissBanner(state) {
            state.bannerVisible = false;
            localStorage.setItem('bannerDismissed', 'true');
        },
    },

    getters: {
        isBannerVisible: (state) => state.bannerVisible,
    },

}