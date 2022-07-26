import Vue from "vue";
import VueRouter from "vue-router";

import routes from './routes'

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


export default new VueRouter({
    // 模式 不带#
    mode: 'history',
    routes,
    scrollBehavior (to, from, savedPosition) {  //跳转详情页回到最上端
      return {x:0,y:0}
    }
})