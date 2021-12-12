import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Button,
  TouchableHighlight,
  Alert,
  TouchableNativeFeedback,
  Image,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Thumbnail,
  Icon,
  Spinner,
} from 'native-base';
import {connect} from 'react-redux';
import {COLOR} from '../../theme';
import Notify from './Notify';

class NotifyList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goToDetail = id => {
    this.props.navigation.push('PostDetail', {id});
  };

  addToCart = () => {
    Alert.alert('thành công');
  };

  render() {
    const {notifyList} = this.props;
    const elmNotify = notifyList.length>0?notifyList.map((item, index) => {
      return <Notify notify={item.data.notify} created_at={item.created_at} goToDetail={(id) => this.goToDetail(id)} key={index} />;
    }):<Spinner color="red" />;
    return <Content>{elmNotify}</Content>;
  }
}

const styles = StyleSheet.create({
  productItem: {
    width: 200,
    padding: 5,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    backgroundColor: 'white',
  },
  avatarProduct: {
    width: '100%',
    height: 100,
  },
  nameProduct: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLOR.black,
    marginVertical: 5,
  },
  review: {
    fontSize: 13,
    color: '#747d8c',
    marginVertical: 5,
  },
  priceProduct: {
    fontSize: 15,
    color: '#ff4757',
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => {
  return {
    navigation: state.screen.navigation,
  };
};

// const mapDispatchToProps = (dispatch) => {
//     return {

//     };
// };

export default connect(mapStateToProps, null)(NotifyList);
