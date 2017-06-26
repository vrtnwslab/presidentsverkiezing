import {combineReducers} from 'redux'
import data from './reducer_data'
import settings from './reducer_settings'
import map from './reducer_map'

export default combineReducers({
  data,
  settings,
  map
})
