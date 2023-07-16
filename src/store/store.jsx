import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SEARCH_VALUE':
      return {
        ...state,
        searchValue: action.payload,
      }
    default:
      return state
  }
}

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
