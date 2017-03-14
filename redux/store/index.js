import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import reducer from '../reducers'
import api from '../../api'
import isDebug from '../../utils/isDebug'

export default function configureStore (initialState = {}) {
  const middlewares = [
    thunk.withExtraArgument(api)
  ]

  let composeEnhancers = compose

  if (process.env.NODE_ENV === 'development') {
    if (isDebug && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
  }

  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  )

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers/index').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
