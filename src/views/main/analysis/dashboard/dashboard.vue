<template>
    <div class="dashboard">
        <boardHeader :amountList="amountList"></boardHeader>

        <boardMiddle
            :goodsCount="goodsCount"
            :addressSale="addressSale"
        ></boardMiddle>

        <boardBottom
            :goodsSaleObj="goodsSaleObj"
            :goodsFavor="goodsFavor"
        ></boardBottom>
        <el-row class="row" :gutter="10">
            <el-col>
                <myCard title="销量TOP10">
                    <topTenChart v-bind="topTenObj"></topTenChart>
                </myCard>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import * as echarts from "echarts";
import myCard from "@/baseUI/myCard";
import EChart from "@/baseUI/myChart";
import {  topTenChart  } from "@/components/page-echarts";
import type {boardState} from '@/store/main/analysis/darshboard';

import { myUseStore } from "@/store";
import boardHeader from './child/boardHead.vue';
import boardMiddle from './child/boardMiddle1.vue';
import boardBottom from './child/boardBottom.vue';

export default defineComponent({
    name: "dashboard",
    setup() {
        let getChartData = (stateName:boardState,keyName:string='name',valName:string='goodsCount') =>{
            return computed(() =>
            store.state.dashBoard[stateName].map((item:any) => {
                return { name: item[keyName], value: item[valName] };
            })
        );
        }
        let getCartLabelAndVals = (stateName:boardState,valueName:string) => {
          return computed(()=>{
            let labels:string[] = [];
            let values:any[] = [];
            let goods = store.state.dashBoard[stateName];
            for(let item of goods){
              labels.push(item.name);
              values.push(item[valueName]);
            }
            return {labels,values}
        })
        }

        let store = myUseStore();
        store.dispatch("dashBoard/getDashboardData");
        store.dispatch('dashBoard/getAmountList');
        store.dispatch('dashBoard/getSaleTopTen');
        // 地区销售情况和商品数量
        let goodsCount = getChartData('categoryGoodsCount');
        let addressSale = getChartData('addressGoodsSale','address','count');

        // 销售情况和商品收藏数量
        let goodsSaleObj = getCartLabelAndVals('categoryGoodsSale','goodsCount');
        let goodsFavor = getCartLabelAndVals('categoryGoodsFavor','goodsFavor');
        let amountList = computed(()=> store.state.dashBoard.amountList);
        let topTenObj = computed(()=>{
          let topTenLabels = store.state.dashBoard.topTen.map(item=>item.name);
          let topTenNums = store.state.dashBoard.topTen.map(item=>item.saleCount);
          return { labels:topTenLabels,values:topTenNums}
        })

        return {
            goodsCount,
            goodsSaleObj,
            goodsFavor,
            addressSale,
            amountList,
            topTenObj
        };
    },
    components: {
        myCard,
        EChart,
          boardHeader,
          boardMiddle,
          boardBottom,
          topTenChart

    }
});
</script>

<style scoped lang="less">
.form {
    width: 600px;
    height: 400px;
}
.row {
    margin-bottom: 10px;
}
</style>
