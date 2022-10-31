import { instance } from '../index'
import { Result } from '../commit'
import { Menu_TYPE } from './types'
export const getMenu = () => instance.get<any,Result<Menu_TYPE[]>>("/menu")