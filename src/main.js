import Vue from 'vue'
import App from './App.vue'

import router from '@/router'
import store  from './store'

import * as API from '@/api'  //对应下面挂载在vue原型上的$API



import './mock/mockServer' //引入mock


import 'swiper/css/swiper.css'  //引入swiper的样式文件
import '@/plugins/element'  //引入element-ui
import '@/plugins/validate'  //引入表单验证插件

import TypeNav from './components/TypeNav'  //引入公用的导航
import myPagination from './components/Pagination'  //引入分页组件



import VueLazyload from 'vue-lazyload'  //引入图片懒加载插件
import loading from '@/assets/images/loading.gif'
// 在图片界面没有进入到可视范围前不加载, 在没有得到图片前先显示loading图片
Vue.use(VueLazyload, { // 内部自定义了一个指令lazy
  loading:loading,  // 指定未加载得到图片之前的loading图片
})
          

Vue.config.productionTip = false


Vue.component(TypeNav.name,TypeNav)  //注册全局组件
Vue.component(myPagination.name,myPagination)  //注册全局组件

 

// Vue.prototype.$bus = new Vue()

new Vue({
  beforeCreate(){
    //1.创建全局事件总线 
    Vue.prototype.$bus=this  
    Vue.prototype.$API = API  //当不用vuex时，可以把接口请求函数全部装在对象当中挂在vue原型上
  },
  render: h => h(App),
  router ,  //注册路由器  $router $route
  store,  //注册vuex
}).$mount('#app')

