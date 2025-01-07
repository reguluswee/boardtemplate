import {createApp} from 'vue'
import App from './App.vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import {routes} from "@/router";


const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

createApp(App)
  .use(router)
  .use(ElementPlus)
  .mount('#app')
