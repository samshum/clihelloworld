<template>
    <div class="navigation">
        <el-menu
        :router="true"
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <!-- <el-menu-item v-for="(item,index) in routeList" :key="index" :index="String(index)" :route="item.path" >
                {{item.title}}
            </el-menu-item> 
            // 如果存在Dom里面设置变量，参考如下：
            //  <DOM :do="‘字符串${变量名称}这样就可以完成拼接及调用变量数据’">
        -->
            <el-menu-item index="0" route="/">
                <i class="el-icon-s-data"></i>
            </el-menu-item>
            <el-menu-item index="1" route="/home">Home</el-menu-item>
            <el-submenu index="20">
                <template slot="title">Business</template>
                <el-menu-item index="2" route="/business/news/">News</el-menu-item>
                <el-menu-item index="3" route="/business/news/123/helloworld">News Detail</el-menu-item>
                <el-menu-item index="4" route="/business/message?id=123&title=hiue">Message</el-menu-item>
            </el-submenu>
            <el-menu-item index="5" route="/about">About</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "banner",
    data(){
        return {
            activeIndex: '0',
            currentPath: this.$route.fullPath,
            routeList: this.$router.options.routes,
            tableValue: 0
        }
    },
    methods:{

    },
    mounted(){
        if(this.currentPath.length > 0 && this.routeList.length>0){

            for(var i=0; i<this.routeList.length; i++){
                const cp = this.currentPath.split('?')[0]
                const item = this.routeList[i].path.split("/:")[0]

                // console.log('i:', i)
                // console.log('cp:', cp)
                // console.log('cps:', this.currentPath)
                // console.log('item:', item)
                // console.log('items:', this.routeList[i].path)
                // console.log('menuid:', this.routeList[i].menuid)
                // console.log('cp.indexOf(item)', cp.indexOf(item))

                if(cp === item && item.length > 1){
                    this.activeIndex = this.routeList[i].menuid
                    break
                }else if(cp.indexOf(item)>=0  && item.length > 1){
                    this.activeIndex = this.routeList[i].menuid
                    break
                }
            }
        }
    }
}
</script>

<style scoped>
    .navigation{
        display: block;
        top: 0;
    }
    .el-menu-demo{
        background-color: #545c64;
        color: #fff;
    }
    .el-menu-demo li{
        font-size: 16px;
        text-transform: capitalize;
    }
    .el-menu-item{
        font-family:Arial, Helvetica, sans-serif;
    }
</style>