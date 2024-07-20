import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/index.css';
import store from './store/store';

// Components and Directives
import clickOutside from './directives/clickOutside'; // Click Outside directive
import loadingBarComponent from './components/loadingBarComponent.vue';
import appLayout from './layouts/appLayout.vue';

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

const app = createApp(App)
app.use(router)
app.use(store)
library.add(fas, fab)

// Define global components
app.component('faIcon', FontAwesomeIcon)
app.component('loadingBar', loadingBarComponent)
app.component('appLayout', appLayout)

// Define global directives
app.directive('click-outside', clickOutside)

// Global Variables
app.config.globalProperties.$apiUrl = '/api'
app.config.globalProperties.$appName = 'ChitShTools'
app.config.globalProperties.$appUrl = 'http://localhost:5173'

app.mount('#app')

// Export the apiUrl variable for use in the api.js Service file
export const apiUrl = app.config.globalProperties.$apiUrl