import { combineReducers } from 'redux'
import searchValueReducer from './reducers'

const rootReducer = combineReducers({
  searchValue: searchValueReducer,
})

export default rootReducer
