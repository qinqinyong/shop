<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="(floor, index) in floorList" :key='floor.id' :floor="floor"></Floor>
    <Band></Band>
  </div>

</template>
        
<script>
import { mapState } from 'vuex'
import ListContainer from './ListContainer'
import TodayRecommend from './TodyRecommend'
import Floor from './Floor'
import Like from './Like'
import Rank from './Rank'
import Band from './Brand'

export default {
  name: 'Home',
  computed: {
    //... ...mapState(['floorList']) 这种方式只能适用于从总的state中取数据，但用了模块化就不能用了
    ...mapState({  
      floorList: state => state.home.floorList
    })
  },
  mounted() {
    // 在这里发送请求获取数据，因为在当前组件需要这数据，通过props方式传递给子组件
    this.$store.dispatch('getfloorList')
  },
  data() {
    return {

    }
  },
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Band
  }
}
</script>

<style lang="less" scoped>
</style>