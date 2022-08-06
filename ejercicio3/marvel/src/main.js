import { createApp } from 'vue'
import {createRouter,createWebHashHistory} from 'vue-router'
import App from './App.vue'

//Bootstrap 5
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import HeroList from './components/HeroList.vue'

//routes
const routes = [
    { path: '/', component: HeroList },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
  })

const app = createApp(App)

app.use(router)

app.mount('#app')