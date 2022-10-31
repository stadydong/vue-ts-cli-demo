import { RouteLocationRaw } from "vue-router"



export interface User {
  username:string,
  password:string
}
export interface Phone {
  num:string,
  code:string
}
export interface Login{
  access_token:string
  user_id:number
  username:string
}
export interface User_Info{
  user:User_TYPE
}
export interface User_TYPE{
  userInfo:UserInfo
  user_id:number
  username:string
}
interface UserInfo {
  role:Role
  userInfo_id:number
}
interface Role{
  role_id:number
  role_name:string
}
