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


export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  
}
</script>

<style scoped>
</style>