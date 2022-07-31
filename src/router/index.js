import Vue from "vue";
import VueRouter from "vue-router";

import routes from './routes'
import store from '@/store'

Vue.use(VueRouter)


// 缓存原本的push方法
const originalPush = VueRouter.prototype.push
// 指定新的push方法
VueRouter.prototype.push = function (location, onResolve, onReject) {
  // 如果指定了成功或失败的回调
  if (onResolve || onReject)
    //直接调用原本的push方法
    return originalPush.call(this, location, onResolve, onReject)
  // 如果没有指定成功或失败的回调，必须用catch捕获处理
  return originalPush.call(this, location).catch((err) => {
    // 如果是重复导航产生的错误，不再向外传递错误
    if (VueRouter.isNavigationFailure(err)) {
      return err  //产生的是成功的promise，成功的promise的值是error
    }
    // 如果是其它原因导航的错误，将错误向下传递
    return Promise.reject(err)
  })
}


const router = new VueRouter({
  // 模式 不带#
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {  //跳转详情页回到最上端
    return { x: 0, y: 0 }
  }
})



// token校验逻辑    全局前置导航守卫
router.beforeEach(async (to, from, next) => {
  // to 到哪去
  // from  原地
  //next是个函数   next() 代表无条件放行   next(false) 不放行，停留原地
  // next('/) next({path:"/"})  代表最终去哪

  // token校验
  let token = store.state.users.token

  // 已经登陆过，已经有token
  if (token) {
    // 又去点登录
    if (to.path === '/login') {
      next('/')  //留在home页面
    } else {  //// 此刻代表登录了，去的不是登录页
      let hasuserInfo = !!store.state.users.userInfo.nickName  //转为布尔值
      // 如果存在用户信息
      if (hasuserInfo) {
        next() //代表无条件放行 
      } else {
        try { // 没有用户信息，那我们要根据token发请求获取用户的真实信息
          await store.dispatch('getUserInfo')  //成功获取用户信息
          next()   //无条件放行  
        } catch (error) {
          alert('用户的token已过期')

          store.dispatch('resetUserInfo')  //失败的话，调用函数清空token和用户信息

          //再重新登录  登录后去之前想去但没去成的地方，需要和登录逻辑配合使用 
          next('/login?redirect='+to.path)  //query参数
        }
      }

    }
  }else{
    //没有登录过，没有token

    // 后期我们需判断用户是不是去订单相关页面，如果是那么就先登录
    next()  //先自由访问
  }

})


export default router