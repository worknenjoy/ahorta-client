import { combineReducers } from 'redux'
import user from './user'
import notification from './notification'
import login from './login'

const reducers = combineReducers({
    user,
    login,
    notification
})
  
export default reducers