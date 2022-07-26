// 管理首页相关数据的vuex子模块

import { reqCategoryList ,reqBannerList,reqFloorList,reqRecommendList} from '@/api'



const state = {
    categoryList: [],
    bannerList: [],
    floorList:[],
    recommendList:[]
}

const mutations = {
    // 接收保存分类列表
    REVICE_CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList.splice(0, 15)
    },

// 接收轮播图数据
    REVICE_BANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
// 接收今日推荐数据
    REVICE_RECOMMENDLIST(state, recommendList) {
        state.recommendList = recommendList
    },
// 接收楼层数据
    REVICE_FLOORLIST(state, floorList) {
        state.floorList = floorList
    }, 



}
const actions = {

    // 获取三级分类列表的异步action
    async getcategoryList({ commit }) {
        // 发异步Ajax请求 调用接口请求函数ryList()
        const result = await reqCategoryList()
        //    如果请求成功了，得到的数据提交给mutations
        if (result.code === 200) {
            const categoryList = result.data
            commit("REVICE_CATEGORYLIST", categoryList)
        }
    },

    // 获取轮播图的异步action
    async getbannerList({ commit }) {
        // 发异步Ajax请求 调用接口请求函数ryList()
        const result = await reqBannerList()
        // console.log(result);
        //    如果请求成功了，得到的数据提交给mutations
        if (result.code === 200) {
            const bannerList = result.data
            commit("REVICE_BANNERLIST", bannerList)
        }
    },
    // 获取今日推荐的异步action
    async getrecommend({ commit }) {
        // 发异步Ajax请求 调用接口请求函数ryList()
        const result = await reqRecommendList()
        // console.log(result);
        //    如果请求成功了，得到的数据提交给mutations
        if (result.code === 200) {
            const recommendList = result.data
            commit("REVICE_RECOMMENDLIST", recommendList)
        }
    },
    // 获取楼层的异步action
    async getfloorList({ commit }) {
        // 发异步Ajax请求 调用接口请求函数ryList()
        const result = await reqFloorList()
        // console.log(result);
        //    如果请求成功了，得到的数据提交给mutations
        if (result.code === 200) {
            const floorList = result.data
            commit("REVICE_FLOORLIST", floorList)
        }
    },

}
const getters = {

}



export default {
    state,
    mutations,
    actions,
    getters,
}