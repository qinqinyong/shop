<template>
  <div>
    <Header></Header>
    <!-- 所有一级路由都在此显示 -->
    <router-view></router-view>
    <!-- meta配置在routes.js文件中配置 -->
    <Footer v-show="!$route.meta.isHideFooter"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
// import { reqCategoryList } from './api'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 发送三级商品信息请求   async 必须加在mounted前
    // reqCategoryList().then(result =>{
    //     console.log("result",result)
    // })

    // async 必须加在mounted前
    // const result = await reqCategoryList()
    // console.log("result",result); 

    // 分发请求获取分类列表的异步action
    this.$store.dispatch('getcategoryList')

    // 分发请求获取轮播图的异步action
    this.$store.dispatch('getbannerList')


  },
  data() {
    return {


    }
  }
}
</script>

<style scoped>
</style>