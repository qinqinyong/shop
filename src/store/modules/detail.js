
import { reqdetailInfo } from '@/api'

const state = {
    skuDetailinfo: {}
}
const mutations = {
    RECEIVE_SKUDETAILINFO(state, skuDetailinfo) {
        state.skuDetailinfo = skuDetailinfo
    }
}
const actions = {
    async getskuDetailinfo({ commit }, skuId) {
        const result = await reqdetailInfo(skuId)
        if (result.code === 200) {
            commit('RECEIVE_SKUDETAILINFO', result.data)
        }
    }

}
const getters = {
    // 详情页的面包屑数据
    categoryView(state){
        return state.skuDetailinfo.categoryView || {}
    },
    // 销售属性
    skuInfo(state){
        return state.skuDetailinfo.skuInfo || {}
    },
    // 选择配置信息
    spuSaleAttrList(state){
        return state.skuDetailinfo.spuSaleAttrList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
}