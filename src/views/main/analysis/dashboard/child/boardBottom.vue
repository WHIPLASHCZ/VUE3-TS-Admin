<template>
    <el-row class="row" :gutter="10">
        <el-col :span="12" :xs="24">
            <myCard title="分类商品的销量">
                <!-- <EChart :option="option"></EChart> -->
                <lineChart v-bind="goodsSaleObj"></lineChart>
            </myCard>
        </el-col>
        <el-col :span="12" :xs="24">
            <myCard title="分类商品的收藏">
                <barChart v-bind="goodsFavor"></barChart> </myCard
        ></el-col>
    </el-row>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import StatisticsCard from "./StatisticsCard.vue";
import myCard from "@/baseUI/myCard";
import { lineChart, barChart } from "@/components/page-echarts";
export default defineComponent({
    name: "boardBottom",
    props: ["goodsSaleObj", "goodsFavor"],
    components: {
        myCard,
        lineChart,
        barChart
    }
});
</script>
<style></style>
