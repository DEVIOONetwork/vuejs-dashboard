import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from "vue-toastification"

createApp(App).use(Toast).use(router).mount('#app')
