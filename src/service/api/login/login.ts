import { instance } from '../index'
import { Login, User, User_Info } from './types'
import { Result } from '../commit'
//1.账号密码进行登录
export const account_login = (data:User)=> instance.post<any,Result<Login>>(`login/account`,data)
export const getUserInfo = (id:number)=>instance.get<any,Result<User_Info>>(`user/${id}`)

