// 用户列表显示设置

// {
//   "id": 196,
//   "title": "我与地坛",
//   "content": "宇宙以其不息的欲望将一个歌舞炼为永恒。这欲望有怎样一个人间的姓名，大可忽略不计。",
//   "createAt": "2021-09-17T16:12:12.000Z"
// },

let propList = [
    {
        prop: "title",
        label: "故事名称",
        minWidth: "100",
        slotName: "title"
    },
    {
        prop: "content",
        label: "故事内容",
        minWidth: "170",
        slotName: "content"
    },
    {
        prop: "createAt",
        label: "创建时间",
        minWidth: "200",
        slotName: "createAt"
    }
];
let title = "故事列表";
let showIndex = true;
let selectable = true;

export const contentTableConfig = {
    title,
    propList,
    showIndex,
    selectable
};
