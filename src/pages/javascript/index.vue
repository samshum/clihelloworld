<template>
  <div class="content">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="#">Javascript</a></el-breadcrumb-item>
      <el-breadcrumb-item>{{str}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider content-position="right">Javascript</el-divider>
    <h1>{{str}}</h1>
    <el-skeleton :loading="isloading" :rows="6" animated />
    <span v-html="markdowncontent"></span>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
//https://marked.js.org/
//npm install marked
import { marked } from 'marked';

import axios from 'axios'

export default {
  name: 'javascript',
  props:['str'],
  data(){
    return {
      isloading: true,
      markdowncontent: ''
    }
  },
  computed:{
    url(){
      return '/md/' + this.str + '.md'
    }
  },
  methods:{
    getmddata(){
      //console.log('@gatmddate(' + this.url + ')', this.str)
      this.isloading = true;
      this.markdowncontent = '';
      axios.get(this.url).then((res)=>{
        this.isloading = false;
        this.markdowncontent = marked.parse(res.data)
      })
    }
  },
  created(){
    this.getmddata()
  },
  // 接着在父组件内
  // watch $route 决定使用哪种过渡
  watch: {
    '$route' (to, from) {
      //console.log("@to/from", to, from)
      //this.markdowncontent = "@to/from"
      this.getmddata()
    }
  },
 
  // 通过路由规则，进入时该组件时调用
  // 如果仅是通过页面刷新或者同一组件仅通过URL参数改变时，这个参数是不会被激活, 可通过watch事件解决
  // 也就是说当前这个组件不是通过路由调用激活的，所以这个路由规则不起作用
  beforeRouteEnter (to, from, next) {
    // ...
    console.log('beforeRouteEnter')
    next()
  },
  // 通过路由规则，离开时该组件时调用
  // 如果仅是通过页面刷新或者同一组件仅通过URL参数改变时，这个参数是不会被激活, 可通过watch事件解决
  // 也就是说当前这个组件不是通过路由调用激活的，所以这个路由规则不起作用
  beforeRouteLeave (to, from, next) {
    // ...  
    console.log('beforeRouteLeave')
    next()
  }
}
</script>
<style scoped>

</style>