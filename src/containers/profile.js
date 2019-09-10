import { connect } from 'react-redux'
import { logged, logout } from '../actions/login'
import { openNotification, closeNotification } from '../actions/notification'
import Profile from '../components/Profile'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    loggedUser: state.login,
    notification: state.notification
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logged: () => dispatch(logged()),
    logout: () => dispatch(logout()),
    openNotification: (message, variant) => dispatch(openNotification(message, variant)),
    closeNotification: () => dispatch(closeNotification())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)