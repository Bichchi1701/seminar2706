import React, {Component} from 'react';
import { Platform, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import SettingScreen from '../screens/SettingScreen';
import UserGuideScreen from '../screens/UserGuideScreen';
//import ItemDetailScreen from '../screens/ItemDetailScreen';
const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});
const SettingStack = createStackNavigator(
  {
    Setting: SettingScreen,
    UserGuide: UserGuideScreen
  },
  {
    headerMode: 'screen',
    cardStyle: { backgroundColor: '#fff' },
    
  },
  config
);

SettingStack.navigationOptions = {
  tabBarLabel: <View/>,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={ `ios-settings${focused ? '' : ''}`
          
      }
    />
  ),
};
//StatisticStac
export default SettingStack;