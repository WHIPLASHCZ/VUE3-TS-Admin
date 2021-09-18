<template>
    <div class="bar-chart">
        <EChart :option="option" ref="chartRef" height="550px"></EChart>
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
    nextTick,
    watchEffect
} from "vue";

let props = withDefaults(
    defineProps<{
       labels:any[],
       values:any[]
    }>(),
    {}
);
let chartRef = ref<InstanceType<typeof EChart>>();

var data=[
    {"code":"600519","stock":"aaa","fundPost":"21.987691"},
    {"code":"000858","stock":"bbb","fundPost":"20.377176"},
    {"code":"002475","stock":"ccc","fundPost":"19.127404"},
    {"code":"600276","stock":"ddd","fundPost":"18.40882"},
    {"code":"601318","stock":"eee","fundPost":"17.980597"},
    {"code":"000661","stock":"fff","fundPost":"16.957898"},
    {"code":"000333","stock":"ggg","fundPost":"15.099577"},
    {"code":"300760","stock":"eee","fundPost":"14.76103"},
    {"code":"300750","stock":"ttt","fundPost":"13.002175"},
    {"code":"601888","stock":"fff","fundPost":"12.133536"}
    ]
  function contains(arr:any[], dst:any) {
        var i = arr.length;
        while ((i -= 1)) {
          if (arr[i] == dst) {
            return i;
          }
        }
        return 0;
      }
      var attackSourcesColor = [
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
          { offset: 0, color: "#EB3B5A" },
          { offset: 1, color: "#FE9C5A" }
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
          { offset: 0, color: "#FA8231" },
          { offset: 1, color: "#FFD14C" }
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
          { offset: 0, color: "#F7B731" },
          { offset: 1, color: "#FFEE96" }
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
          { offset: 0, color: "#395CFE" },
          { offset: 1, color: "#2EC7CF" }
        ])
      ];
      var attackSourcesColor1 = [
        "#EB3B5A",
        "#FA8231",
        "#F7B731",
        "#3860FC",
        "#1089E7",
        "#F57474",
        "#56D0E3",
        "#1089E7",
        "#F57474",
        "#1089E7",
        "#F57474",
        "#F57474"
      ];
      var attaData:any[] = [];
      var attaName:any[] = [];
      var topName:any[] =computed(()=>props.labels).value;
      props.values.forEach((it, index) => {
        attaData[index] = parseFloat(it.fundPost).toFixed(2);
        attaName[index] = it.stock;
        topName[index] = `${it.code} ${it.stock}`
      });
      var salvProMax:any[] = []; //背景按最大值
      watchEffect(()=>{
         for (let i = 0; i < props.values.length; i++) {
          if(props.values[0]) salvProMax.push(props.values[0]);
        }
      })
      function attackSourcesDataFmt(sData:any) {
        var sss:any[] = [];
        sData.forEach(function(item:any, i:number) {
          let itemStyle = {
            color: i > 3 ? attackSourcesColor[3] : attackSourcesColor[i]
          };
          sss.push({
            value: item,
            itemStyle: itemStyle
          });
        });
        return sss;
      }

let option = computed(()=>({
        title: {
            text: '销量榜TOP10',
            left: 'center',
            textStyle: {
                color: '#05325F'
            }
        },
        // color: ["#F7B731"],
          left: "0%",
          right: "5%",
          width:"88%",
        //   bottom: "2%",
        //   top: "8%",
        //   containLabel: true
        xAxis: {
          type: "value",

          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisPointer: {
              label: {
                show: true,
                //margin: 30
              }
            },
            padding: [1, 0, 0, 0],
            postion: "left",
            data: props.labels,
            axisLabel: {
              margin: 30,
              fontSize: 12,
              align: "left",
              padding: [0, 0, 0, 0],
              color: "#fff",
              rich: {
                nt1: {
                  color: "#fff",
                  backgroundColor: attackSourcesColor1[0],
                  width: 13,
                  height: 13,
                  fontSize: 10,
                  align: "center",
                  borderRadius: 100,
                  lineHeight: "10",
                  boxSizing:'border-box',
                  padding:[4, 3, 1, 3]
                },
                nt2: {
                  color: "#fff",
                  backgroundColor: attackSourcesColor1[1],
                  width: 13,
                  height: 13,
                  fontSize: 10,
                  align: "center",
                  borderRadius: 100,
                  padding:[4, 3, 1, 3]
                },
                nt3: {
                  color: "#fff",
                  backgroundColor: attackSourcesColor1[2],
                  width: 13,
                  height: 13,
                  fontSize: 10,
                  align: "center",
                  borderRadius: 100,
                  padding:[4, 3, 1, 3]
                },
                nt: {
                  color: "#fff",
                  backgroundColor: attackSourcesColor1[3],
                  width: 13,
                  height: 13,
                  fontSize: 10,
                  align: "center",
                  borderRadius: 100,
                  boxSizing:'border-box',
                  padding: [4, 3, 1, 3],
                  lineHeight:0
                }
              },
              formatter: function(value:any, index:any) {
                // alert(attaName);
                index = contains(props.labels, value) + 1;
                if (index - 1 < 3) {
                   let dn = ["{nt" + index + "|" + index + "}"].join("\n");
                  return dn;

                } else {
                  let dn = ["{nt|" + index + "}"].join("\n");
                  return dn
                }
              }
            }
          },
          {
            type: "category",
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            show: true,
            axisLabel: {
              textStyle: {
                color: "#fff",
                fontSize: "10"
              }
            },
            data: attackSourcesDataFmt(attaName)
          },
          {//名称
          type: 'category',
             offset: -10,
            position: "left",
            // axisLabel: {
            //   color: `#fff`,
            //   fontSize: 10
            // },
            axisLine: {
              show: false
            },
            inverse: false,
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0,
              color: ["#aaa"],
              align: "left",
              verticalAlign: "bottom",
              lineHeight: 32,
              fontSize: 14
            },
            data: props.labels
          },
        ],
        series: [
          {
            zlevel: 1,
            name: "销量榜top10",
            type: "bar",
            barWidth: "15px",
            animationDuration: 1500,
            data: attackSourcesDataFmt(props.values),
            align: "center",
            itemStyle: {
                barBorderRadius: 10,
            },
            label: {
              show: true,
              fontSize: 10,
              color: "#fff",
              textBorderWidth: 2,
              padding: [0, 0, 0, 0]
            }
          },
          {
            name: "销量榜top10",
            type: "bar",
            barWidth: 15,
            barGap: "-100%",
            margin: "20",
            data: salvProMax,
            textStyle: {
              //图例文字的样式
              fontSize: 10,
              color: "#fff"
            },
            itemStyle: {
                color: "#05325F",
                width:"100%",
                fontSize: 10,
                barBorderRadius: 30
            }
          }
        ]
      }));
</script>

<style></style>
