import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import localCache from "@/utils/cache";
import { useStore } from "vuex";
export const routes: RouteRecordRaw[] = [
    { path: "/", redirect: "/main" },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/login/login.vue")
    },
    // {
    //     path: "/main",
    //     redirect: "/main/analysis/overview"
    // },
    {
        path: "/main",
        name: "main",
        component: () => import("@/views/main/mains.vue"),
        children: []
    },

    {
        path: "/:pathMatch(.*)*",
        name: "notFound",
        component: () => import("@/views/main/notFound/notFound.vue")
    }
];

const router = createRouter({
    routes,
    history: createWebHistory()
});

router.beforeEach((to, from) => {
    let token = localCache.get("token");
    if (to.path != "/login") {
        if (token) {
            if (to.path == "/main") {
                return "/main/analysis/overview";
            }
            return true;
        } else return "/login";
    }
});

export default router;
