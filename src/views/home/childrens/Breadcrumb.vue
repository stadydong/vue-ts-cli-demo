<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/" class="el-breadcrumb">
      <BreadcrumbItem :currentPath="currentPath.paths"/>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { RouteRecordNormalized, useRoute, useRouter } from 'vue-router';
import BreadcrumbItem from './BreadcrumbItem.vue'


export interface Paths {
  paths:PathInfo[]
}
export interface PathInfo{
  pathName:string
  toPath:string
  children:PathInfo[]
}
const currentPath:Paths = reactive({paths:[]})

const route = useRoute()
//截取前面的 / 

const router = useRouter()

const getPath = ()=>{
  //每次都进行初始化 为了让用户点击导航栏能进行跳转改变面包屑
  currentPath.paths = []
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
        currentPath.paths.push(pathInfo)
      }else{
        // console.log(44);
        // console.log(44);
        //最后一条路由不需要截取
        let routes = getRoute.find((value)=>value.path === route.path) as RouteRecordNormalized    
        let pathInfo:PathInfo = {
          pathName:routes?.name as string,
          toPath:routes?.path as string,
          children:[]
        }
        currentPath.paths.push(pathInfo)
      }
      
    }  
}
getPath()
//导出给父组件使用
defineExpose({
  getPath
})







</script>
<style lang="less" scoped>
.breadcrumb{
  margin: 5px 0;
  .el-breadcrumb{
  font-size: 17px;
}
}
</style>
