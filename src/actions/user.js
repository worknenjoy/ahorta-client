import { genPlainActions, genAsyncActions } from 'react-redux-gen'
import { host } from '../url' 

const headers = {
    'Authorization': `Basic ${process.env.REACT_APP_SECRET}`,
    'Content-Type': 'application/json'
  }

const userActions = genPlainActions('user')
const userAsyncActions = genAsyncActions('user', host + '/users', headers)

export { userActions, userAsyncActions }