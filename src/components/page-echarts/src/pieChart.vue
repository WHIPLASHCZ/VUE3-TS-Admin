<template>
    <div class="pie-chart">
        <EChart :option="btOption"></EChart>
    </div>
</template>

<script setup lang="ts">
import EChart from "@/baseUI/myChart";
import type {dataType} from '../type';
import useEchart from "@/baseUI/myChart/hooks/useEchart";
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
        data: dataType[];
    }>(),
    {}
);

let btOption = computed(()=>({
    legend: {
        top: "0%",
        left: "center"
    },
    tooltip: {
        trigger: "item"
    },
    series: [
        {
            name: "分类商品数量",
            type: "pie",
            // radius: "55%",
            radius: ["5%", "60%"],
            center: ["50%", "50%"],
            data: props.data.sort(function(a, b) {
                return a.value - b.value;
            }),
            // roseType: "radius",
            label: {
                // color: "rgba(255, 255, 255, 0.3)"
                show:false,
                color: "rgba(0,0,0,0.5)"
            },
            labelLine: {
                show: true,
                lineStyle: {
                    // color: "rgba(255, 255, 255, 0.3)"
                    // color: "rgba(0,0,0,0.3)"
                },
                smooth: 0.2,
                // length: 1,
                // length2: 1
            },
             emphasis: {
                label: {
                    show: true,
                    fontSize: '20',
                    fontWeight: 'bold'
                },
                 itemStyle: {
                // color: "#c23531",
                shadowBlur: 200,
                shadowColor: "rgba(0, 0, 0, 0.1)",
                // borderRadius: 2,
                // border: "none"
              },
            },


            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function(idx: any) {
                return Math.random() * 200;
            }
        }
    ]
}));
</script>

<style></style>
