import { ref, computed, watch, toRaw } from "vue";
import { useStore } from "vuex";
import { useGetPermission } from "@/hooks/useGetPermissions";
import { useRoute } from "vue-router";

export function useGetPageList(props: any) {
    let $store = useStore();
    let $route = useRoute();
    let searchInfos = computed(
        () => $store.state.searchInfo.currentPageSearchInfo
    );
    let pageInfo = computed(() => $store.state.searchInfo.pageNumInfo);
    let isQuery = useGetPermission($route.path, "query");
    console.log(props.pageName);

    let getPageData = (queryInfo: any = {}) => {
        // if (!isQuery) return null;
        $store.dispatch("system/getPageList", {
            pageName: props.pageName,
            query: {
                ...toRaw(searchInfos.value),
                ...toRaw(pageInfo.value)
            }
        });
    };
    getPageData();

    let userList = computed(() => {
        return $store.state.system.userList;
    });
    let userCnt = computed(() => {
        return $store.state.system.userCount;
    });

    // 用computed获取列表 当列表发生变化时会自动再次获取。
    let list = computed(() => {
        return $store.getters["system/getList"](props.pageName);
    });
    let dataCount = computed(() =>
        $store.getters["system/pageListCount"](props.pageName)
    );
    watch(
        pageInfo,
        newval => {
            console.log(newval);
            getPageData();
        },
        { deep: true }
    );
    return {
        list,
        dataCount,
        userList,
        getPageData,
        pageInfo
    };
}

export default useGetPageList;
