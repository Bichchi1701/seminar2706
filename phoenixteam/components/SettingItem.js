import React, { Component } from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { SearchBar, ButtonGroup, Input, Button } from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';
export default class SettingItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const {

            data: {
                id,
                date,
                discount,
                duration,
            },
            onChangeDate,
            onClickDeleteOption
        } = this.props;
        const _date = date.toString();
        const _discount = discount.toString();
        const _duration = duration.toString();
        return (

            <View style={styles.setting}>
                <View style={styles.settingRulesSoldTitleWrapper}>
                    <Input containerStyle={styles.inputUnsoldDate} keyboardType='numeric' value={_date} onChangeText={this.props.onChangeDate} />
                </View>
                <View style={styles.settingRulesDiscountTitleWrapper}>
                    <Input containerStyle={styles.inputQty} keyboardType='numeric' value={_discount} onChangeText={this.props.onChangeDiscount} />
                </View>
                <View style={styles.settingRulesDateTitleWrapper}>
                    <Input containerStyle={styles.inputQty} keyboardType='numeric' value={_duration} onChangeText={this.props.onChangeDuration} />
                </View>
                <View style={styles.settingRulesButtonWrapper}>

                    <Button

                        icon={
                            <Icon
                                name="minus-circle"
                                size={15}
                                color="white"
                            />
                        }
                        onPress={this.props.onClickDeleteOption}
                        raised
                        buttonStyle={styles.button}
                    />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    button: {
        borderRadius:15,
        height:30,
        width:30,
        // backgroundColor:'#cc3300'
        
    },
    setting: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: 50,
        borderColor: '#d7d7d7',
        borderBottomWidth: 0.5,
        flex: 1,
    },
    settingRulesSoldTitleWrapper: {
        flexDirection: 'row',
        flex: 0.25,
        alignContent: 'center',
        justifyContent: 'center'
    },

    inputUnsoldDate: {
        width: 70,
        height: 10,
    },
    inputQty: {
        width: 60,
        height: 10,
    },
    settingRulesDiscountTitleWrapper: {
        flex: 0.25,
        alignItems: 'center'
    },

    settingRulesDateTitleWrapper: {

        flex: 0.25,
        alignItems: 'center',

    },

    settingRulesButtonWrapper: {

        flex: 0.25,
        alignItems: 'center',
        justifyContent: 'center'

    },
    settingText: {
        marginTop: 20,
        color: 'black',
        fontSize: 15,
        fontWeight: '400'
    },
});

