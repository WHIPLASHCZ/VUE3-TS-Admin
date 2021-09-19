<template>
  <div class="login">
    <div class="login-box">
      <h2 class="title">Welcome to Vue3 Admin</h2>
      <loginWindow></loginWindow>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, watch } from "vue";
import { ElNotification } from "element-plus";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import loginWindow from "./child/loginbox.vue";
export default defineComponent({
  name: "login",
  setup() {
    let $store = useStore();
    let $route = useRoute();
    let notify = (ElNotification as any).success({
      title: "可登陆的账号：",
      dangerouslyUseHTMLString: true,
      message: "<p>账号：coderwhy</p> <p>账号：123456</p>",
      showClose: false,
      duration: 0
    });

    watch(
      () => $route.path,
      () => {
        notify.close();
      }
    );
  },
  components: {
    loginWindow
  }
});
</script>

<style scoped>
.login {
  background: url("../../assets/img/login-bg.svg");
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  top: 0;
}
.login-box {
  position: relative;
  top: calc(50% - 100px);
  transform: translateY(-50%);
}
.title {
  text-align: center;
  margin-bottom: 20px;
}
</style>
