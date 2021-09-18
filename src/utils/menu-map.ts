import type {RouteRecord, RouteRecordRaw} from 'vue-router';
import type { IBreadcrumb } from "@/baseUI/breadcrumb";

export function mapMenuToRoutes(userMenus:any[]):RouteRecordRaw[]{
    const routes:RouteRecordRaw[] = [];
    // 先添加默认所有的routes
    const allRoutes:RouteRecordRaw[] = [];
     /*require对象属于webpack，内部有context函数，若我们调用了context，
       webpack会解析该函数，并帮我们获取到想要的路径
     */
    const routeFiles = require.context('../router/main',true,/\.ts$/);
    routeFiles.keys().forEach(path=>{
      //使用commonJS的require方法 获取到所有menus对应的路由对象的路径。
      // 然后通过.default 获取到该路径导出的路由对象。
      const route = require('../router/main'+path.slice(1)).default;
      allRoutes.push(route);
    })
    function requrseGetRoute(menus:any[]){
      if(!menus) return;
       for(let menu of menus){
          if(menu.type==1){
            requrseGetRoute(menu.children);
          }else if (menu.type==2){
            // if(menu.children&&menu.children.length)requrseGetRoute(menu.children);
            const route = allRoutes.find((item)=>item.path==menu.url);
            routes.push(route as RouteRecordRaw);
          }
       }
    }
    requrseGetRoute(userMenus);
    // 根据菜单获取需要添加的routes
    return routes;
}

export function findCrumbs(userMenus:any[],currentPath:string){
  let crumbs:any[] = [];
  let firstCrumbs:any = {};
      return (function realFindFn(userMenus:any[],currentPath:string):IBreadcrumb[]{
        userMenus.forEach((menu,index)=>{
          if(menu.type==1){
            firstCrumbs = menu;
            realFindFn(menu.children || [] ,currentPath);
          }else if (menu.type==2){
            if(currentPath == menu.url){
              crumbs.push({title:firstCrumbs.name,path:firstCrumbs.url});
              crumbs.push({title:menu.name,path:menu.url})
            }
          }
      })
      return crumbs;
      })(userMenus,currentPath)
}

export function mapMenuToPermission(userMenus:any[]):string[]{
    let permission:string[] = [];
    function realFindFn(menus:any[]){
      if(!menus) return;
      for(let menu of menus){
          if(menu.type<3){
            if(menu.children&&menu.children.length) realFindFn(menu.children);
            else return;
          }else{
            permission.push(menu.permission);
          }
      }
      return permission ;
    }
    return realFindFn(userMenus) || [];
}

export function getUserLimits(list: any) {
  let userLimitsList:number[] = [];
   (function realFn(list: any) {
      list.forEach((item: any) => {
          if (item.children && item.children.length) {
              realFn(item.children);
          } else {
              userLimitsList.push(item.id);
          }
      });
  })(list);
  return userLimitsList;
}

function turnToOptions(parentMenu:any){
  let options = parentMenu.map((item:any)=>{
    if(item.children){
      item = {
        label:item.name,
        value:{id:item.id,url:item.url},
        url:item.url,
        type:item.type,
        children: turnToOptions(item.children) }
        return item;
    }else{
      item = { label:item.name, value:{id:item.id,url:item.url},url:item.url,type:item.type }
      return item;
    }
  })
  return options
}

export function getParentMenu(list:any){
    let parentMenu:any[] = list;
    function find (lists:any,parent?:any) {
      lists.forEach((menu:any)=>{
        if(menu.type!=3&&menu.children){
          find(menu.children,menu)
        }else{
          if(menu.type==3) parent.children = null;
        }
      })
    }
    find(parentMenu);
    return turnToOptions(parentMenu)
}


