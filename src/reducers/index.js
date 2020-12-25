import { combineReducers } from 'redux'
import user from './user'
import notification from './notification'
import login from './login'
import device from './device'

const reducers = combineReducers({
    user,
    device,
    login,
    notification
})
  
export default reducers