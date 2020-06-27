import React, {Component} from 'react';
import { ScrollView, StyleSheet,View, Text } from 'react-native';
import NotificationItem from '../components/NotificationItem';
export default class NotificationScreen extends Component {
  
  onClickNotificationItem = id => {
    this.props.navigation.navigate('ItemDetail', {});
  };
  render() {
    var noti = [];
    const notiStatusChecked='Checked';
    const notiStatusUnchecked='Unchecked';
    for (let i = 0; i < 3; i++) {

      noti.push(
        <NotificationItem onClick={()=> this.onClickNotificationItem()} data={notiStatusChecked}/>
      )

    }
    for (let i = 0; i < 3; i++) {

      noti.push(
        <NotificationItem onClick={()=> this.onClickNotificationItem()} data={notiStatusUnchecked}/>
      )

    }
    return (
      <ScrollView>
        <View style={styles.notiTxtWrapper}>
          <Text style={styles.notiTxt}>Mới</Text>
        </View>
        {noti}
        <View style={styles.notiTxtWrapper}>
          <Text style={styles.notiTxt}>Trước đó</Text>
        </View>
        {noti}
      </ScrollView>
    )
  }
  };

NotificationScreen.navigationOptions = {
  title: 'Thông báo',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  notiTxtWrapper: {
    backgroundColor:'#fff',

  },
  notiTxt: {
    color:'black',
    fontSize:20,
    fontWeight:'800',
  }
});
