import { connect } from 'react-redux'
import { login, logged } from '../actions/login'
import Signup from '../components/Signup'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    logged: state.logged
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (user) => dispatch(login(user)),
    logged: () => dispatch(logged())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)