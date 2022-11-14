export const mixinfun = {
    methods:{
        showMixinMethod(){
            //alert(this.name)
            this.$notify({
                title: this.name,
                message: '这是一条成功的提示消息',
                type: 'success'
            });
        }
    },
    mounted(){
        //console.log("mounted!")
    }
}

// 一、混合模式，如果多个VUE里面存在同样的函数，就可用模式，等于函数复用。
// 1. 设置混合模式文件mixin.js文件
// 2. 在需要的VUE文件中引用
// 3. import {mixinfun} from '../mixin'
// 4. 在Vue({})中加入该设置 mixins: [mixinfun]

// 二、全局混合模式，直接在main.js中定义并使用
// import {mixinfun} from './mixin'
// Vue.mixin(mixinfun)