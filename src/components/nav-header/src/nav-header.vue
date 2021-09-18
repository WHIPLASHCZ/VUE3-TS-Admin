<template>
    <div class="header">
        <div class="left">
            <i :class="currentFoldState" class="fold" @click="fold"></i>
            <div class="content hidden-xs-only">
                <navBreadCrumb
                    :crumbs="reactiveCrumbs"
                    :clickable="false"
                ></navBreadCrumb>
            </div>
        </div>
        <div class="right">
            <div class="iconbox">
                <a
                    href="https://github.com/WHIPLASHCZ"
                    class="el-icon-user icon"
                ></a>
                <a
                    href="https://github.com/WHIPLASHCZ"
                    class="el-icon-postcard icon"
                ></a>
                <a
                    href="https://github.com/WHIPLASHCZ"
                    class="el-icon-more icon"
                ></a>
            </div>
            <el-avatar :size="25" :src="circleUrl" class="avatar"></el-avatar>
            <el-dropdown>
                <span class="el-dropdown-link">
                    whiplashcz
                    <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
                </span>
                <template #dropdown>
                    <el-dropdown-menu size="medium">
                        <el-dropdown-item
                            icon="el-icon-error"
                            class="out"
                            @click="logout"
                        >
                            退出登录
                        </el-dropdown-item>
                        <el-dropdown-item icon="el-icon-plus" :divided="true"
                            >系统管理
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { ref, reactive, computed, toRaw, watch, toRefs } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { findCrumbs } from "@/utils/menu-map";
import navBreadCrumb, { IBreadcrumb } from "@/baseUI/breadcrumb";
import localCache from "@/utils/cache";
import useEchart from "@/baseUI/myChart/hooks/useEchart";
export default defineComponent({
    name: "navHeader",
    setup(props, context) {
        let $store = useStore();
        let $route = useRoute();
        let $router = useRouter();
        let isFold = ref(false);
        let circleUrl =
            "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
        let userName = $store.state.loginX.userInfo.name;
        // 查找当前路径对应面包屑
        let currentPath = computed(() => $route.path);
        let userMenus = $store.state.loginX.userMenus;
        let reactiveCrumbs = computed<IBreadcrumb[]>(() => {
            let $route = useRoute();
            return findCrumbs(toRaw(userMenus), currentPath.value);
        });

        let logout = () => {
            localCache.remove("token");
            $router.push("/login");
        };

        // 折叠侧边栏按钮
        let currentFoldState = computed(() =>
            isFold.value ? "el-icon-s-unfold" : "el-icon-s-fold"
        );
        function fold() {
            // 如果bool为true则缩小侧边栏 bool为false则打开侧边栏
            isFold.value = !isFold.value;
            context.emit("collapse", isFold.value);
        }
        return {
            fold,
            isFold,
            currentFoldState,
            circleUrl,
            userName,
            reactiveCrumbs,
            logout
            // ...toRefs(crumbsArr)
        };
    },
    components: {
        navBreadCrumb
    }
});
</script>

<style lang="less" scoped>
.header {
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .fold {
        font-size: 30px;
        cursor: pointer;
    }
    .content {
        margin-left: 10px;
        flex: 1;
    }
    .left {
        display: flex;
        align-items: center;
    }
    .right {
        margin-right: 20px;
        display: flex;
        align-items: center;
        .avatar {
            margin-right: 5px;
        }
        .out {
            height: 60px !important;
        }
    }
}
.iconbox {
    margin-right: 20px;

    .icon {
        display: inline-block;
        font-size: 20px;
        padding: 0 10px;
        color: #000;
        text-decoration: none;
    }
}
</style>
