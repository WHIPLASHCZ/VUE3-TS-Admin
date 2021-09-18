<template>
    <el-form
        :label-width="labelWidth"
        hide-required-asterisk
        :model="formData"
        ref="formRef"
    >
        <div class="head">
            <slot name="head"> </slot>
        </div>
        <el-row>
            <el-col
                v-bind="colLayout"
                v-for="(item, num) of formItem"
                class="col"
            >
                <el-form-item
                    v-if="!item.isHidden"
                    :label="item.label"
                    class="item"
                    :style="itemStyle"
                    :prop="item.field"
                    :rules="item.rules"
                >
                    <template
                        v-if="item.type == 'input' || item.type == 'password'"
                    >
                        <el-input
                            :placeholder="item.placeholder"
                            :show-password="item.type == 'password'"
                            v-model="formData[`${item.field}`]"
                            :disabled="item.isDisabled"
                            ref="iptRef"
                        >
                        </el-input>
                    </template>
                    <template v-else-if="item.type == 'input-number'">
                        <el-input
                            :placeholder="item.placeholder"
                            :show-password="item.type == 'password'"
                            v-model.number="formData[`${item.field}`]"
                            :disabled="item.isDisabled"
                            ref="iptRef"
                        >
                        </el-input>
                    </template>
                    <template v-else-if="item.type == 'select'">
                        <el-select
                            :placeholder="item.placeholder"
                            v-bind="item.other"
                            style="width:100%"
                            v-model="formData[`${item.field}`]"
                            :disabled="isDisabled && isMenu"
                            ref="selectRef"
                            @change="selectChange"
                            clearable
                        >
                            <el-option
                                v-for="opt of item.options"
                                :value="opt.value"
                                :key="opt.value"
                                :label="opt.title"
                                >{{ opt.title }}</el-option
                            >
                        </el-select>
                    </template>
                    <template v-else-if="item.type == 'datepicker'">
                        <el-date-picker
                            v-bind="item.other"
                            style="width:100%"
                            v-model="formData[`${item.field}`]"
                        ></el-date-picker>
                    </template>
                    <template v-else-if="item.type == 'menu'">
                        <el-cascader
                            v-model="formData[`${item.field}`]"
                            :options="item.options"
                            :props="{ checkStrictly: true }"
                            @change="changeHandler"
                            :disabled="isType1"
                        ></el-cascader>
                    </template>
                </el-form-item>
            </el-col>
        </el-row>

        <div class="foot">
            <slot name="foot"> </slot>
        </div>
    </el-form>
</template>

<script lang="ts">
import { defineComponent, PropType,ref,reactive, computed,watch, toRefs } from "vue";
import type { formItem } from '@/baseUI/form/type/types';
import type { ElForm, ElSelect } from 'element-plus';
export default defineComponent({
    name: "FormCpn",
    props: {
       formItem: {
            type: Array as PropType<formItem[]>,
            default:()=>[]
        },
        labelWidth:{
          type:String,
          default:'100px'
        },
        itemStyle:{
          type:Object,
          default:()=>({ padding: '5px 10px'})
        },
        colLayout:{
          type:Object,
          default:()=>({
            xl:6,
            lg:8,
            md:12,
            sm:24,
            xs:24,
            span:null
          })
        },
        formdatas:{
          type:Object,
          required:true
        },
        isMenu:{
          type:Boolean,
          default:false
        }
    },
    emits:['update:formdatas'],
    setup(props,context) {
     /*
        因为不建议在子组件内修改父组件传来的prop，所以将prop进行浅拷贝。
        然后将这个浅拷贝过的对象与表单双向绑定。
     */
      let formData = ref({...props.formdatas});
      let formRef = ref<InstanceType<typeof ElForm >>();
      let selectRef = ref<InstanceType<typeof ElSelect>>();
      let isDisabled = ref(false);
      let isType1 = ref(false);
      let validate = (cb:any)=>{
        return formRef?.value?.validate.bind(formRef?.value,cb);
      }

      let changeHandler = (val:any)=>{
          console.log(val);
          console.log(formData.value);
          formData.value.parentUrl = val[val.length-1].url;
          formData.value.type = val.length+1;
          if(val.length) isDisabled.value = true;
          else isDisabled.value = false;
      }

      let selectChange = (val:any)=>{
        if(!props.isMenu) return;
        if(val==1) isType1.value = true;
        else isType1.value = false;
      }

      // 当我们浅拷贝的对象发生变化时，emit发送事件把这个对象赋值给父组件prop传来的对象。
      watch(formData,(newval)=>{
        context.emit('update:formdatas',newval);
      },{deep:true});
      return {
        formData,
        formRef,
        validate,
        changeHandler,
        selectRef,
        isDisabled,
        isType1,
        selectChange
      }
    }
});
</script>

<style scoped lang="less">
.pl10 {
    padding-left: 10px;
}
</style>
