import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';

export default class ProductVariants extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { data: {
            grams, sku, price, image_id, last_sell, discount
        },
            img,
            onClick,
        } = this.props;
        const variantImg = img.find(item => item.id === image_id);
        var _scr = img[0].src;
        if(variantImg!==undefined)
        {
            _scr = variantImg.src;
        }
        const imgStyle = discount === 0 ? styles.productImgWrapper : styles.productImgActiveWrapper;
        console.log('Hinh ne ', variantImg);
        return (
            <TouchableOpacity style={styles.product} onPress={onClick} >
                <Image style={imgStyle}
                    source={{ uri: _scr }}
                />

                <View style={ styles.productContentsWrapper}>
                    <View style={styles.productContentWrapper}>
                        <Text style={styles.productContentTitle}>SKU:</Text>
                        <Text style={styles.productText}> {sku} </Text>
                    </View>
                    <View style={styles.productContentWrapper}>
                        <Text style={styles.productContentTitle}>Giá:</Text>
                        <Text style={styles.productText}> {price} VNĐ </Text>
                    </View>
                    <View style={styles.productContentWrapper}>
                        <Text style={styles.productContentTitle}>Đã {last_sell} ngày không bán được!</Text>
                        <Text style={styles.productText}> </Text>
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
    productImgActiveWrapper: {
        borderWidth:2,
        borderColor:'red',
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor: 'black'
    },
    productImgWrapper: {
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor: 'black'
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

