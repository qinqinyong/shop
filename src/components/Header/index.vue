<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="$store.state.users.userInfo.name">
            <a href="javascript:;">{{ $store.state.users.userInfo.name }}</a>
            <a href="javascript:;" class="register" @click="logout">退出登录</a>
            <!-- <router-link   to="/register">免费注册</router-link> -->
          </p>
          <p v-else>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <!-- <a href="###"></a> -->
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
        <!-- 声明式导航 -->
          <router-link to="/center">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <!-- <a href="###"></a> -->
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <!-- 声明式导航 -->
        <router-link to="/">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <!-- 搜索框 -->
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input v-model="keyword" type="text" id="autocomplete" class="input-error input-xxlarge" />
          <!-- 编程式导航  -->
          <button @click.prevent="search" class="sui-btn btn-xlarge btn-danger">搜索</button>
          <!-- 阻止表单提交的默认行为: .prevent,不加会导致路径出现### -->
          <!-- <button @click="search" class="sui-btn btn-xlarge btn-danger">搜索</button> -->
        </form>
      </div> 
    </div>
  </header>
</template>



<script>
export default {
  name: 'Header',
  methods: {

    //搜索框按钮
    search() {
      const location = {
        name: 'search',
        query: this.$route.query //将已有的query参数带上
      }
      if (this.keyword.trim()) { //去除搜索框空格
        location.params = { keyword: this.keyword }
      }

      // 解决编程式导航重复跳转报错方法1
      // this.$router.push(location,()=>{})
      // 解决编程式导航重复跳转报错方法2
      // this.$router.push(location).catch(()=>{})
      // 解决编程式导航重复跳转报错方法3: 重写push方法

      //从其它页到搜索用push(),从搜索页到搜索页用replace()
      if (this.$route.name === 'search') {
        this.$router.replace(location)
      } else {
        this.$router.push(location)
      }
    },

    // 退出登录
    async logout() {
      try {
        await this.$store.dispatch('userLogout')
        alert('退出成功')
        this.$router.push('/')  //退出成功回到首页
      } catch (error) {
        alert(error.message)
      }
    },
  },
  mounted() {
    // 2.在header组件中绑定事件监听，在回调中清除keyword
    this.$bus.$on('removeKeyword', () => {
      this.keyword = ''
    })
  },
  beforeDestroy() { //4.在header组件死亡之前解绑事件  //防止内存泄露溢出
    this.$bus.off('removeKeyword')
  },
  data() {
    return {
      keyword: '',
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  &>.top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          &+a {
            border-left: 1px solid #b3aeae;
          }
        }

      }

    }
  }

  &>.bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style> 