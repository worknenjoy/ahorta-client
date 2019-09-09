import { combineReducers } from 'redux'
import user from './user'
import notification from './notification'

const reducers = combineReducers({
    user,
    notification
})
  
export default reducers