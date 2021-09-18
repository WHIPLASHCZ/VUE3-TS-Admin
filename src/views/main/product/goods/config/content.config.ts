// 商品列表显示设置
let propList = [
    {
        prop: "name",
        label: "商品名称",
        minWidth: "130",
        slotName: "name"
    },
    {
        prop: "oldPrice",
        label: "原价",
        minWidth: "80",
        slotName: "oldPrice"
    },
    {
        prop: "newPrice",
        label: "现价",
        minWidth: "80",
        slotName: "newPrice"
    },
    {
        prop: "imgUrl",
        label: "图片",
        minWidth: "120",
        slotName: "img"
    },
    {
        prop: "status",
        label: "商品状态",
        minWidth: "120",
        slotName: "status"
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
let title = "商品列表";
let showIndex = true;
let selectable = true;

export const contentTableConfig = {
    title,
    propList,
    showIndex,
    selectable
};
