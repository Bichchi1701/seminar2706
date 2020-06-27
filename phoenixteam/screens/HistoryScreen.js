import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';
import HistoryItem from '../components/HistoryItem';
import firebase from "firebase";

export default class HistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      isLoading: false,

    };
  };
  onClickHistory = item => {
    if (item.type === 'setting')
      this.props.navigation.navigate('Setting');
  };
  callFirebase = async () => {

    var _history = [];
    var db = firebase.database();
    await firebase
      .database()
      .ref('/shopOwners/')
      .once('value', function (snapshot) {
        if (snapshot.val()[0].history !== undefined) {
          _history = snapshot.val()[0].history;
        }

        console.log('History gâu gâu', _history);
      })
    this.setState({
      history: _history,
      isLoading: false,
    })
  }

  componentDidMount = async () => {
    this.setState({
      isLoading: true,
    });
    this.callFirebase();
  };

  onRefresh = () => {
    this.setState({
      history: [],
      isLoading: true,
    })
    this.callFirebase();
  }
  render() {
    const { history, isLoading } = this.state;
    console.log('History gâu gâu', history);
    return (
      <View style={styles.container}>
        <FlatList
          data={history.reverse()}
          renderItem={({ item }) => {
            return (
              <HistoryItem data={item}
                onClick={() => this.onClickHistory(item)}
              />
            )
          }}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={this.onRefresh}
          refreshing={isLoading}
        />

      </View>
    )

  };

}

HistoryScreen.navigationOptions = {
  title: 'Lịch sử',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

});
