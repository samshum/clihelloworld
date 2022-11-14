<template>
    <div class="student">
        <!-- <ul>
            <li v-for="p in students" :key="p.id">
                姓名： {{p.name}} / 年龄： {{p.age}}
            </li>
        </ul> -->
        <h3 @click="showName">{{name}}</h3>
        <el-table :data="students" style="width: 100%">
            <el-table-column prop="id" label="ID" width="80"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="age" label="年龄" width="80"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
        
        <el-button @click="showmsg" :disabled="isDisabled">Show msg</el-button>
        <el-button @click="thiscustomEvents">Custom Event</el-button>
        <el-button @click="thiscustomEventsRef">Custom Event Ref</el-button>
        <el-button @click="globalPluginsSyHello">Global Plugins</el-button>

        <hr />
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

export default {
    name : "Seudent",
    data() {
        return {
            name: "学生信息", 
            isDisabled: false,
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
                type: 'success'
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
                '调用自定义事件函数, 在父组件中设置 ref="customEventsRef". ',
                this.name,
                999999999)
        }
    }
}

</script>

<style scoped>
    .student{
        text-align: left;
    }
</style>