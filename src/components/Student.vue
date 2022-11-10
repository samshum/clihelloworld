<template>
    <div class="student">
        <h2>学生列表</h2>
        <hr />
        <ul>
            <li v-for="p in students" :key="p.id">
                姓名： {{p.name}} / 年龄： {{p.age}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name : "Seudent",
    data() {
        return {
            students: [
                { "id": 0, "name": "AAA", "age": 12 },
                { "id": 1, "name": "BBB", "age": 13 },
                { "id": 2, "name": "CCC", "age": 14 },
                { "id": 3, "name": "DDD", "age": 15 },
                { "id": 4, "name": "EEE", "age": 16 },
                { "id": 5, "name": "FFF", "age": 17 }
            ]
        }
    }
}

</script>

<style scoped>
    .student{
        background-color: orange;
    }
</style>