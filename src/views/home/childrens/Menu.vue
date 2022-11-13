<template>
  <div class="menu global_height">

      <router-link to="/home" class="router-link">
        <el-row justify="space-around" class="logo" align="middle">
          <img src="http://localhost:3000/icon/logo.png" alt="" class="image">
          <div class="logo_titile">Vue<span class="logo_span">3</span>管理后台</div>
        </el-row>
      </router-link>
      <el-menu
        background-color="rgb(255, 255, 255)"
        text-color="rgb(22, 43, 100)"
        active-text-color="#51AFE7"
        :default-active="activeIndex"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
      <MenuItem :menu="props.menus"/>
        <!-- <el-sub-menu
          :key="item.menu_id"
          :index="item.menu_url"
          v-for="item in props.menus"
          >
          <template #title>
            <el-icon>
              <img :src="`${prefix}`+item.icon" alt="" class="images">
            </el-icon>
            <span>{{item.menu_title}}</span>
          </template>
            <el-menu-item 
            @click="currentMenuItem(submenu_list.submenu_url)" 
            :index="submenu_list.submenu_url" 
            v-for="submenu_list in item.children"
            :key="submenu_list.submenu_id" 
            >{{submenu_list.submenu_title}}</el-menu-item>
        </el-sub-menu> -->
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
import { useRouter,useRoute } from 'vue-router'
import MenuItem from './MenuItem.vue'
const route = useRoute()
//活动的路径
let activeIndex = ref(route.path.replace("/home/",""))

const emits = defineEmits(["changeMenu"])
//图片前缀
const prefix = ref<string>(process.env.VUE_APP_AXIOS_BASEURL as string)
interface Props {
  menus:Menu_TYPE[] | []
}
const props = withDefaults(defineProps<Props>(),{menus:()=>[]})
const router = useRouter()


const currentMenuItem = async (path:string)=>{
  await router.push("/home/"+path)
  emits("changeMenu")
  // console.log(`currentIndex---->${index}`);
  
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
    background: rgb(255,255,255);
    .router-link{
      text-decoration: none;
      .logo{
        padding: 5px 0;
        .image{
          width: 60px;
          height: 60px;
        }
        .logo_titile{
          font-size: 27px;
          font-weight: 900;
          color: #2855C8;
          .logo_span{
            color: #51AFE7;
          }
        }
      }
    }
    .menu_title{
      text-align: center;
    }
    :deep(.el-sub-menu__title):hover{
    background-color: #2855C8 !important;
    color: rgb(255,255,255) !important;
    }
    :deep(.el-menu-item):hover{
      background-color: #2855C8 !important;
      color: rgb(255,255,255) !important;
    }
  }
  .images{
    width: 1em;
    height: 1em;
    display: inline;
  }

</style>
