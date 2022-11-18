<template>
  <div class="hello">
    <img alt="Vue logo" src="../assets/logo.png" @click="h1animation">
    <transition name="hw" appear>
      <h1 v-show="isShow">动画效果： {{ msg }}</h1>
    </transition>
    <transition-group name="hello" appear>
      <h1 v-show="isShow" key="1">过渡效果： {{ msg }}</h1>
    </transition-group>

    <!-- 
    Animate.css动画类库实现动画
    1. 引入库文件 import 'animate.css'
    2. 添加transition-group节点
    3. 设置该节点名称 name="animate__animated animate__bounce" 
    3. 设置该节点动画 enter-active-class="动画CSS名称" 
    -->
    <transition-group appear 
      name="animate__animated animate__bounce" 
      enter-active-class="animate__fadeInUpBig" 
      leave-active-class="animate__bounceOutUp"
    >
      <h2 v-show="isShow" key="1">An animated element</h2>
      <h2 v-show="isShow" key="2">An animated element to Transition Group</h2>
    </transition-group>

  </div>
</template>

<script>
import 'animate.css'

export default {
  name: 'HelloWorld',
  data(){
    return {
      isShow: true
    }
  },
  props: {
    msg: String
  },
  methods:{
    h1animation(){
      this.isShow = !this.isShow
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    background-color: yellowgreen;
  }

  .hello{
    text-align: center;
    height: 382px;
  }

  /* 动画效果 */
  .hw-enter-active{
    animation: hw 1s;
  }
  .hw-leave-active{
    animation: hw 1s reverse;
  }
  @keyframes hw {
    from{
      transform: translateX(100%);
    }
    to{
      transform: translateX(0);
    }
  }

  /* 过渡效果 */
  /* 进入起点 */
  .hello-enter, .hello-leave-to{
    transform: translateX(-100%);
  }
  /* 进入过程动画设置 */
  .hello-enter-active, .hello-leave-active{
    transition: 0.5s linear;
  }
  /* 进入终点 */
  .hello-enter-to, .hello-leave{
    transform: translateX(0);
  }
</style>