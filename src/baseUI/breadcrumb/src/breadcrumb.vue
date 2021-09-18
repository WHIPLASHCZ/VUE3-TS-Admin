<template>
    <el-breadcrumb separator="/">
        <template v-if="clickable">
            <el-breadcrumb-item
                v-for="item of crumbs"
                :to="{ path: item.path }"
                >{{ item.title }}</el-breadcrumb-item
            >
        </template>
        <template v-else>
            <el-breadcrumb-item v-for="item of crumbs">{{
                item.title
            }}</el-breadcrumb-item>
        </template>
    </el-breadcrumb>
</template>

<script lang="ts">
import type {IBreadcrumb} from '../index';
import {findCrumbs} from '@/utils/menu-map';
import {useStore} from 'vuex';
import {useRoute,useRouter} from 'vue-router';
import { computed, reactive, toRaw,watch,toRefs} from 'vue';
export default {
    name: "navBreadCrumb",
    props: {
        crumbs: {
            type: Array,
            default: () => []
        },
        clickable:{
          type:Boolean,
          default:true
        }
    },
    setup() {
      let $store = useStore();
      let $route = useRoute();
      let currentPath = computed(()=>$route.path);
      let userMenus = $store.state.loginX.userMenus;
      let crumbsArr = reactive({breadcrumbs:findCrumbs(toRaw(userMenus),currentPath.value)});
      watch(currentPath,(newval)=>{ crumbsArr.breadcrumbs = findCrumbs(toRaw(userMenus),newval)
       })
      return{
        ...toRefs(crumbsArr)
      }
    }
};
</script>

<style></style>
