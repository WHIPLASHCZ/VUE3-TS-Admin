<template>
    <div class="text-link">
        <template v-for="(item, idx) of textArrs" :key="idx">
            <div class="item">
                <span class="title">{{ item.title }} : </span>
                <el-link type="primary">{{ item.desp }}</el-link>
            </div>
        </template>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: "text-link",
    props: {
        textArrs: {
            type: Array,
            default: () => []
        }
    }
});
</script>

<style scoped>
.text-link {
    text-align: left;
    /* margin-left: 20px; */
}

.title {
    display: inline-block;
    width: 160px;
    height: 26px;
    position: relative;
    left: 30px;
}
.title::before {
    position: absolute;
    top: 30%;
    left: -25px;
    width: 5px;
    height: 5px;
    background: black;
    border-radius: 100%;
    content: "";
}
</style>
