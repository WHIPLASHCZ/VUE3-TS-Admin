// 用户列表显示设置
let propList = [
    {
        prop: "name",
        label: "菜单名称",
        minWidth: "100",
        slotName: "name"
    },
    {
        prop: "type",
        label: "类型",
        minWidth: "80",
        slotName: "type"
    },
    {
        prop: "url",
        label: "菜单url",
        minWidth: "100",
        slotName: "url"
    },
    {
        prop: "icon",
        label: "菜单图标",
        minWidth: "100",
        slotName: "icon"
    },
    {
        prop: "permission",
        label: "按钮权限",
        minWidth: "100",
        slotName: "permission"
    },
    {
        prop: "createAt",
        label: "创建时间",
        minWidth: "170",
        slotName: "createAt"
    },
    {
        prop: "updateAt",
        label: "修改时间",
        minWidth: "170",
        slotName: "updateAt"
    },
    { prop: "do", label: "操作", minWidth: "170", slotName: "do" }
];
let title = "菜单列表";
let showIndex = false;
let selectable = false;
let childrenProp = {
    rowKey: "id",
    treeProp: {
        children: "children"
    }
};

export const contentTableConfig = {
    title,
    propList,
    showIndex,
    selectable,
    childrenProp,
    showFooter: false
};
