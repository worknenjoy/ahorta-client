import {
  OPEN_NOTIFICATION,
  CLOSE_NOTIFICATION
} from '../actions/notification'

const notification = (state = { open: false, message: '', variant: 'info' }, action) => {
  switch (action.type) {
    case OPEN_NOTIFICATION:
      return { ...state, message: action.message, variant: action.variant, open: action.open }
    case CLOSE_NOTIFICATION:
      return { ...state, open: action.open }
    default:
      return state
  }
}

export default notification