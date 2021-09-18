<template>
    <el-form
        ref="formRef"
        :model="phoneForm"
        label-width="80px"
        :rules="phoneLoginHook.rules"
        id="phoneForm"
        hide-required-asterisk
    >
        <el-form-item label="手机号" prop="number">
            <el-input v-model="number"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="idCode">
            <div id="idcode" ref="divRef">
                <el-input v-model="idCode" class="ipt"></el-input>
                <div class="place"></div>
                <el-button id="btn" type="primary" size="mini"
                    >获取验证码</el-button
                >
            </div>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
import useLogin from "../hook/phoneHooks";
import {
    ref,
    reactive,
    toRefs,
    getCurrentInstance,
    watch,
    defineComponent,
    onMounted
} from "vue";
import { ElForm, ElMessage } from "element-plus";
type forms = InstanceType<typeof ElForm>;
// let fm:forms = {};
// console.log(typeof fm == ElForm);

export default defineComponent({
    name: "phoneLogin",
    setup() {
        let phoneForm = reactive({ number: "", idCode: "" });
        let phoneLoginHook = useLogin();
        const formRef = ref<InstanceType<typeof ElForm>>();
        let divRef = ref<HTMLElement>();
        onMounted(() => {
            if (typeof divRef.value != "undefined") {
                // divRef.value.innerHTML = "123";
            }
        });
        function loginAction() {
            formRef.value?.validate(valid => {
                if (!valid) {
                    ElMessage.warning({
                        message: "暂不支持手机登陆",
                        type: "warning",
                        duration: 2500
                    });
                    return;
                }
                ElMessage.warning({
                    message: "暂不支持手机登陆",
                    type: "warning",
                    duration: 2500
                });
            });
        }
        return {
            phoneLoginHook,
            phoneForm,
            ...toRefs(phoneForm),
            loginAction,
            formRef,
            divRef
        };
    },
    components: {
        ElForm
    }
});
</script>

<style scoped>
#phoneForm {
    margin-right: 20px;
}
#idcode {
    display: flex;
}

#btn {
    text-align: center !important;
    height: 34px;
    margin-top: 3px;
    padding: 5px;
}
.place {
    width: 10px;
}
</style>
