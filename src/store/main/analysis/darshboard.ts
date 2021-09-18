import { Module } from "vuex";
import { RootState } from "../../index";
import {
    getCategoryGoodsCount,
    getCategoryGoodsSale,
    getCategoryGoodsFavor,
    getAddressGoodsSale,
    getAmountList,
    getTop10
} from "@/network/main/analysis/dashboard";

export type boardState =
    | "categoryGoodsCount"
    | "categoryGoodsSale"
    | "categoryGoodsFavor"
    | "addressGoodsSale";

export interface dashBoardState {
    categoryGoodsCount: any[];
    categoryGoodsSale: any[];
    categoryGoodsFavor: any[];
    addressGoodsSale: any[];
    amountList: any[];
    topTen: any[];
}

export const dashBoardModule: Module<dashBoardState, RootState> = {
    namespaced: true,
    state() {
        return {
            categoryGoodsCount: [],
            categoryGoodsSale: [],
            categoryGoodsFavor: [],
            addressGoodsSale: [],
            amountList: [],
            topTen: []
        };
    },
    mutations: {
        changeGoodsCount(state, count) {
            state.categoryGoodsCount = count;
        },
        changeGoodsSale(state, sale) {
            state.categoryGoodsSale = sale;
        },
        changeGoodsFavor(state, favor) {
            state.categoryGoodsFavor = favor;
        },
        changeAddressGoodsSale(state, addressSale) {
            state.addressGoodsSale = addressSale;
        },
        changeAmountList(state, list) {
            state.amountList = list;
        },
        changeTopTenList(state, list) {
            state.topTen = list;
        }
    },
    actions: {
        async getDashboardData({ commit }) {
            let CategoryGoodsCount = await (await getCategoryGoodsCount()).data;
            let CategoryGoodsSale = await (await getCategoryGoodsSale()).data;
            let CategoryGoodsFavor = await (await getCategoryGoodsFavor()).data;
            let AddressGoodsSale = await (await getAddressGoodsSale()).data;
            commit("changeGoodsCount", CategoryGoodsCount);
            commit("changeGoodsSale", CategoryGoodsSale);
            commit("changeGoodsFavor", CategoryGoodsFavor);
            commit("changeAddressGoodsSale", AddressGoodsSale);
        },
        async getAmountList({ commit }) {
            let amountList = await (await getAmountList()).data;
            commit("changeAmountList", amountList);
        },
        async getSaleTopTen({ commit }) {
            let topTenList = await (await getTop10()).data;
            commit("changeTopTenList", topTenList);
        }
    }
};
