import {
  ElButton,ElInput,ElLoading,ElTabs,ElForm,ElLink,ElCheckbox,
  ElMessage,ElContainer,ElMenu,ElRow,ElCol,ElBreadcrumb,ElDropdown,
  ElAvatar,ElSelect,ElOption,ElDatePicker,ElTable,ElTag,ElPagination,
  ElImage,ElDialog,ElTree,ElCard,ElPopover,ElIcon,ElCascader,ElDescriptions, ElResult
} from 'element-plus';
import type {App} from 'vue';

let components:any[] = [
  ElButton,ElInput,ElLoading,ElTabs ,
  ElForm,ElLink,ElCheckbox,ElMessage,
  ElContainer,ElMenu,ElRow,ElCol,ElBreadcrumb,
  ElDropdown,ElAvatar,ElSelect,ElDatePicker,
  ElTable,ElTag,ElPagination, ElImage,ElDialog,
  ElTree,ElCard,ElPopover,ElIcon,ElCascader,
  ElDescriptions,ElResult
];

export default function (app:App):void{
  for(const component of components){
    // app.component(component.name,component);
    app.use(component);
    // app.component(i.name,i);
  }
}


