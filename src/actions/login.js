import axios from 'axios'
import { genPlainActions, genActionNames } from 'react-redux-gen'

import Auth from '../modules/Auth'

const headers = {
    'Authorization': `Bearer ${Auth.getToken()}`,
    'Content-Type': 'application/json'
  }

const loggedActions = genPlainActions('user',['logged'])
const loggedActionNames = genActionNames('user', ['logged'])
const loginActions = genPlainActions('user',['login'])
const registerActions = genPlainActions('user', ['register'])

const logged = () => {
  return dispatch => {
    dispatch(loggedActions.logged[0]())
    return axios
      .get('/authenticated', { headers })
      .then( response => {
        dispatch(loggedActions.logged[1](response.data))
      }).catch( e => {
        dispatch(loggedActions.logged[2](e))
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

const register = (user) => {
  return dispatch => {
    dispatch(registerActions.register[0]())
    return axios
      .post('/auth/register', user)
      .then( response => {
        return dispatch(registerActions.register[1](response.data))
      }).catch( e => {
        return dispatch(registerActions.register[2](e))
      })
  }
}



export { loggedActions, loggedActionNames, loginActions, logged, login, register }