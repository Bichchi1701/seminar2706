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
        const { saleOffs: {
            originalPrice,percentDiscount,status, dateStart, dateEnd, 
        },
           
            onClick,
        } = this.props;
        
        // var _scr = img[0].src;
        // if(variantImg!==undefined)
        // {
        //     _scr = variantImg.src;
        // }
        // const imgStyle = discount === 0 ? styles.productImgWrapper : styles.productImgActiveWrapper;
        return (
            <TouchableOpacity style={styles.product} onPress={onClick} >
                {/* <Image style={imgStyle}
                    source={{ uri: _scr }}
                /> */}
                <View style={styles.title}> 
                    <Text style={styles.title}>Lịch sử</Text>
                    </View>
                <View style={ styles.productContentsWrapper}>
                    {/* <View style={styles.title}> 
                    <Text style={styles.title}>Lịch sử thay đổi giá </Text>
                    </View> */}
                    <View style={styles.productContentWrapper}>
                        <Text style={styles.productContentTitle}>Giá gốc:</Text>
                        <Text style={styles.productText}> {originalPrice} VNĐ</Text>
                    </View>
                    <View style={styles.productContentWrapper}>
                        <Text style={styles.productContentTitle}>Mức chiết khấu:</Text>
                        <Text style={styles.productText}> {percentDiscount}  </Text>
                    </View>
                   
                    <View style={styles.productContentWrapper}>
                        <Text style={styles.productContentTitle}>Trạng thái: </Text>
                        <Text style={styles.productText}> {status} </Text>
                    </View>
                    <View style={styles.productContentWrapper}>
                        <Text style={styles.productContentTitle}>Ngày bắt đầu: </Text>
                        <Text style={styles.productText}>{dateStart}</Text>
                    </View>
                    <View style={styles.productContentWrapper}>
                        <Text style={styles.productContentTitle}>Ngày kết thúc:</Text>
                        <Text style={styles.productText}>{dateEnd} </Text>
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
    title: {
        color: '#FFBF00',
        fontSize: 14,
        fontWeight: 'bold',
       

    }
});

