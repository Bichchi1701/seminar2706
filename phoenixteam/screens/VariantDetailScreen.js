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

import Icon from 'react-native-vector-icons/FontAwesome';
import { SearchBar, ButtonGroup, Input, Button, } from 'react-native-elements';
import moment from 'moment';
import firebase from "firebase";

export default class VariantDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      discountItem: {
        id: '',
        updated_at: '',
        org_price: '',
        price: '',
        inventory_quantity: '',
        image_id: '',
        last_sell: '',
        discount: '',
        duration: '',
        sold: '',
        id: '',
      },
      images: [],
    };
  }
  componentWillMount = () => {
    const { navigation } = this.props;
    const VariantItem = navigation.getParam('data');
    this.setState({
      variantItem: {
        sku: VariantItem.variantsItem.sku,
        updated_at: VariantItem.variantsItem.updated_at,
        price: VariantItem.variantsItem.price,
        inventory_quantity: VariantItem.variantsItem.inventory_quantity,
        image_id: VariantItem.variantsItem.image_id,
        last_sell: VariantItem.variantsItem.last_sell,
        discount: VariantItem.variantsItem.discount,
        duration: VariantItem.variantsItem.duration,
        sold: VariantItem.variantsItem.sold,
        id: VariantItem.variantsItem.id,
        org_price: VariantItem.variantsItem.org_price,

      },
      images: VariantItem.images,
    })
    console.log('willMount', VariantItem);

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

    var _product = [];
    var _history = [];
    await firebase
      .database()
      .ref('/shopOwners/')
      .once('value', function (snapshot) {
        _product = snapshot.val()[0].products;
        _history = snapshot.val()[0].history;
      })
    for (var item of _product) {
      for (var _item of item.variants) {
        if (_item.id === data.id) {
          _item.duration = parseInt(this.state.variantItem.duration);
          _item.discount = parseInt(this.state.variantItem.discount);
        }
      }
    }
    await firebase.database().ref('shopOwners/0').update(
      { products: _product }
    ).then((data) => {
      //success callback
      console.log('data ', data)
    }).catch((error) => {
      //error callback
      console.log('error ', error)
    });
    var _now = moment().format("DD/MM/YYYY HH:mm:ss");
    const newHistoryItem = {
      content: 'Bạn đã cập nhật sản phẩm ' + variantItem.id,
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
        console.log('data ', data)
      }).catch((error) => {
        //error callback
        console.log('error ', error)
      });
      i++
    };
    Alert.alert('Đã lưu', 'Cập nhật thành công');
  };
  pushHistoryToFirebase = (history) => {
    
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
  onCancel = () => {

  };

  onSetDiscount = (value) => {
    if (parseInt(value) <= 100 || value === '') {
      const { variantItem } = this.state;
      var newVariantItem = variantItem;
      newVariantItem.discount = value;
      this.setState({
        variantItem: newVariantItem,
      })
    }
  }

  onSetDuration = (value) => {

    const { variantItem } = this.state;
    var newVariantItem = variantItem;
    newVariantItem.duration = value;
    this.setState({
      variantItem: newVariantItem,
    })
  }
  render() {

    // // const { navigation } = this.props;
    // // const VariantItem = navigation.getParam('data');
    // const {
    //   variantItem: {
    //     sku, updated_at, price, inventory_quantity, image_id, last_sell, discount, duration
    //   },
    //   images,
    // } = this.state;
    console.log('afterWillMount', this.state);
    const { flag } = this.state;
    const variantImg = this.state.images.find(item => item.id === this.state.variantItem.image_id);
    var _scr = this.state.images[0].src;
    var _inventory_quantity = 0;
    var _discount = 0;
    if (this.state.variantItem.discount != undefined) {
      _discount = this.state.variantItem.discount.toString();
    }

    var _afterPrice = parseInt(this.state.variantItem.org_price) - parseInt(this.state.variantItem.org_price) * parseInt(_discount) / 100;
    var _duration = this.state.variantItem.duration.toString();

    if (variantImg !== undefined) {
      _scr = variantImg.src;
    }
    if (this.state.variantItem.inventory_quantity !== null) {
      _inventory_quantity = this.state.variantItem.inventory_quantity;
    }
    console.log('DISCOUNT', _discount);
    // if (flag) {


    // }
    var _updated_at = moment(this.state.variantItem.updated_at).format("DD/MM/YYYY HH:mm:ss");
    // console.log('Bien the ne he', VariantItem);
    // console.log('source hinh ne he', _scr);
    return (
      <ScrollView>
        <View style={styles.content}>
          <Image style={styles.productImgWrapper}
            source={{ uri: _scr }} />
          <View style={styles.productContentsWrapper}>
            <Text style={styles.productWarningTitle}>Sản phẩm này đã {this.state.variantItem.last_sell} ngày không bán được! </Text>
          </View>
          <View style={styles.productContentsWrapper}>
            <Text style={styles.productContentTitle}>SKU: </Text>
            <Text style={styles.productContentText}> {this.state.variantItem.sku} </Text>
          </View>
          <View style={styles.productContentsWrapper}>
            <Text style={styles.productContentTitle}>Số lượng còn lại:</Text>
            <Text style={styles.productContentText}> {this.state.variantItem._inventory_quantity} </Text>
          </View>
          <View style={styles.productContentsWrapper}>
            <Text style={styles.productContentTitle}>Số lượng bán được: </Text>
            <Text style={styles.productContentText}> {0} </Text>
          </View>
          <View style={styles.productContentsWrapper}>
            <Text style={styles.productContentTitle}>Giá gốc:</Text>
            <Text style={styles.productContentText}> {this.state.variantItem.org_price} VNĐ </Text>
          </View>
          <View style={styles.productContentsWrapper}>
            <Text style={styles.productContentTitle}>Mức chiết khấu: </Text>
            <TextInput maxLength={3} containerStyle={styles.inputPercentDiscount} keyboardType='numeric' value={_discount} onChangeText={(value) => this.onSetDiscount(value)} />
            <Text style={styles.productContentTitle}> %</Text>
          </View>
          <View style={styles.productContentsWrapper}>
            <Text style={styles.productContentTitle}>Giá sau chiết khấu: </Text>
            <Text style={styles.productContentTitle}>{_afterPrice} VNĐ</Text>
          </View>
          <View style={styles.productContentsWrapper}>
            <Text style={styles.productContentTitle}>Số ngày áp dụng: </Text>
            <TextInput maxLength={4} containerStyle={styles.inputPercentDiscount} keyboardType='numeric' value={_duration} onChangeText={(value) => this.onSetDuration(value)} />
            <Text style={styles.productContentTitle}> ngày</Text>
          </View>
          <View style={styles.productContentsWrapper}>
            <Text style={styles.productContentTitle}>Ngày cập nhật:</Text>
            <Text style={styles.productContentText}> {_updated_at} </Text>
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
                onPress={() => this.onSaveVariant(_afterPrice)}
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
  title: 'Chi tiết biến thể',
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

});

