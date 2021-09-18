<template>
    <myTable
        :list="list"
        :dataCnt="dataCount"
        v-bind="contentTableConfig"
        @sendSelected="getSelected"
        @sendChangePage="getPageData"
        @sendSize="getPageData"
    >
        <template v-if="showHeadHandler" v-slot:head-handler>
            <el-button
                v-if="canCreate"
                size="small"
                type="primary"
                icon="el-icon-folder-add"
                plain
                @click="createHandler"
                >新建</el-button
            >
            <el-button
                size="small"
                icon="el-icon-refresh"
                @click="refreshHandler"
                >刷新</el-button
            >
        </template>
        <!-- 作用域插槽 获取到对应名字对应列的数据  -->
        <template v-slot:enable="info">
            <el-tag :type="info.data.enable ? 'success' : 'danger'">
                {{ info.data.enable ? "启用" : "禁用" }}
            </el-tag>
        </template>
        <template v-slot:createAt="info">
            {{ $filters.formatTime(info.data.createAt) }}
        </template>
        <template v-slot:updateAt="info">
            {{ $filters.formatTime(info.data.updateAt) }}
        </template>
        <template v-slot:do="info">
            <el-button
                v-if="canEdit"
                size="mini"
                icon="el-icon-edit"
                type="primary"
                @click="editHandler(info.data)"
                >编辑</el-button
            >
            <el-button
                v-if="canDelete"
                size="mini"
                icon="el-icon-delete"
                type="danger"
                @click="deleteHandler(info)"
                plain
                >删除</el-button
            >
        </template>
        <!-- 动态嵌套插槽 由使用pageContent的父级组件传递插槽给pageContent实例 -->
        <template
            v-for="item in otherPropSlots"
            :key="item.prop"
            v-slot:[item.slotName]="info"
        >
            <slot
                v-if="item.slotName"
                :data="info.data"
                :name="item.slotName"
            ></slot>
        </template>
    </myTable>
</template>

<script lang="ts">
import myTable from "@/baseUI/table";
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useGetPermission } from "@/hooks/useGetPermissions";
import useGetPageList from "../hooks/useGetPageList";
import { ElMessage } from "element-plus";
import { ElMessageBox } from "element-plus";
export default defineComponent({
    name: "pageContent",
    props: {
        contentTableConfig: {
            type: Object,
            required: true
        },
        pageName: {
            type: String,
            required: true
            // default: $route.path.split("/").pop()
        },
        showHeadHandler: {
            type: Boolean,
            default: true
        }
    },
    emits: ["edit", "create"],
    setup(props: any, context) {
        let $store = useStore();
        let $route = useRoute();
        // 获取权限
        let canCreate = useGetPermission($route.path, "create");
        let canDelete = useGetPermission($route.path, "delete");
        let canEdit = useGetPermission($route.path, "update");
        let isQuery = useGetPermission($route.path, "query");

        function deleteHandler(info: any) {
            ElMessageBox.confirm(
                `确定要删除这条名为 <strong> ${info.data.name} </strong>  的数据吗？`,
                "提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    dangerouslyUseHTMLString: true,
                    type: "warning"
                }
            )
                .then(() => {
                    $store.dispatch("system/deletePageData", {
                        pageName: $route.path,
                        id: info?.data.id
                    });
                })
                .catch(() => {
                    ElMessage({
                        type: "info",
                        message: "已取消删除",
                        duration: 1000
                    });
                });
        }

        function editHandler(info: any) {
            context.emit("edit", info);
        }
        function createHandler(info: any) {
            context.emit("create");
        }

        // 获取当前页面信息列表
        let { list, dataCount, userList, getPageData } = useGetPageList(props);
        function refreshHandler() {
            ElMessage.info({
                message: "正在刷新...",
                type: "info",
                duration: 800
            });
            getPageData();
        }
        function getSelected(val: any) {
            console.log(val);
        }

        let otherPropSlots = props.contentTableConfig.propList.filter(
            (item: any) => {
                if (
                    item.slotName === "updateAt" ||
                    item.slotName === "createAt" ||
                    item.slotName == "do" ||
                    item.slotName == "name"
                )
                    return false;
                else return true;
            }
        );
        return {
            canCreate,
            canDelete,
            canEdit,
            isQuery,

            deleteHandler,
            editHandler,
            createHandler,
            refreshHandler,

            getSelected,
            list,
            dataCount,
            userList,
            getPageData,
            otherPropSlots
        };
    },
    components: {
        myTable
    }
});
</script>

<style lang="less" scoped>
.img {
    height: 70px;
}
.info {
    font-weight: bold;
}
.mention {
    font-size: 16px;
}
</style>
