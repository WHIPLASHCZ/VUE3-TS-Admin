<template>
    <el-descriptions class="margin" :title="title" :column="column" border>
        <el-descriptions-item v-for="item of tableDatas" :key="item.name">
            <template #label>
                {{ item.name }}
            </template>
            <el-tag> {{ item.description }} </el-tag>
        </el-descriptions-item>
    </el-descriptions>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: "myDesc",
    props: {
        title: {
            type: String,
            default: ""
        },
        column: {
            type: Number,
            default: 1
        },
        tableDatas: {
            type: Array,
            default: () => []
        }
    }
});
</script>

<style scoped>
.margin {
    margin: 20px 0 25px 0;
}
</style>
