import request from "@/utils/request";

// 获取 tokens
export function getToken () {
  return request({
    url: '/hrms-rcmdapi/auth/token',
    method: 'GET'
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
    showLoading:true,
    data: param
  });
}
/**
 * 手机号获取验证码
 * @param {tel} string
 * @param {type} number 1|2|3
 */
export function phoneAuthCode (param) {
  return request({
    url: '/hrms-rcmdapi/auth/send-code',
    method: 'POST',
    data:param
  });
}
