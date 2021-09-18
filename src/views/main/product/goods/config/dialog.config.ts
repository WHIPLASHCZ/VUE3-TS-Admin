// import { getParentMenu } from "@/utils/menu-map";
// import { computed } from "vue";
// import { useStore } from "vuex";
// let $store = useStore();
// let limitsList = computed(() => $store.state.entireLimits);
// let parentMenus = computed(() => getParentMenu(limitsList.value));

export const modalConfig = {
    formItem: [
        {
            label: "商品名称",
            rules: [
                { required: true, message: "请输入商品名称", trigger: "blur" }
            ],
            placeholder: "请输入商品名称",
            type: "input",
            field: "name",
            isHidden: true
        },
        {
            label: "原价",
            rules: [
                {
                    required: true,
                    message: "请输入商品原价格",
                    trigger: "blur"
                },
                { type: "number", message: "价格必须为数字值" }
            ],
            type: "input-number",
            field: "oldPrice",
            isHidden: true
        },
        {
            label: "现价",
            rules: [
                {
                    required: true,
                    message: "请输入商品现价格",
                    trigger: "blur"
                },
                { type: "number", message: "价格必须为数字值" }
            ],
            type: "input-number",
            field: "newPrice",
            isHidden: true
        },
        {
            label: "商品描述",
            type: "input",
            field: "desc",
            isHidden: true
        },
        {
            label: "商品状态",
            rules: [
                { required: true, message: "请选择商品状态", trigger: "blur" }
            ],
            placeholder: "请选择商品状态",
            type: "select",
            field: "status",
            options: [
                { title: "启用", value: 1 },
                { title: "禁用", value: 0 }
            ],
            isHidden: true
        },
        {
            label: "图片地址",
            rules: [
                { required: true, message: "请输入图片URL", trigger: "blur" }
            ],
            type: "input",
            field: "imgUrl",
            isHidden: true
        },
        {
            label: "库存数量",
            type: "input-number",
            field: "inventoryCount",
            rules: [
                { required: true, message: "请输入库存数量", trigger: "blur" },
                { type: "number", message: "数量必须为数字值" }
            ],
            isHidden: true
        },
        {
            label: "销售数量",
            type: "input-number",
            field: "saleCount",
            rules: [
                { required: true, message: "请输入销售数量", trigger: "blur" },
                { type: "number", message: "数量必须为数字值" }
            ],
            isHidden: true
        },
        {
            label: "收藏数量",
            type: "input-number",
            field: "favorCount",
            rules: [
                { required: true, message: "请输入收藏数量", trigger: "blur" },
                { type: "number", message: "数量必须为数字值" }
            ],
            isHidden: true
        },
        {
            label: "地址",
            type: "input",
            field: "address",
            rules: [{ required: true, message: "请输入地址", trigger: "blur" }],
            isHidden: true
        }
    ],

    // {
    //   "name": "aaa",
    //   "oldPrice": 100,
    //   "newPrice": 88,
    //   "desc": "cba",
    //   "status": 1,
    //   "imgUrl": "www.itsiyuan.com/abc.png",
    //   "inventoryCount": 100,
    //   "saleCount": 100,
    //   "favorCount": 199,
    //   "address": "北京"
    // }
    colLayout: { span: 24 },
    labelWidth: "80px",
    itemStyle: { padding: "13px 10px" }
};
