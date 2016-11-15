// import { combineReducers } from 'redux'
import { SET_CATEGORIES_LIST } from 'actions'
import merge from 'lodash/fp/merge'
import categoriesList from '../docs/data/data.js'

const initialState = {
  list: list
}

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES_LIST:
      return reduceCategoriesList(state, action)
    default:
      return state
  }
}

const reduceCategoriesList = (state, action) => {
  const newState = {}
  Object.assign(newState, state, action)
  return newState
}

export default categoriesReducer
