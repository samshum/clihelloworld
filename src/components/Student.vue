<template>
    <div class="student">
        <!-- <ul>
            <li v-for="p in students" :key="p.id">
                姓名： {{p.name}} / 年龄： {{p.age}}
            </li>
        </ul> -->
        <h3>学生列表</h3>
        <el-table :data="students" style="width: 100%">
            <el-table-column prop="id" label="ID" width="80"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="age" label="年龄" width="80"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
        
        <el-button @click="showmsg">Show msg</el-button>
    </div>
</template>

<script>
export default {
    name : "Seudent",
    data() {
        return {
            students: [
                { "id": 0, "name": "AAA", "age": 12, "address": "佛山" },
                { "id": 1, "name": "BBB", "age": 13, "address": "广州" },
                { "id": 2, "name": "CCC", "age": 14, "address": "佛山" },
                { "id": 3, "name": "DDD", "age": 15, "address": "顺德" },
                { "id": 4, "name": "EEE", "age": 16, "address": "广州" },
                { "id": 5, "name": "FFF", "age": 17, "address": "从化" },
            ]
        }
    },
    methods:{
        showmsg(){
            this.$notify({
                title: '成功',
                message: '这是一条成功的提示消息',
                type: 'success'
                });
        }
    }
}

</script>

<style scoped>
    .student{
        text-align: left;
    }
</style>