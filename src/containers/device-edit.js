import { connect } from 'react-redux'
import { userAsyncActions } from '../actions/user'
import { logged, logout } from '../actions/login'
import { openNotification, closeNotification } from '../actions/notification'
import DeviceEdit from '../components/DeviceEdit'

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
    fetchUser: (userId) => dispatch(userAsyncActions.fetch(userId)),
    openNotification: (message, variant) => dispatch(openNotification(message, variant)),
    closeNotification: () => dispatch(closeNotification())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceEdit)