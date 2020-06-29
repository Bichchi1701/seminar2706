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
import { Api } from '../constants/const';
//?
const TYPE = {
  d: 0,
  m: 1,
  y: 2,
};

export default class VariantDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discountItem: {
        productId: '',
        discountId: '',
        status: '',
        price: '',
        percent: '',
        dateStart: '',
        dateEnd: '',
      },
    };
  }

  UNSAFE_componentWillMount = () => {
    const { data } = this.props.navigation.state.params;
    this.setState({
      variantItem: {
        discountId: data.discountId,
        productId: data.productId,
        percent: data.percent,
        price: data.price,
        dateStart: data.date,
        dateEnd: data.dateEnd,
        status: data.status,
      },
    })
  }
  // onSaveVariant = async (value) => {
  //   const { variantItem } = this.state;
  //   var data = {
  //     id: variantItem.id,
  //     price: value
  //   }
  //   console.log('This is data Iam posting to you:', data);
  //   await fetch('https://getmessagetestingwebsite.000webhostapp.com/schedule.php',
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ variant: data }),
  //     }).then((response) => response.json())
  //     .then((responseJson) => {
  //       console.log(responseJson);

  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });

  onSaveVariant = async () => {
    let data = { ...this.state.variantItem, };
    data.percent = +data.percent / 100;
    data.aft_price = data.price - data.price * data.percent;
    const API_URL = `${Api}Discount`;
    console.log(data)


    const response = await fetch(API_URL, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      })
    });
    if (response.status === 200) {
      Alert.alert('Lưu thành công');
    } else {
      Alert.alert('Lưu thất bại')
    }
  }
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
  onSetDatestart = (value, type) => {
    let tmp = this.state.dateStart.split("/");
    tmp[TYPE[type]] = value;
    this.setState({
      variantItem: {
        ...this.state.variantItem,
        dateStart: tmp.join("/"),
      }
    })
  }
  onSetDateend = (value, type) => {
    let tmp = this.state.dateEnd.split("/");
    tmp[TYPE[type]] = value;
    this.setState({
      variantItem: {
        ...this.state.variantItem,
        dateEnd: tmp.join("/")
      }
    })
  }
  getValueDate = (date, type) => {
    if (date != null) {
      let tmp = date.split("/");
      return tmp[TYPE[type]];
    }
    else
      return 0;
  }

  render() {
    var _percent = 0;
    if (this.state.variantItem.percent != undefined) {
      _percent = this.state.variantItem.percent.toString();
    }

    var _aftprice = parseInt(this.state.variantItem.price) - parseInt(this.state.variantItem.price) * parseInt(_percent) / 100;
    return (
      <ScrollView>
        <View style={styles.content}>

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
            <TextInput maxLength={3} style={styles.inputDate} keyboardType='numeric' value={this.state.percent} onChangeText={(value) => this.onSetDiscount(value)} />
            <Text style={styles.productContentTitle}> %</Text>
          </View>

          <View style={styles.productContentsWrapper}>
            <Text style={styles.productContentTitle}>Giá sản phẩm sau khi chiết khấu:</Text>
            <Text style={styles.productContentText}> {_aftprice} VNĐ </Text>
          </View>

          {/* 
          <View style={styles.productContentsWrapper}>
            <Text style={styles.productContentTitle}>Ngày bắt đầu: </Text>
            <TextInput maxLength={2} containerStyle={styles.inputDate} keyboardType='numeric' value={this.getValueDate(this.state.dateStart)} onChangeText={(value) => this.onSetDatestart(value, "d")} />
            <Text>ngày</Text>
            <TextInput maxLength={2} containerStyle={styles.inputDate} keyboardType='numeric' value={this.getValueDate(this.state.dateStart)} onChangeText={(value) => this.onSetDatestart(value, "m")} />
            <Text>tháng</Text>
            <TextInput maxLength={4} containerStyle={styles.inputDate} keyboardType='numeric' value={this.getValueDate(this.state.dateStart)} onChangeText={(value) => this.onSetDatestart(value, "y")} />
            <Text>năm</Text>

          </View> */}

          <View style={styles.productContentsWrapper}>
            <Text style={styles.productContentTitle}>Ngày bắt đầu: </Text>
            <TextInput maxLength={2} style={styles.inputDate} keyboardType='numeric' value={this.getValueDate(this.state.dateEnd, "d")} />
            <Text>ngày</Text>
            <TextInput maxLength={2} style={styles.inputDate} keyboardType='numeric' value={this.getValueDate(this.state.dateEnd, "d")} />
            <Text>tháng</Text>
            <TextInput maxLength={4} style={styles.inputDate} keyboardType='numeric' value={this.getValueDate(this.state.dateEnd, "d")} />
            <Text>năm</Text>

          </View>


          {/* <View style={styles.productContentsWrapper}>
            <Text style={styles.productContentTitle}>Ngày kết thúc: </Text>
            <TextInput maxLength={2} containerStyle={styles.inputDate} keyboardType='numeric' value={this.getValueDate(this.state.dateEnd, "d")} onChangeText={(value) => this.onSetDateend(value, "d")} />
            <Text> ngày</Text>
            <TextInput maxLength={2} containerStyle={styles.inputDate} keyboardType='numeric' value={this.getValueDate(this.state.dateEnd, "m")} onChangeText={(value) => this.onSetDateend(value, "m")} />
            <Text> tháng</Text>
            <TextInput maxLength={4} containerStyle={styles.inputDate} keyboardType='numeric' value={this.getValueDate(this.state.dateEnd, "y")} onChangeText={(value) => this.onSetDateend(value, "y")} />
            <Text>  năm</Text>
          </View> */}

          <View style={styles.productContentsWrapper}>
            <Text style={styles.productContentTitle}>Ngày kết thúc: </Text>
            <TextInput maxLength={2} style={styles.inputDate} keyboardType='numeric' value={this.getValueDate(this.state.dateEnd, "d")} />
            <Text> ngày</Text>
            <TextInput maxLength={2} style={styles.inputDate} keyboardType='numeric' value={this.getValueDate(this.state.dateEnd, "d")} />
            <Text> tháng</Text>
            <TextInput maxLength={4} style={styles.inputDate} keyboardType='numeric' value={this.getValueDate(this.state.dateEnd, "d")} />
            <Text>  năm</Text>
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
                onPress={() => this.onSaveVariant()}
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
  inputDate: {
    height: 20,
    width: 50,
    borderColor: 'gray',
    borderWidth: 1
  },
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
  settingButton: {
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

