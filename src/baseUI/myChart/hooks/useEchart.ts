import * as echarts from "echarts";
import { onMounted, onUnmounted } from "vue";
import { EChartsOption } from "echarts";
import chinaMap from "../data/china.json";
echarts.registerMap("china", chinaMap);
(window as any).chartsArr = [];
// 可以用VUEX创建一个echart实例收集器。 收集所有的echart实例 在侧边栏收缩时 遍历所有echart实例依次调用resize方法
export default function(el: HTMLElement) {
  let chart = echarts.init(el!);
  let setOption = (opt: EChartsOption) => {
    chart.setOption(opt);
  };
  (window as any).chartsArr.push(chart);
  return {
    chart,
    setOption
  };
}
