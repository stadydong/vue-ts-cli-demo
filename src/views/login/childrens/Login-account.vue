<template>
  <div class="login-account">
    <el-form :rules="rules" :model="user" ref="accountFrom">
      <el-form-item label="账号" prop="username">
        <el-input v-model="user.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="user.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
  import { reactive,ref } from 'vue'
  import type { User } from '@/service/api/login/types'
  import type { FormInstance, FormRules } from 'element-plus'
  import { UserStore } from '@/store/login/user';
  import { ElMessage } from 'element-plus'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const user:User = reactive({
    username:localStorage.getItem("username") || '',
    password:localStorage.getItem("password") || ''
  })
  //验证规则
  const rules:FormRules = {
    username:[
      {
        //否否必传
        required:true,
        //失去焦点
        trigger:"blur",
        //提升信息
        message:"请输入用户名"
      },{
        //规则
        pattern:/^[0-9a-z]{6,20}$/,
        trigger:"blur",
        message:"账号为数字或者小写字母6-20位"
      }
    ],
    password:[
      {
        //否否必传
        required:true,
        //失去焦点
        trigger:"blur",
        //提升信息
        message:"请输入密码"
      },{
        pattern:/[0-9a-z]{6,20}/,
        trigger:"blur",
        message:"密码为数字或者小写字母6-20位"
      }
    ]
  }
  //获取仓库
  const user_store = UserStore()
  //通过ref获取from组件实例
  const accountFrom = ref<FormInstance>()
  const login = (savePassword:boolean)=>{
    accountFrom.value?.validate(async (valid:boolean)=>{
      if(valid){    //验证通过时 储存用户名
        //执行登录请求
        localStorage.setItem("username",user.username)
        const message = await user_store.user_login(user)
        //进行密码保存
        let type:any = "error"
        if(message === "登录成功"){
          type="success"
          ElMessage({showClose:true,type,message})
          router.push("home")
        }


      }
    })
  }
  defineExpose({
    login
  })
  
</script>

<style lang='less' scoped>

</style>