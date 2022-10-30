<template>
  <!-- 轮播图 -->
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(skuImage, index) in skuImageList" :key='skuImage.id'>
        <img :src="skuImage.imgUrl" :class="{ active: index === defaultIndex }" @click="changeDefaultIndex(index)">
      </div>
    </div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>

</template>

<script>

import Swiper from 'swiper'
export default {
  name: "ImageList",
  props: ['skuImageList'],
  data() {
    return {
      defaultIndex: 0 //设置图片默认下标
    }
  },
  methods: {
    changeDefaultIndex(index) {
      this.defaultIndex = index
      // 分发全局事件总线   把index传递给zoom
      this.$bus.$emit('syncIndex', index)
    }
  },
  watch: {
    skuImageList: {
      handler() {
        this.$nextTick(() => {
          new Swiper(this.$refs.swiper, {

            slidesPerView: 4,  //配置项 设置每组展示图片数
            slidesPerGroup: 3,
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })
        })
      }

    }
  },
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;

    &::after {
      font-size: 12px;
    }
  }
}
</style>