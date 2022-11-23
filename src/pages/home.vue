<template>
  <div id="home">
    <!-- 
      1. 通过设置sloat='名称'来指定该slot放在子组件的指定位置，存在多个slot情况下必须得指定名称
      2. 可能通过设置template模块方式进行slot定位
      3. scope=‘获取子组件值一个集合名称’，通过集合名称来调用多个子组件传递过来的各个属性值
    -->
    <HelloWorld msg="Welcome to Your Vue.js App">
      <h1 class="helloworld" slot="top">Hello World!</h1>
      <template slot="img" scope="result">
        <div>
          <el-tooltip class="item" effect="dark" :content="result.msg" placement="top">
            <img src="../assets/logo.png" :alt="result.slotOutData.titleString" @click="result.slotOutData.eventObject" />
          </el-tooltip>
        </div>
      </template>
      <!-- template标签在Vue2.6版本以上，还可以使用新写法 template v-slot:center 即可  -->
      <template slot="center">
        <p>组件标签内容通过HelloWorld组件插槽&lt;slot /&gt;定位</p>
        <p>设置slot="名称"指定放的slot位置, template标签最终不在Dom形式出现</p>
      </template>
    </HelloWorld>
    <!-- 父组件通过子组件定义的props给子组件传递数据及可执行的回调函数方法 -->
    <School :schoolName="sn" :schoolAddress="sa" :schoolLevel="sl" :getSchoolName="resetSchoolName"></School>
    <!-- 自定义事件的两种方式(自定义事件比较用于子组件给父组件传递数据, 父组件给子组件用 props 最方便)
        1. 父组件通过子组件的自定义事件v-on:/@，传递将回调函数方法
        2. 直接通过ref传入回调对象studentRef, 还需要设置mouted事件挂载完成时可以拿到 this.$refs.studentRef 
            再设置回调函数标签 customEventsRef, 最终实现 @customEventsRef="callBackMethod" 的效果
            用 ref 跟@customEventsRef直接定义最大的区别在于可以在事件绑定前进行一些处理操作
        以后两种方式，在子组件中获取回调函数及操作方式一致, 并且都需要设置回调函数, @的方式直接将函数写在 methods里面，ref 就需要在加载mounted后注册事件，并把回调函数直接写在里面 this.$refs.studentRef.$on('子组件回调函数名称', ...参数), 子组件通过  this.$emit('子组件回调函数名称', ...参数) 实现调用父组件设置的回调方法
        3. 自定义事件也可以用.once修饰，只执行一次
        4. 在子组件中取消自定义绑定事件用
            this.$off('customEvents')
            this.$off(['customEvents', 'customEventsRef'])
            this.$off() //解绑所有自定义事件
        5. 如果需要绑定原生Dom事件，需要在事件名称后面加上.native来修饰
        @click.native="nativeEvent"
      -->
    <Student @customEvents="resetSchoolName" ref="studentRef"></Student>
    <Store />
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld'
import School from '../components/School'
import Student from '../components/Student'
import Store from '../components/Store'

export default {
  name: 'App',
  data(){
    return {
      sn : "中山大学",
      sa : "广州大学城学院校区",
      sl : 12
    }
  },
  components: {
    School,
    Student,
    HelloWorld,
    Store
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
    nativeEvent(){
      alert('NativeEvent!')
    }
  },
  mounted(){

    // 通过 ref 方式自定义事件后，需要在当前组件挂载完成后绑定回调函数
    //
    // **********************注意***********************
    //
    // 这里的 this 对象是子组件的VueCompontent对象，是子组件Student来触发的 customEventsRef 方法，所以返回的 this 对象就是子组件Student本身的对象, 如果把回调函数写在 methods 的话，返回的对应是当前组件App对象
    //
    // 1. 返回的this是被调用的子组件当前对象 Student, 或者把回调方法写在 methods 里面
    // this.$refs.studentRef.$on('customEventsRef', function(msg, name, number, ...a){
    //   this.$notify({
    //     title: '直接通过ref传入回调函数['+name+':'+number+']',
    //     message: msg,
    //     type: 'info'
    //   });
    //   console.log('@vm', this)
    // })
    //
    // 2. 返回在的this是被调用子组件的父对象(当前this对象为空) Student->App
    //    箭头函数本身是没有this对象的，需要往上一级寻找，故返回上一级的this对象
    this.$refs.studentRef.$on('customEventsRef', (msg, name, number, ...a)=>{
      this.$notify({
        title: '直接通过ref传入回调函数['+name+':'+number+'], ' + this.sa,
        message: msg,
        type: 'info'
      });
    })

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
hr {
  border-top: 1px dotted #999898;
}
.el-menu-demo{
  display:block;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0 !important;
  overflow: hidden;
  display: none;
  background: rgba(0, 0, 0, 0);
  opacity: 0;
}
</style>
