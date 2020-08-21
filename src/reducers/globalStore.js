import { SET_USER_INFO,CACHE_GOODS,EXCHANGE_NUMBER} from '../constants/globalType'

const INITIAL_STATE = {
  userInfo: null,
  goods:{
    type:{},
    number:1
  }
}

export default function globalStore (state = INITIAL_STATE, action) {
  switch (action.type) {
    case  SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload
      }
    case  CACHE_GOODS:
      return {
        ...state,
        goods:{
          ...state.goods,
          type:action.payload,
        } 
      }
      case EXCHANGE_NUMBER:
        return {
          ...state,
          goods:{
            ...state.goods,
            number:action.payload,
          } 
        }
     default:
       return state
  }
}
