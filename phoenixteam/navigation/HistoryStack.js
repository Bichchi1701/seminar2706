import React, {Component} from 'react';
import { Platform, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HistoryScreen from '../screens/HistoryScreen';
//import ItemDetailScreen from '../screens/ItemDetailScreen';
const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});
const HistoryStack = createStackNavigator(
  {
    History: HistoryScreen,
   
  },
  {
    headerMode: 'screen',
    cardStyle: { backgroundColor: '#0d0d0d' },
    
  },
  config
);

HistoryStack.navigationOptions = {
  tabBarLabel: <View/>,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={ `ios-clock${focused ? '' : ''}`
          
      }
    />
  ),
};
export default HistoryStack;