import Vue from 'vue'
import App from './App.vue'

import router from '@/router'
import store  from './store'

import TypeNav from './components/TypeNav'  //引入公用的导航

Vue.config.productionTip = false


Vue.component(TypeNav.name,TypeNav)  //注册全局组件


new Vue({
  render: h => h(App),
  router ,  //注册路由器  $router $route
  store,  //注册vuex
}).$mount('#app')
