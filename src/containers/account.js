import { connect } from 'react-redux'
import { userAsyncActions } from '../actions/user'
import { logged, logout } from '../actions/login'
import { openNotification, closeNotification } from '../actions/notification'
import Account from '../components/Account'

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
    updateUser: (userId, data) => dispatch(userAsyncActions.update(userId, data)),
    openNotification: (message, variant) => dispatch(openNotification(message, variant)),
    closeNotification: () => dispatch(closeNotification())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)