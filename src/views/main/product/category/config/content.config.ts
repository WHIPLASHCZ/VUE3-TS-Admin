// 用户列表显示设置
let propList = [
    {
        prop: "name",
        label: "分类名称",
        minWidth: "100",
        slotName: "name"
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
let title = "分类列表";
let showIndex = true;
let selectable = true;

export const contentTableConfig = {
    title,
    propList,
    showIndex,
    selectable
};
