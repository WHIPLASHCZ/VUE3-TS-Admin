<template>
  <div class="mav-menu">
    <div class="logo">
      <img
        src="@/assets/img/logo.png"
        class="img"
        alt=""
        :class="{ lft16: isCollapse }"
      />
      <transition
        class="animate__animated"
        enter-active-class="animate__zoomIn animate__faster"
        leave-active-class="animate__zoomOut animate__fasterer"
      >
        <div class="title" v-if="!isCollapse">Vue3 Admin</div>
      </transition>
    </div>
    <el-menu
      :uniqueOpened="true"
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      background-color="#001a38"
      text-color="#d6d6d6"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
      :router="true"
      :show-timeout="timeout"
      :hide-timeout="timeout"
      ref="menuRef"
    >
      <el-sub-menu
        v-for="(i, index) of menuList"
        :index="i.url"
        :key="i.id"
        :ref="i.url"
      >
        <template #title>
          <i :class="i.icon"></i>
          <span>{{ i.name }}</span>
        </template>
        <template v-for="(j, indey) of i.children" :key="j.id">
          <el-menu-item
            class="menu-item"
            :class="{ current: $route.path == j.url }"
            :index="j.url"
            @click="menuClickHandler(j.url)"
          >
            {{ j.name }}
          </el-menu-item>
        </template>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "@vue/runtime-core";
import {
  ref,
  reactive,
  computed,
  inject,
  getCurrentInstance,
  watch,
  onUnmounted
} from "vue";
import { useStore } from "vuex";
import { myUseStore } from "@/store/index";
import { useRoute, useRouter } from "vue-router";
import { ElMenu } from "element-plus";
import charts from "@/baseUI/myChart/hooks/useEchart";
export default defineComponent({
  name: "navMenu",
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    let $router = useRouter();
    let $route = useRoute();
    let $store = myUseStore();
    let menuList = computed(() => $store.state.loginX.userMenus);
    let defaultActive = computed(() => $route.path);
    let menuRef = ref<InstanceType<typeof ElMenu>>();
    let timeout = ref(200);
    let event = document.createEvent("HTMLEvents");
    let haveChild = computed(() => (i: any) => i.children && i.children.length);
    function menuClickHandler(url: string) {
      $router.push(url ?? "/notFound");
    }
    let timer: any;

    watch(
      () => props.isCollapse,
      () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          if (
            (window as any).chartsArr &&
            $route.path == "/main/analysis/dashboard"
          ) {
            (window as any).chartsArr.forEach((chart: any) => {
              chart.resize();
            });
          }
        }, timeout.value + 90);
      }
    );
    return {
      menuList,
      haveChild,
      menuClickHandler,
      defaultActive,
      menuRef,
      timeout
    };
  }
});
</script>

<style scoped lang="less">
.current {
  // background-color: rgb(0, 1, 36) !important;
  color: #ffffff !important;
}

.sub-menu:hover {
  .current();
}

.menu-item:hover {
  .current();
}
.animate__fasterer {
  animation-duration: 200ms;
}
.el-menu-vertical-demo {
  background-color: #064b75;
  color: rgb(202, 202, 202) !important;
  border: none;
  user-select: none;
}
.img {
  width: 30px;
  position: absolute;
  left: 27px;
  transition: all 0.3s ease;
}

.lft16 {
  left: 16px;
}

.mr12 {
  margin-right: 12px;
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  position: relative;
}
.title {
  font-weight: 600;
  font-size: 18px;
  padding-top: 3px;
  line-height: 0px;
  margin-left: 25px;
}
</style>
