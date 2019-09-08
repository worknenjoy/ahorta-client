import { genReducer } from 'react-redux-gen'

const user = genReducer('user', { data: {}, error: false, completed: true })

export default user