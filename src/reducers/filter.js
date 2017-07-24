
import URLSearchParams from 'url-search-params';
import { SET_FILTER } from '../constants/ActionTypes'
import { SHOW_ALL } from '../constants/TodoFilters'

let initialState = SHOW_ALL;

if (typeof window !== 'undefined') {
  let urlSearchParams = new URLSearchParams(window.location.search);
  let mockDataKey = urlSearchParams.get("filterMockData");
  if (mockDataKey) {
    initialState = mockDataKey
    console.debug("override filter initialState with", initialState)
  }
}

export default function todos(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER:
      return action.filter
    default:
      return state
  }
}
