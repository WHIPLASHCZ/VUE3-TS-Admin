import $Send from "./request/index";
import { BASE_URL, TIME_OUT } from "./request/config";
import { ElLoading } from "element-plus";
import localCache from "@/utils/cache";
export default new $Send({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    needLoading: true,
    interceptors: {
        requestinterceptor: config => {
            const token = localCache.get("token");
            if (token) config.headers.Authorization = `Bearer ${token}`;
            return config;
        },
        responseinterceptor: res => {
            return res;
        }
    }
});
