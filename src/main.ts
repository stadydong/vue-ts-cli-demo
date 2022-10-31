import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "@/global/element_style.ts"
//全局样式
import "normalize.css"
import "@/assets/main.less"

import { init_pinia } from './store/pinia'


createApp(App).use(init_pinia).use(router).mount('#app')


