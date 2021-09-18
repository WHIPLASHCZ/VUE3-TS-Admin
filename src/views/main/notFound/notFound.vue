<template>
    <div class="box">
        <el-row class="row">
            <el-col :span="24">
                <el-result
                    icon="error"
                    title="404 NOT FOUND"
                    subTitle="当前页面不存在！"
                >
                    <template #extra>
                        <el-button type="primary" size="medium" @click="goBack"
                            >返回首页</el-button
                        >
                    </template>
                </el-result>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import { useRouter } from "vue-router";
export default defineComponent({
    name: "notFound",
    setup() {
        let $router = useRouter();
        let goBack = () => {
            $router.push("/main/analysis/overview");
        };

        return {
            goBack
        };
    }
});
</script>

<style scoped lang="less">
.box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
.row {
    margin-bottom: 180px;
}
</style>
