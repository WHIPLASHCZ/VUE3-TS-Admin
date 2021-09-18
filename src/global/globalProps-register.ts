import type {App} from 'vue';
import { registerApp } from "./index";
import {utcFormate} from '@/utils/date-formater';
export default function globalPropsRegister(app:App){
  app.config.globalProperties.$filters = {
    formatTime(time: any,format?:string) {
      return utcFormate(time,format);
    }
};
}
