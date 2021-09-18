<template>
    <div class="role">
        <div class="search">
            <pageSearch
                ref="searchRef"
                :formProps="searchFormProps"
                @sendSearchData="searchDataRequest"
                @sendReset="resetRequest"
            ></pageSearch>
        </div>
        <div class="content">
            <pageContent
                :contentTableConfig="contentTableConfig"
                :pageName="pathName"
                @edit="editHandler"
                @create="createHandler"
                ref="pageContentRef"
            ></pageContent>
        </div>
    </div>
    <pageDialog
        :defaultInfo="defaultInfo"
        :modalConfig="modalConfig"
        :otherInfo="selectedLimits"
        ref="dialogRef"
    >
        <el-tree
            :data="limitsList"
            show-checkbox
            node-key="id"
            :props="treeProp"
            :default-checked-keys="userLimitsList"
            class="tree"
            ref="treeRef"
            @check="checkChange"
        >
        </el-tree>
    </pageDialog>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs, ref } from "vue";
import searchFormProps from "./config/searchFormProps";
import pageContent from "@/components/page-content";
import pageSearch from "@/components/page-search/index";
import pageDialog from "@/components/page-dialog";
import { contentTableConfig } from "./config/content.config";
import useGetPageName from "@/hooks/useGetPageName";
import usePageSearch from "@/hooks/usePageSearch";
import useDialogInfo from "@/hooks/useDialogInfo";
import { modalConfig } from "./config/dialog.config";
import { useStore } from "vuex";
import { getUserLimits } from "@/utils/menu-map";

export default defineComponent({
    name: "role",
    setup() {
        let pathName = useGetPageName();
        let treeRef = ref<any>();
        let $store = useStore();
        let selectedLimits = ref({});

        let userLimitsList = ref<any>([]);

        // 用于在点开编辑按钮时 获取对应角色的已拥有权限
        let getLimitsList = (list: any) => {
            userLimitsList.value = getUserLimits(list);
        };
        let {
            pageContentRef,
            searchDataRequest,
            resetRequest
        } = usePageSearch();
        let {
            editHandler,
            createHandler,
            defaultInfo,
            dialogRef
        } = useDialogInfo(getLimitsList);
        let treeProp = { children: "children", label: "name" };
        let limitsList = computed(() => $store.state.entireLimits);

        let checkChange = (holeData: any, checkedData: any) => {
            let checkedKeys = checkedData.checkedKeys;
            let halfCheckedKeys = checkedData.halfCheckedKeys;
            let list = [...checkedKeys, ...halfCheckedKeys];
            selectedLimits.value = { menuList: list };
        };
        return {
            pathName,
            contentTableConfig,
            searchFormProps,
            pageContentRef,
            searchDataRequest,
            resetRequest,
            userLimitsList,

            editHandler,
            createHandler,
            defaultInfo,
            dialogRef,
            modalConfig,
            treeProp,
            limitsList,
            treeRef,
            selectedLimits,
            checkChange
        };
    },
    components: {
        pageContent,
        pageSearch,
        pageDialog
    }
});
</script>

<style scoped lang="less">
.tree {
    padding-left: 20px;
    padding-top: 10px;
    text-align: center;
}
.role {
    .search,
    .content {
        border-radius: 8px;
    }
    .content {
        padding: 40px 40px;
        margin-top: 20px;
        background-color: #fff;
    }
    .search {
        padding: 20px 50px;
        background-color: #fff;
        width: 100%;
        box-sizing: border-box;
    }
}
</style>
