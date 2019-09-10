import { connect } from 'react-redux'
import { logged } from '../actions/login'
import Devices from '../components/Devices'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    loggedUser: state.login
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logged: () => dispatch(logged())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Devices)