<template>
  <div id="login-content">
    <h1>后台管理系统</h1>
    <el-tabs v-model="currentTabs" type="border-card" class="demo-tabs" :stretch="true">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label icon-center">
            <el-icon><User/></el-icon>
            <span style="padding-left: 2px;">用户登录</span>
          </span>
        </template>
        <LoginAccount ref="loginAccount"/>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label icon-center">
            <el-icon><Iphone/></el-icon>
            <span style="padding-left: 2px;">手机登录</span>
          </span>
        </template>
        <LoginPhone/>
      </el-tab-pane>
    </el-tabs>
    <div class="save">
      <el-checkbox label="记住密码" :checked="savePassword"/>
      <el-link type="primary" :underline="false">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" size="large" @click="login">立即登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref,onMounted }  from "vue"
import { User,Iphone } from '@element-plus/icons-vue'
import LoginAccount from './Login-account.vue'
import LoginPhone from './Login-phone.vue';
  let savePassword = ref<boolean>(true)     //判断是否保存密码
  //当标签页改变时获取当前是哪个标签页
  let currentTabs = ref<"account"|"phone">("account")
    
  // const currentTab = (pane: TabsPaneContext, ev: Event)=>{

  // }
  //获取子组件<LoginAccount/>
  const loginAccount = ref<InstanceType<typeof LoginAccount>>()
  const login = ()=>{
    switch(currentTabs.value){
      case "account":     //执行账号登录
      loginAccount.value?.login(savePassword.value)  //调用子组件的方法
      break;
      case "phone":       //执行手机登录
        console.log("当前位置在"+currentTabs.value);
      break;  
    }
    
  }
  // onMounted(()=>{
  //   console.log(Tabs.value);
    
  // })
</script>

<style lang='less' scoped>
  #login-content{
    width: 320px;
    .save{
      display: flex;
      justify-content: space-between;
    }
  }
  .icon-center{
  display:flex;align-items: center;justify-content: center;
  }
  .login-btn{
    // display: flex;
    width: 100%;
    font-size: 20px;
    font-weight: 600;
  }
</style>