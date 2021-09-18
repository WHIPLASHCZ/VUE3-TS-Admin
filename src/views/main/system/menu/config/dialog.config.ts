import { getParentMenu } from "@/utils/menu-map";
import { computed } from "vue";
import { useStore } from "vuex";
let $store = useStore();
let limitsList = computed(() => $store.state.entireLimits);
let parentMenus = computed(() => getParentMenu(limitsList.value));
export const modalConfig = {
    formItem: [
        {
            label: "菜单名称",
            rules: [
                { required: true, message: "请输入菜单名称", trigger: "blur" }
            ],
            placeholder: "请输入菜单名称",
            type: "input",
            field: "name"
        },
        {
            label: "父级url",
            type: "input",
            field: "parentUrl",
            isDisabled: true,
            isHidden: false
        },
        {
            label: "菜单url",
            rules: [
                { required: true, message: "请输入菜单url", trigger: "blur" }
            ],
            placeholder: "请输入菜单url(以斜杠开头)",
            type: "input",
            field: "url"
        },
        {
            label: "菜单级别",
            rules: [{ required: true, message: "请输入密码", trigger: "blur" }],
            placeholder: "请输入菜单级别",
            options: [
                { title: "一级菜单", value: 1 },
                { title: "二级菜单", value: 2 },
                { title: "三级菜单", value: 3 }
            ],
            type: "select",
            field: "type"
        },
        {
            label: "父级菜单",
            rules: [
                { required: true, message: "请选择父级菜单", trigger: "blur" }
            ],
            placeholder: "请输入菜单级别",
            type: "menu",
            field: "parentId",
            options: [],
            isHidden: false
        }
    ],
    colLayout: { span: 24 },
    labelWidth: "80px",
    itemStyle: { padding: "13px 10px" }
};
