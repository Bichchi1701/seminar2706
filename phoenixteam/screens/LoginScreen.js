import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import { Input, Button } from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome';
import StatisticScreen from './StatisticScreen';
export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: 'phoenix05.myharavan.com',
            pass: 'cadeptrai'
        };
    }

    render() {
        const { userName, pass } = this.state;
        return (
            <View style={styles.container}>
                <Image style={styles.logoImg} source={{ uri: 'https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.0-9/72671613_2396730353980810_3631086435756408832_n.jpg?_nc_cat=110&_nc_oc=AQlvRm53Y27HXpjOFtq5MeMuD8fSM-NCY2-cBFml96u9rx-I3J4ZvPQ5NE0Q6inrwwE&_nc_ht=scontent.fsgn5-3.fna&oh=0dcd7bb30506467de4595e407930dc75&oe=5E34258E' }} />
                <View style={styles.loginStuffWrapper}>
                    <Text style={styles.loginText}>Tài khoản</Text>
                    <TextInput style={styles.loginInput} value={userName} />
                </View>
                <View style={styles.loginStuffWrapper}>

                    <Text style={styles.loginText}>Mật khẩu</Text>
                    <TextInput style={styles.loginInput} secureTextEntry={true} value={pass} />
                </View>

                <Button
                    buttonStyle={styles.buttonLogin}
                    title=" Đăng nhập"
                    onPress={() => this.props.navigation.navigate('Main')}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191A1C',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    logoImg: {
        height: 200,
        width: 200,
        marginBottom: 20,
    },
    buttonLogin: {
        marginTop: 20,
        backgroundColor: '#5bbd2b',
        borderRadius: 15
    },
    loginInput: {
        height: 40,
        width: 280,
        backgroundColor: "white",
        paddingHorizontal: 20,
        marginVertical: 10,
        color: '#333333',
        borderRadius: 10,
    },
    loginText:
    {
        color: '#27408b',
        fontSize: 16,
        fontWeight:'bold'
    },
    loginStuffWrapper: {
        flexDirection:'column'

    }
});
