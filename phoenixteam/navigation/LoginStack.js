import React, { Component } from 'react';
import { Platform, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import StatisticScreen from '../screens/StatisticScreen';
//import ItemDetailScreen from '../screens/ItemDetailScreen';
const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});
const LoginStack = createStackNavigator(
  {
    Login: LoginScreen,
    Statistic: StatisticScreen,
  },

  config
);


export default LoginStack;