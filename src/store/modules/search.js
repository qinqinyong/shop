import { reqSearch } from '@/api'


const state = {
    productList: {}  //返回的数据是对象
}

const mutations = {
    // 接受数据
    REVICE_PRODUCTLIST(state, productList) {
        state.productList = productList
    }
}

const actions = {
    //  // 获取搜索产品的异步action
    async getproductList({ commit }, searchParams) {

        // 点击链接时可能有的参数没有选取，为空，所以向后台请求数据前，
        // 去掉searchParams中的空数组或空串，减轻请求负担
        // 因为不想删除search组件中的options中的属性 浅拷贝
        searchParams = {...searchParams}  
        Object.keys(searchParams).forEach((key) => {
            if (searchParams[key] === '' || (Array.isArray(searchParams[key]) && searchParams[key].length === 0)) {
                delete searchParams[key]
            }
        })

        // 发ajax请求
        const result = await reqSearch(searchParams)
        if (result.code === 200) {
            const productList = result.data
            commit("REVICE_PRODUCTLIST", productList)
        }
    }

}

const getters = {
    /* 商品分页列表 */
    goodsList(state) {
        return state.productList.goodsList || []
    },
    /* 属性列表 */
    attrsList(state) {
        return state.productList.attrsList || []
    },
    /* 品牌列表*/
    trademarkList(state) {
        return state.productList.trademarkList || []
    },
    // 搜索结果的总数
    total(state) {
        return state.productList.total || 0

    }
}


export default {
    state,
    mutations,
    actions,
    getters,
}