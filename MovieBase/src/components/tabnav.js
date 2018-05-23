import React, { Component } from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation'
import HomeScreen from './homescreen'
import Logout from './logout'
import Favorites from './fav-movies'

const TabNav = createBottomTabNavigator(
    {
      Search: {
        screen: HomeScreen
      },
      Logout: {
          screen: Logout
      }
    },
  )

export default TabNav;