import '../assets/css/reset.min.css'
import '../assets/css/main.css'

import { createApp } from 'vue'
import App from './App.vue';

import * as VueRouter from 'vue-router';
import { routes } from './router/routes'

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
})

const app = createApp(App)

app.use(router)
app.mount('#app')
