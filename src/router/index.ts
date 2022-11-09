import {createRouter,createWebHashHistory} from 'vue-router'
import type {RouteRecordRaw} from 'vue-router'
import { UserStore } from '@/store/login/user'
import { HomeStore } from '@/store/home/home'


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
export async function add_Routes(){
  const homeStore = HomeStore()

  await homeStore.getlocalStorage()
  console.log("router");
  const routes:RouteRecordRaw =   {
    name:"home",
    path:"/home",
    component:()=>import("views/home/Home.vue"),
    children:[]
  }
  //必须连父级路由也动态注册  子路由添加在children里
    if(homeStore.menu.length>0){
      homeStore.menu.map(item=>{
        // router.addRoute("home",{path:item.menu_url})
        // 是否有子路由      
        if(item.submenu_list.length>0){

          item.submenu_list.map(submenu_item=>{
            let sub_router ={
              path:`${submenu_item.submenu_url}`,
              name:`${submenu_item.submenu_url}`,
              component:()=>import(`views/home/childrens/${submenu_item.submenu_url}.vue`),
            }
            routes.children.push(sub_router)
            
          })
          // console.log(routes);
          
          router.addRoute(routes)

        }else{

        }

      })
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
      console.log(111);
      
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