import { combineReducers } from 'redux'

import github from './github'
import Navigator from '../../components/AppNavigator'

const nav = (state, action) => {
  const newState = Navigator.router.getStateForAction(action, state)
  return newState || state
}

export default combineReducers({
  nav,
  github
})
