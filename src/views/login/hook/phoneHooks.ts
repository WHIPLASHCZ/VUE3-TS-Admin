import { ref, reactive, toRefs } from "vue";

export default function useLogin() {
    let rules = reactive({
        number: [
            { required: true, message: "请输入手机号", trigger: "blur" },
            {
                pattern: /^[0-9]{11}$/,
                message: "手机号格式有误",
                trigger: "blur"
            }
        ],
        idCode: [
            { required: true, message: "请输入验证码", trigger: "blur" },
            {
                pattern: /^[a-zA-Z0-9]{6}$/,
                message: "验证码有误",
                trigger: "blur"
            }
        ]
    });
    return {
        rules
    };
}
