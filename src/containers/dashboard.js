import { connect } from 'react-redux'
import { userAsyncActions } from '../actions/user'
import { logged } from '../actions/login'
import Dashboard from '../components/Dashboard'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    loggedUser: state.login
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logged: () => dispatch(logged()),
    fetchUser: (userId) => dispatch(userAsyncActions.fetch(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)