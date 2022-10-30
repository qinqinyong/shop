// 包含应用所有接口的接口请求函数
import ajax from './ajax'

// 引入mockAjax
import mockAjax from './mockAjax'

// 首页三级分类  请求地址 product/getBaseCategoryList  请求方式:get
export const  reqCategoryList = ()=>  ajax.get('product/getBaseCategoryList')

// 搜索请求                                    post请求，携带请求体参数
export const  reqSearch = (searchParams)=>  ajax.post("/list",searchParams)

// 商品详情  /item/{ skuId }
export const  reqdetailInfo = (skuId)=>{
    return ajax({
        url:`/item/${skuId}`,    //模板字符串
        method:'get'
    })
}

// 购物车请求 添加到购物车(修改数量) /cart/addToCart/{ skuId }/{ skuNum } 请求方式：POST
export const reqAddOrUpdateCar = (skuId,skuNum)=>{
    return ajax({
        url:`/cart/addToCart/${ skuId }/${ skuNum }`,    //模板字符串
        method:'post'
    })
}

//获取购物车列表  /api/cart/cartList
export const reqCarlist = ()=>{
  return ajax({
    url:'/cart/cartList',
    method:'get'
  })
}

// 切换商品选中状态  /api/cart/checkCart/{skuID}/{isChecked}
export const requpdatecheck = (skuId,isChecked)=>{
  return ajax({
    url:`/cart/checkCart/${skuId}/${isChecked}`,
    method:'get'
  })
}

// 删除购物车商品  /api/cart/deleteCart/{skuId} 请求方式： DELETE
export const reqdeleteCar = (skuId)=>{
  return ajax({
    url:`/cart/deleteCart/${skuId}`,
    method:'delete'
  })
}

// 注册用户  请求地址 /api/user/passport/register  请求方式 POST
export const requserRegister = (userInfo)=>{
  return ajax({
    url:'/user/passport/register',
    method:'post',
    data:userInfo   //请求体参数 phone password  code验证码  放入一个对象中
  })
}

// 获取验证码
export const reqcode = (phone)=>{
  return ajax({
    url:`user/passport/sendCode/${phone}`,
    method:'get'
  })
}

// 用户登录 /api/user/passport/login  userInfo：{ phone, password }

export const reqlogin = (userInfo)=>{
  return ajax({
    url:'/user/passport/login',
    method:'post',
    data:userInfo
  })
}

// 根据token获取用户数据
export const reqUserInfo = ()=>{
  return ajax({
    url:'/user/passport/auth/getUserInfo',
    method:'get'
  })
}


// 退出登录
export const reqLogout = ()=>{
  return ajax({
    url:'/user/passport/logout',
    method:'get'
  })
}


// 交易信息
export const reqTradeInfo = ()=>{
  return ajax({
    url:'order/auth/trade',
    method:'get'
  })
}

// 提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo} POST
export const reqSubmitOrder = (tradeNo,tradeData)=>{
  return ajax({
    url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method:'post',
    data:tradeData
  })
}


// 获取订单支付信息 /api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId)=>{
  return ajax({
    url:`/payment/weixin/createNative/${orderId}`,
    method:'get',
  })
}


// 12. 查询支付订单状态 /api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId)=>{
  return ajax({
    url:`/payment/weixin/queryPayStatus/${orderId}`,
    method:'get'
  })
}


// 获取订单列表    /api/order/auth/{page}/{limit} 页码和每页显示数量

export const myOrderInfo = (page,limit)=>{
  return ajax({
    url:`/order/auth/${page}/${limit}`,
    method:'get'
  })
}




// 轮播图
export  const reqBannerList = ()=>  mockAjax.get('/banners')

// 楼层
export const  reqFloorList = ()=>  mockAjax.get('/floors')

// 今日推荐
export const  reqRecommendList = ()=>  mockAjax.get('/recommends')
  


