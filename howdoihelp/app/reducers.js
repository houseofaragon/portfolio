import { SET_CATEGORIES_LIST, SET_FILTERED_CATEGORIES_LIST } from 'actions'

const initialState = {
  list: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES_LIST:
      return reduceCategoriesList(state, action)
    case SET_FILTERED_CATEGORIES_LIST:
      return reduceFilteredCategoriesList(state, action)
    default:
      return state
  }
}

const reduceCategoriesList = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {list: action.list})
  return newState
}

const reduceFilteredCategoriesList = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {filteredList: action.filteredList})
  return newState
}

export default reducer
