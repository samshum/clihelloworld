<template>
  <div class="store">
    <h3>Vuex解决任意组合数据双向操作 $store.state.OBJECTS</h3>
    <hr />
    <h1>Vuex应用：{{name}} : {{value}}</h1>
    <div>
        <div class="ShowStudentTable" v-show="isShowStudentTable">
            <el-table :data="studentsTable" style="width: 600px">
                <el-table-column label="SID" width="50" type="index"></el-table-column>
                <el-table-column prop="id" label="编号" width="80" sortable></el-table-column>
                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                <el-table-column prop="age" label="年龄" width="80" sortable></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
            </el-table>
        </div>
        <el-form label-width="120px">
            <el-form-item label="活动名称:">
                <el-input v-model="webform.name"></el-input>
                <el-select v-model.number="webform.code" placeholder="选择Code">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
                <el-option label="4" value="4"></el-option>
                <el-option label="8" value="8"></el-option>
                <el-option label="16" value="16"></el-option>
                <el-option label="32" value="32"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Getters面积:">
                <span v-show="isShowGetters" class="storegetters">{{sum}}</span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmitToAction">Submit Action</el-button>
                <el-button @click="onSubmitToMutation">Summit Mutation</el-button>
                <el-button @click="onGetSumFromGetters">StoreGetters计算属性</el-button>
            </el-form-item>
        </el-form>
    </div>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import pubsub from 'pubsub-js'
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'

// 借助mapState生成计算属性
// 1. 引入 vuex 的mapState模块 import {mapState, mapActives, ...} from 'vuex'
// 2. 映射自定义键值与对应的State值关系表并放入计算属性中computed: {...mapState({})}
// 3. mapState({'键名', 'state下属性名称'}) / mapState('只一个键值对的话')
//      如果带命名空间的绑定函数，使用 键名: state=>state.命名空间.对象
//      键名与值一样,可采用***数组***方式 mapState(['name','code','value'])
// 4. mapGetters也同样的方式使用，mapGetters(['sum','add']) 从getters中读取数据
// 5. 完成以上步骤，就可直接用插值语法 {{name}} 等直接获取相关属性值,省略this.$store.state
export default {
    name : "Store",
    data(){
        return{
            webform:{
                name: 'WebFormName',
                code: 8
            },
            isShowGetters: true,
            isShowStudentTable: false,
            studentsTable: []
        }
    },
    computed: {
        // 下面是自己写的计算属性, 计算属性除外
        // form(){
        //     return this.$store.state.form
        // },
        // name(){
        //     return this.$store.state.form.name
        // },
        // code(){
        //     return this.$store.state.form.code
        // },
        // value(){
        //     return this.$store.state.form.value
        // }

        // 通过ES6的赋值语法添加键值, 直接键值一样采用**数组**简写方式
        // mapState(['name','code','value'])
        // 如果进行了模块化，需要加上模块化命名空间namespaced
        // mapState('moduleName', ['name','code','value'])
        ...mapState({
            form: state=>state.form,
            name: state=>state.form.name,
            code: state=>state.form.code,
            value: state=>state.form.value
        }),

        // 计算属性也可采用相关方式简写
        ...mapGetters(['sum'])
        // sum(){
        //     return this.$store.getters.sum
        // },
    },
    methods: {
        activeEff(){
            this.isShowGetters = false
            setTimeout(() => {
                this.isShowGetters = true
            }, 10);
        },
        onGetSumFromGetters(){
            this.activeEff()
            console.log(this.$store.getters.sum)
        },

        // 如果采用mapActions生成函数，那入参需要在调用该函数时指定。
        //  如：onSubmitToAction(this.webform)
        //  如果键名与函数名一致，可直接简写 ...mapActions(['add','remove'])
        // ...mapActions({
        //     onSubmitToAction: 'add'
        // }),
        // mapMutations 与 mapActions使用方式一致
        // ...mapMutations({
        //     onSubmitToMutation: 'ADD'
        // })
        onSubmitToAction() {
            //console.log('Submit Action!');
            this.$store.dispatch('add', this.webform)
            this.activeEff()
        },
        onSubmitToMutation() {
            //console.log('Submit Mutation!');
            this.$store.commit('ADD', this.webform)
            this.activeEff()
        }
    },
    mounted(){
        // 订阅一个更新消息，资源释放时销毁该消息对象
        this.pubid = pubsub.subscribe('store.state.form.students', (name, data)=>{
            //console.log('@store.state.form.students',name, data)
            this.studentsTable = this.$store.state.form.students
            this.isShowStudentTable = !this.isShowStudentTable
        })
    },
    beforeDestroy(){
        pubsub.unsubscribe(this.pubid)
    }
}
</script>

<style scoped>
.store h1{
    border: 1px dotted green;
    border-radius: 10px;
    padding: 10px 0 10px 30px;
    background-color: #eee;
    color: green;
    /* font: bold 20px sans-serif ; */
  }
.storegetters{
    font: bold 25px sans-serif;
    color: green;
    display: inline-block;

    margin: 0 0.5rem;
    animation: bounceIn; /* referring directly to the animation's @keyframe declaration */
    animation-duration: 2s; /* don't forget to set a duration! */
}
.ShowStudentTable{
    display: block;
    float: inherit;
    width: 100%;
    /* border: 1px solid #000; */
    text-align: center;
}
.ShowStudentTable .el-table{
    margin: 0 auto;
}
.el-input{
    width: 200px;
    padding-right: 20px;
}
</style>