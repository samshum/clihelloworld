<template>
    <div class="student">

        <h3>消息的发布与订阅</h3>
        <hr />
        <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
            // 消息订阅与发布(pubsub-js) <br />
            // 1. 先安装消息插件 npm i pubsub-js <br />
            // 2. 引入 pubsub 库 import pubsub from 'pubsub-js' <br />
            // 3. 接收方订阅消息  <br />
            //      mounted(){this.pubid = pubsub.subscribe('消息名称', 消息接收回调函数 function(){})} <br />
            //      pubsub.unsubscribe(this.pubid) <br />
            // 4. 发布消息 pubsub.publish('消息名称', 数据) <br />
        </el-dialog>
        <el-button slot="reference" @click="thisPublishMessage">发布消息('student')到School，同时推送学生对象到列表</el-button>
      
 
        <!-- <ul>
            <li v-for="p in students" :key="p.id">
                姓名： {{p.name}} / 年龄： {{p.age}}
            </li>
        </ul> -->
        <h3 @click.once="showMixinMethod">{{globalEventBusName}} {{name}}</h3>
        <hr />
        <el-table :data="students" style="width: 100%">
            <el-table-column label="SID" width="50" type="index"></el-table-column>
            <el-table-column prop="id" label="编号" width="80" sortable></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="age" label="年龄" width="80" sortable></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
        
        <h3>事件操作</h3>
        <hr />
        <el-button @click="thiscustomEvents" :disabled="isUnBind">自定义事件</el-button>
        <el-button @click="thiscustomEventsRef" :disabled="isUnBind">自定义事件 Ref</el-button>
        <el-button @click="thiscustomEventsUnbind">解绑事件</el-button>
        <el-button @click="thisDestroyCompoent">销毁组件</el-button>
   
        <el-button @click="showmsg" :disabled="isDisabled">显示消息</el-button>
        <el-button @click="globalPluginsSyHello">全局插件调用</el-button>
        
        <input v-focus:value="name" />

    </div>
</template>

<script>
// 一、混合模式，如果多个VUE里面存在同样的函数，就可用模式，等于函数复用。
// 1. 设置混合模式文件mixin.js文件
// 2. 在需要的VUE文件中引用
// 3. import {mixinfun} from '../mixin'
// 4. 在Vue({})中加入该设置 mixins: [mixinfun]

// 二、全局混合模式，直接在main.js中定义并使用
// import {mixinfun} from './mixin'
// Vue.mixin(mixinfun)

//import {mixinfun} from '../mixin'

import pubsub from 'pubsub-js'

export default {
    name : "Seudent",
    data() {
        return {
            name: "学生信息", 
            globalEventBusName : "",
            dialogTableVisible : false,
            isDisabled: false,
            isUnBind: false,
            students: [
                { "id": 0, "name": "AAA", "age": 12, "address": "佛山" },
                { "id": 1, "name": "BBB", "age": 13, "address": "广州" },
                { "id": 2, "name": "CCC", "age": 14, "address": "佛山" },
                { "id": 3, "name": "DDD", "age": 15, "address": "顺德" },
                { "id": 4, "name": "EEE", "age": 16, "address": "广州" },
                { "id": 5, "name": "FFF", "age": 17, "address": "从化" },
            ]
        }
    },
    // 局部混合模式
    //mixins: [mixinfun],
    methods:{
        showmsg(e){
            this.$notify({
                title: '成功',
                message: '这是一条成功的提示消息',
                type: 'success',
                position: 'bottom-right'
                });
            this.$message({
                title: '成功',
                showClose: true,
                message: '这是一条成功的提示消息',
                type: 'success'
            });
            this.isDisabled = true
        },
        thiscustomEvents(){
            // 调用子组件的自定义事件函数, 自定义事件在App中调用该子组件时指定
            this.$emit(
                'customEvents', 
                '调用自定义事件函数, 自定义事件在App中调用该子组件时指定. \n调用父组件传入的自定义函数(CustomEvent)方法实现，'+this.name)
        },
        thiscustomEventsRef(){
            this.$emit(
                'customEventsRef', 
                '调用自定义事件函数, 在父组件中设置 ref="customEventsRef". \n处理事件绑定前可以执行的相关操作 ',
                this.name,
                999999999,
                '...aaa',
                '...bbb',
                '...ccc')
        },
        thiscustomEventsUnbind(){
            // 取消自定义绑定事件
            // this.$off('customEvents')
            // this.$off(['customEvents', 'customEventsRef'])
            // this.$off() //解绑所有自定义事件
            this.$off(['customEvents', 'customEventsRef'])
            this.isUnBind = true
            this.$message('Student自定义事件已取消绑定!')
        },
        thisDestroyCompoent(){
            // 销毁当前组件的实例后，其实例所有的自定义事件都将失效
            this.$destroy()
            this.$message('Student组件已销毁!')
        },

        // 消息订阅与发布(pubsub-js)
        // 1. 先安装消息插件 npm i pubsub-js
        // 2. 引入 pubsub 库 import pubsub from 'pubsub-js'
        // 3. 接收方订阅消息 
        //      mounted(){this.pubid = pubsub.subscribe('消息名称', 消息接收回调函数 function(){})}
        //      pubsub.unsubscribe(this.pubid)
        // 4. 发布消息 pubsub.publish('消息名称', 数据)
        thisPublishMessage(){
            this.dialogTableVisible = true
            pubsub.publish('student', this.students)
        }
    },
    mounted(){
        this.$bus.$on('globalEventBus', (data)=>{
            this.globalEventBusName = data
            console.log('@globalEventBus', this, data)
        })

        this.pubid = pubsub.subscribe('student', (name, data)=>{
            console.log('@student.data',data)
            let rid = (n, m)=>{
                var num = Math.floor(Math.random() * (m - n + 1) + n)
                return num
            }
            this.students.push(data[rid(0, data.length-1)])
        })

    },
    beforeDestroy(){
        this.$bus.$off('globalEventBus')

        pubsub.unsubscribe(this.pubid)
    }
}

</script>

<style scoped>
    .student{
        text-align: left;
    }
</style>