export const modalConfig = {
    formItem: [
        {
            label: "角色名",
            rules: [
                { required: true, message: "请输入角色名称", trigger: "blur" }
            ],
            placeholder: "请输入用户名",
            type: "input",
            field: "name"
        },
        {
            label: "权限介绍",
            rules: [
                { required: true, message: "请输入权限介绍", trigger: "blur" }
            ],
            placeholder: "请输入权限介绍",
            type: "input",
            field: "intro"
        }
    ],
    colLayout: { span: 24 },
    labelWidth: "80px",
    itemStyle: { padding: "13px 10px" }
};
