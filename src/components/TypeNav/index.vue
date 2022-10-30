<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 外层新加的div -->
      <div @mouseenter="showFirst" @mouseleave="hiddFirst">
        <h2 class="all">全部商品分类</h2>
        <transition name="slide">
          <div class="sort" v-show="isShowFirst">
            <div @click="toSearch" class="all-sort-list2">
              <div class="item" v-for="(c1, index) in categoryList" :key='c1.categoryId'
                :class="{ active: currentIndex === index }" @mouseenter="showSubList(index)">
                
                <h3>
                  <!-- <a @click="$router.push(`/search?categoryName=${c1.categoryName}&categoryId=${c1.categoryId}`)"   href="javascript:">{{c1.categoryName}}</a> -->
                  <!-- <router-link :to="`/search?categoryName=${c1.categoryName}&categoryId=${c1.categoryId}`">{{ c1.categoryName }} </router-link>  -->
                  <a class="category" :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId"  href="javascript:;"> {{c1.categoryName}}</a>
                </h3>

                <div class="item-list clearfix"> 
                  <div class="subitem">
                    <dl class="fore" v-for="(c2, index) in c1.categoryChild" :key='c2.categoryId'>
                      <dt>
                        <!-- <a  @click="$router.push(`/search?categoryName=${c2.categoryName}&categoryId=${c2.categoryId}`)"  href="javascript:">  {{ c2.categoryName }}</a> -->
                        <!-- <router-link :to="`/search?categoryName=${c2.categoryName}&categoryId=${c2.categoryId}`"> {{ c2.categoryName }} </router-link> -->
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId" href="javascript:;"> {{c2.categoryName}}</a>
                      </dt>
                      <dd>
                        <em v-for="(c3, index) in c2.categoryChild" :key='c3.categoryId'>
                          <!-- <a  @click="$router.push(`/search?categoryName=${c3.categoryName}&categoryId=${c3.categoryId}`)"  href="javascript:">  {{ c3.categoryName }}</a> -->
                          <!-- <router-link :to="`/search?categoryName=${c3.categoryName}&categoryId=${c3.categoryId}`">{{ c3.categoryName }} </router-link> -->
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId" href="javascript:;">{{c3.categoryName}}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// import _ from 'lodash'  //引入打包整个lodash库
import throttle from 'lodash/throttle'  //按需引入节流函数
import { mapState } from 'vuex'
export default {
  name: 'TypeNav',
  created() { 
    
    // 分发请求获取分类列表的异步action
    this.$store.dispatch('getcategoryList')
    
    //如果写在mounted里面会导致界面多更新一次
    // 判断当前路径是否为首页，是的话则展示一级列表内容
    const path = this.$route.path
    if (path === '/') {
      this.isShowFirst = true
    }
  },
  data() {
    return {
      isShowFirst: false,
      currentIndex: -2 //需要显示的子分类项列表的下标
    }
  },
  methods: {

    // 鼠标移入显示一级列表
    showFirst() {
      this.currentIndex = -1  //-1: 进入了整个div, 但还没有进入分类项上
      this.isShowFirst = true
    },

    // 鼠标移出隐藏一级列表
    hiddFirst() {
      this.currentIndex = -2  // -2: 出了整个div
      // 判断防止关闭首页展示的一级列表
      if (this.$route.path !== '/') {
        this.isShowFirst = false
      }
    },


    // 给一级分类列表加上    节流函数
    showSubList: throttle(function (index) {
      //只有当还没离开整个分类的div时才更新下标
      if (this.currentIndex !== -2) {
        this.currentIndex = index
      }
    }, 200),  //最后一次事件延迟200毫秒处理

      // 解决快速移出后可能显示第一个分类的子分类列表的bug
      //设计currentIndex有3种值
      // -2: 出了整个div
      // -1: 进入了整个div, 但还没有进入分类项上
      // >=0: 光标在某个分类项上(只有当不为-2才更新)

    // 在这里声明式和编程式导航效率 较低
    //  利用事件的委派切换导航 利用标签自定义属性携带动态数据
    toSearch(event) {
      // 得到事件源标签上的自定义属性   输出的属性名变为小写了！！！
      const { categoryname, category1id, category2id, category3id } = event.target.dataset
      // 如果有分类名称, 说明点击的是某个具体的分类项
      if (categoryname) {
        // 准备query参数
        const query = { categoryName: categoryname }
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else if (category3id) {
          query.category3Id = category3id
        }

        const location = {
          name: 'search',
          query,
          params: this.$route.params
        }

        //从其它页到搜索用push(),从搜索页到搜索页用replace()
        if (this.$route.name === 'search') {
          this.$router.replace(location)
        } else {
          this.$router.push(location)
        }

        // 隐藏一级列表
        this.hiddFirst()
      }
    }


  },
  computed: {
    // 方法一 $store.state读取数据
    // categoryList(){
    //   return this.$store.state.home.categoryList
    // }
    // 方法二   mapState()读取数据   多模块编程不能直接用数组展开了
    ...mapState({
      categoryList: state => state.home.categoryList
    })

  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      // 过渡时的样式
      &.slide-enter-active,
      &.slide-leave-active {
        transition: all 0.3s;
      }

      // 隐藏时的样式
      &.slide-enter,
      &.slide-leave-to {
        opacity: 0;
        height: 0;
      }


      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;

            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.active {
            background-color: skyblue;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>