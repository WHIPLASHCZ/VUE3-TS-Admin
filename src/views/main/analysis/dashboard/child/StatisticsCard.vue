<template>
    <div class="tjcard">
        <myCard class="myCard" :needPadding="true" shadow="hover">
            <template v-slot:header>
                <div class="titlebox">
                    <p class="title">
                        <span> {{ title }}</span>
                        <el-popover
                            placement="top-start"
                            :width="200"
                            trigger="hover"
                            :content="tips"
                            class="popover"
                        >
                            <template #reference>
                                <i class="el-icon-warning-outline"></i>
                            </template>
                        </el-popover>
                    </p>
                    <div class="title2">
                        <span v-if="idx == 'saleroom'">￥</span>
                        <span :id="idx">{{ nums }}</span>
                    </div>
                </div>
            </template>
            <div class="content">
                {{ title }}：
                <span v-if="idx == 'saleroom'">￥</span>
                <span :id="idx + '1'">{{ nums }}</span>
            </div>
        </myCard>
    </div>
</template>

<script>
import myCard from "@/baseUI/myCard";
import { defineComponent, onMounted, nextTick } from "vue";
import { CountUp } from "countup.js";
export default defineComponent({
    name: "StatisticsCard",
    props: {
        title: {
            type: String,
            required: true
        },
        tips: {
            type: String,
            default: "提示"
        },
        nums: {
            type: Number,
            required: true
        },
        idx: {
            type: String,
            default: "0"
        }
    },
    setup(props) {
        let options = {
            useEasing: true,
            useGrouping: true,
            separator: ",",
            decimal: "."
        };
        onMounted(() => {
            nextTick(() => {
                let countUp = new CountUp(props.idx, props.nums, 0, 1, options);
                let countUp2 = new CountUp(
                    props.idx + "1",
                    props.nums,
                    0,
                    1,
                    options
                );
                if (!countUp.error && !countUp2.error) {
                    countUp.start();
                    countUp2.start();
                } else {
                    console.error(countUp.error);
                    console.error(countUp2.error);
                }
            });
        });
    },
    components: {
        myCard
    }
});
</script>

<style scoped lang="less">
.title,
.title2,
.content {
    text-align: left;
}
.title {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.title2 {
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
}
.content {
    font-size: 14px;
}
</style>
