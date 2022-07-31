//
import { getUserTempId, getToken, setToken, removeToken,  } from '@/utils/userabout'
import { requserRegister, reqcode, reqlogin ,reqUserInfo ,reqLogout} from '@/api'
import { get } from 'lodash'

const state = {

    userTempId: getUserTempId(),  //  getUserTempId() 获取临时标识id
    token: getToken(), //先从localStrange中取
    userInfo: {}   //用户信息
} 

const mutations = {
    RECEIVE_TOKEN(state, token) {
        state.token = token
    },

    RECEVICE_USERINFO(state, userInfo) {
        state.userInfo = userInfo
    },

    //重置用户信息
    RESET_USERINFO(state){
        // 这里面包含用户信息和token
        state.userInfo = {},
        state.token = ''
    }
}

const actions = {

    // 注册请求
    async userRegister({ commit }, userInfo) {
        const result = await requserRegister(userInfo)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },

    // 验证码请求
    async getcode({ commit }, phone) {
        let result = await reqcode(phone)
        console.log(result);
    },

    // 用户登录
    async userlogin({ commit }, userInfo) {
        const result = await reqlogin(userInfo)
        if (result.code === 200) {
            commit('RECEIVE_TOKEN', result.data.token)
            setToken(result.data.token)  //保存token
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },

    // 用户数据
    async getUserInfo({ commit }) {
        const result = await reqUserInfo()
        if (result.code === 200) {
            commit('RECEVICE_USERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },

    // 重置用户信息
    async resetUserInfo({commit}){
        removeToken(), //清空localStorage 当中的token信息
        commit('RESET_USERINFO')  //删除state保存的token和用户信息
    },

    // 退出登录
    async userLogout({commit}){
        const result = await reqLogout()
        if (result.code===200) {
            removeToken(), //清空localStorage 当中的token信息
            commit('RESET_USERINFO')
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    }
}


const getters = {}

export default {
    state,
    mutations,
    actions,
    getters,
} 