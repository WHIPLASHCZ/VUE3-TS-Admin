import { createStore, useStore } from "vuex";
import type {Store} from 'vuex';
import loginModule from './login/loginX';
import systemModule from "./main/system/system";
import type {loginState} from './login/loginX';
import type { ISystemState } from "./main/system/system";
import searchInfoModule from './searchInfo/searchInfo';
import { getPageListData } from '@/network/main/system/system'
import {dashBoardModule,dashBoardState} from '@/store/main/analysis/darshboard';
interface RootState {
    entireDepartment:any[]
    entireRole:any[]
    entireLimits:any[]
}

 interface RootWithModule  {
    loginX:loginState,
    system:ISystemState,
    searchInfo:any,
    dashBoard:dashBoardState
}

export type myStoreType = RootState & RootWithModule

const store = createStore({
    state: () => {
        return {
          entireDepartment: [],
          entireRole:[],
          entireLimits:[]
        };
    },
    mutations:{
      setDepartment(state,department){
        state.entireDepartment = department;
      },
      setRole(state,role){
        state.entireRole = role;
      },
      setLimits(state,limits){
        state.entireLimits = limits;
        // console.log(state.entireLimits);

      }
    },

    actions:{
      async getInitalData({commit},state){
        console.log('getInitalData');
        let department = await getPageListData('/department/list',{offset:0,size:1000});
        let role = await getPageListData('/role/list',{offset:0,size:1000});
        let limitsResult =  await getPageListData('menu/list');
        commit('setDepartment',department.data.list);
        commit('setRole',role.data.list);
        commit('setLimits',limitsResult.data.list);
        return state;
      }
    },
    modules: {
      loginX:loginModule,
      system: systemModule,
      searchInfo:searchInfoModule,
      dashBoard:dashBoardModule
    }
});

export function initStore(){
    store.dispatch('loginX/loadLocalInfo')
}

// 把所有vuex内模块的类型添加给useStore
export function myUseStore():Store<myStoreType>{
    return useStore();
}

export type {RootState};
export default store;
