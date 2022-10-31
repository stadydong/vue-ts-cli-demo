import { getMenu } from "@/service/api/home/home";
import { th } from "element-plus/es/locale";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { storeId } from "../namespaces";
import { Home_Actions, Home_Getters, Home_State } from "./types";


export const HomeStore = defineStore<storeId.Home,Home_State,{},Home_Actions>(storeId.Home,{
  state:()=>{
    return {
      menu:[]
    }
  },
  getters:{},
  actions:{
    async getlocalStorage(){

        const result = await this.getMenus()

    },
    async getMenus(){
      let message = "请求成功"  
      try {
        const result = await getMenu()
        this.menu = result.data
        localStorage.setItem("menu",JSON.stringify(result.data))
      } catch (error) {
        message = `请求menu错误`
        console.log(`Menu--->${error}`)
        return Promise.reject(message)
      }
      return message
    }
  }
})
