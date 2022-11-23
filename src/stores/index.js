// Vuex 解决各个组件之前双向操作问题，获取/设置 传递的值
// 1. 安装Vuex, 注意版本号问题 vue2对应vuex3,vue3对应vuex4
//      npm install vuex@3.6.2 --save
// 2. 在 main.js 中使用插件机制引入vuex, 并将引入的store放入到Vue的初始化对象中
//      import store from './store'
//      new Vue({store})
// 3. 在index.js中初始化 store 对象
// 4. 完成以上操作store基本开发环境就完成了，$store这个对象就完整嵌入到Vue和VC对象身上

import Vue from 'vue'

import vuex from 'vuex'
Vue.use(vuex)

// 定义Vuex的三个对象集 Actions/Mutations/State
// 组件请求发起顺序：
//      -(dispatch)->ACTIVES-(commit)->MUTATIONS-(直接操作)->STATES->RerderDOM
//      -(commit)->MUTATIONS-(直接操作)->STATES->RerderDOM
// 如果没有网络请求或其它业务逻辑，组件可以跳过Actions，不写dispatch，直接用commit调用Mutation

// 业务API处理
// 获取AXIOS/AJAX远程服务接口数据，返回并处理完成后，再调用commit提交到mutation
// 如果不需要业务处理，可以在业务执行处直接调用 mutation 方法即可。
const actions = {
    add(context, value){
        console.log('@action value:',value)
        context.commit('ADD', value)
    }
}
// 数据State整理
const mutations = {
    ADD(contextState, value){
        console.log('@mutation context', contextState)
        //console.log('@mutation params:',value)
        contextState.form.name = value.name
        if(value){
            contextState.form.code = value.code
            contextState.form.value += value.code
        }else{
            contextState.form.value++
        }
    }
}
// 类似Data作用
const state = {
    form:{
        name: 'Form Store',
        code: 8,
        value: 0,
        students: []
    }
}

// 类似计算属性computed,对指定数据项进行加工处理
const getters = {
    sum(state){
        return ((state.form.value + state.form.code) * state.form.code)/3.1415926
    }
}

// // 以上单独模块，设置引入方法，如果涉及多个不同模块，需要对整个Store进行模块化设置
// //   设置namespaced:true，以便vuex在调用时可识别相关模块名称
// // 在以 mapState('模块化命名空间', ['func1', 'func2']) 时，
// // 调用 $store.dispatch('模块化命名空间/函数名', 参数)方式调用模块里的函数
// // 调用 $store.commit('模块化命名空间/函数名', 参数)方式调用模块里的函数
// // 获取 $store.state数据时以 $.store.state.对象 即可
// // 获取 $store.getters需要以 $store.getters['模块化命名空间/计算属性名称']
// const firstModuleOptions = {
//     namespaced: true, // 开启以该命名空间为主键
//     actions:{},
//     mutations:{},
//     state:{},
//     getters:{}
// }
// export default new vuex.Store({
//     modules: {
//         firstModuleOptions
//     }
// })

export default new vuex.Store({
    actions,
    mutations,
    state,
    getters
})