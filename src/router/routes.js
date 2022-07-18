
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'

import Brand from '@/pages/Home/Brand'
import Floor from '@/pages/Home/Floor'
import Like from '@/pages/Home/Like'
import ListContainer from '@/pages/Home/ListContainer'
import Rank from '@/pages/Home/Rank'
import TodyRecommend from '@/pages/Home/TodyRecommend'


export default [
    {
        path: '/', //根路径
        component: Home,
        children:[
            {
                path:'brand',
                component:Brand
            },
            {
                path:'Floor',
                component:Floor
            },
            {
                path:'Like',
                component:Like
            },
            {
                path:'ListContainer',
                component:ListContainer
            },
            {
                path:'Rank',
                component:Rank
            },
            {
                path:'TodyRecommend',
                component:TodyRecommend
            },
            
        ]
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