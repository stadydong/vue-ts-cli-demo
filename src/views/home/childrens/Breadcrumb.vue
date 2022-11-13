<template>
  <div class="breadcrumb">
    <el-breadcrumb :separator-icon="ArrowRight" class="el-breadcrumb">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item> -->
      <el-breadcrumb-item
        v-for="(path,index) in currentPath.paths"
        :key="index"
        :to="path.toPath"
        >{{path.pathName}}</el-breadcrumb-item>
      </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue';
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';



interface Paths {
  paths:PathInfo[]
}
interface PathInfo{
  pathName:string
  toPath:string
}
const currentPath:Paths = reactive({paths:[]})

const route = useRoute()
//截取前面的 / 

const router = useRouter()
console.log(router.getRoutes());

const getPath = ()=>{
  currentPath.paths = []
  let path = route.path.slice(1)
  const paths = path.split("/")
  path = path + "/"
  let position = 0
  paths.map((pathName)=>{
  const end = path.indexOf("/",position)
  let toPath = "/" + path.slice(0,end)
  position = end+1
  let pathInfo = {
    pathName,
    toPath
  }
  currentPath.paths.push(pathInfo)
})
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
  font-size: 23px;
}
}
</style>
