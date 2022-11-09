import { Result } from "@/service/api/commit"
import { User_Info, User_TYPE } from "@/service/api/login/types"
import { RouteRecordRaw } from "vue-router"

export interface User_State {
  token:string | null
  info:User_TYPE | null
  routes:RouteRecordRaw[]
}
export interface User_Actions{
  getlocalStorage:()=>void
  user_login:(payload:any)=>Promise<string>
  user_Info:(id:number)=>Promise<Result<User_Info>>
}