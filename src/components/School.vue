<template>
    <div class=".school">
        <h2>学校信息</h2>
        <hr />
        <h3>学校： {{schoolName}} 地址： {{schoolAddress}}</h3>
        <hr />
        <!-- <student></student> -->
    </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'

// export default defineComponent({
//     setup() {
        
//     },
// })

export default {
    name:  "School",
    data(){
        return{
            schoolName:  "中国人民大学",
            schoolAddress:  "广州大学城学院"
        }
    },
    methods:{

    }, 
    components:{
        //student
    }
}

</script>

<style scoped>
    .school{
        background-color: gray;
    }
</style>