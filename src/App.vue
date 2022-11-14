<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <!-- 父组件通过子组件定义的props给子组件传递数据及可执行的回调函数方法 -->
    <School :schoolName="sn" :schoolAddress="sa" :schoolLevel="sl" :getSchoolName="resetSchoolName"></School>
    <!-- 自定义事件的两种方式
        1. 父组件通过子组件的自定义事件v-on:/@，传递将回调函数方法
        2. 直接通过ref传入回调对象studentRef, 还需要设置mouted事件挂载完成时可以拿到 this.$refs.studentRef 
            再设置回调函数标签 customEventsRef, 最终实现 @customEventsRef="callBackMethod" 的效果
        以后两种方式，在子组件中获取回调函数及操作方式一致
      -->
    <Student @customEvents.once="resetSchoolName" ref="studentRef"></Student>
  </div>
</template>

<script>
import School from './components/School.vue'
import Student from './components/Student.vue'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    School,
    Student,
    HelloWorld
  },
  data(){
    return {
      sn : "中山大学",
      sa : "广州大学城学院校区",
      sl : 12
    }
  },
  methods:{
    resetSchoolName(msg){
      //console.log('收到子组件给父组件传递函数方法:', msg)
      this.$notify({
                title: '获取子组件消息',
                message: msg,
                type: 'success'
                });
    },
    callBackMethod(msg,name,number){
      this.$notify({
                title: '直接通过ref传入回调函数['+name+':'+number+']',
                message: msg,
                type: 'info'
                });
    }
  },
  mounted(){
    // 通过 ref 方式自定义事件后，需要在当前组件挂载完成后，设置回调函数
    this.$refs.studentRef.$on('customEventsRef', this.callBackMethod)
  }
}
</script>

<style>
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
