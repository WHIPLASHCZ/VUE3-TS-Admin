<template>
    <div class="menu">
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
                :showHeadHandler="true"
                @edit="editHandler"
                @create="createHandler"
                ref="pageContentRef"
            >
                <template v-slot:icon="info">
                    <el-button
                        v-if="info.data.icon"
                        :icon="info.data.icon"
                        round
                        type="text"
                        size="medium"
                        class="icon"
                    ></el-button>
                </template>
            </pageContent>
        </div>
    </div>
    <pageDialog
        :defaultInfo="defaultInfo"
        ref="dialogRef"
        :modalConfig="modalConfig"
        :isMenu="true"
    >
    </pageDialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import pageContent from "@/components/page-content";
import pageSearch from "@/components/page-search/index";
import { useStore } from "vuex";
import usePageSearch from "@/hooks/usePageSearch";
import { contentTableConfig } from "./config/content.config";
import searchFormProps from "./config/searchFormProps";
import useGetPageName from "@/hooks/useGetPageName";
import useDialogInfo from "@/hooks/useDialogInfo";
import pageDialog from "@/components/page-dialog";
import { modalConfig } from "@/views/main/system/menu/config/dialog.config";
import { getParentMenu } from "@/utils/menu-map";
export default defineComponent({
    name: "menus",
    setup() {
        let pathName = useGetPageName();
        let $store = useStore();
        let selectedParentNode = ref([]);
        let treeProp = { children: "children", label: "name" };

        let limitsList = computed(() => $store.state.entireLimits);
        let parentOptions = modalConfig.formItem.find(
            item => item.label == "父级菜单"
        );
        let parentUrl = modalConfig.formItem.find(
            item => item.label == "父级url"
        );
        let parentMenus = computed(() => {
            return getParentMenu(limitsList.value);
        });
        watch(
            limitsList,
            () => {
                parentOptions!.options! = getParentMenu(limitsList.value);
            },
            { immediate: true }
        );

        let treeRef = ref<any>();

        let notCreate = () => {
            parentOptions!.isHidden = true;
            parentUrl!.isHidden = true;
        };
        let isCreating = () => {
            parentOptions!.isHidden = false;
            parentUrl!.isHidden = false;
        };

        let {
            pageContentRef,
            searchDataRequest,
            resetRequest
        } = usePageSearch();

        // 用于在点开编辑按钮时 获取对应角色的已拥有权限
        let handleChange = (value: any) => {};

        let {
            editHandler,
            createHandler,
            defaultInfo,
            dialogRef
        } = useDialogInfo(notCreate, isCreating);
        return {
            contentTableConfig,
            pathName,
            searchFormProps,
            pageContentRef,
            searchDataRequest,
            resetRequest,
            editHandler,
            createHandler,
            defaultInfo,
            dialogRef,
            modalConfig,

            selectedParentNode,
            limitsList,
            treeProp,
            parentMenus,
            treeRef,
            handleChange
        };
    },
    components: {
        pageContent,
        pageDialog,
        pageSearch
    }
});
</script>

<style scoped>
.icon {
    font-size: 22px;
}
.search {
    padding: 20px 50px;
    background-color: #fff;
    width: 100%;
    box-sizing: border-box;
}
.content {
    padding: 40px 40px;
    margin-top: 20px;
    background-color: #fff;
    border-radius: 7px;
}
</style>
