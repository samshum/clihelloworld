<template>
  <div id="message">
    <h1>Business Message</h1>
    <div>
        URL ID: {{id}} <br />
        URL Title: {{title}}
    </div>
  </div>
</template>

<script>
  export default{
    name: 'BusinessMessage',
    data(){
      return {

      }
    },

    // 方式三：传递URL参数方式
    // 本质上跟第一种一样，直接在路由里获取参数，组件中用 props 即可接收
    // 组件获取数据简写为 props:['id','title'] 就可以直接在页面调用 {{id}}、{{title}}
    // 具体见路由里面有相关说明
    props:['id', 'title'],

    // computed: {
    //   id(){
    //     return this.$route.query.id
    //   },
    //   title(){
    //     return this.$route.query.title
    //   }
    // }
  }
</script>

<style scoped>

</style>