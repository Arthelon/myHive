import React from 'react'

import PropTypes from 'prop-types'
import { connectAuth } from '../../reducers/modules/auth'

class HomePage extends React.Component {
  render () {
    const { session } = this.props
    return (
      <div className="col-md-6 col-md-offset-3">
        <h1>Hi {JSON.stringify(session)}</h1>
      </div>
    )
  }
}

HomePage.propTypes = {
  session: PropTypes.object
}

export default connectAuth(HomePage)
