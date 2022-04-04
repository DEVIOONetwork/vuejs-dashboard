import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Toast from "vue-toastification"

createApp(App)
    .use(Toast)
    .use(store)
    .use(router)
    .mount('#app');
