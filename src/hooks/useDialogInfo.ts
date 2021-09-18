import { ref } from "vue";
import pageDialog from "@/components/page-dialog";
import getPageName from "@/hooks/useGetPageName";
type callbackType = (cs?: any) => void;

interface map {
    [name: string]: string;
}

let namesMap: map = {
    user: "用户",
    role: "角色",
    department: "部门",
    menu: "菜单",
    category: "类别",
    goods: "商品",
    main: "主页"
};

export default function useDialogInfo(
    editcallback?: callbackType,
    createCallback?: callbackType
) {
    let dialogRef = ref<any>();
    let defaultObj = {};
    let defaultInfo = ref<any>(defaultObj);
    let pathName = getPageName();

    function editHandler(info: any) {
        editcallback && editcallback(info.menuList);
        dialogRef.value!.title = `编辑${namesMap[pathName]}`;
        dialogRef.value!.showDialog = true;
        defaultInfo.value = info;

        // userLimits.value = defaultInfo!.value.menuList.map(item=>item.id);
        // getUserLimits(defaultInfo.value.menuList);
    }

    function createHandler() {
        createCallback && createCallback();
        dialogRef.value!.title = `新建${namesMap[pathName]}`;
        defaultInfo.value = defaultObj;
        dialogRef.value!.showDialog = true;
    }

    return {
        dialogRef,
        defaultInfo,
        editHandler,
        createHandler
    };
}
