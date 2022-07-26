
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'




export default [
    {
        path: '/', //根路径
        component: Home,
        
    },
    {
        path: '/detail/:skuId',  //详情页携带商品id
        component: Detail,
        
    },
    {
        path: '/Login',
        component: Login,
        meta:{
            isHideFooter:true  //设置登录页隐藏底部
        }
    },
    {
        path: '/register',
        component: Register,
        meta:{
            isHideFooter:true //设置登录页隐藏底部
        }
    },
    {
        path: '/search/:keyword?',  //正则 可以为空
        component: Search,
        name:'search'
    },
]