import $send from "../../index";
import type { response } from '../../request';

enum DashBoardAPI{
  CategoryGoodsCount = '/goods/category/count',
  CategoryGoodsSale = '/goods/category/sale',
  CategoryGoodsFavor = '/goods/category/favor',
  AddressGoodsSale = '/goods/address/sale',
  AmountList = '/goods/amount/list',
  topTen = '/goods/sale/top10'
}

export function getCategoryGoodsCount(){
    return $send.get({
      url:DashBoardAPI.CategoryGoodsCount
    })
}

export function getCategoryGoodsSale(){
  return $send.get({
    url:DashBoardAPI.CategoryGoodsSale
  })
}

export function getCategoryGoodsFavor(){
  return $send.get({
    url:DashBoardAPI.CategoryGoodsFavor
  })
}

export function getAddressGoodsSale(){
  return $send.get({
    url:DashBoardAPI.AddressGoodsSale
  })
}

export function getAmountList(){
  return $send.get({
    url:DashBoardAPI.AmountList
  })
}

export function getTop10(){
  return $send.get({
    url:DashBoardAPI.topTen
  })
}
