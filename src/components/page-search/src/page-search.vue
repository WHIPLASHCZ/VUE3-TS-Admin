<template>
    <FormCpn v-bind="formProps" v-model:formdatas="formData" class="formcpn">
        <template #foot>
            <div class="btnbox">
                <el-button
                    type="primary"
                    icon="el-icon-search"
                    size="small"
                    plain
                    @click="search"
                    >搜索</el-button
                >
                <el-button
                    icon="el-icon-refresh"
                    size="small"
                    plain
                    @click="reset"
                    >重置</el-button
                >
            </div>
        </template>
    </FormCpn>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRaw } from "vue";
// import formProps from "@/views/main/system/user/config/formProps";
import FormCpn from "@/baseUI/form/index";
import { useStore } from "vuex";
export default {
    name: "pageSearch",
    props: {
        formProps: {
            type: Object,
            required: true
        }
    },
    setup(props: any, context: any) {
        let formItem = props?.formProps?.formItem || [];
        let $store = useStore();
        // 动态决定双向绑定的对象内的属性
        let formOringin: any = {};
        formItem.forEach((item: any, index: any) => {
            formOringin[item.field] = "";
        });
        let formData = ref(formOringin);
        let search = () => {
            let searchForm = toRaw(formData.value);
            $store.commit("searchInfo/setSearchForm", searchForm);
            context.emit("sendSearchData", searchForm);
        };
        let reset = () => {
            for (let k in formData.value) {
                formData.value[k] = "";
            }
            $store.commit("searchInfo/reset");
            context.emit("sendReset");
        };
        return {
            formData,
            search,
            reset
        };
    },
    components: {
        FormCpn
    }
};
</script>

<style scoped lang="less">
.btnbox {
    text-align: right;
    margin-right: 20px;
}
</style>
