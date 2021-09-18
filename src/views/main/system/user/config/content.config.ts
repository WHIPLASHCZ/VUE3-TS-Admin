// 用户列表显示设置
let propList = [
    {
        prop: "name",
        label: "用户名",
        minWidth: "100",
        slotName: "name"
    },
    {
        prop: "realname",
        label: "真实姓名",
        minWidth: "70",
        slotName: "realname"
    },
    {
        prop: "cellphone",
        label: "手机号",
        minWidth: "100",
        slotName: "cellphone"
    },
    {
        prop: "enable",
        label: "状态",
        minWidth: "80",
        slotName: "enable"
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
let title = "用户列表";
let showIndex = true;
let selectable = true;

export const contentTableConfig = {
    title,
    propList,
    showIndex,
    selectable
};
