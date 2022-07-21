// 包含应用所有接口的接口请求函数
import ajax from './ajax'

// 引入mockAjax
import mockAjax from './mockAjax'

// 首页三级分类  请求地址 product/getBaseCategoryList  请求方式:get
export const  reqCategoryList = ()=>  ajax.get('product/getBaseCategoryList')

// 轮播图
export  const reqBannerList = ()=>  mockAjax.get('/banners')

// 楼层
export const  reqFloorList = ()=>  mockAjax.get('/floors')

// 今日推荐
export const  reqRecommendList = ()=>  mockAjax.get('/recommends')
  


