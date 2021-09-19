<template>
  <div class="bar-chart">
    <EChart :option="option2" ref="chartRef"></EChart>
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
    computed,
    nextTick
} from "vue";



let props = withDefaults(
    defineProps<{
        labels:string[],
        values:any[]
    }>(),
    {}
);

let chartRef = ref<InstanceType<typeof EChart>>();

var yMax = 500;
var dataShadow = [];

let option = computed(()=>({
    xAxis: {
        data: props.labels,
        axisLabel: {
            inside: true,
            textStyle: {
                color: '#fff'
            }
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        z: 10
    },
    yAxis: {
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            textStyle: {
                color: '#999'
            }
        }
    },
    dataZoom: [
        {
            type: 'inside'
        }
    ],
        tooltip: {
        trigger: 'item'
    },

    series: [
        {
            type: 'bar',
            showBackground: true,
            itemStyle: {
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        {offset: 0, color: '#83bff6'},
                        {offset: 0.5, color: '#188df0'},
                        {offset: 1, color: '#188df0'}
                    ]
                )
            },
            emphasis: {
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#2378f7'},
                            {offset: 0.7, color: '#2378f7'},
                            {offset: 1, color: '#83bff6'}
                        ]
                    )
                }
            },
            data: props.values
        }
    ]
}))


let option2 = computed(()=>({
    // backgroundColor: '#0B1535',
    "textStyle": {
        "fontSize": 0,
    },
        dataZoom: [
        {
            type: 'inside'
        }
    ],

    "color": ["#00FCFF","#FFDF1C","#5AB72C","#FF715A","#2F9BFF"],
    "xAxis": {
        "nameTextStyle": {
            "color": "#c0c3cd",
            "padding": [0, 0, -10, 0],
            "fontSize": 14
        },
        "axisLabel": {
            "color": "#c0c3cd",//X轴文字
            "fontSize": 14,
            "interval": 0
        },
        "axisTick": {
            "lineStyle": {
                "color": "#0B1535",
                "width": 1
            },
            "show": false
        },
        "splitLine": {
            "show": false
        },
        "axisLine": {
            "lineStyle": {
                "color": "#ccc",
                "width": 1,
                "type": "dashed"
            },
            "show": true
        },
        "data": props.labels,
        "type": "category"
    },
    "yAxis": {
        "type": 'value',
        "name": "(L)",
        "nameTextStyle": {
            "color": "#c0c3cd",
            "padding": [0, 0, -10, 0],
            "fontSize": 14
        },
        "axisLabel": {
            "color": "#c0c3cd",//Y轴文字
            "fontSize": 14
        },
        "axisTick": {
            "lineStyle": {
                // "color": "#384267",
                "color": "#ccc",
                "width": 1
            },
            "show": true
        },
        "splitLine": {
            "show": true,
            "lineStyle": {
                "color": "#ccc",
                "type": "line"
            }
        },
        "axisLine": {
            "lineStyle": {
                "color": "#ccc",
                "width": 1,
                "type": "line"
            },
            "show": false
        },
    },
    "series": [{
        "data": props.values,
        "type": "bar",
        "barMaxWidth": "auto",
        "barWidth": 30,
        "itemStyle": {
            "color": {
                "x": 0,
                "y": 0,
                "x2": 0,
                "y2": 1,
                "type": "linear",
                "global": false,
                "colorStops": [{
                    "offset": 0,
                    "color": "#00FCFF",
                }, {
                    "offset": 1,
                    "color": "#536FBF"
                    // 'color':'#73BEDC'
                }]
            }
        },
        "label": {
            "show": true,
            // "position": "top",
            "distance": 10,
            "color": "#fff",
            position: [30, 10],
        }
    }],
    "tooltip": {
        "trigger": "axis",
        "show": true
    }
}));


// var zoomSize = 6;
// onMounted(()=>{
//   nextTick(()=>{
//       console.log(chartRef.value.chart.chart);

//       chartRef.value.$refs.chartRef.onclick =  function (params:any=6) {
//     console.log(props.labels[Math.max(params.dataIndex - zoomSize / 2, 0)]);
//        chartRef.value.chart.chart.dispatchAction({
//         type: 'dataZoom',
//         startValue: props.labels[Math.max(params.dataIndex - zoomSize / 2, 0)],
//         endValue:props.labels[Math.min(params.dataIndex + zoomSize / 2, props.values.length - 1)]
//     });
//     };
//   });

// })
</script>

<style></style>
