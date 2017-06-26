import React from 'react'
import ReactDOM from 'react-dom'
import {applyMiddleware, compose, createStore} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import reducer from 'reducers'

import Data from 'containers/data/data'
import './index.scss'

if (module.hot) {
  module.hot.accept()
}

const middlewares = [promise(), thunk]

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`)
  middlewares.push(logger)
}

const store = createStore(reducer, {}, compose(
  applyMiddleware(...middlewares),
  window.devToolsExtension ? window.devToolsExtension() : (value) => value
))

ReactDOM.render(
  <Provider store={store}>
    <Data />
  </Provider>,
  document.getElementById('app')
)
