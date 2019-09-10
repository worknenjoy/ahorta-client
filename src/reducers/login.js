import {
  loginActionNames
} from '../actions/login'

const login = (state = { completed: true, data: {}, error: false }, action) => {
  switch (action.type) {
    case loginActionNames.logged[0]:
      return { ...state, completed: action.completed }
    case loginActionNames.logged[1]:
      return { ...state, completed: action.completed, data: action.data, error: false }
    case loginActionNames.logged[2]:
      return { ...state, completed: action.completed, error: action.error }
    case loginActionNames.logout[0]:
      return { ...state, completed: action.completed, error: action.error }
    case loginActionNames.logout[1]:
      return { ...state, completed: action.completed, error: action.error, data: action.data }
    case loginActionNames.logout[2]:
      return { ...state, completed: action.completed, error: action.error }
    default:
      return state
  }
}

export default login