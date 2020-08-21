
import { queryUserInfo } from "@/globalApi/index";

import { SET_USER_INFO,CACHE_GOODS,EXCHANGE_NUMBER} from "../constants/globalType";

export const SAVE_USER_INFO = (param) => {
  return {
    type: SET_USER_INFO,
    payload:param
  };
};
export const catchDoods = (param) => {
  return {
    type: CACHE_GOODS,
    payload:param
  };
};
export const exchangeNumber = (param) => {
  return {
    type: EXCHANGE_NUMBER,
    payload:param
  };
};
// 异步的action
export function asyncAdd() {
    queryUserInfo().then(res=>{

    })
  // return dispatch => {
    // setTimeout(() => {
    //   dispatch(add());
    // }, 2000);
  // };
}
