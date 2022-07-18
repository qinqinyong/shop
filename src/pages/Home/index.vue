<template>
  <div>
   <TypeNav></TypeNav>
  <ListContainer></ListContainer>
  <TodayRecommend></TodayRecommend>
  <Rank></Rank>
  <Like></Like>
  <Floor></Floor>
  <Floor></Floor>
  <Band></Band>
  </div>

</template>

<script>
import ListContainer from './ListContainer'
import TodayRecommend from './TodyRecommend'
import Floor from './Floor'
import Like from './Like'
import Rank from './Rank'
import Band from './Brand'

export default {
  name: 'Home',
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