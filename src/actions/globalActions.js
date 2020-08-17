import { SET_USER_INFO,} from "../constants/globalType";

export const SAVE_USER_INFO = (param) => {
    console.log('stre xxxxx',param)
  return {
    type: SET_USER_INFO,
    payload:param
  };
};

// 异步的action
export function asyncAdd() {
  // return dispatch => {
  //   // setTimeout(() => {
  //   //   dispatch(add());
  //   // }, 2000);
  // };
}
