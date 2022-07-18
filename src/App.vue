<template>
  <div>
    <Header></Header>
    <!-- 所有一级路由都在此显示 -->
    <router-view></router-view>
    <Footer v-show="!$route.meta.isHideFooter"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import {reqCategoryList} from './api'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
   async mounted (){
    // 发送三级商品信息请求
    // reqCategoryList().then(result =>{
    //     console.log("result",result)
    // })
  const result = await reqCategoryList()
  console.log("result",result);

      
   
  

 
  },
  data() {
    return {


    }
  }
}
</script>

<style scoped>
</style>