<template>
  <div id="app">
    <!-- <router-view name="login"></router-view> -->

    <router-view></router-view>
    app
  </div>
</template>

<script lang="ts" setup>

import {onMounted,getCurrentInstance} from 'vue'
import { HomeStore } from './store/home/home';
import { useRouter } from 'vue-router'
const homeStore = HomeStore()
const router = useRouter()


</script>

<style lang="less">
#app {
  height: 100%;
}

</style>
