import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from 'store.js'

import HomePage from 'containers/HomePage/index.js'

require('../docs/css/index.scss')

const { Router, Route, IndexRoute, browserHistory } = require('react-router')

const store = configureStore()

render(
  <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/' component={HomePage} />
      </Router>
  </Provider>,
  document.getElementById('app')
)
