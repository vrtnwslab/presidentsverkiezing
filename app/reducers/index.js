import {combineReducers} from 'redux'
import data from './reducer_data'
import settings from './reducer_settings'

export default combineReducers({
  data,
  settings
})
