import { reqAddOrUpdateCar, reqCarlist, requpdatecheck, reqdeleteCar } from '@/api'
const state = {
    shopCarList: [],
}
const mutations = {
    RECEIVE_CARLIST(state, shopCarList) {
        state.shopCarList = shopCarList
    }
}


const actions = {  //携带多个参数必需以对象方式传递
    async addOrUpdateCar({ commit }, { skuId, skuNum }) {
        const result = await reqAddOrUpdateCar(skuId, skuNum)
        if (result.code === 200) {
            return 'ok'
        } else { //返回promise失败的原因
            return Promise.reject(new Error('failed'))
        }
    },

    async getcarList({ commit }) {
        const result = await reqCarlist()
        if (result.code === 200) {
            commit('RECEIVE_CARLIST', result.data)
        }
    },

    async updatecheck({ commit }, { skuId, isChecked }) {
        const result = await requpdatecheck(skuId, isChecked)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },

    // 因为目前全选没有接口，只能借用上面单个发请求的函数
    async updatecheckAll({ state, dispatch }, isChecked) {
        let promises = []
        state.shopCarList[0].cartInfoList.forEach(item => {
            if (item.isChecked === isChecked) return
            let promise = dispatch('updatecheck', { skuId: item.skuId, isChecked: isChecked })
            promises.push(promise)
        });
        // Promise.all 是一个方法（函数）  
        // 参数： 一个promise对象的数组
        // 返回值: 一个新的promise对象
        // 新的promise对象的状态是成功还是失败: 
        //如果promise对象的数组当中有一个失败，那么状态就是失败，失败的原因就是第一个失败的promise的原因 
        //如果promise对象的数组当中没有失败，那么状态就是成功，成功的结果是所有的promise成功的结果组成的数组
        return Promise.all(promises)
    },

    async deleteCar({ commit }, skuId) {
        const result = await reqdeleteCar(skuId)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },

    // 删除所有选中的商品  借用上面的接口
    async deleteCarAll({ state, dispatch }) {
        let promises = []
        state.shopCarList[0].cartInfoList.forEach((item) => {
            if (!item.isChecked) return
            let promise = dispatch('deleteCar', item.skuId)
            promises.push(promise)
        })
        return Promise.all(promises)
    }




}

const getters = {
    // 购物车的商品详情
    shopCarList(state) {
        return state.shopCarList[0] || {}
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
} 