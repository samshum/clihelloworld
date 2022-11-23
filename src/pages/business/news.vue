<template>
  <div id="news">
    <h1>Business News</h1>
    <div>
      Params ID: {{id}}<br />
      Params Title: {{title}}
    </div>
  </div>
</template>

<script>
  export default{
    name: 'BusinessNews',
    data(){
      return {
          
      }
    },

    // 传递 params 方式
    // 当有多项参数传递时，可以开启 props 支持方式，直接通过参数名称来获取参数
    // props只支持params (/business/news/:id/:title) 方式获取参数
    // 当前路由属性的Props为true时，当前路由组件News就可以以props形式接收所有的params参数:id和:title
    // 组件由原先 this.$route.params.id / this.$route.params.title
    // 简写为 props:['id','title'] 就可以直接在页面调用 {{id}}、{{title}}
    // 具体见路由写法, computed 里面的计算属性就中需要了。
    props:['id', 'title'],
    
    computed:{
      // id(){
      //   return this.$route.params.id
      // },
      // title(){
      //   return this.$route.params.title
      // }
    }
  }
</script>

<style scoped>

</style>