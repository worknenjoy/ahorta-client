import { connect } from 'react-redux'
import { login, logged } from '../actions/login'
import { openNotification, closeNotification } from '../actions/notification'
import Main from '../components/Main'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    loggedUser: state.login,
    notification: state.notification
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (user) => dispatch(login(user)),
    logged: () => dispatch(logged()),
    openNotification: (message, variant) => dispatch(openNotification(message, variant)),
    closeNotification: () => dispatch(closeNotification())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)