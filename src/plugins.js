import Vue from "vue"

export default {
    // install 还可以接受传参
    install(vue, x, y, z){
        // console.log("@install")
        // console.dir(vue)

        // Plugins可以做过滤器、全局指令、函数、混入等等功能
        // Vm 和 Vc 都可以使用

        // 取当前字符串前5个字符
        Vue.filter('mySlice', function(value){
            return value.slice(0,5)
        })

        // 定义全局指令：自动获取焦点
        Vue.directive('focus',{
            bind(element, binding){
                element.value = binding.value
            },
            inserted(element, binding){
                element.focus()
            },
            update(element,binding){
                element.value = binding.value
            }
        })

        Vue.prototype.globalPluginsSyHello = ()=>{
            alert(`子组件中调用全局插件，HELLO WORLD!\n传入参数： \n\t\t${x},\n\t\t${y},\n\t\t${z}`);
        }
    }
}