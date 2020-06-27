import React, { Component } from 'react';
import { Platform, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { Badge } from 'react-native-elements';
import TabBarIcon from '../components/TabBarIcon';
import NotificationScreen from '../screens/NotificationScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});
const NotificationStack = createStackNavigator(
  {
    Notification: NotificationScreen,
    ItemDetail: ItemDetailScreen,
  },
  {
    headerMode: 'screen',
    cardStyle: { backgroundColor: '#fff' },

  },
  config
);

NotificationStack.navigationOptions = {
  tabBarLabel: <View />,
  tabBarIcon: ({ focused }) => (
    <View>
      <TabBarIcon
        focused={focused}
        name={`ios-notifications${focused ? '' : '-outline'}`

        }
      />

      <Badge value="9" status="error" containerStyle={{ position: 'absolute', top: -5, right: -5 }} />
    </View>
  ),
};
//StatisticStac
export default NotificationStack;
//sieuhuflit@gmail.com