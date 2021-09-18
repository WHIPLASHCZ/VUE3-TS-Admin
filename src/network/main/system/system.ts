import $send from "../../index";
import type { response } from '../../request';
export function getPageListData(url: string, query?: any) {
    return $send.post({
        url,
        data: query,
        // headers: {
        //     // "Content-Type": "application/json; charset=utf-8"
        //     "Content-Type": "application/json, text/plain, */*"
        // },
        needLoading: true
    });
}

export function deleteData(url: string) {
    return $send.delete({
        url
    });
}
export function createPageData(url: string, newData: any) {
    return $send.post<response>({
        url,
        data: newData
    });
}

export function editPageData(url: string, editData: any) {
    return $send.patch<response>({
        url,
        data: editData
    });
}
