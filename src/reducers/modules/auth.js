import axios from 'axios'
import * as api from '@/services/auth'

import { genModule, packModule } from '../module'

const SET_SESSION = 'SET_SESSION'
const SET_AUTHENTICATING = 'SET_AUTHENTICATING'

class Session {
  constructor(obj = {}) {
    this.sessionKey = obj.sessionKey || null
  }
}

const { state: genState, reducer: genReducer, actions: genActions } = genModule({
  session: {
    type: SET_SESSION,
    value: new Session({
      sessionKey: localStorage.getItem('sessionKey')
    }),
    action: 'setSession'
  },
  authenticating: {
    type: SET_AUTHENTICATING,
    value: false,
    action: 'setAuthenticating'
  }
})

axios.defaults.headers.common['Authorization'] = localStorage.getItem('sessionKey')

export const module = packModule({
  state: genState, reducer: {
    ...genReducer,
    [SET_SESSION](state, { session }) {
      if (session.sessionKey != null) {
        localStorage.setItem('sessionKey', session.sessionKey)
        axios.defaults.headers.common['Authorization'] = session.sessionKey
      } else {
        localStorage.removeItem('sessionKey')
        delete axios.defaults.headers.common['Authorization']
      }
      return {
        ...state,
        session
      }
    }
  },
  name: 'auth',
  actions: {
    ...genActions
  }
})

const nActions = module.actions

const handleError = dispatch => e => {
  dispatch(nActions.setSession(new Session()))
  dispatch(nActions.setAuthenticating(false))
  console.error(e)
}

export const authenticate =
  (username, password) => dispatch => api.authenticate(username, password).then(result => {
    dispatch(nActions.setSession(new Session(result.data)))
  }, handleError(dispatch))

export const signOut =
  () => dispatch => api.signOut().then(() => {
    dispatch(nActions.setSession(new Session()))
  }, handleError(dispatch))

export const connectAuth = module.connect({
  authenticate, signOut
})
