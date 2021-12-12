import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableHighlight,
  Alert,
  TouchableNativeFeedback,
} from 'react-native';
import {connect, useSelector} from 'react-redux';
import Review from './Review/Review';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLOR} from '../../../theme';
import {urlServer} from '../../../commons/server';

const ProductItem = props => {
  const navigation = useSelector(state => state.screen.navigation);
  const goToDetail = id => {
    navigation.push('ProductDetail', {id});
  };

  const {post} = props;
  
  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        onPress={() => {
          goToDetail(post.id);
        }}>
        <View style={styles.productItem}>
          <Image
            source={{
              uri: urlServer + post?.avatar,
            }}
            style={styles.avatarProduct}
          />
          <Text numberOfLines={2} style={styles.nameProduct}>
            {post.title}
          </Text>
          <Text numberOfLines={2} style={styles.map}>
            <Icon size={14} name="map-marker" style={{color: COLOR.primary}} />{' '}
            {post.address}
          </Text>

          <Text style={styles.priceProduct}>{post.price} VNĐ </Text>
          <Text numberOfLines={2} style={styles.square}>
            <Icon size={14} name="square-o" style={{color: COLOR.primary}} />{' '}
            Diện tích : {post.area}
          </Text>
          <Review />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
    padding: 5,
    flexGrow:1
  },
  productItem: {
    padding: 5,
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
    fontSize: 14,
    color: COLOR.black,
    marginVertical: 3,
  },
  review: {
    fontSize: 13,
    color: '#747d8c',
    marginVertical: 5,
  },
  priceProduct: {
    fontSize: 14,
    color: '#ff4757',
    fontWeight: 'bold',
  },
});

export default ProductItem;
