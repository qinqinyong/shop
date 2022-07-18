const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave:'warning' //输出错误，但项目继续运行

  // 配置代理
  // devServer: {
  //   proxy: {
  //     '/api': { // 只对请求路由以/api开头的请求进行代理转发
  //       target: 'http://182.92.128.115', // 转发的目标url
  //       changeOrigin: true // 支持跨域
          // pathRewrite: {"^/api": ""}
  //     } 
  //   }  
  // },
})
