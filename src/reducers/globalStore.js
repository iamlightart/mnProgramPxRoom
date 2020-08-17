import { SET_USER_INFO } from '../constants/globalType'

const INITIAL_STATE = {
  userInfo: null
}

export default function globalStore (state = INITIAL_STATE, action) {
  switch (action.type) {
    case  SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload
      }
     default:
       return state
  }
}
