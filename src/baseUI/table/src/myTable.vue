<template>
    <div class="table">
        <div class="header">
            <slot name="header">
                <slot name="title">
                    <h3 class="title">{{ title }}</h3>
                </slot>
                <div class="handler">
                    <slot name="head-handler"></slot>
                </div>
            </slot>
        </div>
        <el-table
            :data="list"
            style="width: 100%"
            border
            @selection-change="selectHandler"
            v-bind="childrenProp"
        >
            <el-table-column v-if="selectable" type="selection" />
            <el-table-column
                v-if="showIndex"
                type="index"
                label="序号"
                width="60"
            />
            <el-table-column
                v-for="i of propList"
                v-bind="i"
                :key="i.prop"
                class-name="center"
                show-overflow-tooltip
            >
                <template #default="item">
                    <!-- 嵌套插槽 slot通过v-bind获取到外层作用域插槽传来的数据-->
                    <!-- el-TABLE会通过row这个属性名称把内部数据传递到外部的插槽来。 -->
                    <!-- 我们在插入ELTABEL的插槽内再写一个被别人插的插槽 通过data属性 把eltable传来的数据传递给外部的插槽。 -->
                    <!-- 每个数据都有一个slotName属性 作为该列数据的插槽名称 外部插槽可根据该名称插入对应插槽 -->
                    <slot :name="i.slotName" :data="item.row">
                        <!-- 插槽的默认值 若外部不写插槽 则显示默认内容 也就是文本形式的数据 -->
                        {{ item.row[i.prop] }}
                        <p v-if="i.prop == 'do'" class="greyTxt">暂无权限！</p>
                    </slot>
                </template>
            </el-table-column>
        </el-table>
        <div v-if="showFooter" class="footer">
            <slot name="footer">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page.currentPage"
                    :page-sizes="[10, 15, 20, 30]"
                    :page-size="page.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="dataCnt"
                >
                </el-pagination>
            </slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
// import myUseStore from "element-plus/lib/components/table/src/store";
import { useStore } from "vuex";
import { ref, reactive, computed } from "vue";
export default defineComponent({
    name: "myTable",
    props: {
        list: {
            type: Array,
            required: true
        },
        propList: {
            type: Array,
            required: true
        },
        showIndex: {
            type: Boolean,
            default: false
        },
        selectable: {
            type: Boolean,
            default: false
        },
        showOperate: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ""
        },
        dataCnt: {
            type: Number,
            default: 0
        },
        childrenProp: {
            type: Object,
            default: () => ({})
        },
        // page: {
        //     type: Object,
        //     default: () => {
        //         return { currentPage: 0, pageSize: 10 };
        //     }
        // },
        showFooter: {
            type: Boolean,
            default: true
        }
    },
    emits: ["update:page", "sendSelected", "sendChangePage", "sendSize"],
    setup(prop, context) {
        let $store = useStore();
        $store.commit("searchInfo/reset");
        let page: any = computed(() => $store.getters["searchInfo/getPageNum"]);
        function selectHandler(val: any) {
            context.emit("sendSelected", val);
        }
        function handleCurrentChange(val: any) {
            $store.commit("searchInfo/setPageNumInfo", {
                currentPage: val,
                pageSize: page.value.size
            });
        }
        function handleSizeChange(val: any) {
            $store.commit("searchInfo/setPageNumInfo", {
                currentPage: page.value.currentPage,
                pageSize: val
            });
        }
        return {
            selectHandler,
            handleCurrentChange,
            handleSizeChange,
            page
        };
    }
});
</script>

<style scoped lang="less">
h3 {
    margin: 0;
}
.footer {
    padding-top: 20px;
}
.header {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-bottom: 20px;
    // height: 40px;
    .title {
    }
    .handler {
        position: absolute;
        right: 0px;
    }
}

.greyTxt {
    color: rgb(139, 139, 139);
}
</style>
