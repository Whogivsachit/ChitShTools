import { createStore } from 'vuex';
import bannerStore from './bannerStore';

export default createStore({
    modules: {
        banner: bannerStore
    }
});