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

import ProductItem from '../components/ProductItem';
import ProductVariants from '../components/ProductVariants';

import { Api } from '../constants/const';
export default class ItemDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  callApi = async () => {
    const API_URL = `${Api}Product/${this.props.navigation.state.params.data.productId}`;
    const response = await fetch(API_URL);
    const product = await response.json();
    return product.data;
  };
 
   UNSAFE_componentWillMount = async () => {
    let data = await this.callApi();
    this.setState({
      data,
      isLoading: false,
    });
  } 
  onRefresh = () => {
    this.setState({
      
      isLoading: true,
    });
    this.callApi();
  };
  onViewDetail = item => {
    this.props.navigation.navigate('DiscountItem', { data: this.state.item});
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
            Đang tải lên sản phẩm của bạn...
          </Text>
        </View>
      );
    }
    return (
      <ScrollView>
        <FlatList
          data={this.state.data.images}
          horizontal={true}
          renderItem={({ item }) => {
            return <Image style={styles.img} source={{ uri: item }} />;
          }}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={this.onRefresh}
          refreshing={false}
        />
        <View style={styles.content}>
          <View style={styles.productContentsWrapper}>
            <Text style={styles.productContentTitle}>Mã sản phẩm:</Text>
            <Text style={styles.productContentText}>
              {' '}
              {this.state.data.productId}{' '}
            </Text>
          </View>
          <View style={styles.productContentsWrapper}>
            <Text style={styles.productContentTitle}>Tên sản phẩm:</Text>
            <Text style={styles.productContentText}>
              {' '}
              {this.state.data.name}{' '}
            </Text>
          </View>
          <View style={styles.productContentsWrapper}>
            <Text style={styles.productContentTitle}>Gía: </Text>
            <Text style={styles.productContentText}>
              {this.state.data.price}{' '}VNĐ
            </Text>
          </View>
          <View style={styles.buttonChange}>
           <Button
        title="Thêm giảm giá"
        
        onPress={() => this.props.navigation.navigate('VariantDetail', {data: this.state.data})}
   
      />
      </View>
          
        </View>
        
        <FlatList
          data={this.state.data.saleOffs}
          renderItem={({ item }) => {
            return <ProductVariants saleOffs={item} onClick={() => this.onViewDetail(item)} />
          }}
          keyExtractor={(item, index) => index.toString()} />
      </ScrollView>
    );
  }
}

ItemDetailScreen.navigationOptions = {
  title: 'Chi tiết sản phẩm',
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
  
});
