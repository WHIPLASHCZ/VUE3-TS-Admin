<template>
    <el-card class="card" :class="{ pd10: needPadding }" :shadow="shadow">
        <!-- {{ title }} -->
        <template #header>
            <slot name="header">
                <div class="header">
                    <span> {{ title }} </span>
                </div>
            </slot>
        </template>
        <div class="item">
            <slot></slot>
        </div>
    </el-card>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: "myCard",
    props: {
        title: {
            type: String,
            default: ""
        },
        needPadding: {
            type: Boolean,
            default: false
        },
        shadow: {
            type: String,
            default: "always"
        }
    }
});
</script>

<style scoped lang="less">
.header {
    text-align: left;
}
.pd10 {
    padding: 0 15px;
}
</style>
