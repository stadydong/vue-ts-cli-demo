<template>
  <el-breadcrumb-item
    v-for="(item,index) in props.currentPath"
    :key="index"
    >
    <template #default >
      <span v-if="item.children.length === 0">{{item.pathName}}</span>
      <el-dropdown v-else>
        <span class="el-dropdown-link">
          {{item.pathName}}
          <el-icon class="el-icon--right">
            <ArrowDown />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="(i,index) in item.children" @click="router.push(i.toPath)">{{i.pathName}}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
  </el-breadcrumb-item>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { PathInfo } from './Breadcrumb.vue';
import {
  ArrowDown
} from '@element-plus/icons-vue'
const router = useRouter()
interface Props {
  currentPath:PathInfo[]
}
const value = ref<string>()
  const props = withDefaults(defineProps<Props>(),{
    currentPath:()=>[]
  })
  
</script>

<style lang='less' scoped>
:deep(.el-dropdown){
  font-size:16px;
  color:rgba(0,0,0,.45)
}
:deep(.el-dropdown-menu__item){
  font-size: 16px;
  color:rgba(0,0,0,.45)
}
</style>