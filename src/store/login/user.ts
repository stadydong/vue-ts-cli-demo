import { defineStore } from 'pinia'
import { storeId } from '../namespaces'
import type { User_Actions, User_State } from './types'

import type { User } from '@/service/api/login/types'
import { account_login, getUserInfo } from '@/service/api/login/login'

export const UserStore = defineStore<storeId.User,User_State,{},User_Actions>(storeId.User,{
  state:()=>{
    return {
      token:"",
      info:null,
      routes:[
        {
          path:"/",
          redirect:"/home"
        },
        {
          path:"/login",
          name:"login",
          component:()=>import('views/login/Login.vue'),
        },
      ]
    }
  },
  getters:{
    
  },
  actions:{
    //进行数据持久化
    getlocalStorage(){
      this.token = localStorage.getItem("token")
      if(localStorage.getItem("info")){
        this.info = JSON.parse(localStorage.getItem("info") as string) 
      }
    },
    async user_login(user:User){
      let message
      try {
        const result = await account_login(user)
        localStorage.setItem("password",user.password)
        localStorage.setItem("token",result.data.access_token)
        localStorage.setItem("user_id",result.data.user_id.toString())   
        message = "登录成功"
        //获取用户信息
        const userInfo = await this.user_Info(result.data.user_id)
        localStorage.setItem("info",JSON.stringify(userInfo.data.user))
        console.log(userInfo.data);
        
      } catch (error:any) {
        if(error.status==401){
          message = "账号或密码错误"
        }else{
          console.log(error.message);
          message = "未知的错误"
        }
      }
      return Promise.resolve(message)
      
    },
    async user_Info(id:number){
      return getUserInfo(id)
    }
  }
})
