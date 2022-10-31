
export interface Menu_TYPE {
  createDate:Date
  updateDate:Date
  menu_id:number
  menu_img:string
  menu_title:string
  menu_url:string
  submenu_list:SubMenu_list[]
  type:number
}

export interface SubMenu_list{
  submenu_id:number
  submenu_title:string
  submenu_url:string
}


