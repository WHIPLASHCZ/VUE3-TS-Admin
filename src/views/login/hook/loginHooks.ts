import { ref, reactive, toRefs } from "vue";

export default function useLogin() {
    let rules = reactive({
        username: [
            { required: true, message: "请输入用户账号", trigger: "blur" },
            {
                pattern: /^[a-zA-Z0-9\.]{6,20}$/,
                message: "账号格式有误",
                trigger: "blur"
            }
        ],
        password: [
            { required: true, message: "请输入用户密码", trigger: "blur" },
            {
                pattern: /^[a-zA-Z0-9\.@]{6,20}$/,
                message: "密码格式有误",
                trigger: "blur"
            }
        ]
    });
    return {
        rules
    };
}
