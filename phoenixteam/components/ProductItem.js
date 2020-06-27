import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';
export default class ProductItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log(this.props.data);
    const {
      data,
      onClick,
    } = this.props;
    var _updated_at = moment(data.createdDate).format("DD/MM/YYYY HH:mm:ss");
    return (
      <TouchableOpacity style={styles.product} onPress={onClick} >
        <Image style={styles.productImgWrapper}
          source={{ uri: data.images }}
        />

        <View style={styles.productContentsWrapper}>
          <View style={styles.productContentWrapper}>
            <Text style={styles.productContentTitle}>Mã:</Text>
            <Text style={styles.productText}> {data.productId} </Text>
          </View>
          <View style={styles.productContentWrapper}>
            <Text style={styles.productContentTitle}>Tên:</Text>
            <Text style={styles.productText}> {data.name} </Text>
          </View>
          <View style={styles.productContentWrapper}>
            <Text style={styles.productContentTitle}>Gia:</Text>
            <Text style={styles.productText}> {data.price}</Text>
          </View>
          <View style={styles.productContentWrapper}>
            <Text style={styles.productContentTitle}>Ngày cập nhật:</Text>
            <Text style={styles.productText}> {_updated_at}</Text>
          </View>

        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({

  product: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 100,
    borderColor: '#d7d7d7',
    borderBottomWidth: 1,
    alignItems: 'center',
    flex: 1,
  },
  productImgWrapper: {

    height: 80,
    width: 80,
    borderRadius: 40,
  },

  productContentsWrapper: {
    flexDirection: 'column',
    flex: 0.8
  },
  productContentWrapper: {
    flexDirection: 'row',

    justifyContent: 'flex-start'
  },

  productContentTitle: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold'
  },
  productContentText: {
    color: 'black',
    fontSize: 18,
  },
});

