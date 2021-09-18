<template>
    <div class="goods">
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
            >
                <template v-slot:img="info">
                    <el-image
                        style="width:60px"
                        :src="info.data.imgUrl"
                        :preview-src-list="[info.data.imgUrl]"
                        lazy
                        hide-on-click-modal
                    />
                </template>
                <template v-slot:status="info">
                    <el-tag :type="info.data.status ? 'success' : 'danger'">
                        {{ info.data.status ? "启用" : "禁用" }}
                    </el-tag>
                </template>
                <template v-slot:oldPrice="info">
                    ￥{{ info.data.oldPrice }}
                </template>
                <template v-slot:newPrice="info">
                    ￥{{ info.data.newPrice }}
                </template>
            </pageContent>
        </div>
    </div>
    <pageDialog
        :defaultInfo="defaultInfo"
        ref="dialogRef"
        :modalConfig="modalConfig"
    >
    </pageDialog>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    reactive,
    onMounted,
    computed,
    getCurrentInstance,
    toRefs
} from "vue";
import pageSearch from "@/components/page-search/index";
import pageContent from "@/components/page-content";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import usePageSearch from "@/hooks/usePageSearch";
import { contentTableConfig } from "./config/content.config";
import searchFormProps from "./config/searchFormProps";
import useGetPageName from "@/hooks/useGetPageName";
import useDialogInfo from "@/hooks/useDialogInfo";
import pageDialog from "@/components/page-dialog";
import { modalConfig } from "./config/dialog.config";
export default defineComponent({
    name: "goods",
    setup() {
        let pathName = useGetPageName();
        let {
            pageContentRef,
            searchDataRequest,
            resetRequest
        } = usePageSearch();

        let configs = modalConfig.formItem;

        let isCreating = () => {
            for (let i of configs) {
                i.isHidden = false;
            }
        };

        let notCreating = () => {
            configs.forEach((item: any) => {
                if (item.field == "name" || item.field == "newPrice") {
                    item.isHidden = false;
                } else {
                    item.isHidden = true;
                }
            });
        };

        let {
            editHandler,
            createHandler,
            defaultInfo,
            dialogRef
        } = useDialogInfo(notCreating, isCreating);
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
            modalConfig
        };
    },
    components: {
        pageContent,
        pageSearch,
        pageDialog
    }
});
</script>

<style scoped>
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
