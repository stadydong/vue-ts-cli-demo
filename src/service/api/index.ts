import axios from 'axios'
import type{ AxiosError } from 'axios'
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
import { RequestError } from './commit'


export const instance = axios.create({
  baseURL:process.env.VUE_APP_AXIOS_BASEURL,
  timeout:5000
})
let loading:LoadingInstance
instance.interceptors.request.use(config=>{
  loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  return config
},err=>{
  return Promise.reject(err)
})
instance.interceptors.response.use(config=>{
    console.log("响应成功");
    
    loading.close()

  return config.data
},(err:AxiosError):Promise<RequestError>=>{
  console.log("响应错误");
    loading.close()

  return Promise.reject(err.response?.data)
})




