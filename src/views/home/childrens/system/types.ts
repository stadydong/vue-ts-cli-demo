import { Role } from "@/service/api/home/types";

export enum RoleType{
  Default = "普通用户",
  Two = "管理员",
  Three = "超级管理员"
}
export interface StateAddRole extends Role {
  state: boolean
}