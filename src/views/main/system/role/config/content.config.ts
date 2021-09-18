// 用户列表显示设置
let propList = [
    {
        prop: "id",
        label: "用户ID",
        minWidth: "70",
        slotName: "id"
    },
    {
        prop: "name",
        label: "角色名",
        minWidth: "100",
        slotName: "name"
    },
    {
        prop: "intro",
        label: "权限",
        minWidth: "70",
        slotName: "intro"
    },
    {
        prop: "createAt",
        label: "创建时间",
        minWidth: "200",
        slotName: "createAt"
    },
    {
        prop: "updateAt",
        label: "修改时间",
        minWidth: "200",
        slotName: "updateAt"
    },
    { prop: "do", label: "操作", minWidth: "200", slotName: "do" }
];
let title = "角色列表";
let showIndex = true;
let selectable = true;

export const contentTableConfig = {
    title,
    propList,
    showIndex,
    selectable
};
