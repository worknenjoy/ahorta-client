import { connect } from 'react-redux'
import { userAsyncActions } from '../actions/user'
import { deviceAsyncActions } from '../actions/device'
import { logged, logout } from '../actions/login'
import { openNotification, closeNotification } from '../actions/notification'
import Connect from '../components/Connect'

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
    listDevices: () => dispatch(deviceAsyncActions.list()),
    updateDevice: (deviceId, data) => dispatch(deviceAsyncActions.update(deviceId, data)),
    fetchUser: (userId) => dispatch(userAsyncActions.fetch(userId)),
    openNotification: (message, variant) => dispatch(openNotification(message, variant)),
    closeNotification: () => dispatch(closeNotification())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Connect)