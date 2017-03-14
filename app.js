import React, { Component } from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { connect, Provider } from 'react-redux'

import Navigator from './components/AppNavigator'
import configureStore from './redux/store'

@connect(state => ({
  nav: state.nav
}))
class AppWithNavigationState extends Component {
  render () {
    return (
      <Navigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav
      })} />
    )
  }
}

const store = configureStore()

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <AppWithNavigationState/>
      </Provider>
    )
  }
}

export default App
