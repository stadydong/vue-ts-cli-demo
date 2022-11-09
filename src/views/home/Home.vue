<template>
  <div class="home global_height">
    <div class="common-layout global_height">
      <el-container class="global_height">
        <el-aside width="250px"><Menu :menus="homeStore.menu" @changeMenu="changeMenu"/></el-aside>
        <el-container>
          <el-header height="auto">
            <div>user</div>
            <Breadcrumb ref="breadcrumb"/>
          </el-header>
          <el-main class="main">
            <HomePage v-if="route.path==='/home'"/>
            <router-view v-else/>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script setup lang='ts'>
  import Menu from './childrens/Menu.vue'
  import Breadcrumb from './childrens/Breadcrumb.vue'
  import HomePage from './HomePage.vue'
  import { onMounted, ref } from 'vue';
import { HomeStore } from '@/store/home/home';
import { ElMessage } from 'element-plus';
import { useRoute } from 'vue-router';
  const homeStore = HomeStore()
  const route = useRoute()
  const breadcrumb = ref<InstanceType<typeof Breadcrumb>>()
  onMounted(async ()=>{
    console.log("Home onMouted");
    
      try {
        const result = await homeStore.getMenus()   
      } catch (error:any) {
        ElMessage.error(error)
      }
  })
  const changeMenu = ()=>{
    console.log("changeMenu");
    console.log(route.path);
    
    breadcrumb.value?.getPath()
    
  }
</script>

<style lang='less' scoped>
  .main{
    padding: 0;
  }
</style>