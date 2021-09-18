import { useRoute } from "vue-router";
export default function getPageName(): string {
    let $route = useRoute();
    let pathName = $route.path.split("/").pop();
    return pathName || "main";
}
