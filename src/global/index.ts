import Elregister from './element-register'
import type {App} from 'vue';
import globalPropsRegister from './globalProps-register';
export function registerApp(app:App){
  Elregister(app);
  globalPropsRegister(app);
}
