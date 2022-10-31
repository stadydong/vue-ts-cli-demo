import { Result } from "@/service/api/commit"
import { Menu_TYPE } from "@/service/api/home/types"
import { User_Info, User_TYPE } from "@/service/api/login/types"

export interface Home_State {
  menu:Menu_TYPE[] | []

}
export interface Home_Getters{

}
export interface Home_Actions{
  getMenus:()=>Promise<string>
  getlocalStorage:()=>Promise<void>
}