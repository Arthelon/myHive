/* eslint-disable */
// Set up your application entry point here...

import { render } from 'react-dom'
import React from 'react'
import axios from 'axios'

import { AppContainer } from 'react-hot-loader'

import { setLoader } from '@/reducers/modules/alerts'

import Root from './components/Root'
import configureStore, { history } from './store/configureStore'
import './styles/styles.scss'

axios.defaults.baseURL = '/api/'

let axiosPendingRequests = 0
const processLoading = pending => {
  if (pending > 0) {
    store.dispatch(setLoader(true))
  } else {
    store.dispatch(setLoader(false))
  }
}

axios.interceptors.request.use((config) => {
  axiosPendingRequests++
  processLoading(axiosPendingRequests)
  return config
}, (error) => {
  return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
  axiosPendingRequests--
  processLoading(axiosPendingRequests)
  return response
}, (error) => {
  axiosPendingRequests--
  processLoading(axiosPendingRequests)
  return Promise.reject(error)
})

console.log("myHive Frontend Build: ", __VERSION__)

const store = configureStore()

render(
  <AppContainer>
    <Root store={store} history={history}/>
  </AppContainer>,
  document.getElementById('app')
)

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NewRoot = require('./components/Root').default
    render(
      <AppContainer>
        <NewRoot store={store} history={history}/>
      </AppContainer>,
      document.getElementById('app')
    )
  })
}
