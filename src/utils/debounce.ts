export function debounce(fn:Function,time:number,context:any) {
  let timer:any
  return function(...args:any[]){
    //首次为空 timer获得计时器
    if(!timer){
      timer = setTimeout(()=>{
        fn.apply(context,args)
      },time)
    }else{
      clearTimeout(timer)
      timer = setTimeout(()=>{
        fn.apply(context,args)
      },time)
    }
    
  }
}
