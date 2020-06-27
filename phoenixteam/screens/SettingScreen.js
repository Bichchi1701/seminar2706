import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ClippingRectangle,
  FlatList,
  ActivityIndicator,
  TextInput,
  Alert,
  Switch
} from 'react-native';
import SettingItem from '../components/SettingItem';
import Icon from 'react-native-vector-icons/FontAwesome';
//import { settingRules } from '../constants/dataSettings';
import { SearchBar, ButtonGroup, Input, Button, Tooltip } from 'react-native-elements';
import firebase from "firebase";
import moment from 'moment';


export default class SettingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: [],
      autoUpdateTime: 0,
      checkDateDuration: '',
      history: [],
      isLoading: false,
      isAutomatic: true,
    };
  };
  callFirebase = async () => {

    var strs;
    var _history = [];

    var db = firebase.database();
    await firebase
      .database()
      .ref('/shopOwners/')
      .once('value', function (snapshot) {
        strs = snapshot.val()[0].settingRules;
        if (snapshot.val()[0].history !== undefined) {
          _history = snapshot.val()[0].history;
        }

      })
    this.setState({
      settings: strs,
      history: _history,
      isLoading: false,
    })
  }

  componentDidMount = async () => {
    this.setState({
      isLoading: true,
    });
    this.callFirebase();
  };
  onClickMoreOption = () => {
    const { settings } = this.state;
    const newSettingItem = {
      duration: '30',
      discount: '',
      date: '',
      id: settings.length + 1
    };
    const newSettings = [...settings, newSettingItem];
    this.setState({
      settings: newSettings,
    })

  };
  onClickDeleteOption = (item) => {
    const { settings } = this.state;
    const newSettings = settings;
    var settingIndex = settings.indexOf(item)
    newSettings.splice(settingIndex, 1);
    this.setState({
      settings: newSettings,
    });
  };

  updateUpdateTime = checkDateDuration => {
    this.setState({ checkDateDuration });
  };
  onChangeDate = (id, value) => {
    console.log(value);
    const { settings } = this.state;
    const settingItem = settings.find(item => item.id === id);
    settingItem.date = value;
    const foundIndex = settings.findIndex(item => item.id === id);
    settings[foundIndex] = settingItem;
    const newSettings = [...settings];
    this.setState({
      settings: newSettings,
    });
  };

  onCancel = () => {
    this.setState({
      settings: [],
      isLoading: true,
    })
    this.callFirebase();
  }
  onChangeDiscount = (id, value) => {
    console.log(value);
    const { settings } = this.state;
    const settingItem = settings.find(item => item.id === id);
    settingItem.discount = value;
    const foundIndex = settings.findIndex(item => item.id === id);
    settings[foundIndex] = settingItem;
    const newSettings = [...settings];
    this.setState({
      settings: newSettings,
    });
  };
  onChangeDuration = (id, value) => {
    console.log(value);
    const { settings } = this.state;
    const settingItem = settings.find(item => item.id === id);
    settingItem.duration = value;
    const foundIndex = settings.findIndex(item => item.id === id);
    settings[foundIndex] = settingItem;
    const newSettings = [...settings];
    this.setState({
      settings: newSettings,
    });
  };
  updateHistory = () => {
    const { history } = this.state;
    console.log('history', history);
    var _now = moment().format("DD/MM/YYYY HH:mm:ss");
    const newHistoryItem = {
      content: 'Bạn đã cập nhật cài đặt',
      time: _now,
      id: history.length + 1,
      type: 'setting',
    };
    const newHistory = [...history, newHistoryItem];
    this.setState({
      history: newHistory,
    })
    console.log('after change', history);
  }
  pushHistoryToFirebase = () => {
    const { history } = this.state;
    var i = 0;
    for (let item of history) {
      let content = item.content;
      let time = item.time;
      let id = item.id;
      let type = item.type;
      firebase.database().ref('shopOwners/0/history').child(i).set({
        content,
        time,
        id,
        type,
      }).then((data) => {
        //success callback
        console.log('data ', data)
      }).catch((error) => {
        //error callback
        console.log('error ', error)
      });
      i++
    }
  }
  onSaveSettingRules = async () => {
    const { settings, isAutomatic } = this.state;
    const settingRules = settings;
    var flag = true;
    var alert = '';
    var count = 0;
    for (let item of settingRules) {
      count = 0;
      if (item.date === '' || item.duration === '' || item.discount === '' || item.id === '') {
        flag = false;
        alert = 'Không được để trống điều kiện đặt giá động!';
      }
      // for (let _item of settingRules) {
      //   if (item.date === _item.date)
      //     count++;
      //   console.log('count:', count);
      // }

      // if (count === 1) {
      //   flag = false;
      //   alert = 'Số ngày không bán được không được trùng!';
      // }
    }
    if (flag === true) {
      var i = 0;

      firebase.database().ref('shopOwners/0/isAutomatic').set(
        isAutomatic,
      );
      firebase.database().ref('shopOwners/0/settingRules').remove();
      for (let item of settingRules) {
        let date = parseInt(item.date);
        let discount = parseFloat(item.discount);
        let duration = parseInt(item.duration);
        let id = parseInt(item.id);
        firebase.database().ref('shopOwners/0/settingRules').child(i).set({
          date,
          duration,
          id,
          discount
        }).then((data) => {
          //success callback
          console.log('data ', data)
        }).catch((error) => {
          //error callback
          console.log('error ', error)
        });
        i++;
      }
      await this.updateHistory();
      this.pushHistoryToFirebase();

      Alert.alert('Đã lưu', 'Cập nhật thành công');
    }
    else {

      Alert.alert('Lưu ý', alert);
    }
    console.log('CheckingSetting', alert);
  };
  onChangeAutomatic = (value) => {
    this.setState({
      isAutomatic: value
    })
  }
  onClickGuide = () => {
    this.props.navigation.navigate('UserGuide');
  }
  render() {
    const { settings, autoUpdateTime, checkDateDuration, isLoading, history } = this.state;

    console.log('historyItems', history);
    if (isLoading) {
      return (
        <View style={styles.containerLoading}>
          <ActivityIndicator
            size="large"
            color="black"
            animating={isLoading} />
          <Text style={styles.waitingText}>Đang tải cài đặt của bạn...</Text>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps='handled'>
          <View style={styles.settingAutomatic}>
            <Text style={styles.settingText}>Tự động cập nhật giá </Text>
            <Switch
              size={50}
              onValueChange={this.onChangeAutomatic}
              value={this.state.isAutomatic}

            />

          </View>
          <View style={styles.settingRules}>
            <View style={styles.settingRulesSoldTitleWrapper}>
              <Text style={styles.settingRulesTitle}>Số ngày không </Text>
              <Text style={styles.settingRulesTitle}>bán được</Text>
            </View>
            <View style={styles.settingRulesDiscountTitleWrapper}>
              <Text style={styles.settingRulesTitle}>Mức chiết khấu</Text>
              <Text style={styles.settingRulesTitle}>(%)</Text>
            </View>
            <View style={styles.settingRulesDiscountTitleWrapper}>
              <Text style={styles.settingRulesTitle}>Số ngày</Text>
              <Text style={styles.settingRulesTitle}>áp dụng</Text>
            </View>
            <View style={styles.settingRulesButtonDeleteWrapper}>
              <Text style={styles.settingRulesTitle}>#</Text>
            </View>
          </View>
          <FlatList
            data={settings}
            style={styles.flatlist}
            renderItem={({ item }) => {
              return (
                <SettingItem data={item}
                  onChangeDate={(value) => this.onChangeDate(item.id, value)}
                  onChangeDiscount={(value) => this.onChangeDiscount(item.id, value)}
                  onChangeDuration={(value) => this.onChangeDuration(item.id, value)}
                  onClickDeleteOption={() => this.onClickDeleteOption(item)}
                  onRefresh={this.onRefresh}
                  refreshing={false}
                />
              )
            }}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={styles.settingRulesButtonWrapper}>

            <Button
              icon={
                <Icon
                  name="question-circle"
                  size={15}
                  color="#2089DC"
                />
              }

              title=" Trợ giúp"
              onPress={() => this.onClickGuide()}
              titleStyle={styles.helpButtonText}
              buttonStyle={styles.buttonGuide}
             
            />
            <View style={styles.addMoreSettingRulesWrapper}>
              <Button
                icon={
                  <Icon
                    name="plus-circle"
                    size={17}
                    color="white"
                  />
                }
                title=" Thêm"
                onPress={() => this.onClickMoreOption()}
                raised

              />
            </View>
          </View>


          <View style={styles.settingConfirmButtonWrapper}>
            <View style={styles.buttonDelete}>
              <Button
                icon={
                  <Icon
                    name="times-circle"
                    size={15}
                    color="white"
                  />
                }
                title=" Hủy"
                onPress={() => this.onCancel()}
                raised

                buttonStyle={styles.buttonCancel}
              />
            </View>
            <Button

              icon={
                <Icon
                  name="check-circle"
                  size={15}
                  color="white"
                />
              }
              title=" Lưu"
              onPress={() => this.onSaveSettingRules()}
              raised
              buttonStyle={styles.buttonSave}
            />




          </View>

          <View style={styles.settingQty}>
            <Text style={[styles.settingText, { fontStyle: 'italic' }]}>Hệ thống sẽ tự động lọc hàng tồn báo động lúc 0:00</Text>
          </View>
        </ScrollView>
      </View>

    )
  }
};

SettingScreen.navigationOptions = {
  title: 'Cài đặt điều kiện đặt giá động',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',

  },
  helpButtonText: {
    color:'#2089DC',
    fontStyle: 'italic'
  },

  addMoreSettingRulesWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  settingAutomatic: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderBottomColor: '#d7d7d7',
    borderBottomWidth: 0.5,
    paddingHorizontal: 10,
  },
  buttonGuide: {
    backgroundColor: 'white',
    width: 100,

  },
  buttonCancel: {
    backgroundColor: '#e60000',
    width: 150,
  },
  buttonSave: {
    backgroundColor: '#009900',
    width: 150,
  },
  containerLoading: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    flexDirection: 'column',

    paddingTop: 200,
  },
  waitingText: {
    color: 'black',
    justifyContent: 'center',
    fontSize: 20,
    alignItems: 'center',
    alignSelf: 'center'
  },
  settingQty: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 80

  },
  buttonDelete: {
    marginHorizontal: 10,

  },

  settingRulesButtonWrapper: {
    borderTopWidth: 0.5,
    borderColor: '#d7d7d7',
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    paddingHorizontal: 10,
  },


  settingConfirmButtonWrapper: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    paddingHorizontal: 10,
  },
  settingRules: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    height: 60,
    flex: 1,

  },
  settingRulesTitle: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
  settingRulesSoldTitleWrapper: {
    flex: 0.25,
    alignItems: 'center'
  },

  settingRulesDiscountTitleWrapper: {
    flexDirection: 'column',
    flex: 0.25,
    alignItems: 'center'
  },

  settingRulesDateTitleWrapper: {
    flexDirection: 'column',
    flex: 0.25,
    alignItems: 'center'
  },

  settingRulesButtonDeleteWrapper: {
    flexDirection: 'column',
    flex: 0.25,
    alignItems: 'center'
  },
  settingText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 10,

  },
  inputQty: {
    width: 80,
    height: 10,
    marginBottom: 30
  },

  headTitleText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500'
  },

  moreButtonWrapper: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
  },
  moreButton: {
    height: 30,
    width: 60,
    marginTop: 10,
    marginRight: 10,
    borderRadius: 13,
    backgroundColor: '#66c2ff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pagingButtonText: {
    color: 'black',
    fontSize: 22,
    fontWeight: '200',
  },
});
