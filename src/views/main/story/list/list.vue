<template>
    <div class="list">
        <div class="content">
            <pageContent
                :contentTableConfig="contentTableConfig"
                :pageName="pathName"
                ref="pageContentRef"
            >
                <template v-slot:content="info">
                    <section v-html="info.data.content"></section>
                </template>
            </pageContent>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import pageContent from "@/components/page-content";
import { contentTableConfig } from "./config/content.config";
import useGetPageName from "@/hooks/useGetPageName";
import { useStore } from "vuex";
export default defineComponent({
    name: "list",
    setup() {
        let pathName = useGetPageName();
        let $store = useStore();
        let secRef = ref<InstanceType<typeof HTMLElement>>();
        let listCnt = ref($store.state.system.listCount);

        watch(
            () => $store.state.system.listCount,
            newval => {
                listCnt.value = newval;
            }
        );

        onMounted(() => {});
        return {
            contentTableConfig,
            pathName,
            secRef
        };
    },
    components: {
        pageContent
    }
});
</script>

<style scoped>
section {
    width: 100%;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
