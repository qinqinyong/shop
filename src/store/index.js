// 集中状态管理
import Vue from "vue";
import Vuex from 'vuex'
import  home   from  './modules/home'
import  users  from  './modules/users'
import  search  from  './modules/search'
import  detail  from  './modules/detail'
import  shopcar  from  './modules/shopcar'
import  trade  from  './modules/trade'
Vue.use(Vuex)

 
const state = {
     
}
const mutations = {
 
}
const actions= {

}
const getters = {

}


export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        home,
        users,
        search,
        detail,
        shopcar,
        trade
    }
}) 