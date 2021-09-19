import { Module } from "vuex";
import { RootState, myStoreType } from "../../index";
import $send from "@/network/index";
import {
  getPageListData,
  editPageData,
  createPageData
} from "@/network/main/system/system";
import { deleteData } from "@/network/main/system/system";
import { ElMessage } from "element-plus";

// system模块的state的类型
export interface ISystemState {
  userList: any[];
  userCount: number;
  roleList: any[];
  roleCount: number;
  goodsList: any[];
  goodsCount: number;
  menuList: any[];
  menuCount: number;
  departmentList: any[];
  departmentCount: number;
  listList: any[];
  listCount: number;
  categoryList: any[];
  categoryCount: number;
}

// 页面与对应API的映射对照表类型
interface pagemapType {
  [key: string]: string;
}
// 页面与对应API的映射对照表;
let pageMap: pagemapType = {
  user: "/users/list",
  users: "/users/list",
  role: "/role/list",
  goods: "/goods/list",
  menu: "/menu/list",
  department: "/department/list",
  story: "/story/list",
  list: "/story/list",
  category: "/category/list"
};

interface pageListPayLoad {
  pageName: string;
  query: any;
}

// 删除请求的参数类型
interface deletePayloadType {
  pageName: string;
  id: string | number;
}

type stateType = "userList" | "userCount" | "roleList" | "roleCount";

const systemModule: Module<ISystemState, RootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
      departmentList: [],
      departmentCount: 0,
      storyList: [],
      listList: [],
      listCount: 0,
      storyCount: 0,
      categoryList: [],
      categoryCount: 0
    };
  },
  mutations: {
    setUserList(state, userList: any[]) {
      state.userList = userList;
    },
    setUserCnt(state, cnt: number) {
      state.userCount = cnt;
    },
    setRoleList(state, roleList: any[]) {
      state.roleList = roleList;
    },
    setRoleCnt(state, roleCnt: number) {
      state.roleCount = roleCnt;
    },
    setGoodsList(state, goodsList) {
      state.goodsList = goodsList;
    },
    setGoodsCnt(state, totalCount) {
      state.goodsCount = totalCount;
    },
    setMenuList(state, menuList) {
      state.menuList = menuList;
    },
    setMenuCnt(state, menuCount) {
      state.menuCount = menuCount;
    },
    setDepartmentList(state, department) {
      state.departmentList = department;
    },
    setDepartmentCnt(state, cnt) {
      state.departmentCount = cnt;
    },
    setListList(state, story) {
      console.log(story);
      state.listList = story;
    },
    setListCnt(state, cnt) {
      state.listCount = cnt;
    },
    setCategoryList(state, list) {
      state.categoryList = list;
    },
    setCategoryCnt(state, cnt) {
      state.categoryCount = cnt;
    }
  },
  getters: {
    getList(state, getters) {
      return function(pagename: string) {
        return state[`${pagename}List` as stateType];
      };
    },
    pageListCount(state, getters, payload) {
      return function(pagename: string) {
        return state[`${pagename}Count` as stateType];
      };
    }
  },

  actions: {
    async getPageList(context, { pageName, query }) {
      let pageUrl = pageMap[pageName];
      pageName = pageName == "users" ? "user" : pageName;
      let pageList = await getPageListData(pageUrl, query);
      context.commit(
        `set${pageName.replace(pageName[0], pageName[0].toUpperCase())}List`,
        pageList.data.list
      );
      context.commit(
        `set${pageName.replace(pageName[0], pageName[0].toUpperCase())}Cnt`,
        pageList.data.totalCount
      );
    },
    async deletePageData({ dispatch, rootState }, payload: deletePayloadType) {
      let { pageName, id } = payload;
      pageName = (pageName.split("/").pop() as string) || pageName;
      pageName = pageName == "user" ? "users" : pageName;
      console.log(pageName);
      let pageUrl = `${pageName}/${id}`;

      let list = await deleteData(pageUrl);
      console.log(list);

      if ((list as any).code < -999) {
        ElMessage.error({
          message: list.data,
          type: "error",
          duration: 2200
        });
        return;
      }
      ElMessage.success({
        message: list.data,
        type: "success",
        duration: 2200
      });
      dispatch("resetList", pageName);
    },
    resetList({ dispatch, rootState }, pageName: string) {
      let searchInfo = (rootState as myStoreType)?.searchInfo
        ?.currentPageSearchInfo;
      let pageInfo = (rootState as myStoreType)?.searchInfo?.pageNumInfo;

      dispatch("getPageList", {
        pageName,
        query: {
          ...searchInfo,
          ...pageInfo
        }
      });
    },
    async createPageData({ dispatch }, payload: any) {
      let { pageName, newData } = payload;
      pageName = (pageName.split("/").pop() as string) || pageName;
      console.log(pageName);

      pageName = pageName == "user" ? "users" : pageName;
      console.log(pageName);
      const pageUrl = `${pageName}`;
      let res = await createPageData(pageUrl, newData);
      console.log(res);
      if (res.code == 0) {
        dispatch("resetList", pageName);
        ElMessage.success({ message: res.data, type: "success" });
      } else {
        ElMessage.error({ message: res.data, type: "error" });
      }
    },
    async editPageData({ dispatch }, payload: any) {
      let { pageName, newData, id } = payload;
      pageName = (pageName.split("/").pop() as string) || pageName;
      console.log(pageName);
      pageName = pageName == "user" ? "users" : pageName;
      console.log(pageName);
      const pageUrl = `${pageName}/${id}`;
      let res = await editPageData(pageUrl, { ...newData, id });
      console.log(res);
      if (res.code == 0 || res == 200) {
        dispatch("resetList", pageName);
        ElMessage.success({ message: res.data, type: "success" });
      } else {
        ElMessage.error({ message: res.data, type: "error" });
      }
    }
  }
};

export default systemModule;
