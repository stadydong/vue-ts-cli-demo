import { addUser, deleteUser, getMenu, getRoleList, getUserList, updateRole, updateUserInfo } from "@/service/api/home/home";

import { th } from "element-plus/es/locale";
import { defineStore } from "pinia";
import { RouteRecordNormalized, useRoute, useRouter } from "vue-router";
import { storeId } from "../namespaces";
import { Home_Actions, Home_Getters, Home_State, PathInfo } from "./types";


export const HomeStore = defineStore<storeId.Home,Home_State,{},Home_Actions>(storeId.Home,{
  state:()=>{
    return {
      menu:[],
      currentPath:[]
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
    },
    async GetUserList(skip, take){
      return (await getUserList(skip, take)).data
    },
    async UpdateUserInfo(userFrom){
      return (await updateUserInfo(userFrom)).data
    },
    async DeleteUser(user_id){
      return (await deleteUser(user_id)).data
    },
    async AddUser(userFrom){
      return (await addUser(userFrom)).data
    },
    async GetRoleList(skip?: number, take?: number){
      return (await getRoleList(skip,take)).data
    },
    async UpdateRole(roleInfo){
      return (await updateRole(roleInfo)).data
    },
    getPath(route,router){
      //每次都进行初始化 为了让用户点击导航栏能进行跳转改变面包屑
      this.currentPath = []
      // const  = useRoute()
      // const router = useRouter()
      let matche = route.path.match(/\//g) as RegExpMatchArray
    
      let start = 1
      let length = matche?.length
      let getRoute = router.getRoutes()
      // 多少条 / 对应多少段路由
        for(let i = 0;i<length;i++){
          let position = route.path.indexOf("/",start)
          start = position + 1
          if(position!=-1){
            let path = route.path.slice(0,position)
            let pathInfo:PathInfo = {
              pathName: '',
              toPath: '',
              children: []
            }
            getRoute.forEach(item=>{
              if(item.path === path){    
                if(item.children.length!=0){
                pathInfo.pathName = item.name as string
                pathInfo.toPath = item.path as string    
                item.children.map(i=>{
                  let childrenPathInfo = {
                    pathName:i.name as string,
                    toPath:item.path +"/"+ i.path as string,
                    children:[]
                  }
                  pathInfo.children.push(childrenPathInfo)
                })
              }
              }
            })
            this.currentPath.push(pathInfo)
          }else{
            //最后一条路由不需要截取
            let routes = getRoute.find((value)=>value.path === route.path) as RouteRecordNormalized    
            let pathInfo:PathInfo = {
              pathName:routes?.name as string,
              toPath:routes?.path as string,
              children:[]
            }
            this.currentPath.push(pathInfo)
          }
      
        }  
    }
  }
})
