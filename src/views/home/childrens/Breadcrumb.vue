<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/" class="el-breadcrumb">
      <BreadcrumbItem :currentPath="homeStore.currentPath"/>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { PathInfo } from '@/store/home/types';
import { reactive } from 'vue';
import { RouteRecordNormalized, useRoute, useRouter } from 'vue-router';
import BreadcrumbItem from './BreadcrumbItem.vue'
import { HomeStore } from '@/store/home/home';
const homeStore = HomeStore()
//获取路径
const route = useRoute()
const router = useRouter()
homeStore.getPath(route,router)








</script>
<style lang="less" scoped>
.breadcrumb{
  margin: 5px 0;
  .el-breadcrumb{
  font-size: 17px;
}
}
</style>
