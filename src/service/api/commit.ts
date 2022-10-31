export interface Result<T=any> {
  url:string
  data:T
  success:boolean
}
export interface RequestError{
  status:number
  url:string
  message:any
}