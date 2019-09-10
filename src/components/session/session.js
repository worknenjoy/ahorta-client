import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Auth from '../../modules/Auth'

class Session extends Component {
  
  propTypes = {
    match: PropTypes.object,
    history: PropTypes.object
  }

  componentWillMount() {
    const token = this.props.match.params.token
    if(token) {
      const referer = Auth.getReferer()
      Auth.authenticateUser(token)
      if (referer && referer !== '/') {
        this.props.history.push(referer)
      }
      this.props.history.push('/profile')
    } else {
      this.props.history.push('/signin')
    }
  }

  render() {
    return (
      <div>
        Session created
      </div>
    )
  }
}

export default Session