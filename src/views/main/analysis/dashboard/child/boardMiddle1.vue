<template>
    <el-row class="row" :gutter="6">
        <el-col :xs="24" :sm="11" :md="7">
            <myCard title="分类商品数量 (饼图)">
                <pieChart :data="goodsCount" /> </myCard
        ></el-col>
        <el-col :xs="24" :sm="13" :md="10">
            <myCard title="不同城市商品销量">
                <mapChart :mapData="addressSale"></mapChart>
            </myCard>
        </el-col>
        <el-col :xs="24" :sm="11" :md="7">
            <myCard title="分类商品数量 (玫瑰图)">
                <roseChart :data="goodsCount"></roseChart> </myCard
        ></el-col>
    </el-row>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import StatisticsCard from "./StatisticsCard.vue";
import myCard from "@/baseUI/myCard";
import { pieChart, roseChart, mapChart } from "@/components/page-echarts";
export default defineComponent({
    name: "boardMiddle",
    props: ["goodsCount", "addressSale"],
    components: {
        myCard,
        pieChart,
        roseChart,
        mapChart
    }
});
</script>
<style></style>
