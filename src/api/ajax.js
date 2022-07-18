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


NProgress.start()
NProgress.done()

const service = axios.create({
    baseURL: 'http://gmall-h5-api.atguigu.cn/api',  //基础路径
    timeout: 20000  //超时时间
})


// 请求拦截器
service.interceptors.request.use((config) => {
    NProgress.start()
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

        return Promise.reject(error)
    }
)




// 向外暴露 service
export default service