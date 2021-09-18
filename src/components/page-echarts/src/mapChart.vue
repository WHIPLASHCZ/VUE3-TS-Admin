<template>
    <div class="map-chart">
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

import { coordinateData} from '../utils/coordinate-data';
import {convertData} from '../utils/convert-data';


let props = withDefaults(
    defineProps<{
       mapData:any[]
    }>(),
    {}
);

interface mapType{
  [key:string]:any[]
}

var geoCoordMap:mapType = {
    "广州": [113.23, 23.16],
    "佛山": [113.167,22.828],
    "中山": [113.38, 22.52],
    "深圳": [114.07, 22.62],
    "东莞": [113.736,23.047],
    "无锡": [120.288,31.574],
    "湖州": [120.096,30.864],
    "昆山": [120.976,31.32],
    "扬州": [119.427,32.386],
    "苏州": [120.612,31.309],
    "淮安": [119.136,33.499],
    "菏泽": [115.480656, 35.23375],
    "合肥": [117.27, 31.86],
    "武汉": [114.31, 30.52],
    "大庆": [125.03, 46.58]
};

let option = computed(()=>( {
        // backgroundColor: '#030303',
        title: {
            text: '全国销售情况',
            left: 'center',
            textStyle: {
                color: '#aaa'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params:any) {
                return params.name + ' : ' + params.value[2];
            }
        },
        visualMap: {
          show:true,
            min: 0,
            max: 30000,
            left: 20,
            bottom: 20,
            calculable: true,
            text: ['高', '低'],
            inRange: {
                color: ['rgb(70, 240, 252)', 'rgb(250, 220, 46)', 'rgb(245, 38, 186)']
            },
            textStyle: {
                color: '#ccc'
            }
        },
        geo: {
            map: 'china',
            roam:'scale',
           emphasis: {
            itemStyle: {
                    // areaColor: 'rgb(19, 91, 153)',
                    borderColor: 'rgb(9, 54, 95)',
                    // areaColor: 'rgb(10, 105, 187)'
                },
             label: {
                    show: false
            },
            }
        },
        series: [{
                name: '销售数',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(props.mapData),
                symbolSize: 12,
              emphasis: {
                label: {
                        show: false,
                    },
                     itemStyle: {

                        borderColor: '#fff',
                        borderWidth: 1
                    }
                },
            },
            {
                type: 'map',
                map: 'china',
                geoIndex: 0,
                aspectScale: 0.75,
                tooltip: {
                    show:false
                }
            }
        ],
        // dataset: {source: mapdata}
    }));
</script>

<style></style>
