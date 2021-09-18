<template>
    <div class="user">
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
        :modalConfig="modalConfigComputed"
        ref="dialogRef"
    ></pageDialog>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    reactive,
    onMounted,
    computed,
    getCurrentInstance,
    toRefs,
    watch
} from "vue";
import searchFormProps from "./config/searchFormProps";
import pageSearch from "@/components/page-search/index";
import pageContent from "@/components/page-content";

import pageDialog from "@/components/page-dialog";
import { contentTableConfig } from "./config/content.config";
import { modalConfig } from "./config/dialog.config";
import useGetDepAndRole from "./hooks/useGetDepAndRole";
import useGetPageName from "@/hooks/useGetPageName";
import usePageSearch from "@/hooks/usePageSearch";
import useDialogInfo from "@/hooks/useDialogInfo";
export default defineComponent({
    name: "user",

    setup() {
        let searchRef = ref(null);
        let pathName = useGetPageName();
        let password = ref(
            modalConfig.formItem.find(item => item.field == "password")
        );
        let { modalConfigComputed } = useGetDepAndRole();

        let createCallBack = () => {
            password!.value!.isHidden = false;
        };
        let editCallBack = () => {
            password!.value!.isHidden = true;
        };
        let {
            editHandler,
            createHandler,
            defaultInfo,
            dialogRef
        } = useDialogInfo(editCallBack, createCallBack);

        function getSelected(val: any) {
            console.log(val);
        }
        let {
            pageContentRef,
            searchDataRequest,
            resetRequest
        } = usePageSearch();

        return {
            searchRef,
            searchFormProps,
            getSelected,
            contentTableConfig,
            pathName,
            pageContentRef,
            searchDataRequest,
            resetRequest,

            modalConfig,
            editHandler,
            createHandler,
            defaultInfo,
            dialogRef,

            modalConfigComputed
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
.search {
    padding: 0 50px;
    background-color: #fff;
    width: 100%;
    box-sizing: border-box;
}
.formcpn {
    padding: 20px 0;
}
.col {
    align-content: center !important;
    line-height: 62px !important;
}
.content {
    padding: 40px 40px;
    margin-top: 20px;
    background-color: #fff;
}
</style>
