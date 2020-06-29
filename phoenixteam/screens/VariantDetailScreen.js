import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
  Alert,
  Script
} from 'react-native';
// import DatePicker from 'react-native-datepicker'

import Icon from 'react-native-vector-icons/FontAwesome';
import { SearchBar, ButtonGroup, Input, Button, } from 'react-native-elements';
import moment from 'moment';
import firebase from "firebase";

export default class VariantDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: true,
      variantItem: {
        productId: '',
        aft_price: '',
        price: '',
        percent: '',
        dateStart: '',
        dateEnd: '',
      },
      images: [],
    };
  }
  UNSAFE_componentWillMount = () => {
    const { data } = this.props.navigation.state.params;
    this.setState({
      variantItem: {
        productId: data.productId,
        percent: data.percent,
        price: data.price,
        dateStart: data.date,
        dateEnd: data.dateEnd,
        aft_price: data.aft_price,
      },
      images: data.images,
    })
  }
  onSaveVariant = async (value) => {
    const { variantItem } = this.state;
    var data = {
      id: variantItem.id,
      price: value
    }
    console.log('This is data Iam posting to you:', data);
    await fetch('https://getmessagetestingwebsite.000webhostapp.com/schedule.php',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ variant: data }),
      }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);

      })
      .catch((error) => {
        console.error(error);
      });
   
    var _now = moment().format("DD/MM/YYYY HH:mm:ss");
    const newHistoryItem = {
      content: 'Bạn đã cập nhật sản phẩm ' + discountItem.id,
      time: _now,
      id: _history.length + 1,
      type: 'product',
    };
    const newHistory = [..._history, newHistoryItem];
    var i = 0;
    for (let item of newHistory) {
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
      }).catch((error) => {
        //error callback
      });
      i++
    };
    Alert.alert('Đã lưu', 'Cập nhật thành công');
  };

  onCancel = () => {

  };

  onSetDiscount = (value) => {
    if (parseInt(value) <= 100 || value === '') {
      const { variantItem } = this.state;
      var newVariantItem = variantItem;
      newVariantItem.percent = value;
      this.setState({
        variantItem: newVariantItem,
      })
    }
  }
  onSetDatestart = (value) => {
   
  }
  onSetDateend = (value) => {
   

  }
  getValueDate = (date, type) => {
    let tmp = date.split("/");
    const TYPE = {

    }
  }
  render() {
    var _percent=0;
    if (this.state.variantItem.percent != undefined) {
      _percent = this.state.variantItem.percent.toString();
    }
    var _aftPrice=0;
    var  _aftprice = parseInt(this.state.variantItem.price) - parseInt(this.state.variantItem.price) * parseInt(_percent) / 100;
    return (
      <ScrollView>
        <View style={styles.content}>
        <View style={styles.settingButton}>
            <Text style={styles.settingText}>Cập nhật trạng thái </Text>
            <Switch
              size={50}
              onValueChange={this.onChangeAutomatic}
              value={this.state.isAutomatic}

            />

          </View>

          <View style={styles.productContentsWrapper}>
            <Text style={styles.productContentTitle}>SKU: </Text>
            <Text style={styles.productContentText}> {this.state.variantItem.productId} </Text>
          </View>

          <View style={styles.productContentsWrapper}>
            <Text style={styles.productContentTitle}>Giá gốc:</Text>
            <Text style={styles.productContentText}> {this.state.variantItem.price} VNĐ </Text>
          </View>
          <View style={styles.productContentsWrapper}>
            <Text style={styles.productContentTitle}>Mức chiết khấu: </Text>
            <TextInput maxLength={3} containerStyle={styles.inputPercentDiscount} keyboardType='numeric' value={this.state.percent} onChangeText={(value) => this.onSetDiscount(value)} />
            <Text style={styles.productContentTitle}> %</Text>
          </View>
          {/* <View style={styles.productContentsWrapper}>
            <Text style={styles.productContentTitle}>Giá sau chiết khấu: </Text>
            <Text style={styles.productContentTitle}>{_afterPrice} VNĐ</Text>
          </View> */}
           <View style={styles.productContentsWrapper}>
            <Text style={styles.productContentTitle}>Giá sản phẩm sau khi chiết khấu:</Text>
            <Text style={styles.productContentText}> { _aftprice} VNĐ </Text>
          </View>
          <View style={styles.productContentsWrapper}>
            <Text style={styles.productContentTitle}>Ngày bắt đầu: </Text>
            <TextInput maxLength={2} containerStyle={styles.inputPercentDiscount} keyboardType='numeric' value={this.state.dateEnd} onChangeText={(value) => this.onSetDateend(value, "d")} />
            <Text> ngày</Text>
            <TextInput maxLength={2} containerStyle={styles.inputPercentDiscount} keyboardType='numeric' value={this.state.dateEnd} onChangeText={(value) => this.onSetDateend(value, "m")} />
            <Text> tháng</Text>
            <TextInput maxLength={4} containerStyle={styles.inputPercentDiscount} keyboardType='numeric' value={this.state.dateEnd} onChangeText={(value) => this.onSetDateend(value, "y")} />
            <Text>     năm</Text>
            {/* <DatePicker
              style={{ width: 200 }}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="DD-MM-YYYY"
              // minDate="2016-05-01"
              // maxDate="2016-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={styles.datePickerCustom}
              onDateChange={(date) => { this.setState({ date: date }) }} /> */}
          </View>
          <View style={styles.productContentsWrapper}>
            <Text style={styles.productContentTitle}>Ngay kết thúc: </Text>
            <TextInput maxLength={2} containerStyle={styles.inputPercentDiscount} keyboardType='numeric' value={this.state.dateEnd} onChangeText={(value) => this.onSetDateend(value, "d")} />
            <Text>ngày</Text>
            <TextInput maxLength={2} containerStyle={styles.inputPercentDiscount} keyboardType='numeric' value={this.state.dateEnd} onChangeText={(value) => this.onSetDateend(value, "m")} />
            <Text>tháng</Text>
            <TextInput maxLength={4} containerStyle={styles.inputPercentDiscount} keyboardType='numeric' value={this.state.dateEnd} onChangeText={(value) => this.onSetDateend(value, "y")} />
            <Text>năm</Text>
          </View>

          <View style={styles.settingConfirmButtonWrapper}>
            <View style={styles.buttonDelete}>
              <Button

                icon={
                  <Icon
                    name="check-circle"
                    size={15}
                    color="white"
                  />
                }
                title=" Lưu"
                onPress={() => this.onSaveVariant(_aftPrice)}
                buttonStyle={styles.buttonSave}
              />
            </View>
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
              buttonStyle={styles.buttonCancel}
            />

          </View>
        </View>

      </ScrollView>
    );
  }
}
VariantDetailScreen.navigationOptions = {
  title: 'Thay đổi giá',
};

const styles = StyleSheet.create({
  buttonCancel: {
    backgroundColor: '#e60000',
    width: 150,
  },
  buttonSave: {
    backgroundColor: '#009900',
    width: 150,
  },

  productImgWrapper: {
    alignSelf: 'center',
    height: 300,
    width: 300,
    backgroundColor: 'black'
  },

  productContentsWrapper: {

    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 30,
    alignItems: 'center'
  },

  inputPercentDiscount: {
    width: 200,
    height: 30,
    color: '#b3d9ff'

  },

  settingConfirmButtonWrapper: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    paddingHorizontal: 10,
  },
  buttonDelete: {
    marginHorizontal: 10,

  },
  content: {
    flexDirection: 'column',
    
  },
  productContentTitle: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',

  },
  productWarningTitle: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  productContentText: {
    color: 'black',
    fontSize: 14,
  },
  settingButton:{
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderBottomColor: '#d7d7d7',
    borderBottomWidth: 0.5,
    paddingHorizontal: 10,
  }
  
});

