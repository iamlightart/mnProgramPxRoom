
import request from "@/utils/request";

// 热门兑换
export function queryHotGift () {
  return request({
    url: '/hrms-rcmdapi/shop-items/hot-item-list',
    method: 'POST',
  });
}
// 解绑微信
export function wUnbind (param) {
  return request({
    url: '/hrms-rcmdapi/customer/cust-wx-unbind',
    method: 'POST',
    data: param
  });
}