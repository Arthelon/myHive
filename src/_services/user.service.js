import config from 'config'
import { authHeader } from '../_helpers/auth-header'

export const userService = {
  login,
  logout,
}

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username, password}),
  }

  return fetch(`${config.apiUrl}/users/authenticate`, requestOptions).
    then(handleResponse).
    then(user => {
      // Login if there's jwt token
      if (user.token) {
        localStorage.setItem('user', JSON.stringify(user))
      }
      return user
    })
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status == 401) {
        logout()
        location.reload(true)
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}

function logout() {
  localStorage.removeItem('user')
}
