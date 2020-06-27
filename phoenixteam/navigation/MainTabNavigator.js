import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';


import StatisticStack from '../navigation/StatisticStack';
import HistoryStack from '../navigation/HistoryStack';
import NotificationStack from '../navigation/NotificationStack';
import SettingStack from '../navigation/SettingStack';
import LoginStack from '../navigation/LoginStack';
import BranchStack from '../navigation/BranchStack';


StatisticStack.path = '';
HistoryStack.path = '';
NotificationStack.path = '';
SettingStack.path = '';
LoginStack.path = '';
BranchStack.path='';
const tabNavigator = createBottomTabNavigator({
  SettingStack,
  StatisticStack,
  HistoryStack,
  NotificationStack,
  BranchStack,
});

tabNavigator.path = '';

export default tabNavigator;
