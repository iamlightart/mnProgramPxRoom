import request from "@/utils/request";

/**
 * 接受邀请
 * @param  {number} type 
 * @param  {string} tel 
 * @param  {string} smsCode 
 * @param  {string} nikName 
 * @param  {string} avatar 
 * @param  {number} sex 
 * @param  {string} code
 */

export  function acceptInvite (param) {
  return request({
    url: '/hrms-rcmdapi/customer/accept-reg',
    method: 'POST',
    data: param
  });
}
export  function accptInvite (param) {
  return request({
    url: '/hrms-rcmdapi/customer/accept-reg',
    method: 'POST',
    data: param
  });
}
