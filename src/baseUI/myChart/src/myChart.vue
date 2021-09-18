<template>
  <div class="myChart">
    <div class="chartBox" ref="chartRef" :style="{ width, height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { EChartsOption } from "echarts";
import {
  ref,
  onMounted,
  defineProps,
  withDefaults,
  watchEffect,
  defineExpose
} from "vue";
import useEchart from "../hooks/useEchart";
// 通过defineProps在setup内定义prop，withDefaults设置prop的默认值
let props = withDefaults(
  defineProps<{
    width?: string;
    height?: string;
    option: EChartsOption;
  }>(),
  {
    width: "100%",
    height: "360px"
  }
);

let chartRef = ref<HTMLElement>();
let chart = ref<any>();
onMounted(() => {
  chart.value = useEchart(chartRef.value!);

  // 当数据有变动 重新获取
  watchEffect(() => {
    chart.value.setOption(props.option);
  });
});

defineExpose({
  chart,
  chartRef
});
</script>

<style lang="less" scoped>
.myChart {
  width: 100%;
  height: 100%;
}
.chartBox {
  // width: 400px;
  // height: 200px;
}
</style>
