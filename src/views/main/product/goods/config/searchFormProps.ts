import FormCpn, { formItem, IForm } from "@/baseUI/form/index";
const formItems: formItem[] = [
    {
        label: "商品名称",
        // rules: [{ required: true, message: "请输入ID", trigger: "blur" }],
        placeholder: "请输入商品名称",
        type: "input",
        field: "name"
    },
    {
        label: "原价",
        rules: [],
        placeholder: "请输入原价",
        type: "input",
        field: "oldPrice"
    },
    {
        label: "现价",
        rules: [],
        placeholder: "请输入现价",
        type: "input",
        field: "newPrice"
    },
    {
        label: "商品状态",
        rules: [],
        placeholder: "请选择商品状态",
        type: "select",
        options: [
            { title: "启用", value: 1 },
            { title: "禁用", value: 0 }
        ],
        field: "status"
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

let searchformProps: IForm = {
    itemStyle: styles,
    colLayout: colLayout,
    formItem: formItems,
    labelWidth: "80px"
};

export default searchformProps;
