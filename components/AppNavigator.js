import { StackNavigator } from 'react-navigation'

import HomeScreen from '../screens/Home'
import ReposScreen from '../screens/Repos'

const Navigator = StackNavigator({
  Home: {
    screen: HomeScreen
  },
  Repos: {
    screen: ReposScreen
  }
})

export default Navigator
