import { genPlainActions, genAsyncActions } from 'react-redux-gen'
import { host } from '../url' 

const headers = {
    'Authorization': `Basic ${process.env.REACT_APP_SECRET}`,
    'Content-Type': 'application/json'
  }

const deviceActions = genPlainActions('device')
const deviceAsyncActions = genAsyncActions('device', host + '/devices', headers)

export { deviceActions, deviceAsyncActions }