import Vue from 'vue'
import App from './App.vue'

import router from '@/router'
import store  from './store'

import * as API from '@/api'  //对应下面挂载在vue原型上的$API



// 引入mock
import './mock/mockServer'
// 引入swaper.css
import 'swiper/css/swiper.css'
import '@/plugins/element'

import TypeNav from './components/TypeNav'  //引入公用的导航
import Pagination from './components/Pagination'  //引入分页组件

Vue.config.productionTip = false


Vue.component(TypeNav.name,TypeNav)  //注册全局组件
Vue.component(Pagination.name,Pagination)  //注册全局组件

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

