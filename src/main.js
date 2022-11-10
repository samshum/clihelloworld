import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')

// 必须引入完整版的Vue
// import Vue from 'vue/dist/vue'
// import App from './App.vue'
// Vue.config.productionTip = false
// new Vue({
//   el: '#app',
//   template: `<App></App>`,
//   components: {App}
// })