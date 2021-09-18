import FormCpn, { formItem, IForm } from "@/baseUI/form/index";
const formItems: formItem[] = [
    {
        label: "用户ID",
        rules: [{ required: true, message: "请输入ID", trigger: "blur" }],
        placeholder: "请输入ID",
        type: "input",
        field: "id"
    },
    {
        label: "用户名",
        rules: [],
        placeholder: "请输入用户名",
        type: "input",
        field: "name"
    },
    {
        label: "手机号",
        rules: [],
        placeholder: "请输入手机号",
        type: "input",
        field: "cellphone"
    },
    {
        label: "真实姓名",
        rules: [],
        placeholder: "请输入真实姓名",
        type: "input",
        field: "realname"
    },
    {
        label: "用户状态",
        rules: [],
        placeholder: "请选择用户状态",
        type: "select",
        options: [
            { title: "启用", value: 1 },
            { title: "禁用", value: 0 }
        ],
        field: "enable"
    },
    {
        label: "创建时间",
        rules: [],
        placeholder: "请输入爱好",
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
