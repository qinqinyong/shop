
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import Center from '@/pages/Center'
import PaySuccess from '@/pages/PaySuccess'




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
        path: '/addcarsuccess',  
        component: AddCartSuccess,
        
    },
    {
        path: '/shopcart',  
        component: ShopCart,
        
    }, 
    {
        path: '/trade',  
        component: Trade,
        
    }, 
    {
        path: '/paysuccess',  
        component: PaySuccess,
        
    }, 
    {
        path: '/pay',  
        component: Pay,
        
    }, 
    {
        path: '/center',  
        component: Center,
        
    }, 
    {
        path: '/login',
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