import { instance } from '../index'
import { Result } from '../commit'
import { Menu_TYPE, Role, UserFrom, User_List } from './types'
import { StateAddRole } from '@/views/home/childrens/system/types'

export const getMenu = () => instance.get<any,Result<Menu_TYPE[]>>("/menu")
export const getUserList = (skip?:number,take?:number) =>instance.post<any,Result<User_List>>("/user/list",{skip,take})
export const updateUserInfo = ({username,user_id,phone,password}:UserFrom) => instance.patch<any,Result<string>>(`/user/${user_id}`,{username,password,phone})
export const addUser = ({username,password,phone}:UserFrom)=>instance.post<any,Result<string>>("/user",{username,password,phone})
export const deleteUser = (id:number)=> instance.delete<any,Result<string>>(`/user/${id}`)
export const getRoleList = (skip?:number,take?:number)=>instance.post<any,Result<Role[]>>("/role/list",{skip,take})
export const updateRole = ({role_id,role_name}:Role) => instance.patch<any,Result<string>>(`/role/${role_id}`,{role_name})