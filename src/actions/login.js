import axios from 'axios'
import { genPlainActions } from 'react-redux-gen'

const headers = {
    'Authorization': `Basic ${process.env.REACT_APP_SECRET}`,
    'Content-Type': 'application/json'
  }

const loggedActions = genPlainActions('user',['logged'])
const loginActions = genPlainActions('user',['login'])

const logged = () => {
  return dispatch => {
    dispatch(loggedActions.logged[0]())
    return axios
      .get('/authenticated', headers)
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



export { loggedActions, loginActions, logged, login }