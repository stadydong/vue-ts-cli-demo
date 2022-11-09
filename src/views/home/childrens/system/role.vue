<template>
  <div class="role">
    <el-table :data="roleList.roles" style="width: 100%" :border="true">
    <el-table-column label="role_id" width="150">
      <template #default="scope">
        <div>{{ scope.row.role_id }}</div>

      </template>
    </el-table-column>
    <el-table-column label="role_name">
      <template #default="scope">
        <div v-if="scope.row.state">{{ scope.row.role_name }}</div>
        <div v-else>
          <el-select v-model="ChangeRole" class="m-2" placeholder="Select" size="large">
            <el-option v-for="item in roleType" :key="item" :label="item" :value="item" />
          </el-select>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template #default="scope">
        <el-button v-if="scope.row.state" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button v-else size="small" @click="SaveHandle(scope.$index, scope.row)">保存</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script lang="ts" setup>
import { Role } from '@/service/api/home/types';
import { HomeStore } from '@/store/home/home';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { RoleType, StateAddRole } from './types'

const roleType:RoleType[] = [RoleType.Default,RoleType.Two,RoleType.Three]
const homeStore = HomeStore()
const roleList: { roles: StateAddRole[] } = reactive({ roles: [] })
homeStore.GetRoleList().then(res => {
  //添加一个state用于控制input框的显示
  res.map(item => {
    item.state = true
    return item
  })
  roleList.roles = res

}).catch(err => {
  ElMessage.error({ message: "获取用户列表错误" })
})

let ChangeRole = ref<string>("")
const handleEdit = (index: number, row: StateAddRole) => {
  ChangeRole.value = row.role_name
  row.state = !row.state

}
const SaveHandle = async (index: number, row: StateAddRole) => {

  

  row.state = !row.state

  //发请求row为数据
  // UpdateRole
  const result = await homeStore.UpdateRole({role_id:row.role_id,role_name:ChangeRole.value})
  if(result === "更新成功"){
    row.role_name = ChangeRole.value
    ElMessage.success({message:result})
  }else{
    ElMessage.error({ message:result })
  }

}



</script>


<style lang='less' scoped>
.role{
  margin-top: 20px;
}
:deep(.input>.el-input__wrapper) {
  box-shadow: none;
}
</style>