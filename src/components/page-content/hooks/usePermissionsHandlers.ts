import { useGetPermission } from "@/hooks/useGetPermissions";
import { useRoute } from "vue-router";
export default function usePermission() {
    let $route = useRoute();
    // 获取权限
    let canCreate = useGetPermission($route.path, "create");
    let canDelete = useGetPermission($route.path, "delete");
    let canEdit = useGetPermission($route.path, "update");
    let isQuery = useGetPermission($route.path, "query");

    function deleteHandler(info: any) {
        console.log(info);
    }
    function editHandler(info: any) {
        console.log(info);
    }
    function createHandler(info: any) {
        console.log(info);
    }
    return {
        canCreate,
        canDelete,
        canEdit,
        isQuery,
        deleteHandler,
        editHandler,
        createHandler
    };
}
