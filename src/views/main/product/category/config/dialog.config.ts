export const modalConfig = {
    formItem: [
        {
            label: "类别名称",
            rules: [
                { required: true, message: "请输入部门名称", trigger: "blur" }
            ],
            placeholder: "请输入部门名称",
            type: "input",
            field: "name",
            isHidden: false
        }
    ],
    colLayout: { span: 24 },
    labelWidth: "85px",
    itemStyle: { padding: "13px 10px" }
};
