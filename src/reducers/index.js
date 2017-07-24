import { combineReducers } from 'redux'
import filter from './filter'
import todos from './todos'

const rootReducer = combineReducers({
  filter,
  todos,
})

export default rootReducer
