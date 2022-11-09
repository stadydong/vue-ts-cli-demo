import { add_Routes } from '@/router'
import { createPinia } from 'pinia'
import { App } from 'vue'
import { UserStore } from './login/user'
import {} from 'vue-router'
// userStore
export function init_pinia (app:App<Element>){
  app.use(createPinia())
  const userStore = UserStore()
  userStore.getlocalStorage()
  // add_Routes()
}