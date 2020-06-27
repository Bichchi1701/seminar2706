import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import { Input, Button } from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome';

export default class DiscountItemScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
    }
     
    render() {
      const [text, setText] = useState('');

       
        return (
            <View style={{padding: 10}}>
      <TextInput
        style={{height: 40}}
        placeholder="Type here to translate!"
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
     
    </View>
        );
    }
}
DiscountItemScreen.navigationOptions = {
  title: 'Gỉam giá',
};