<template>
    <div class="dialog">
        <el-dialog
            :title="title"
            v-model="showDialog"
            width="23%"
            destroy-on-close
            center
        >
            <div class="box">
                <FormCpn
                    v-bind="modalConfig"
                    v-model:formdatas="UserInfo"
                    :isMenu="isMenu"
                    ref="formRef"
                ></FormCpn>
            </div>
            <slot> </slot>
            <template #footer>
                <el-button @click="confirm(false)">取消</el-button>
                <el-button @click="confirm(true)" type="primary"
                    >确定</el-button
                >
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, watch, toRaw } from "vue";
import FormCpn from "@/baseUI/form/index";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
    name: "pageDialog",
    props: {
        modalConfig: {
            type: Object,
            required: true
        },
        defaultInfo: {
            type: Object,
            default: () => ({})
        },
        otherInfo: {
            type: Object,
            default: () => ({})
        },
        isMenu: {
            type: Boolean,
            default: false
        }
    },
    setup(props: any) {
        let showDialog = ref(false);
        let title = ref("");
        let UserInfo = ref<any>({});
        let formRef = ref<InstanceType<typeof FormCpn>>();
        let $store = useStore();
        let $route = useRoute();

        // 当对话框被点开 初始化对话框内表单内容
        watch(
            () => props.defaultInfo,
            newval => {
                for (let item of props.modalConfig.formItem) {
                    UserInfo!.value[`${item.field}`] =
                        props.defaultInfo[`${item.field}`];
                }
            },
            {
                deep: true
            }
        );
        let confirm = (bool: boolean) => {
            if (!bool) {
                showDialog.value = false;
                return false;
            }
            (formRef.value as any).$refs.formRef.validate((valid: boolean) => {
                if (!valid) {
                    ElMessage.error({
                        message: "输入有误！",
                        type: "error"
                    });
                    return false;
                }
                if (Object.keys(props.defaultInfo).length) {
                    console.log("编辑");
                    $store.dispatch("system/editPageData", {
                        pageName: $route.path,
                        newData: { ...UserInfo.value, ...props.otherInfo },
                        id: props.defaultInfo.id
                    });
                } else {
                    console.log("新建");
                    if (props.isMenu) {
                        UserInfo.value.url =
                            UserInfo.value.parentUrl + UserInfo.value.url;
                        delete UserInfo.value.parentUrl;
                        UserInfo.value.parentId =
                            UserInfo.value.parentId[
                                UserInfo.value.parentId.length - 1
                            ].id;
                    }
                    console.log(UserInfo.value);
                    $store.dispatch("system/createPageData", {
                        pageName: $route.path,
                        newData: { ...UserInfo.value, ...props.otherInfo }
                    });
                }
                showDialog.value = false;
            });
        };
        return {
            showDialog,
            UserInfo,
            title,
            confirm,
            formRef
        };
    },
    components: {
        FormCpn
    }
};
</script>

<style scoped>
.box {
    margin-bottom: 10px;
}
</style>
