import {createRouter,createWebHashHistory} from 'vue-router'
import type {RouteRecordRaw} from 'vue-router'
import { UserStore } from '@/store/login/user'
import { HomeStore } from '@/store/home/home'
import { Menu_TYPE } from '@/service/api/home/types'
import { Component } from 'vue'
const homeStore = HomeStore()


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
  const routes:any | {} =   {
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
          router.addRoute(routes)
          console.log(router.getRoutes());
        }else{

        }

      })
    }
}


router.beforeEach(async (to,from,next)=>{
  //有token说明登录了
  //还没能获取到addRoute添加的
  console.log(router.getRoutes());
  
  if(localStorage.getItem("token")){
    if(to.path!= "/login"){

    }

    //添加路由
    await add_Routes()
    console.log(router.getRoutes());
    UserStore().getlocalStorage()
    //判断是否有这条路由信息
    if(router.getRoutes().findIndex((item)=>item.path===to.path) !=-1){
      console.log(to.fullPath); 
      console.log(to);
      
      // debugger
      console.log(router.options);
      return next()
    }

    

    
  }
  // return next()
})
export default router