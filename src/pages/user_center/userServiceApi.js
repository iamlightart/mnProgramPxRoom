
import request from "@/utils/request";

// 热门兑换
export function queryHotGift () {
  return request({
    url: '/hrms-rcmdapi/shop-items/hot-item-list',
    method: 'POST',
  });
}
// 兑换列表
export function queryRedeemList (param) {
  return request({
    url: '/hrms-rcmdapi/customer/cust-redeem-list',
    method: 'POST',
    data:param
  });
}
// 推荐汇总
export function totalRecommend () {
  return request({
    url: '/hrms-rcmdapi/customer/cust-recommend-statistics',
    method: 'POST',
  });
}
// 我的推荐列表
export function coustomerList (param) {
  return request({
    url: '/hrms-rcmdapi/customer/cust-recommend-list',
    method: 'POST',
    data:param
  });
}

