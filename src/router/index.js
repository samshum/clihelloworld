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
import JSIndex from '../pages/javascript/'


// // 方式一：直接传键值对方式
// // props:{id:123123, title:'直接传键值对'}
// props:{id:0, title:'默认props传递数据方式'} },

// // 方式二：传递 params 方式
// // 当有多项参数传递时，可以开启 props 支持方式，直接通过参数名称来获取参数
// // props只支持params (/business/news/:id/:title) 方式获取参数
// // 当前路由属性的Props为true时，当前路由组件News就可以以props形式接收所有的params参数:id和:title
// // 组件由原先 this.$route.params.id / this.$route.params.title
// // 组件获取数据简写为 props:['id','title'] 就可以直接在页面调用 {{id}}、{{title}}
// props: true

// // 方式三：传递URL参数方式
// // 本质上跟第一种一样，直接在路由里获取参数，组件中用 props 即可接收
// // 组件获取数据简写为 props:['id','title'] 就可以直接在页面调用 {{id}}、{{title}}
// props({query:{id, title}}){ return{ id, title }}

const router = new VueRouter({
    mode: 'history',
    routes: [
        // muenid 是自定义的数据，为子方便 el-menu 设置当前菜单激活项设置 meta: {keepAlive: true // 缓存}
        {path: '/', redirect: '/home'},

        {path: '/home',                     meta: {keepAlive: false,auth:false, title:"首页" }, 
                                            component: Home,        menuid: '1' },

        {path:'/business/news',             meta: {keepAlive: false,auth:false, title:"News/新闻发布"},
                                            component: News,        menuid: '2',    props:{id:0, title:'默认props传递数据方式'} },

        {path:'/business/news/:id/:title',  meta: {keepAlive: false, auth:false, title:"News/新闻发布"},
                                            component: News,        menuid: '3',    props: true ,
                                            beforeEnter: (to, from, next) => {
                                                // 这是独享路由守卫, 仅以前置。
                                                // 直接在路由里面设置拦截，跟 router.beforeEach 在外面写方式一样。
                                                next()
                                            }},

        {path:'/business/message',          meta: {keepAlive: true,  auth:false, title:"Message/消息通告" },
                                            component: Message,     menuid: '4',    props({query:{id, title}}){ return{ id, title }}},

        {path: '/about',                    meta: {keepAlive: true,  auth:false, title:"About/关于我们" },
                                            component: About,       menuid: '5',    props({query:{id, title}}){return{ id, title }}},

        {path: '/javascript/:str',          meta: {keepAlive: false, auth:false, title:"Javascript/Markdown"},
                                            component: JSIndex,     menuid: '6',    props: true},

        {path: '*', component: NotFound}
    ]
})

// 全局前置路由守卫
// router.beforeEach
// router.beforeResolve
// router.afterEach

// 单个路由独享
// beforeEnter

// 组件级,写在组件里
// beforeRouteEnter
// beforeRouteUpdate
// beforeRouteLeave

// 1.导航被触发
// 2.在失活的组件里调用离开守卫。
// 3.调用全局的 beforeEach 守卫。
// 4.在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
// 5.在路由配置里调用 beforeEnter。
// 6.解析异步路由组件。
// 7.在被激活的组件里调用 beforeRouteEnter。
// 8.调用全局的 beforeResolve 守卫 (2.5+)。
// 9.导航被确认。
// 10.调用全局的 afterEach 钩子。
// 11.触发 DOM 更新。
// 12.用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。

// 全局前置路由守卫
router.beforeEach((to, from, next)=>{
    // 这里也可以做相关权限设置相关的工作，如果没有权限的话，取消 next() 操作
    // 可以路由加多2个name/auth选项，通过这里to.name和to.auth就可以判断当前路由是否需要权限校验及业务逻辑处理
    // if(登录){
    //     next()
    //  }else{
    //      next({ name: 'login' }); 
    //  }
    
    next()
})

// 全局后置路由守卫仅有全局才有， 在路由属性里面设置（独享路由），这个事件是无效的
router.afterEach((to, from)=>{
    if(to.meta.title){
        document.title = to.meta.title
    }
})

export default router