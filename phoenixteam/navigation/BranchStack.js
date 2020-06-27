import React, {Component} from 'react';
import { Platform, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import BranchScreen from '../screens/BranchScreen';
//import ItemDetailScreen from '../screens/ItemDetailScreen';
const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});
const BranchStack = createStackNavigator(
  {
    History: BranchScreen,
   
  },
  {
    headerMode: 'screen',
    cardStyle: { backgroundColor: '#0d0d0d' },
    
  },
  config
);

BranchStack.navigationOptions = {
  tabBarLabel: <View/>,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={ `ios-list-box${focused ? '' : 'ios-list'}`
          
      }
    />
  ),
};
export default BranchStack;