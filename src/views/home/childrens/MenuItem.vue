<template>
  <div v-for="item in props.menu" :key="item.menu_id">
    <el-sub-menu v-if="item.children.length!=0" :index="item.menu_title">
      <template #title>
        <el-icon>
          <img :src="`${prefix}`+item.icon" alt="" class="images">
        </el-icon>
        <span>{{item.menu_title}}</span>

      </template>
      <!-- 递归自己 -->
      <MenuItem :menu="item.children"/>
    </el-sub-menu>
    <el-menu-item v-else :index="item.menu_title"  @click="currentMenu(item)">
      <el-icon v-if="item.icon">
        <img :src="`${prefix}`+item.icon" class="images">
      </el-icon>
      {{item.menu_title}}
    </el-menu-item>
  </div>
</template>

<script setup lang="ts">
import { Menu_TYPE } from '@/service/api/home/types';
import { HomeStore } from '@/store/home/home';
import { useRoute, useRouter } from 'vue-router';
const homeStore = HomeStore()
const prefix = process.env.VUE_APP_AXIOS_BASEURL as string
interface Props {
  menu:Menu_TYPE[]
}
const props = withDefaults(defineProps<Props>(),{
  menu:()=>[]
})
const route = useRoute()
const router = useRouter()
const currentMenu = (item:any)=>{
  router.push("/home/"+item.menu_url)
  homeStore.getPath(route,router)
  
}
</script>

<style lang='less' scoped>
  .images{
    width: 1em;
    height: 1em;
    display: inline;
  }
</style>