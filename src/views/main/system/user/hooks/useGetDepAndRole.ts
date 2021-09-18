import { useStore } from "vuex";
import { ref, watch, computed } from "vue";
import { modalConfig } from "../config/dialog.config";
export default function useGetDepAndRole() {
    let $store = useStore();
    let department = getXinfo("departmentId");
    let role = getXinfo("roleId");

    // computed会对回调内部使用过的值产生依赖，如果内部有值发生变化，会重新执行。
    // 这个computed内部依赖了$store.state里的值，state内一旦发生变化会重新执行。
    let modalConfigComputed = computed(() => {
        getOptions("entireDepartment", department);
        getOptions("entireRole", role);
        return modalConfig;
    });
    function getXinfo(infoName: any) {
        return ref(modalConfig.formItem.find(item => item.field == infoName));
    }
    function getOptions(Xname: string, info: any) {
        info!.value!.options = $store.state[Xname].map((item: any) => {
            return { title: item.name, value: item.id };
        });
    }
    return {
        modalConfigComputed
    };
}
