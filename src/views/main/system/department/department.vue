<template>
    <div class="department">
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
                ref="pageContentRef"
                @edit="editHandler"
                @create="createHandler"
            ></pageContent>
        </div>
    </div>
    <pageDialog
        :defaultInfo="defaultInfo"
        :modalConfig="modalConfig"
        ref="dialogRef"
    ></pageDialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import searchFormProps from "./config/searchFormProps";
import pageSearch from "@/components/page-search/index";
import pageContent from "@/components/page-content";
import { contentTableConfig } from "./config/content.config";
import useGetPageName from "@/hooks/useGetPageName";
import usePageSearch from "@/hooks/usePageSearch";
import useDialogInfo from "@/hooks/useDialogInfo";
import pageDialog from "@/components/page-dialog";
import { modalConfig } from "./config/dialog.config";
export default defineComponent({
    name: "department",
    setup() {
        let pathName = useGetPageName();

        let {
            pageContentRef,
            searchDataRequest,
            resetRequest
        } = usePageSearch();

        let name = modalConfig.formItem.find(item => item.field == "name");

        let isEditing = () => {
            name!.isHidden = true;
        };

        let isCreating = () => {
            name!.isHidden = false;
        };

        let {
            editHandler,
            createHandler,
            defaultInfo,
            dialogRef
        } = useDialogInfo(isEditing, isCreating);

        return {
            searchFormProps,
            contentTableConfig,
            pathName,
            editHandler,
            createHandler,
            defaultInfo,
            dialogRef,
            modalConfig,
            pageContentRef,
            searchDataRequest,
            resetRequest
        };
    },
    components: {
        pageSearch,
        pageContent,
        pageDialog
    }
});
</script>

<style scoped>
.search,
.content {
    border-radius: 8px;
}
.center {
    text-align: center;
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
</style>
