import { combineReducers } from 'redux'
import counter from './counter'
import  globalStore from "./globalStore";

export default combineReducers({
  counter,
  globalStore
})
