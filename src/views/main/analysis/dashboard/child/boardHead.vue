<template>
    <el-row class="row" :gutter="10">
        <el-col :xs="12" :sm="12" :md="6" v-for="(i, index) of amountList">
            <div class="tjbox">
                <StatisticsCard
                    :tips="i.tips"
                    :title="i.title"
                    :nums="i.number1"
                    :idx="i.amount"
                ></StatisticsCard>
            </div>
        </el-col>
        <!-- <el-col :xs="12" :sm="12" :md="6"> <myCard></myCard></el-col>
        <el-col :xs="12" :sm="12" :md="6"> <myCard></myCard></el-col>
        <el-col :xs="12" :sm="12" :md="6"> <myCard></myCard></el-col> -->
    </el-row>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import StatisticsCard from "./StatisticsCard.vue";
import myCard from "@/baseUI/myCard";
export default defineComponent({
    name: "boardHeader",
    props: {
        amountList: {
            type: Array,
            required: true
        }
    },
    components: {
        StatisticsCard,
        myCard
    }
});
</script>

<style></style>
