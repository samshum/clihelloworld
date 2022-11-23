<template>
  <div id="about page">
    <h1>About</h1>
  <div>
    <el-input v-model="name"></el-input>
  </div>
  </div>
</template>

<script>
  export default{
    name: 'About',
    data(){
      return {
        name:''
      }
    },
    mounted(){
      //console.log('@about page: ', this)
    }
  }
</script>

<style scoped>

</style>