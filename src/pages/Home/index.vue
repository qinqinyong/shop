<template>
  <div>
   <TypeNav></TypeNav>
  <ListContainer></ListContainer>
  <TodayRecommend></TodayRecommend>
  <Rank></Rank>
  <Like></Like>
  <Floor v-for="(floor,index) in floorList"  :key='floor.id' :floor="floor"></Floor>
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
  computed:{
      ...mapState({
        recommendList: state => state.home.recommendList,
        floorList: state => state.home.floorList
      })
  },
  mounted(){
      this.$store.dispatch("getrecommend"),
      this.$store.dispatch('getfloorList')
  },
  data() {
    return {

    }
  },
  components:{
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