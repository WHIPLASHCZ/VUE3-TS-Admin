export const modalConfig = {
    formItem: [
        {
            label: "用户名",
            rules: [
                { required: true, message: "请输入邮箱地址", trigger: "blur" }
            ],
            placeholder: "请输入用户名",
            type: "input",
            field: "name"
        },
        {
            label: "真实姓名",
            rules: [
                { required: true, message: "请输入真实姓名", trigger: "blur" }
            ],
            placeholder: "请输入真实姓名",
            type: "input",
            field: "realname"
        },
        {
            label: "密码",
            rules: [{ required: true, message: "请输入密码", trigger: "blur" }],
            placeholder: "请输入密码",
            type: "password",
            field: "password",
            isHidden: true
        },
        {
            label: "手机号",
            rules: [
                { required: true, message: "请输入手机号", trigger: "blur" }
                // { type: "number", message: "手机号必须为数字值" }
            ],
            placeholder: "请输入手机号",
            type: "input",
            field: "cellphone"
        },
        {
            label: "角色",
            rules: [{ required: true, message: "请选择角色", trigger: "blur" }],
            placeholder: "请选择角色",
            type: "select",
            options: [],
            field: "roleId"
        },
        {
            label: "部门",
            rules: [{ required: true, message: "请选择部门", trigger: "blur" }],
            placeholder: "请选择部门",
            type: "select",
            options: [],
            field: "departmentId"
        }
    ],
    colLayout: { span: 24 },
    labelWidth: "80px",
    itemStyle: { padding: "13px 10px" }
};
