import axios from 'axios'
import { genPlainActions, genActionNames } from 'react-redux-gen'

import Auth from '../modules/Auth'

const headers = {
  'Authorization': `Bearer ${Auth.getToken()}`,
  'Content-Type': 'application/json'
}

const loginActionNames = genActionNames('user', ['logged', 'login', 'logout'])
const loginActions = genPlainActions('user',['logged', 'login', 'logout', 'register'])

const logged = () => {
  return dispatch => {
    dispatch(loginActions.logged[0]())
    return axios
      .get('/authenticated', { headers: {
        'Authorization': `Bearer ${Auth.getToken()}`,
        'Content-Type': 'application/json'
      }
      })
      .then( response => {
        return dispatch(loginActions.logged[1](response.data))
      }).catch( e => {
        return dispatch(loginActions.logged[2](e))
      })
  }
}

const login = (user) => {
  return dispatch => {
    dispatch(loginActions.login[0]())
    return axios
      .post('/authorize/local', user)
      .then( response => {
        return dispatch(loginActions.login[1](response.data))
      }).catch( e => {
        return dispatch(loginActions.login[2](e))
      })
  }
}

const logout = () => {
  return (dispatch) => {
    dispatch(loginActions.logout[0]())
    if(Auth.deauthenticateUser()) {
      return dispatch(loginActions.logout[1]({}))
    }
    return dispatch(loginActions.logout[2](new Error('we have an error to logout, try again later')))
  }
}

const register = (user) => {
  return dispatch => {
    dispatch(loginActions.register[0]())
    return axios
      .post('/auth/register', user)
      .then( response => {
        return dispatch(loginActions.register[1](response.data))
      }).catch( e => {
        return dispatch(loginActions.register[2](e))
      })
  }
}



export { loginActionNames, loginActions, logged, login, logout, register }