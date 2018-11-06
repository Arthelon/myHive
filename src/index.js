/* eslint-disable */
// Set up your application entry point here...

import { render } from 'react-dom'
import React from 'react';
import axios from 'axios'

import { AppContainer } from 'react-hot-loader'

import Root from './components/Root';
import configureStore, { history } from './store/configureStore'

axios.defaults.baseURL = '/api/'

import './styles/styles.scss';

const store = configureStore()

render(
  <AppContainer>
    <Root store={store} history={history}/>
  </AppContainer>,
  document.getElementById('app')
)

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NewRoot = require('./components/Root').default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
