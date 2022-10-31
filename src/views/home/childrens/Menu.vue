<template>
  <div class="menu global_height">
      <h5 class="mb-2">Default colors</h5>
      <el-menu
        background-color="#081D34"
        text-color="#899BAE"
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu :key="item.menu_id" :index="item.menu_title" v-for="item in props.menus">
          <template #title>
            <el-icon>
              <img :src="`${prefix}`+item.menu_img" alt="" class="images">
            </el-icon>
            <span>{{item.menu_title}}</span>
          </template>
            <el-menu-item 
            @click="currentMenuItem(submenu_list.submenu_url)" 
            :index="submenu_list.submenu_title" 
            v-for="submenu_list in item.submenu_list"
            :key="submenu_list.submenu_id" 
            >{{submenu_list.submenu_title}}</el-menu-item>
        </el-sub-menu>
      </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { Menu_TYPE } from '@/service/api/home/types';
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { reactive,ref } from 'vue'
//图片前缀
const prefix = ref<string>(process.env.VUE_APP_AXIOS_BASEURL as string)
interface Props {
  menus:Menu_TYPE[] | []
}
const props = withDefaults(defineProps<Props>(),{menus:()=>[]})



const currentMenuItem = (index:string)=>{
  console.log(`currentIndex---->${index}`);
  
}
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
<style lang="less" scoped>
  .menu{
    background: #051F34;
  }
  .images{
    width: 1em;
    height: 1em;
    display: inline;
  }
</style>
