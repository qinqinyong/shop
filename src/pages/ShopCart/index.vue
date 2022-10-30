<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="( cartInfo, index) in cartInfoList" :key='cartInfo.id'>
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cartInfo.isChecked" @click="updateCheckOne(cartInfo)">
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl">
            <div class="item-msg">{{ cartInfo.skuName }}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeCartNum(cartInfo, -1, true)">-</a>
            <input autocomplete="off" type="text" :value="cartInfo.skuNum" minnum="1" class="itxt"
              @change="changeCartNum(cartInfo, $event.target.value * 1, false)">
            <a href="javascript:void(0)" class="plus" @click="changeCartNum(cartInfo, 1, true)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.skuNum * cartInfo.cartPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="deleateCarOne(cartInfo)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>

      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isAllCheck">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleateCheckedAll()">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{ checkedNum }}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费):</em>
          <i class="summoney">{{ allMoney }}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn">结算</router-link>
          <!-- <a  href="###" target="_blank">结算</a> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'ShopCart',
  mounted() {
    this.getcarList()
  },

  methods: {
    getcarList() {
      this.$store.dispatch('getcarList')
    },

    // 更改数量发请求   把数量的改变值disNum传给后台  若为正值则在原有上加disNum ，负值则减disNum  并返回数据给前台
    async changeCartNum(cartInfo, disNum, flag) {
      // 根据标识判断直接修改input值    
      if (!flag) { //进入判断表明在input框里修改
        if (disNum > 0) {
          disNum = disNum - cartInfo.skuNum
        } else {
          disNum = 1 - cartInfo.skuNum
        }
      } else {
        // 进入则表明是操作加减来改变数值的
        if (disNum + cartInfo.skuNum <= 0) {
          disNum = 1 - cartInfo.skuNum
        }
      }

      //把传递过来的数据全部转化为正确的变化的量之后就可以发请求
      try {   //把参数传给后台
        await this.$store.dispatch('addOrUpdateCar', { skuId: cartInfo.skuId, skuNum: disNum })
        alert('修改数量成功')
        this.getcarList()
      } catch (error) {
        alert(error.message)
      }

    },

    //选中商品
    async updateCheckOne(cartInfo) {
      try {
        await this.$store.dispatch('updatecheck', { skuId: cartInfo.skuId, isChecked: cartInfo.isChecked ? 0 : 1 })
        alert('成功修改选择状态')
        this.getcarList()
      } catch (error) {
        alert(error.message)
      }
    },

    // 删除某个商品
    async deleateCarOne(cartInfo) {
      try {
        await this.$store.dispatch('deleteCar', cartInfo.skuId)
        alert('删除成功')
        this.getcarList()
      } catch (error) {
        alert(error.message)
      }

    },

    // 删除所有选中商品  同样借用上面的接口
    async deleateCheckedAll() {
      try {
        await this.$store.dispatch('deleteCarAll')
        alert('删除多个成功')
        this.getcarList()
      } catch (error) {
        alert(error.message)
      }
    }

  },
  computed: {
    ...mapGetters(['shopCarList']),

    // 购物车数据
    cartInfoList() {
      return this.shopCarList.cartInfoList || []
    },

    // 已选择商品数量   有返回值的一定要写在计算方法内
    checkedNum() {
      return this.cartInfoList.reduce((prev, item) => {
        if (item.isChecked) {
          prev += item.skuNum
        }
        return prev
      }, 0)
    },

    //   总价格
    allMoney() {
      return this.cartInfoList.reduce((prev, item) => {
        if (item.isChecked) {
          prev += item.skuNum * item.cartPrice
        }
        return prev
      }, 0)
    },

    // 全选
    isAllCheck: {
      // 当选中全选按钮时，选中所有商品
      get() {        //数组的every方法 遍历所有数组
        return this.cartInfoList.every((item) => item.isChecked) && this.cartInfoList.length>0
      },

      
      async set(val) {  //val实际拿的是布尔值，参数需要数字
        // this.$store.dispatch('updatecheckAll',val?1:0) 是调用updatecheckAll异步函数
        // 它的结果拿的是异步函数的返回值 固定的那个promise，不是函数return后面Promise.all的返回值promise
        // 但是这个promise的结果和return后面Promise.all的返回值promise的状态结果一致
        try {
          const result = await this.$store.dispatch('updatecheckAll', val ? 1 : 0)
          alert('修改所有的状态成功')
          this.getcarList()
        } catch (error) {
          alert(error.message)
        }
      }
    }

  }

}
</script>    

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 13%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }



        .cart-list-con4 {
          width: 10%;

        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>