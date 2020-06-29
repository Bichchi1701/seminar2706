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
  ActivityIndicator,
  Button
} from 'react-native';


import ProductVariants from '../components/ProductVariants';

import { Api } from '../constants/const';
export default class DiscountItemScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  callApi = async () => {
    const API_URL = `${Api}Discount/${this.props.navigation.state.discountId}`;
    const response = await fetch(API_URL);
    const discount = await response.json();
    return discount.data;
  };
 
   UNSAFE_componentWillMount = async () => {
    let data = await this.callApi();
    this.setState({
      data,
      isLoading:  false,
    });
  } 
  onRefresh = () => {
    this.setState({
    
      
      isLoading: true,
    });
    this.callApi();
  };
 
  // onViewDetail = id => {

  //   const { navigation } = this.props;
  //   const ProductItem = navigation.getParam('data');
  //   const {
  //     variants, images
  //   } = ProductItem;
  //   const variantsItem = variants.find(item => item.id === id);
  //   this.props.navigation.navigate('VariantDetail', { data: { variantsItem, images } });
  // };
  render() {

    if (this.state.isLoading || !this.state.data ) {
      return (
        <View style={styles.containerLoading}>
          <ActivityIndicator
            size="large"
            color="black"
            animating={this.state.isLoading}
          />
          <Text style={styles.waitingText}>
            Đang tải lên chi tiết giảm giá của bạn...
          </Text>
        </View>
      );
    }
    return (
      <ScrollView>
      
        <View style={styles.content}>
          
           <View style={styles.productContentsWrapper}>
            <Text style={styles.productContentTitle}>Mã giảm giá:</Text>
            <Text style={styles.productContentText}>
              {' '}
              {this.state.data.discountId}{' '}
            </Text>
          </View> 
          <View style={styles.productContentsWrapper}>
            <Text style={styles.productContentTitle}>Giá gốc</Text>
            <Text style={styles.productContentText}>
              {' '}
              {this.state.data.originalPrice}{' '}VNĐ
            </Text>
          </View>
          <View style={styles.productContentsWrapper}>
            <Text style={styles.productContentTitle}>Mức chiết khấu: </Text>
            <Text style={styles.productContentText}>
              {this.state.data.percentDiscount}{' '}%
            </Text>
          </View>
          <View style={styles.productContentsWrapper}>
            <Text style={styles.productContentTitle}>Ngày bắt đầu: </Text>
            <Text style={styles.productContentText}>
              {this.state.data.dateStart}{' '}
            </Text>
          </View>
          <View style={styles.productContentsWrapper}>
            <Text style={styles.productContentTitle}>Ngày kết thúc: </Text>
            <Text style={styles.productContentText}>
              {this.state.data.dateEnd}{' '}
            </Text>
          </View>
          <View style={styles.buttonChange}>
           <Button
        title="Thêm giảm giá"
        
        onPress={() => this.props.navigation.navigate('VariantDetail', {data: this.state.data})}
        buttonStyle={styles.buttonChange}
      />
      </View>
          
        </View> 
        
       
          
      </ScrollView>
    );
  }
}

DiscountItemScreen.navigationOptions = {
  title: 'Chi tiết giảm giá',
};
const styles = StyleSheet.create({
  productImgWrapper: {
    height: 300,
    width: 300,
    backgroundColor: 'blue',
    marginVertical: 10,
  },

  img: {
    height: 300,
    width: 300,
    backgroundColor: '#d7d7d7',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  productContentTitle: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
  productContentsWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 30,
    alignItems: 'center',
  },
  productWarningTitle: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'italic',
    paddingHorizontal: 10,
  },
  productContentText: {
    color: 'black',
    fontSize: 14,
  },

  content: {
    flexDirection: 'column',
    flex: 0.8,
   
    justifyContent: 'space-around',
    height: 100,
    borderColor: '#d7d7d7',
    borderBottomWidth: 1,
    alignItems: 'center',
    flex: 1,
    
  },
  productText: {
    color: 'black',
    fontSize: 28,
    fontWeight: '400',
  },
  buttonChange:{
    borderTopWidth: 0.5,
    borderColor: '#d7d7d7',
    flexDirection: 'row',
    backgroundColor: '#2EFEF7',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 100,
    height:60,
    paddingHorizontal: 10,
  }
});
