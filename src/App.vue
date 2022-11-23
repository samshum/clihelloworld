<template>
  <div id="app">
    <Banner />
    <div class="appcontent">
      <!-- 标识用于缓存了的组件名称， 这样用户在切换路由时，相关IO数据得以保留。 -->
      <keep-alive include="About">
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Banner from './components/Banner.vue'

export default {
  name: 'App',
  components: {
    Banner
  }
}
</script>

<style scoped>
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.appcontent{
  margin: 20px;
}
</style>
