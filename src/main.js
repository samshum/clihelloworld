// 所有代码执行都需要先完成 import 的引入先，ES6的代码执行机制
// npm view 插件名称 versions

// 必须引入完整版的Vue
// import Vue from 'vue/dist/vue'
// import App from './App.vue'
// Vue.config.productionTip = false
// new Vue({
//   el: '#app',
//   template: `<App></App>`,
//   components: {App}
// })
import Vue from 'vue';

// 全局混合模式，直接在main.js中定义并使用
// import {mixinfun} from './mixin'
// Vue.mixin(mixinfun)
import {mixinfun} from './mixin'
Vue.mixin(mixinfun)

// 引入插件
import plugins from './plugins'
Vue.use(plugins, "Main.js引入插件时定义时进行初始化传参1", "初始化传参2", "初始化传参3");

// ElementUI 插件, 需要先安装，具体看官方文档
// 这里完全装载，可以定制自定义加载
//import '../theme/index.css' // 引入自定义样式
import ElementUI from 'element-ui';
Vue.use(ElementUI);

// 自定义格式化日期处理插件
import datePipe from './extends/datePipe'
Vue.use(datePipe)

// 引入 Vuex, 并把它放入Vue初始化对象中使用, 如: new Vue({ store })
import store from './stores'

// Router
// 引入组件
import vueroute from 'vue-router'
Vue.use(vueroute)
// 引入自定义路由
import router from './router'

import App from './App.vue';
Vue.config.productionTip = false;

const vm = new Vue({
  router: router || NoFound,
  store,
  render: h => h(App),
  // 全局事件总线定义：
  // 1. 解决平等组件点到点的通信，适用于任意组件之间的通讯
  // 2. 全局事件总线安装
  //    在Main.js入口把通过Vue的beforeCreate入口函数把$bus安装到Vue
  // 3. 在需要接收的A组件中绑定自定义事件，提供回调函数，并设置事件卸载方式
  //    mounted(){
  //        this.$bus.$on('globalEventBus', (data)=>{
  //          this.globalEventBusName = data
  //          console.log('@globalEventBus', this, data)
  //      })
  //    },
  //    beforeDestroy(){
  //      this.$bus.$off('globalEventBus')
  //    }
  // 4. 在发送数据B组件中通过 this.$bus.$emit("A组件的回调函数名称", 参数数据)
  beforeCreate(){
    Vue.prototype.$bus = this
  }
}).$mount('#app')

//console.log('@main', vm)