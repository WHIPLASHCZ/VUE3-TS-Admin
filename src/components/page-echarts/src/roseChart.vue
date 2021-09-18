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

let btOption = computed(()=>( {

    toolbox: {
        show: true,
        feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
       tooltip: {
        trigger: 'item'
    },
    series: [
        {
            name: '面积模式',
            type: 'pie',
            radius: [20, 120],
            center: ['50%', '50%'],
            roseType: 'area',
            // roseType: 'radius',
            itemStyle: {
                  color(params:any){
                    let color = ['#FF8B8B','#F9F7E8','#61BFAD','#E54B4B','#167C80','#B7E3E4','#FDF06F'];
                    return color[params.dataIndex];
                  },
                   shadowBlur: 10,
                   shadowColor: 'rgba(90, 90, 90, 0.3)',
                    borderRadius: 6
            },
            data: props.data.sort(function (a, b) { return a.value - b.value; }),
            labelLine: {
                lineStyle: {

                },
                smooth: 0.2,
                length: 6,
                length2: 6
            },

        },
    ]
}));
</script>

<style></style>
