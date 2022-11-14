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

// ElementUI 插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// ElementUI
Vue.use(ElementUI);

import App from './App.vue';
Vue.config.productionTip = false;
new Vue({
  render: h => h(App)
}).$mount('#app');