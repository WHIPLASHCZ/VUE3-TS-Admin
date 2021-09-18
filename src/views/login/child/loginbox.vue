<template>
    <div class="window">
        <el-tabs type="border-card" id="tabs" stretch v-model="activeName">
            <el-tab-pane class="tab-pane" name="PC">
                <template #label>
                    <span><i class="el-icon-user-solid"></i> 账号登录</span>
                </template>
                <PCLoginForm ref="pcLoginRef"></PCLoginForm>
            </el-tab-pane>
            <el-tab-pane label="消息中心" class="tab-pane" name="phone">
                <template #label>
                    <span><i class="el-icon-phone"></i> 手机登陆</span>
                </template>
                <phoneLogin ref="phoneLoginRef"></phoneLogin>
            </el-tab-pane>
        </el-tabs>
        <div class="realLogin">
            <p class="aboutPassword">
                <el-checkbox
                    label="记住密码"
                    v-model="remberPassword"
                ></el-checkbox>
                <el-link type="primary">忘记密码</el-link>
            </p>
            <el-button type="primary" id="loginBtn" @click="login"
                >登陆</el-button
            >
        </div>
    </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import phoneLogin from "./phoneLoginForm.vue";
import PCLoginForm from "./PCLoginForms.vue";
import cache from "@/utils/cache";
export default defineComponent({
    name: "loginWindow",
    setup() {
        let $store = useStore();
        let pcLoginRef = ref<InstanceType<typeof PCLoginForm>>();
        let phoneLoginRef = ref<InstanceType<typeof phoneLogin>>();
        let remberPassword = ref(false);
        cache.get("AdminUserInfo")?.password !== undefined
            ? (remberPassword.value = true)
            : remberPassword;
        let activeName = ref("PC");
        function login() {
            let username = pcLoginRef.value?.username as string;
            let password = pcLoginRef.value?.password as string;
            if (activeName.value == "PC")
                pcLoginRef.value?.loginAction(remberPassword.value);
            else if (activeName.value == "phone")
                phoneLoginRef.value?.loginAction();
        }
        return {
            remberPassword,
            login,
            pcLoginRef,
            phoneLoginRef,
            activeName
        };
    },
    components: {
        phoneLogin,
        PCLoginForm
    }
});
</script>

<style scoped>
#tabs {
    width: 330px;
    margin: auto;
}
.window {
    width: 330px;
    margin: auto;
}
.aboutPassword {
    display: flex;
    justify-content: space-between;
    padding: 0 5px;
}
#loginBtn {
    width: 100%;
}
</style>
