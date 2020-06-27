import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  YellowBox
} from 'react-native';
import { SearchBar, ButtonGroup } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import ProductItem from '../components/ProductItem';
import BranchItem from '../components/BranchItem';



export default class BranchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      isLoading: false,
     
      listBranch: [],
    
    };
    
  }
 
//  onViewDetail = id => {
//     const { listProducts } = this.state;
//     const productItem = listProducts.find(item => item.id === id);
//     this.props.navigation.navigate('ItemDetail', { data: productItem });
//   };
  
  callApi = async () => {
   
    const API_URL = 'https://localhost:44348/api/v1/Branch';
    //const API_URL = 'https://getmessagetestingwebsite.000webhostapp.com/rule.php';
    const response = await fetch(API_URL);
    const _listBranch = await response.json();
    
    this.setState({
      isLoading: false,
      listBranch: _listBranch.data,
     
    });

  }
  onRefresh = () => {
    this.setState({
      listBranch: [],
      isLoading: true,
    })
    this.callApi();
  }
  componentDidMount = () => {
    this.setState({
      isLoading: true,
    });
    this.callApi();

  };
 
  render() {

    const {  listBranch, isLoading } = this.state;
  

    if (isLoading || listBranch === null) {
      return (
        <View style={styles.containerLoading}>
          <ActivityIndicator
            size="large"
            color="black"
            animating={isLoading} />
          <Text style={styles.waitingText}>Đang tải lên chi nhánh của bạn...</Text>
        </View>
      )
    }
    
   

    return (
      <View style={styles.container}>
      
        <FlatList data={this.state.listBranch}
          renderItem={({ item }) => {
            return <BranchItem data={item}  />
          }}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={this.onRefresh}
          refreshing={false}
        />

      </View>

    )
  }
};

BranchScreen.navigationOptions = {
  title: 'Thống kê doanh thu',
};


const styles = StyleSheet.create({

  announceTextWrapper: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 30

  },

  announceText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 10,
    color: '#e62e00',

  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column'
  },
  containerLoading: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    flexDirection: 'column',

    paddingTop: 200,
  },
  waitingText: {
    color: 'black',
    justifyContent: 'center',
    fontSize: 20,
    alignItems: 'center',
    alignSelf: 'center'
  },
  filterButtonWrapper: {
    height: 30,
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    justifyContent: 'center'
  },

  buttonAll: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightColor: 'black',
    borderWidth: 0.5
  },
  buttonNotBestSelling: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },

  filterButtonText: {
    fontSize: 14,
    color: 'black',
    justifyContent: 'center'
  },
  headTitle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#d9d9d9',

  },

  headTitleText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500'
  },

  paging: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 10,

  },
  pagingButton: {
    height: 30,
    width: 40,
    borderRadius: 13,
    backgroundColor: '#66c2ff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pagingButtonText: {
    color: 'black',
    fontSize: 22,
    fontWeight: '200',
  },
});
