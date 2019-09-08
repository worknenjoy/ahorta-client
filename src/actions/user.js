import { genPlainActions, genAsyncActions } from 'react-redux-gen'

const headers = {
    'Authorization': `Basic ${process.env.REACT_APP_SECRET}`,
    'Content-Type': 'application/json'
  }

const userActions = genPlainActions('user')
const userAsyncActions = genAsyncActions('user', 'https://ahorta.herokuapp.com/users', headers)

export { userActions, userAsyncActions }