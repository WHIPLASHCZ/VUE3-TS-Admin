import FormCpn, { formItem, IForm } from "@/baseUI/form/index";
const formItems: formItem[] = [
    {
        label: "菜单名称",
        placeholder: "请输入菜单名称",
        type: "input",
        field: "name"
    },
    {
        label: "类型",
        placeholder: "请输入菜单类型",
        type: "select",
        options: [
            { title: "一级菜单", value: 1 },
            { title: "二级菜单", value: 2 },
            { title: "三级菜单", value: 3 }
        ],
        field: "type"
    },
    {
        label: "创建时间",
        rules: [],
        placeholder: "请输入创建时间",
        type: "datepicker",
        other: {
            startPlaceholder: "开始时间",
            endPlaceholder: "结束时间",
            type: "daterange"
        },
        field: "createAt"
    }
];
let styles = {
    padding: "10px 10px"
};
let colLayout = {
    xl: 8,
    lg: 8,
    md: 12,
    sm: 24,
    xs: 24,
    span: null
};

let searchformProps: IForm = {
    itemStyle: styles,
    colLayout: colLayout,
    formItem: formItems,
    labelWidth: "80px"
};

export default searchformProps;
