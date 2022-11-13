import { Result } from "@/service/api/commit"
import { Menu_TYPE, Role, UserFrom, User_List } from "@/service/api/home/types"
import { User_Info, User_TYPE } from "@/service/api/login/types"
import { StateAddRole } from "@/views/home/childrens/system/types"
import { RouteLocationNormalizedLoaded, Router } from "vue-router"

export interface Home_State {
  menu:Menu_TYPE[] | []
  currentPath:PathInfo[]
}

export interface Home_Getters{

}
export interface Home_Actions{
  getMenus:()=>Promise<string>
  getlocalStorage:()=>Promise<void>
  GetUserList:(skip?: number, take?: number)=>Promise<User_List>
  UpdateUserInfo:(userFrom:UserFrom) =>Promise<string>
  DeleteUser:(user_id:number)=>Promise<string>
  AddUser:(userFrom:UserFrom)=>Promise<string>
  GetRoleList:()=>Promise<any[]>
  UpdateRole:(roleInfo:Role)=>Promise<string>
  getPath:(route:RouteLocationNormalizedLoaded,router:Router)=>void
}

export interface PathInfo{
  pathName:string
  toPath:string
  children:PathInfo[]
}