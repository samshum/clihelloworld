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
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);

new Vue({
  render: h => h(App)
}).$mount('#app');