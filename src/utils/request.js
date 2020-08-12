import Taro from "@tarojs/taro";
import { encryptFactory } from "./encipher";
import * as basicSettings from "../basicSettings.json";
// 测试
let baseUrl = basicSettings.testServer;
if (process.env.NODE_ENV === "production") {
  baseUrl = basicSettings.buildServer;
}

/**
 * 封装请求request
 */

// interface ReqParam {
//   method: "GET" | "POST"
//   url: string
//   data?: object
//   isMask?: boolean
//   showLoading?: boolean
//   header?:
//     | {
//         "Content-Type": string
//       }
//     | undefined
//   [propName: string]: any
// }

function request(param) {
  const token = Taro.getStorageSync("currentToken") || "";
  const _iv = Taro.getStorageSync("passwordKey") || "";
  const defauluHeader = {
    "Content-Type": "application/json; charset=utf-8",
    token: token,
    seq: new Date().getTime()
  };
  return new Promise(function(resolve, reject) {
    const { method, url, data, header, showLoading } = param;
    if (showLoading) {
      Taro.showLoading({
        title: "加载中",
        mask: param.isMask
      });
    }
    Taro.request({
      header: {
        ...defauluHeader,
        ...header
      },
      method,
      data: {
        data: method === "POST" ? encryptFactory(data, token, _iv) : null
      },
      url: baseUrl + url,
      success: function(res) {
        if (res.statusCode === 200&&res.data.code=='000000') {
          resolve(res.data);
        } else {
          Taro.showToast({
            title: res.data.msg,
            icon: "none"
          });
          reject(res);
        }
      },
      fail: function(err) {
        reject(err);
        Taro.showToast({
          title: "您的网络连接出现问题，请稍后刷新重试",
          icon: "none"
        });
      },
      complete: function() {
        if (showLoading) {
          Taro.hideLoading();
        }
      }
    });
  });
}

export default request;
