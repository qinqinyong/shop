
// import Home from '@/pages/Home'
const Home = () => import('@/pages/Home')  //路由懒加载
const Search = () => import('@/pages/Search')  //路由懒加载

import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import Center from '@/pages/Center'
import PaySuccess from '@/pages/PaySuccess'
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'

import store from '@/store'




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
        // 路由独享的守卫
        beforeEnter: (to, from, next) => {
            // 只有携带skuNum以及sessionStorage存储了skuInfo才能去成功添加购物车界面
            let skuNum = to.query.skuNum
            let skuInfo = sessionStorage.getItem('SKUINFO_KEY')
            if (skuNum && skuInfo) {
                next()
            } else {
                alert('请选购商品')
                next('/')
            }
        }

    },
    {
        path: '/shopcart',
        component: ShopCart,
    },
    {
        path: '/trade',
        component: Trade,
        // 路由独享的守卫
        beforeEnter: (to, from, next) => {
            //只能从购物车页面才能跳到交易页面
            if (from.path === '/shopcart') {
                next()
            } else {
                next('/')
            }
        }

    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        // 路由独享的守卫
        beforeEnter: (to, from, next) => {
            // 只有支付界面才能跳转到支付成功界面
            if (from.path === '/pay') {
                next()
            } else {
                next('/')
            }
        }

    },
    {
        path: '/pay',
        component: Pay,
        // 路由独享的守卫
        beforeEnter: (to, from, next) => {
            // 只有交易页面才能跳转到支付界面
            if (from.path === '/trade') {
                next()
            } else {
                next('/')
            }
        }

    },
    {
        path: '/center',
        component: Center,
        redirect: '/center/myorder', //指定默认路由
        children: [
            {
                path: 'myorder',
                component: MyOrder,  //二级路由
            },
            {
                path: 'grouporder',
                component: GroupOrder,
            },
        ]

    },
    {
        path: '/login',
        component: Login,
        meta: {
            isHideFooter: true, //设置登录页隐藏底部
        },
        // 路由独享的守卫
        beforeEnter: (to, from, next) => {
            // 只有没登录才能看到登录界面
            let token = store.state.users.token
            if (token) {
                next('/') //有token代表登录了，只能去首页
            } else {
                next() //放行 去登录
            }
        }

    },
    {
        path: '/register',
        component: Register,
        meta: {
            isHideFooter: true //设置登录页隐藏底部
        }
    },
    {
        path: '/search/:keyword?',  //   ？代表正则 参数keyword可有可无
        component: Search,
        name: 'search'
    },
]