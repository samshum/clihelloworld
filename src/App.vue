<template>
  <div id="app">
    <Banner />
    <div class="appcontent">
      <!-- 
        标识用于缓存了的组件名称， 这样用户在切换路由时，相关IO数据得以保留
        1. 通过$route.meta.keepAlive属性来标识是否需要缓存组件
        2. 相关配置在router/index.js路由设置文件
      -->
      <keep-alive>
        <router-view v-if="isKeepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!isKeepAlive"></router-view>
    </div>
  </div>
</template>

<script>
import Banner from './components/Banner.vue'

export default {
  name: 'App',
  computed: {
    isKeepAlive(){
      return this.$route.meta.keepAlive
    }
  },
  components: {
    Banner
  },
  // 路由生命周期组件：页面展现时，刚好就是激活activeted事件时
  activated(){

  },
  // 路由生命周期组件：页面切换时，deactivated就激活
  deactivated(){
    
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
