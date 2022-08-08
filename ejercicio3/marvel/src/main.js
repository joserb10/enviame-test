import { createApp } from 'vue'
import {createRouter,createWebHashHistory} from 'vue-router'
import App from './App.vue'

//Library for ifinite
import VueObserveVisibility from 'vue3-observe-visibility'

//Bootstrap 5
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import HeroList from './components/HeroList.vue'
import HeroEdit from './components/HeroEdit.vue'
import HeroNew from './components/HeroNew.vue'

//routes
const routes = [
    { path: '/', component: HeroList },
    { path: '/hero/:name',name: 'EditHero', component: HeroEdit},
    { path: '/hero/create',name: 'CreateHero', component: HeroNew},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
  })

const app = createApp(App)

app.use(router)
app.use(VueObserveVisibility)

app.mount('#app')