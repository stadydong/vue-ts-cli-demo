import {createRouter,createWebHashHistory} from 'vue-router'
import type {RouteRecordRaw} from 'vue-router'
import { UserStore } from '@/store/login/user'
import { HomeStore } from '@/store/home/home'
import { Menu_TYPE } from '@/service/api/home/types'


const routes:RouteRecordRaw[] = [
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
const router = createRouter({
  history:createWebHashHistory(),
  routes
})

//进行路由递归注册
function createMenu(menu:Menu_TYPE[]){
  const router = [] as RouteRecordRaw[]
  menu.forEach(e=>{
    let e_router:any = {
      name:e.menu_title,
      // path:e.menu_url
    }
    if(e.viewPath){
      e_router.component = import(`views/home/childrens/${e.menu_url}.vue`)
    }else{
      e_router.redirect = "/login"
    }

    let end = e.menu_url.lastIndexOf("/") +1
    e_router.path = e.menu_url.substring(end)
console.log(123);


    
    
    
    if(e.children.length !=0){
      console.log(createMenu(e.children));
      
      e_router.children = createMenu(e.children)
    }
    router.push(e_router)
  })
  return router
} 
export async function add_Routes(){
  const homeStore = HomeStore()
  await homeStore.getlocalStorage()
  const routes:RouteRecordRaw =   {
    name:"home",
    path:"/home",
    component:()=>import("views/home/Home.vue"),
    children:[]
  }
  //必须连父级路由也动态注册  子路由添加在children里
    if(homeStore.menu.length>0){
      // console.log(createMenu(homeStore.menu));
      routes.children =  createMenu(homeStore.menu)
    }

    
    return routes
}
let flag = true
const whiteList = ["/login"]
router.beforeEach(async (to,from,next)=>{
  //有token说明登录了
  //还没能获取到addRoute添加的
  const token = localStorage.getItem("token")
  if(token){
    //说明登录了
    if(flag){
      let routes = await add_Routes()
      flag = false
      router.addRoute(routes)
      
      
      next({...to,replace:true})
    }else{
      console.log(222);
      
      next()
    } 
  }else{
    //为白名单直接通过
    if(whiteList.includes(to.path)){
      next()
    }else{
      next("/login")
    }
  }
  return next()
})
export default router