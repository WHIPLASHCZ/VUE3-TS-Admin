<template>
    <div class="line-chart">
        <EChart :option="option"></EChart>
    </div>
</template>

<script setup lang="ts">
import EChart from "@/baseUI/myChart";
import type {dataType} from '../type';
import useEchart from "@/baseUI/myChart/hooks/useEchart";
import * as echarts from 'echarts';
import {
    defineComponent,
    ref,
    onMounted,
    defineProps,
    withDefaults,
    defineExpose,
    computed
} from "vue";



let props = withDefaults(
    defineProps<{
        labels:string[],
        values:any[]
    }>(),
    {}
);

let option = computed(()=>({
    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        // data: props.labels
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    // 折线图的边距
    grid: {
        left: '2%',
        right: '2%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: props.labels
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '分类销量',
            type: 'line',
            stack: '总量',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    // color: 'rgba(128, 255, 165)'
                    color:'rgba(58,28,113)'
                },{
                  offset:0.5,
                  color:'rgba(215,109,119)'
                },
                 {
                    offset: 1,
                    // color: 'rgba(1, 191, 236)'
                    color:'rgba(255,175,123)'
                }])
            },
            emphasis: {
                focus: 'series'
            },
            data: props.values
        },

    ]
}));
</script>

<style></style>
