
import URLSearchParams from 'url-search-params';
import { ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from '../constants/ActionTypes'
import todosMockData from "./todosMockData"

let initialState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0
  }
]

if (typeof window !== 'undefined') {
  let urlSearchParams = new URLSearchParams(window.location.search);
  let mockDataKey = urlSearchParams.get("todosMockData");
  if (mockDataKey) {
    initialState = todosMockData[mockDataKey]
    console.debug("overriding todos initialState with todosMockData", mockDataKey, initialState)
  }
}

export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text
        },
        ...state
      ]

    case DELETE_TODO:
      return state.filter(todo =>
        todo.id !== action.id
      )

    case EDIT_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, text: action.text } :
          todo
      )

    case COMPLETE_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, completed: !todo.completed } :
          todo
      )

    case COMPLETE_ALL:
      const areAllMarked = state.every(todo => todo.completed)
      return state.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }))

    case CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false)

    default:
      return state
  }
}
