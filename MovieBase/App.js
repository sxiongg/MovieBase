import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation'
import Login from './src/components/login'
import TabNav from './src/components/tabnav'
import { Provider } from 'react-redux'
import store from './redux/store'

const RootStack = createStackNavigator(
  {
    Home: {
      screen: Login,
      navigationOptions:  {
        header: null
        }
    },
    TabNav: {
      screen: TabNav,
      navigationOptions:  {
        title: 'MyScreen',
        header: null
      }
    }
  },
  {
    initialRouteName: 'Home'
  },
  { headerMode: 'screen' }
);

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store} >
      <RootStack />
      </Provider>
    );
  }
}
