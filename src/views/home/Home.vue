<template>
  <div class="home global_height">
    <div class="common-layout global_height">
      <el-container class="global_height">
        <el-aside width="200px"><Menu :menus="homeStore.menu"/></el-aside>
        <el-container>
          <el-header><Breadcrumb/></el-header>
          <el-main>
            <router-view/>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script setup lang='ts'>
  import Menu from './childrens/Menu.vue'
  import Breadcrumb from './childrens/Breadcrumb.vue'
  import { onMounted } from 'vue';
import { HomeStore } from '@/store/home/home';
import { ElMessage } from 'element-plus';
  const homeStore = HomeStore()
  onMounted(async ()=>{
    console.log("Home onMouted");
    
      try {
        const result = await homeStore.getMenus()   
      } catch (error:any) {
        ElMessage.error(error)
      }
  })
</script>

<style lang='less' scoped>
</style>