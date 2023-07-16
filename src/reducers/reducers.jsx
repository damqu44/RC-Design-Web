const searchValueReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEATCH_VALUE':
      return action.payload
    default:
      return state
  }
}

export default searchValueReducer
