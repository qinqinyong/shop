// 包含应用所有接口的接口请求函数
import ajax from './ajax'

// 首页三级分类  请求地址 product/getBaseCategoryList  请求方式:get
export const  reqCategoryList = ()=>
   ajax.get('product/getBaseCategoryList')

  


