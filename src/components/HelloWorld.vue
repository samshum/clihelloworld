<template>
  <div class="hello">

    <slot name="top"><h1>默认值Top插槽，没传值就显示</h1></slot>
    <slot name="center"><h1>默认值Center插槽</h1></slot>
    <!-- 组件插槽子组件向父组件传数据, 父组件通过scope="result"标签获取传递对象
      result是一个对象集，包括多个传递过来的值可供调用
      result.h1animation 获取具体数据  -->
    <slot name="img" :slotOutData="slotOutData" :msg="titleString"></slot>

    <transition name="hw" appear>
      <h1 v-show="isShow">动画效果： {{ msg }}</h1>
    </transition>
    <transition-group name="hello" appear>
      <h1 v-show="isShow" key="1">过渡效果： {{ msg }}</h1>
    </transition-group>

    <!-- 
    Animate.css动画类库实现动画
    1. 先安装并引入库文件 import 'animate.css'
    2. 添加transition-group节点, group需要指定key
    3. 设置该节点名称 name="animate__animated animate__bounce" 
    3. 设置该节点动画 enter-active-class="动画CSS名称" 
    -->
    <transition-group appear 
      name="animate__animated animate__bounce" 
      enter-active-class="animate__fadeInUpBig" 
      leave-active-class="animate__fadeOutRight"
    >
      <h2 v-show="isShow" key="1">An animated element</h2>
      <h2 v-show="isShow" key="2">An animated element to Transition Group</h2>
    </transition-group>

    <el-popover
      placement="bottom"
      width="700"
      trigger="click"
      v-model="isPopShow">
      <el-table :data="thisAjaxData" v-loading="isloading">
        <el-table-column width="120" property="date" label="日期" sortable></el-table-column>
        <el-table-column width="80" property="name" label="姓名"></el-table-column>
        <el-table-column width="80" property="province" label="省份"></el-table-column>
        <el-table-column width="80" property="city" label="城市"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
        <el-table-column width="100" property="zip" label="邮编"></el-table-column>
      </el-table>
      <el-skeleton :rows="6" animated :loading="isloading" />
      <el-button type="success" slot="reference" @click="thisAjaxGet">Ajax获取Person信息</el-button>
    </el-popover>

  </div>
</template>

<script>
import 'animate.css'
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data(){
    return {
      isShow: true,
      // 4个状态[初始化界面、加载中、错误信息、结果信息]
      isloading: true,
      isPopShow: false,
      thisAjaxData: [],
      titleString: '子组件向调用的父组件传值',
      slotOutData: {
        titleString: 'Image的alt信息值',
        eventObject: ()=>{
          this.isShow = !this.isShow
        }
      }
    }
  },
  props: {
    msg: String
  },
  methods:{
    h1animation(){
      this.isShow = !this.isShow
    },

    // AXIOS https://axios-http.com/docs/intro
    // 1. 先安装Axios npm install -g axios
    // 2. 在 vue.config.js 中设置代理
    //    devServer:{
    //      proxy: 'http://127.0.0.1:5050/' // 先要启用 public/server 的文件服务器
    //    }
    // 3. 导入 import axios from 'axios'
    // 4. 调用 axios.get('web address')
    // http://localhost:8080/api/persons.json 代理-=> http://localhost:5050/api/persons.json
    // api地址是通过代理实现的，需要启用public/server的http服务 npm stat
    thisAjaxGet(){
      if(!this.isPopShow){  //Popover不可见时，才调用数据，可见时任意点击事件都会自动隐藏
        this.isloading = true
        this.thisAjaxData = []
        const rid = Math.floor(Math.random() * 1000) + (new Date().getTime() + "").substring(7)

        // 同步方式执行
        // axios.get('/api/persons.json?rid=' + rid).then(
        //   response => {
        //     this.thisAjaxData = response.data
        //     console.log('@Request OK: ', response.data)
        //   },
        //   error => {
        //     console.log('@error', error.message)
        //   })

        // 异步方式执行
        // 注意: 由于async/await 是ECMAScript 2017中的一部分，而且在IE和一些旧的浏览器中不支持
        let getPersons = async ()=>{
          try{
            const response = await axios.get('/api/persons.json?' + rid, {responseType: 'json'});
            this.isloading = false
            // ES6特征，合并两个对象，用参数二的数据覆盖第一个参数相同属性数据
            // {...this.thisAjaxData, ...response.data}
            this.thisAjaxData = response.data
            console.log('@person', this.thisAjaxData)
          } catch(error){
            this.isloading = false
            this.$notify.error({
              title: '错误',
              message: '代理服务没开启，数据加载错误，请稍后再试！'
            });
            console.log(error)
          }
        }
        getPersons()

        axios.get('/server/api/cars.json?'+rid).then(res => console.log('@car', res.data))
      }
    }


  }
}
</script>

<style scoped>
  h1 {
    border-bottom: 8px solid yellowgreen;
    /* background-color: yellowgreen; */
    /* border: 1px dashed #eee; */
  }
  h2{
    color: white;
    height: 50px;
    padding: 15px 0 0 0;
    background-color: green;
    border-radius: 30px;
  }
  img{
    cursor:pointer;
  }
  .helloworld{
    border: 5px dotted #ddd;
    border-radius: 38px;
    padding: 10px;
    background-color: #eee;
  }

  .hello{
    text-align: center;
    /* height: 382px; */
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