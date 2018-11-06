import { connect } from 'react-redux'
import React from 'react'

import PropTypes from 'prop-types'

class HomePage extends React.Component {
  render () {
    const { user } = this.props
    return (
      <div className="col-md-6 col-md-offset-3">
        <h1>Hi {user.firstName}</h1>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { authentication } = state
  const { user } = authentication
  return {
    user
  }
}

HomePage.propTypes = {
  user: PropTypes.object
}

const connectedHomePage = connect(mapStateToProps)(HomePage)
export { connectedHomePage as HomePage }
