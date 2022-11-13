
export interface Menu_TYPE {
  createDate:Date
  updateDate:Date
  menu_id:number
  icon:string
  menu_title:string
  menu_url:string
  children:Menu_TYPE[]
  viewPath:string
}


export interface User_List {
  total:number
  user:User[]
}
export interface User{
  user_id:number
  username:string
  userInfo:userInfo
}
interface userInfo {
  createTime:Date
  phone:string
  updateTime:Date
  userInfo_id:number
  role:Role
}
export interface Role {
  role_id:number
  role_name:string
}

export interface UserFrom {
  username:string
  password:string
  phone:string
  user_id:number
}

