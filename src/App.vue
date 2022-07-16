<template>
   <div>
     <Header></Header>
     <!-- 所有一级路由都在此显示 -->
     <router-view></router-view> 
    <Footer></Footer>
   </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: '',
  components:{

  },
  data(){
    return {
     Header,
     Footer
   
    }
  }
}
</script>

<style scoped>

</style>