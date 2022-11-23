// 安装插件 npm i vue-router@3.6.5
// 在 main.js 中引入插件和自定义路由
// 插件：import vueroute from 'vue-router', Vue.use(vueroute)
// 自定义路由： import router from './router/', 并在Vue初始化时加入路由 new Vue({router})

import VueRouter from 'vue-router'

import NotFound from '../pages/notfound'
import Home from '../pages/home'
import News from '../pages/business/news'
import Message from '../pages/business/message'
import About from '../pages/about'

const router = new VueRouter({
    routes: [
        // muenid 是自定义的数据，为子方便 el-menu 设置当前菜单激活项设置 meta: {keepAlive: true // 缓存}
        {
            path: '/', 
            redirect: '/home'
        },
        { 
            path: '/home',
            component: Home, 
            menuid: '1', 
            meta: {
                keepAlive: false,
                auth:false,
                title:"首页"
            }
        },
        {
            path:'/business/news',
            component: News,
            menuid: '2', 
            meta: {
                keepAlive: false,
                auth:false,
                title:"News/新闻发布"
            },

            // 方式一：直接传键值对方式
            // props:{id:123123, title:'直接传键值对'}
            props:{id:0, title:'默认props传递数据方式'} },

        { 
            path:'/business/news/:id/:title', 
            component: News, 
            menuid: '3', 
            meta: {
                keepAlive: false,
                auth:false,
                title:"News/新闻发布"
            },

            // 方式二：传递 params 方式
            // 当有多项参数传递时，可以开启 props 支持方式，直接通过参数名称来获取参数
            // props只支持params (/business/news/:id/:title) 方式获取参数
            // 当前路由属性的Props为true时，当前路由组件News就可以以props形式接收所有的params参数:id和:title
            // 组件由原先 this.$route.params.id / this.$route.params.title
            // 组件获取数据简写为 props:['id','title'] 就可以直接在页面调用 {{id}}、{{title}}
            props: true },

        { 
            path:'/business/message', 
            component: Message, 
            menuid: '4', 
            meta: {
                keepAlive: true,
                auth:false,
                title:"Message/消息通告"
            },

            // 方式三：传递URL参数方式
            // 本质上跟第一种一样，直接在路由里获取参数，组件中用 props 即可接收
            // 组件获取数据简写为 props:['id','title'] 就可以直接在页面调用 {{id}}、{{title}}
            props({query:{id, title}}){
                return{ id, title }
            }
        },
        { 
            path: '/about',
            component: About,
            menuid: '5', 
            meta: {
                keepAlive: true,
                auth:false,
                title:"About/关于我们"
            }
        },
        { 
            path: '*', 
            component: NotFound 
        }
    ]
})
router.beforeEach((to, from, next)=>{
    document.title = to.meta.title
    next()
})
export default router