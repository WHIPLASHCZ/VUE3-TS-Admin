import FormCpn, { formItem, IForm } from "@/baseUI/form/index";
const formItems: formItem[] = [
    {
        label: "分类名称",
        rules: [],
        placeholder: "请输入分类名称",
        type: "input",
        field: "name"
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

let formProps: IForm = {
    itemStyle: styles,
    colLayout: colLayout,
    formItem: formItems,
    labelWidth: "80px"
};

export default formProps;
