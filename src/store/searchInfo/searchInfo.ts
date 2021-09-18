import { Module } from "vuex";
import { RootState } from "../index";

const searchInfoModule: Module<any, RootState> = {
    namespaced: true,
    state() {
        return {
            currentPageSearchInfo: {},
            pageNumInfo: { offset: 0, size: 10 }
        };
    },
    getters: {
        getPageNum(state) {
            let size = state.pageNumInfo.size;
            let offset = state.pageNumInfo.offset;
            let currentPage = offset / size + 1;
            return { currentPage, size };
        }
    },
    mutations: {
        setSearchForm(state, searchForm) {
            console.log(searchForm);
            state.currentPageSearchInfo = searchForm;
            state.pageNumInfo.offset = 0;
        },
        setPageNumInfo(state, { currentPage, pageSize }) {
            console.log(currentPage, pageSize);

            state.pageNumInfo = {
                offset: (currentPage - 1) * pageSize,
                size: pageSize
            };
        },
        reset(state) {
            state.pageNumInfo.offset = 0;
            state.currentPageSearchInfo = {};
        }
    }
};

export default searchInfoModule;
