<template>
  <div>
    <TypeNav />

    <div class="main">
      <div class="py-container">
        <!--bread 面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="options.categoryName">
              {{ options.categoryName }}
              <i @click="removeCategory">×</i>
            </li>
            <li class="with-x" v-if="options.keyword">
              {{ options.keyword }}
              <i @click="removeKeyword">×</i>
            </li>
            <li class="with-x" v-if="options.trademark">
              {{ options.trademark }}
              <i @click="removeTrademark">×</i>
            </li>
            <li class="with-x" v-for="(prop, index) in options.props" :key='prop'>
              {{ prop }}
              <i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector :setTrademark="setTrademark" @addprops='addprops' />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- order: '1:desc' -->
                <li :class="{ active: orderArry[0] === '1' }" @click="setOrder('1')">
                  <a href="javascript:">
                    综合
                    <i class="iconfont" :class="orderArry[1] === 'desc' ? 'icon-down' : 'icon-up'"
                      v-if="orderArry[0] === '1'"></i>
                  </a>
                </li>
                <li :class="{ active: orderArry[0] === '3' }" @click="setOrder('3')">
                  <a href="javascript:">
                    销量
                    <i class="iconfont" :class="orderArry[1] === 'desc' ? 'icon-down' : 'icon-up'"
                      v-if="orderArry[0] === '3'"></i>
                  </a>
                </li>
                <li :class="{ active: orderArry[0] === '2' }" @click="setOrder('2')">
                  <a href="javascript:">
                    价格
                    <i class="iconfont" :class="orderArry[1] === 'desc' ? 'icon-down' : 'icon-up'"
                      v-if="orderArry[0] === '2'"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(item, index) in goodsList" :key='item.id'>

                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 路由携带商品id -->
                    <router-link :to="'/detail/'+item.id">
                    <!-- 图片懒加载 :src 替换为v-lazy-->
                      <!-- <img :src="item.defaultImg" /> -->
                      <img v-lazy ="item.defaultImg" />
                    </router-link>
                    <!-- <a href="javascript:"></a> -->
                  </div>
                  <div class="price"> 
                    <strong>
                      <em>¥ </em> 
                      <i>{{ item.price }}</i>
                    </strong>
                  </div> 
                  <div class="attr">
                     <router-link :to="'/detail/'+item.id">
                      {{ item.title }}
                    </router-link>
                    <!-- <a target="_blank" href="javascript:">{{ item.title }}</a> -->
                  </div>  
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate"> 
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>

            </ul>
          </div>
          <!-- 分页 -->
          <myPagination 
            :currentPage="options.pageNo" 
            :total="total" 
            :pageSize="options.pageSize" 
            :showPageNo="5"
            @currentChange="currentChange" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import SearchSelector from './SearchSelector/SearchSelector'
export default {
  name: 'Search',
  components: {
    SearchSelector
  },
  data() {
    return {
      options: {
        category1Id: '', // 一级分类ID
        category2Id: '', // 二级分类ID
        category3Id: '', // 三级分类ID
        categoryName: '', // 分类名称
        keyword: '', // 搜索关键字

        trademark: '', // 品牌: "ID:品牌名称" "1:苹果"
        props: [], // 商品属性的数组: ["属性ID:属性值:属性名"] ["2:6.0～6.24英寸:屏幕尺寸"]
        order: '1:desc', // 排序方式  1: 综合,2: 价格 asc: 升序,desc: 降序  "1:desc"

        pageNo: 1, // 页码
        pageSize: 5, //	每页数量
      }
    }
  },
  // 在created中收集数据到options中，并发送搜索请求
  // created() {
  //   this.updateParams()
  //   this.getShopList()
  // },
  computed: {
    // ...mapState({
    //   goodsList: state => state.search.productList.goodsList
    // }),

    ...mapGetters(["goodsList",'total']),

    // 得到包含当前分类项标识(orderFlag)和排序方式(orderType)的数组
    orderArry() {
      return this.options.order.split(':')
    }

  },
  methods: {

    // 当前页码更新的回调
    currentChange(page) {
      this.options.pageNo = page
      // 重新发送请求
      this.getShopList()
    },

    // 更新options中的属性属性
    updateParams() {
      // 从路由信息中取出数据
      const { keyword } = this.$route.params
      const { category1Id, category2Id, category3Id, categoryName } = this.$route.query
      this.options = {
        ...this.options, //取出options所有属性，新值覆盖旧值
        keyword,
        category1Id,
        category2Id,
        category3Id,
        categoryName
      }
    },

    // 发送请求  搜索商品的异步action
    getShopList() {
      this.$store.dispatch('getproductList', this.options)
    },

    // 删除面包屑categoryName 三级分类搜索
    removeCategory() {
      //  更新分类数据
      this.options.category1Id = ''
      this.options.category2Id = ''
      this.options.category3Id = ''
      this.options.categoryName = ''
      // 删除面包屑的同时，重置路由地址栏参数信息 
      this.$router.replace({
        name: 'search',
        params: this.$route.params 
        //以前的query参数不要了
      })

    },
    // 删除面包屑keyword
    removeKeyword() {
      this.options.keyword = ''
      this.$router.replace({
        name: 'search',
        query: this.$route.query //以前的params参数不要了
      })
      //删除面包屑的同时，清除head组件搜索框的内容
      this.$bus.$emit('removeKeyword') // 3.在search组件中分发事件
    },

    // 设置品牌条件   通信方式：子相父 自定义事件
    setTrademark(trademark) {
      // 如果当前品牌已存在条件中，则直接结束
      if (trademark === this.options.trademark) return
      // 跟新数据
      this.options.trademark = trademark
      // 发送请求
      this.getShopList()

    },
    // 删除品牌面包屑
    removeTrademark() {
      // 重置品牌条件数据
      this.options.trademark = ''
      //  重新获取请求
      this.getShopList()
    },

    //添加商品属性条件 通信方式：子相父 自定义事件
    addprops(prop) {
      const {props} = this.options
      // console.log(props);
      // 如果当前商品属性已存在条件中，则直接结束
      if (props.includes(prop)) return
      // 向props数组中添加传递的字符串
      props.push(prop)
      // 重新发送请求
      this.getShopList()
    },
    
    // 删除商品属性面包屑
    removeProp(index) {
      // 重置商品属性条件数据
      this.options.props.splice(index, 1)
      //  重新获取请求
      this.getShopList()
    },

    // 设置新的排序项
    setOrder(orderFlag) {
      // order: '1:desc', // 排序方式  1: 综合,2: 价格 asc: 升序,desc: 降序  
      // 取出原有的标识
      let [flag, type] = this.orderArry

      //如果点击的是当前排序项 则只更新排序方式
      if (orderFlag === flag) {
        type = type === 'desc' ? 'asc' : 'desc'
      } else {
        // 不是当前项  则更新为传入的指定值 默认为降序
        flag = orderFlag
        type = 'desc'
      }

      this.options.order = flag + ':' + type
      this.getShopList()
    }


  },
  watch: {
    $route: { // 对路由信息变化作出响应...
      handler() {
        this.updateParams()
        this.getShopList()
      },
      immediate: true 
      //问题: 当前已经在搜索页面, 再添加别的搜索条件, 不会再发请求?
      //原因: 对于关键字搜索和分类搜索 从搜索跳转到搜索, 搜索组件对象不会重新创建, 初始化的勾子不会重新执行 ==> 不会再发请求
      //初始化立即执行第一次 不用再created方法中发请求了
    }
  }

}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>