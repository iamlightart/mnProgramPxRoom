import request from "@/utils/request";

// 商品详情
export default function queryGiftDetails (param) {
  return request({
    url: '/hrms-rcmdapi/shop-items/shop-item-get',
    method: 'POST',
    data:param
  });
}