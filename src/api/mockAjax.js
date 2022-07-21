
// 模拟数据
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'



const service = axios.create({
    baseURL: '/mock',  //基础路径
    timeout: 5000  //超时时间5秒
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