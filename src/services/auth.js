import axios from 'axios'

export const authenticate = (username, password) => axios.post('/auth/auth', {
  username: username, password: password, email: username
})

export const signOut = () => axios.post('/auth/signOut')
