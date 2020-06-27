import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class NotificationItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const {
            data: {status},
            onClick,
        } = this.props;
        
    const notiStyle = status === 'Checked' ? styles.checkedNotification : styles.unCheckedNotification;
        return (

            <TouchableOpacity style={notiStyle} onPress={onClick}>
                <View style={styles.imgWrapper}>
                    <Text> Img </Text>
                </View>
                <View style={styles.contentWrapper}>
                    <Text style={styles.contentTitle}> Product "SP001" have been updated! </Text>
                    <Text style={styles.contentLastUpdate}> 2 hour ago </Text>
                </View>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({

    unCheckedNotification: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 100,
        alignItems: 'center',
        paddingHorizontal: 5,
        flex: 1,
        backgroundColor: '#d9d9d9'
    },
    checkedNotification: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 100,
        alignItems: 'center',
        paddingHorizontal: 5,
        flex: 1,
        backgroundColor: '#fff'
    },
    imgWrapper: {
        backgroundColor: '#3385ff',
        height: 70,
        width: 70,
        borderRadius: 35,
        alignItems: 'center',
    },

    contentWrapper: {
        flexDirection: 'column',
        flex: 0.8,
        paddingLeft: 5,
    },
    contentTitle: {
        color: 'black',
        fontSize: 20,
        fontWeight: '900',
    },
    contentLastUpdate: {
        color: '#8c8c8c',
        fontSize: 14,
        fontWeight: '200'
    },
});

