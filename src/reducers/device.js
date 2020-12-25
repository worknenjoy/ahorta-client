import { genReducer } from 'react-redux-gen'

const device = genReducer('device', { data: {}, error: false, completed: true })

export default device