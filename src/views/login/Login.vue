<template>
  <div id="login">
   <Login_Centent/>
  </div>
</template>

<script setup lang='ts'>
import Login_Centent from './childrens/Login-content.vue'

</script>

<style lang='less' scoped>
  #login{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>