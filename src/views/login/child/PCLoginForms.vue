<template>
    <el-form
        ref="PformRef"
        :model="form"
        label-width="80px"
        :rules="loginHook.rules"
        id="elform"
        hide-required-asterisk
    >
        <el-form-item label="用户账号" prop="username" class="label">
            <el-input v-model="username" ref="user" id="user"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password" class="label">
            <el-input v-model="password" id="pass" show-password></el-input>
        </el-form-item>
    </el-form>
    <!-- <p>{{ JSON.stringify(form) }}</p> -->
</template>

<script lang="ts">
import {
    ref,
    reactive,
    toRefs,
    getCurrentInstance,
    watch,
    defineComponent,
    toRaw
} from "vue";
import { useStore } from "vuex";
import { ElForm } from "element-plus";
import useLogin from "../hook/loginHooks";
import { ElMessage } from "element-plus";
import cache from "@/utils/cache";
export default defineComponent({
    name: "PCLoginForm",
    setup(props, context) {
        let $store = useStore();
        let form = reactive({ username: "", password: "" });
        let userInfo = cache.isRemembered("AdminUserInfo")
            ? cache.get("AdminUserInfo")
            : { username: "", password: "" };
        form.username = userInfo?.username;
        form.password = userInfo?.password;
        let loginHook = useLogin();
        const PformRef = ref<InstanceType<typeof ElForm>>();
        function loginAction(rememberPassword: boolean) {
            PformRef.value?.validate(valid => {
                if (!valid) {
                    ElMessage.warning({
                        message: "请输入账号密码",
                        type: "warning",
                        duration: 1500
                    });
                    return;
                }
                // 记住密码
                let isRemembered = cache.isRemembered("AdminUserInfo");
                if (!isRemembered)
                    cache.set("AdminUserInfo", { username: form.username });
                if (rememberPassword) {
                    cache.set("AdminUserInfo", {
                        username: form.username,
                        password: form.password
                    });
                } else if (!rememberPassword) {
                    cache.set("AdminUserInfo", { username: form.username });
                }
                $store.dispatch("loginX/userLoginAction", toRaw(form));
            });
        }
        return {
            loginHook,
            form,
            ...toRefs(form),
            loginAction,
            PformRef
        };
    }
});
</script>

<style scoped>
#elform {
    margin-right: 20px;
}
#user,
#pass {
    height: 30px !important;
}
.label {
    padding-left: 10px !important;
}
</style>
