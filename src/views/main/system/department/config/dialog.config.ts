export const modalConfig = {
    formItem: [
        {
            label: "部门名称",
            rules: [
                { required: true, message: "请输入部门名称", trigger: "blur" }
            ],
            placeholder: "请输入部门名称",
            type: "input",
            field: "name",
            isHidden: false
        },
        {
            label: "上级部门ID",
            rules: [
                { required: true, message: "请输入上级部门ID", trigger: "blur" }
            ],
            placeholder: "请输入上级部门ID",
            type: "input",
            field: "parentId"
        },
        {
            label: "部门领导",
            rules: [
                { required: true, message: "请输入部门领导", trigger: "blur" }
            ],
            placeholder: "请输入部门领导",
            type: "input",
            field: "leader"
        }
    ],
    colLayout: { span: 24 },
    labelWidth: "85px",
    itemStyle: { padding: "13px 10px" }
};
