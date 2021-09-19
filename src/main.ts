import { createApp } from "vue";
import App from "./App.vue";
import store from "@/store";
import router from "@/router";
import { registerApp } from "@/global";
import { initStore } from "@/store";
import "@/assets/css/base.less";
import "element-plus/theme-chalk/display.css";
let app = createApp(App);

registerApp(app);
initStore();
app.use(store);
app.use(router);
app.mount("#app");
