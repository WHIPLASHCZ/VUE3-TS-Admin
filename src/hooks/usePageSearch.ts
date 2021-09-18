import { ref, reactive, onMounted } from "vue";
import pageContent from "@/components/page-content";
function usePageSearch(): any {
    let pageContentRef = ref<InstanceType<typeof pageContent>>();
    function searchDataRequest(query: any) {
        pageContentRef?.value?.getPageData();
    }
    function resetRequest() {
        pageContentRef?.value?.getPageData();
    }
    return {
        pageContentRef: pageContentRef,
        searchDataRequest,
        resetRequest
    };
}
export default usePageSearch;
