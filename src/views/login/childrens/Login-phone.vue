<template>
  <div class="login-phone">
    <el-form>
      <el-form-item label="手机号">
        <el-input v-model="phone.num" />
      </el-form-item>
      <el-form-item label="验证码">
        <div class="get-code">
          <el-input v-model="phone.code" />
          <el-button type="primary" class="btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang='ts'>
import { reactive } from 'vue';
import type { Phone } from '@/service/api/types/login_types';
import type { FormRules } from 'element-plus'
const phone = reactive<Phone>({
  num:"",
  code:""
})

</script>

<style lang='less' scoped>
  .get-code{
    display: flex;
    justify-content: space-between;
    .btn{
      margin-left: 5px;
    }
  }
</style>