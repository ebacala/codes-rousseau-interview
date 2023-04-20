import '../assets/css/reset.min.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import '../assets/css/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import * as VueRouter from 'vue-router'
import { routes } from './router/routes'

import { createPinia } from 'pinia'
import { useLearnersStore } from './store/useLearnersStore'

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

const pinia = createPinia()

const app = createApp(App)

app.use(router)
app.use(pinia)

useLearnersStore()

app.mount('#app')
