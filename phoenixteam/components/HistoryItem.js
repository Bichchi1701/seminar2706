import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import moment from 'moment';
export default class HistoryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    render() {

        const {
            data: {
                content,
                time,
                id,
                type
            },
            onClick } = this.props;
        let imgScr = ''
        const imgBackgroundColor =  type === 'setting' ? styles.imgSettingWrapper : styles.imgProductWrapper;
        if (type === 'setting') {
            imgScr = 'https://cdn4.iconfinder.com/data/icons/forgen-phone-settings/48/setting-512.png';
        }
        else {
            imgScr = 'https://cdn0.iconfinder.com/data/icons/business-mix/512/cargo-512.png';
        }

        return (

            <TouchableOpacity style={styles.history} onPress={onClick} >
                <View style={imgBackgroundColor}>
                    <Image style={styles.img} source={{ uri: imgScr}} />
                </View>
                <View style={styles.contentWrapper}>
                    <Text style={styles.contentTitle}>{content}</Text>
                    <Text style={styles.contentLastUpdate}> {time}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({

    history: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 100,
        alignItems: 'center',
        paddingHorizontal: 5,
        flex: 1,
        borderBottomColor:'#d7d7d7',
        borderBottomWidth:0.5
    },

    imgSettingWrapper: {
        backgroundColor: '#4da6ff',
        height: 70,
        width: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },

    imgProductWrapper: {
        backgroundColor: '#fcdf03',
        height: 70,
        width: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        height: 50,
        width: 50,
    },

    contentWrapper: {
        flexDirection: 'column',
        flex: 0.8,
        paddingLeft: 10,
    },
    contentTitle: {
        color: '#1a1a1a',
        fontSize: 18,
        fontWeight: '900',
    },
    contentLastUpdate: {
        marginTop: 10,
        color: '#8c8c8c',
        fontSize: 14,
        fontWeight: '200'
    },
});