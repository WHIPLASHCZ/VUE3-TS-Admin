import * as echarts from "echarts";
import { EChartsOption } from "echarts";
import chinaMap from "../data/china.json";
echarts.registerMap("china", chinaMap);
// 可以用VUEX创建一个echart实例收集器。 收集所有的echart实例 在侧边栏收缩时 遍历所有echart实例依次调用resize方法
export default function(el?: HTMLElement) {
    let chart = echarts.init(el!);
    let setOption = (opt: EChartsOption) => {
        chart.setOption(opt);
    };
    window.addEventListener("resize", () => {
        chart.resize();
    });

    let resize = () => {
        chart.resize();
    };

    return {
        chart,
        setOption,
        resize
    };
}
