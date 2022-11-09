<template>
  <div class="user">
    <div class="search">
      <div class="input" style="width: 200px;">
        <el-input
        v-model="searchTitle"
        placeholder="Please input"
      />
      </div>
      <el-button class="button" type="primary" :icon="Search">搜索</el-button>
      <el-button class="button" type="primary" :icon="EditPen" @click="addUser">添加</el-button>
    </div>
    <el-table :data="userList?.list?.user" :border="true" style="width: 100%" :default-sort="{ prop: 'user_id', order: 'descending' }">
    <el-table-column type="expand">
      <template #default="props">
        <div m="4"> 
          <h3>Role</h3>
          <p m="t-2 b-2">role_id: {{ props.row.userInfo.role.role_id}}</p>
          <p m="b-2">role_name: {{ props.row.userInfo.role.role_name}}</p>
        </div>
      </template>
      </el-table-column>
      <el-table-column
       label="用户id" prop="user_id"
        :width="100" align="center"
        sortable
        />
      <el-table-column label="用户名" prop="username"  align="center"/>
      <el-table-column label="手机号码" prop="userInfo.phone"  align="center"/>
      <el-table-column label="创建时间" prop="userInfo.createTime"  align="center"/>
      <el-table-column label="更新时间" prop="userInfo.updateTime"  align="center"/>
      <el-table-column label="操作" align="center" width="150px">
        <template #default="scope">
          <div class="handler">
            <el-button type="primary" @click="updateUser(scope.row)">编辑</el-button>
            <el-button type="danger" @click="deleteUser(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
      
    </el-table>
    <!-- update -->
    <el-dialog v-model="dialogFormVisible" :title="handler" center width="40%" @close="closeDialog">
    <el-form :model="userFrom" size="large" :rules="rules" ref="userFromRef">
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="userFrom.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="&nbsp;密码：" prop="password">
        <el-input v-model="userFrom.password" autocomplete="off" />
      </el-form-item> 
      <el-form-item label="手机号：" prop="phone">
        <el-input v-model="userFrom.phone" autocomplete="off" />
      </el-form-item> 
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="submit(SubmitType.submit)" size="large">{{successButton}}</el-button>
        <el-button type="primary" @click="submit(SubmitType.reset)" size="large">
          重置
        </el-button>
      </span>
    </template>
  </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref,onMounted,reactive } from 'vue'
import { HomeStore } from '@/store/home/home';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { User, UserFrom, User_List } from '@/service/api/home/types';
import {
  Edit,
  Delete,
  Search,
  EditPen 
} from '@element-plus/icons-vue'
import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults';

let searchTitle = ref("")
const homeStore = HomeStore()
let userList = reactive<{list:User_List} | any>({list:{}})
const getList = async (skip?: number,take?: number)=>{
  try {
    const user_List = await homeStore.GetUserList(skip,take)
    userList.list = user_List
  } catch (error:any) {
    ElMessage.error(`获取用户信息列表失败${error}`)
  }
}
onMounted(async ()=>{
  console.log("user---->>>onMounted");
  
  getList()
})
//进行更新
const userFrom:UserFrom = reactive({
  username:"",
  password:"",
  phone:"",
  user_id:0
})
enum HandlerType {
  update = "用户数据更新",
  add = "新增用户"
}
enum SubmitType {
  submit="提交",
  reset ="重置"
}
enum SuccessButton{
  add = "创建",
  update = "更新"
}
let handler = ref<HandlerType>(HandlerType.add)
const formLabelWidth = ref<String>("140px")
let successButton = ref<SuccessButton>(SuccessButton.add)
const addUser = ()=>{
  handler.value = HandlerType.add
  dialogFormVisible.value = true
}
const updateUser = (user:User)=>{
  handler.value = HandlerType.update
  successButton.value = SuccessButton.update
  dialogFormVisible.value = true

  userFrom.user_id = user.user_id
  userFrom.username = user.username
  userFrom.phone = user.userInfo.phone

  console.log(userFrom);
  
}
//From组件实例
const userFromRef = ref<FormInstance>()
let dialogFormVisible = ref(false)
const submit = (type:SubmitType)=>{
  if(type === SubmitType.submit){
    userFromRef.value?.validate(async (valid)=>{
      if(!valid) return
      //进行添加操作
      if(successButton.value === SuccessButton.add){
        const result = await homeStore.AddUser(userFrom)
        if(result === "添加用户成功"){
          ElMessage({type:"success",message:result})
        }else{
          ElMessage.error({message:result})
        }
      }else{//进行更新操作
        const result = await homeStore.UpdateUserInfo(userFrom)
        if(result==="更新成功"){
        ElMessage({type:"success",message:result})
        }else{
          ElMessage.error({message:result})  
        }
      }
      dialogFormVisible.value = false
    })
  }else{
    userFrom.password = ""
    userFrom.phone = ""
    userFrom.username = ""
  }
}
const deleteUser = async (user:User)=>{
  const result = await homeStore.DeleteUser(user.user_id)
  console.log(result);
  
  if(result === "删除成功"){
    ElMessage({type:"success",message:result})
    getList()
    return 
  }
  ElMessage.error({message:result})
  
}

//关闭消息框的回调
const closeDialog = ()=>{
  userFrom.password = ""
  userFrom.phone = ""
  userFrom.username = ""
  userFrom.user_id = 0
}
const rules:FormRules = reactive({
  username: [{pattern:/^[0-9a-zA-Z]{6,20}$/, trigger: 'blur',message:"账号长度为6-20的数字或字母"},{required:true,trigger: 'blur',message:"请输入账号"}],
  password: [{pattern:/^[0-9a-zA-Z]{6,20}$/, trigger: 'blur',message:"密码长度为6-20的数字或字母"},{required:true,trigger: 'blur',message:"请输入密码"}],
  phone: [{pattern:/^1[0-9]{9,10}$/, trigger: 'blur',message:"手机号1开头长度为10-11"},{required:true,trigger: 'blur',message:"请输入手机号"}],
})

</script>
<style scoped lang="less">
  .handler{
    display: flex;
    justify-content: space-evenly;
  }
  .search{
    display: flex;
    .button{
      margin-left: 10px;
    }
    padding: 7px;
  }
</style>
