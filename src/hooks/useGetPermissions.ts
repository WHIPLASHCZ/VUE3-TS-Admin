import { useStore } from "vuex";
import getPageName from "./useGetPageName";
export function useGetPermission(pageName: string, handleName: string) {
    let $store = useStore();
    let permissions = $store.state.loginX.permissions;
    let pathName = pageName.split("/").pop();
    if (pathName == "user") pathName = "users";

    return (
        permissions.find(
            (per: string) => per == `system:${pathName}:${handleName}`
        ) != undefined
    );
}
