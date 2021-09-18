import { Module } from "vuex";
import { RootState } from "../index";
import $send from "@/network/index";
import { userLoginRequest,getUserInfoById,getUserMenu } from "@/network/login/login";
import type {account} from '@/network/login/login';
import { ElMessage } from 'element-plus'
import localCache from '@/utils/cache';
import router from '@/router/index';
import {routes} from '@/router/index';
import {mapMenuToRoutes,mapMenuToPermission} from '@/utils/menu-map';
import {initStore} from '../index';
import {useRouter} from 'vue-router';

interface loginState {
    token: string;
    userInfo: any;
    userMenus:any;
    permissions:string[]
}

let errorMap ={
  400:'账号或密码有误！',
  404:'请求地址不存在！',
  405:"请求方式错误！",
  500:'服务器错误！'
}

const loginModule: Module<loginState, RootState> = {
    namespaced: true,
    state() {
        return {
            token: "",
            userInfo: {},
            userMenus: localCache.get('menus') || [],
            permissions:[]
        };
    },
    getters: {},
    mutations: {
      setToken(state,token:string){
        state.token = token;
      },
      setUserInfo(state,info){
        state.userInfo = info;
      },
      setUserMenus(state,menus){
        if(!menus.length){
          console.log(menus);

          let $router = useRouter();
           menus = [];
           ElMessage.error({
             message:'该账号没有任何权限，请换个账号登录！',
             type:'error'
           })
           localCache.remove('token');
           history.pushState({},'','login');
          };
        state.userMenus = menus ;
        localCache.set('menus',menus );
        const menuRoutes = mapMenuToRoutes(menus);
        state.permissions = mapMenuToPermission(menus);
        menuRoutes.forEach(menu=>{
          router.addRoute('main',menu);
        })
      }
    },
    actions: {
        async userLoginAction({ commit,dispatch }, payload: any) {
            let res = await userLoginRequest({
                name: payload.username,
                password: payload.password
            });
            if(typeof res =='number' ){
              // 登陆失败 报错
              let errorType = errorMap[res];
              ElMessage.error({
                message: errorType,
                type: "error",
                duration: 2500
              })
            }else{
              // 登陆成功 获取token
              let code = res.code;
              let {id,token} = res.data;
              commit('setToken',token);
              localCache.set('token',token);
              // 初始化VUEX全局信息
              dispatch('getInitalData',null,{root:true});
              // 获取用户具体信息
              let userInfo = await getUserInfoById(id);
              commit('setUserInfo',userInfo.data);
              localCache.set('userInfo',userInfo.data);
              // 设置用户菜单
              let menus = await getUserMenu(id);
              console.log(menus);
              if(!menus.data) {menus.data = []};
              console.log(menus);
              commit('setUserMenus',menus.data);
              router.push({name:'main'});
            }
        },
        loadLocalInfo({ commit,dispatch }, payload: any){
          let token = localCache.get('token') || '';
          let userInfo = localCache.get('userInfo') || '';
          let menus = localCache.get('menus') || [];
          commit('setToken',token);
          commit('setUserInfo',userInfo);
          if(menus.length) commit('setUserMenus',menus);

          if(token!=''&&token!='true'&&token!=true){
            dispatch('getInitalData',null,{root:true});
          }
        },
        phoneLoginAction({ commit }, payload: any) {}
    }
};

export type {loginState}
export default loginModule;
