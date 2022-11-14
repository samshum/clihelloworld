<template>
    <div>
        <div class=".school">
            <h2 @click="showName">{{name}}</h2>
            <hr />
            <h3>学校/级别： {{schoolName}}/{{schoolLevel}} 地址： {{schoolAddress}}</h3>
            <!-- <student></student> -->
        </div>

        <el-collapse v-model="activeNames" accordion>
            <el-collapse-item title="一致性 Consistency" name="1">
                <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </el-collapse-item>
            <el-collapse-item title="反馈 Feedback" name="2">
                <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
            </el-collapse-item>
            <el-collapse-item title="效率 Efficiency" name="3">
                <div>简化流程：设计简洁直观的操作流程；</div>
                <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
            </el-collapse-item>
            <el-collapse-item title="可控 Controllability" name="4">
                <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
            </el-collapse-item>
        </el-collapse>

        <el-button @click="getSchoolName('调用父组件传递函数方法[getSchoolName()], '+name)">调用父组件传递函数方法</el-button>

    </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'

// export default defineComponent({
//     setup() {
        
//     },
// })

import {mixinfun} from '../mixin'

export default {
    name:  "School",
    data(){
        return{
            name: "学校信息",
            activeNames: ['1']
        }
    },
    // 简单声明,  开发过程中用得多
    props: ['schoolName', 'schoolAddress', 'schoolLevel', 'getSchoolName'],
    // 完整写法
    // props:{
    //     schoolName: {
    //         type: String,   // 定义传参类型
    //         required: true   // 必要传参
    //     },
    //     schoolAddress:  String,
    //     schoolLevel: {
    //         type: Number,
    //         default: 10     // 设置默认值
    //     }
    // },
    methods:{

    }, 
    components:{
        //student
    },
    mixins: [mixinfun]
}

</script>

<style scoped>
    .school{
        background-color: gray;
    }

</style>