import { userService } from '../services/user.service'
import { alertActions } from './alert.actions'
import { userConstants } from '../constants/user.constants'

export const userActions = {
  login,
  logout
}

function login (username, password) {
  return dispatch => {
    dispatch(request({ username }))

    userService.login(username, password).then(
      user => {
        dispatch(success(user))
        history.push('/')
      },
      error => {
        dispatch(failure(error))
        dispatch(alertActions.error(error))
      }
    )
  }

  function request (user) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success (user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure (user) { return { type: userConstants.LOGIN_FAILURE, user } }
}

function logout () {
  userService.logout()
  return { type: userConstants.LOGOUT }
}
