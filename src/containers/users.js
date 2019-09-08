import { connect } from 'react-redux'
import { userAsyncActions } from '../actions/user'
import Users from '../components/Users'

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    listUsers: () => dispatch(userAsyncActions.list()),
    createUser: (user) => dispatch(userAsyncActions.create(user)),
    fetchUser: (userId) => dispatch(userAsyncActions.fetch(userId)),
    updateUser: (userId, data) => dispatch(userAsyncActions.update(userId, data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)