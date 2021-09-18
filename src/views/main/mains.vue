<template>
    <div class="main">
        <el-container class="main-content">
            <el-aside
                width="210px"
                class="main-content aside"
                ref="asideRef"
                :class="{ collapse: currentCollapse }"
            >
                <navMenu ref="sideRef" :isCollapse="currentCollapse" />
            </el-aside>
            <el-container class="page">
                <el-header id="page-header">
                    <!-- <button @click="collapse = !collapse">22</button> -->
                    <nav-header @collapse="collapseSideBar" ref="headerRef" />
                </el-header>
                <el-main class="page-content">
                    <div class="clear"></div>
                    <!-- <div class="page-info"> -->
                    <router-view></router-view>
                    <!-- </div> -->
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import navMenu from "@/components/nav-menu/index";
import navHeader from "@/components/nav-header/index";
import { provide, inject, ref, getCurrentInstance } from "vue";
export default defineComponent({
    name: "mains",
    emits: ["collapse"],
    setup() {
        let currentCollapse = ref(false);
        let self = getCurrentInstance();
        let isCollapse = provide("collapse", currentCollapse);
        let headerRef = ref<InstanceType<typeof navHeader>>();
        let sideRef = ref<InstanceType<typeof navMenu>>();
        function collapseSideBar(state: boolean) {
            currentCollapse.value = state;
            // console.log(headerRef.value);
        }
        return {
            currentCollapse,
            collapseSideBar,
            headerRef,
            navMenu
        };
    },
    components: {
        navMenu,
        navHeader
    }
});
</script>

<style scoped lang="less">
@media screen and (max-width: 1400px) {
    // .el-aside {
    //     width: 180px !important;
    // }
}
.main {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.row {
    width: 100%;
    height: 100%;
}
.main-content {
    color: white;
}
.clear {
    clear: both;
}
.main-content,
.page {
    height: 100%;
    background-color: #fff;
    // overflow: hidden;
}

.page-info {
    background-color: #fff;
}

.page-content {
    height: calc(100% - 48px);
}

.el-header,
.el-footer {
    display: flex;
    color: #333;
    text-align: center;
    align-items: center;
}
.el-header {
    height: 48px !important;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.2) !important;
    z-index: 99;
    // background-color: blueviolet;
}

.collapse {
    width: 64px;
}

.el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    // background-color: #001529;
    background-color: #001a38;
    transition: width 0.3s linear;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar {
        display: none;
    }
}

.el-main {
    color: #333;
    text-align: center;
    background-color: #f0f2f5;
}
</style>
