<template>
  <div class="spec-preview">
    <!-- 图片不要直接写啊a[0].b 数组可能为空会报错  需要在计算中加工数据-->
    <img :src="defaultImg.imgUrl" />
    <!-- 承接事件的盒子 -->
    <div class="event" @mousemove="move"></div>
    <!-- 右边展示大图 -->
    <div class="big">
      <img :src="defaultImg.imgUrl" ref="big" />
    </div>
    <!-- 蒙板 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ['skuImageList'],
  data() {
    return {
      defaultIndex: 0 //显示图片的默认下标
    }
  },
  computed: {
    defaultImg() { //在计算中加工数据，解决假的报错
      return this.skuImageList[this.defaultIndex] || {}
    }
  },
  mounted() {
    // 触发全局事件总线事件
    this.$bus.$on('syncIndex', this.syncIndex)
  },
  methods: {
    syncIndex(index) {
      return this.defaultIndex = index
    },

    // 图片移动展示
    move(event) {
      // 1. 获取鼠标的坐标
      let moveX = event.offsetX
      let moveY = event.offsetY

      // 2.计算蒙板的位置  蒙板到边界的距离
      let mask = this.$refs.mask
      let maskX = moveX - mask.offsetWidth / 2
      let maskY = moveY - mask.offsetHeight / 2

      // 判断边界
      if (maskX < 0) {
        maskX = 0
      } else if (maskX > mask.offsetWidth) { //蒙板可移动的范围刚好等于自身宽度
        maskX = mask.offsetWidth
      }
      if (maskY < 0) {
        maskY = 0
      } else if (maskY > mask.offsetHeight) {
        maskY = mask.offsetHeight
      }


      // 重设蒙板位置
      mask.style.left = maskX + 'px'
      mask.style.top = maskY + 'px'

      // 3.设置大图的移动  因大图是蒙板的二倍，因此其移动的距离是蒙板反向移动距离的两倍
      let big = this.$refs.big
      big.style.left = -maskX * 2 + 'px'
      big.style.top = -maskY * 2 + 'px'

    }
  }

}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover~.mask,
  .event:hover~.big {
    display: block;
  }
}
</style>