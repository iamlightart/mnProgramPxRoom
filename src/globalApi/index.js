import request from "@/utils/request";

// 获取 tokens
export function getToken () {
  return request({
    url: '/hrms-rcmdapi/auth/token',
    method: 'GET',
    showLoading: true
  });
}
/*
 * 获取 openId
 * @param {}
 */
export function getOpenId(param) {
  return request({
    url: "/hrms-rcmdapi/auth/openid",
    method: "POST",
    showLoading: true,
    data: param
  });
}
/**
 * 手机号获取验证码
 * @param {string} tel
 * @param {number} type 1|2|3
 */
export function phoneAuthCode (param) {
  return request({
    url: '/hrms-rcmdapi/auth/send-code',
    method: 'POST',
    showLoading: true,
    data:param
  });
}
/**
 * 获取用户微信信息信息
 * @param {string} tel 
 * @param {type} number 1|2|3
 */
export function queryUserInfo (param) {
  return request({
    url: '/hrms-rcmdapi/customer/cust-get',
    method: 'POST',
    showLoading: true,
    data:param
  });
}
// 解绑微信
export function wxUnbind (param) {
  return request({
    url: '/hrms-rcmdapi/customer/cust-wx-unbind',
    method: 'POST',
    data: param
  });
}
// 获取签约账户的房源管家
export function queryHousekeeper (param) {
  return request({
    url: '/hrms-rcmdapi/customer/cust-housekeeper',
    method: 'POST',
    data: param
  });
}