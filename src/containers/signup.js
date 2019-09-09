import { connect } from 'react-redux'
import { login, logged, register } from '../actions/login'
import { openNotification, closeNotification } from '../actions/notification'
import Signup from '../components/Signup'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    logged: state.logged,
    notification: state.notification
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    register: (user) => dispatch(register(user)),
    login: (user) => dispatch(login(user)),
    logged: () => dispatch(logged()),
    openNotification: (message, variant) => dispatch(openNotification(message, variant)),
    closeNotification: () => dispatch(closeNotification())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)