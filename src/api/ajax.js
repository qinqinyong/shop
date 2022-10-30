/* 
对axios二次封装
1. 配置通用的基础路径和超时
2. 显示请求进度条
3. 成功返回的数据不再是response, 而直接是响应体数据response.data
4. 统一处理请求错误, 具体请求也可以选择处理或不处理
*/

import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import store from '@/store'

const service = axios.create({
    baseURL: 'http://gmall-h5-api.atguigu.cn/api',  //基础路径
    timeout: 5000  //超时时间5秒
})


// 
// 一般在 请求拦截器中只干两件事 1.添加额外功能  2.操作请求头
service.interceptors.request.use((config) => {

    NProgress.start()  //添加进度条功能

    // 携带临时标识 获得购物车信息
    let userTempId = store.state.users.userTempId
    if (userTempId) {
        config.headers.userTempId = userTempId  //操作请求体，带上uuid标识
    }

    // 携带token
    let token = store.state.users.token
    if (token) {
        config.headers.token = token 
    }
  
    // 必须返回config
    return config  //后面就会根据返回的config，使用xhr对象发送Ajax请求
})


// 响应拦截器
service.interceptors.response.use( 
    response => {
        NProgress.done()
        return response.data
    },
    error => {
        NProgress.done()

        // 统一处理一下错误
        alert(error.message || '未知的请求错误')

        return Promise.reject(error)   //错误传递下去
    }
)




// 向外暴露 service
export default service