import { connect } from 'react-redux'
import React from 'react'

import { userActions } from '../../actions/user.actions'
import PropTypes from 'prop-types'

class LoginPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      submitted: false,
      showLogin: true
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleChange (e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleLogin (e) {
    e.preventDefault()

    this.setState({ submitted: true })
    const { username, password } = this.state
    const { dispatch } = this.props
    if (username && password) {
      dispatch(userActions.login(username, password))
    }
  }

  handleRegister (e) {
    e.preventDefault()

    this.setState({ submitted: true })
    const { username, password } = this.state
    const { dispatch } = this.props
    if (username && password) {
      dispatch(userActions.register(username, password))
    }
  }

  changeLogin = () => {
    this.setState(() => ({ showLogin: true }))
  }

  changeRegister = () => {
    this.setState(() => ({ showLogin: false }))
  }

  render () {
    const { loggingIn } = this.props
    const { username, password, confirmPassword, submitted } = this.state
    return (
      <div className="offset-md-3 col-md-6 h-100">
        <div className="card my-auto">
          <div className="card-header">
            <ul className="nav nav-tabs nav-fill card-header-tabs">
              <li className="nav-item">
                <a className={`nav-link ${this.state.showLogin ? 'active' : ''}`} href="#" onClick={this.changeLogin}>Login</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${!this.state.showLogin ? 'active' : ''}`} href="#" onClick={this.changeRegister}>Register</a>
              </li>
            </ul>
          </div>
          <div className="card-body">
            {/* Login Form */}
            {this.state.showLogin &&
            <form id="loginForm" name="form" onSubmit={this.handleSubmit}>
              <div className={'form-group' +
              (submitted && !username ? ' has-error' : '')}>
                <input type="text" className="form-control" name="username"
                  value={username} onChange={this.handleChange}
                  placeholder="Username"/>
                {submitted && !username &&
                <div className="help-block">Username is required</div>
                }
              </div>
              <div className={'form-group' +
              (submitted && !password ? ' has-error' : '')}>
                <input type="password" className="form-control" name="password"
                  value={password} onChange={this.handleChange}
                  placeholder="Password"/>
                {submitted && !password &&
                <div className="help-block">Password is required</div>
                }
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-sm-8 offset-sm-2">
                    <button className="btn btn-block btn-primary">Login</button>
                    {loggingIn &&
                    <div>Logging In!</div>}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="text-center">
                      <a href="#">Forgot Password?</a>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            }
            {/* Register Form */}
            {!this.state.showLogin &&
            <form id="loginForm" name="form" onSubmit={this.handleRegister}>
              <div className={'form-group' +
              (submitted && !username ? ' has-error' : '')}>
                <input type="text" className="form-control" name="username"
                  value={username} onChange={this.handleChange}
                  placeholder="Username"/>
                {submitted && !username &&
                <div className="help-block">Username is required</div>
                }
              </div>
              <div className={'form-group' +
              (submitted && !password ? ' has-error' : '')}>
                <input type="password" className="form-control" name="password"
                  value={password} onChange={this.handleChange}
                  placeholder="Password"/>
                {submitted && !password &&
                <div className="help-block">Password is required</div>
                }
              </div>
              <div className='form-group'>
                <input type="password" className="form-control" name="confirmPassword"
                  value={this.confirmPassword} onChange={this.handleChange}
                  placeholder="Confirm Password"/>
                {password !== confirmPassword &&
                <div className="help-block">Passwords are not the same</div>
                }
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-sm-8 offset-sm-2">
                    <button className="btn btn-block btn-primary">Register</button>
                    {loggingIn &&
                    <div>Logging In!</div>}
                  </div>
                </div>
              </div>
            </form>
            }
          </div>
        </div>
      </div>
    )
  }
}

LoginPage.propTypes = {
  loggingIn: PropTypes.bool,
  dispatch: PropTypes.any
}

function mapStateToProps (state) {
  const { loggingIn } = state.authentication
  return {
    loggingIn
  }
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage)
export { connectedLoginPage as LoginPage }
