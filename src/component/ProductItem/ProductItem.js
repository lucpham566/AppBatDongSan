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
  ImageBackground,
} from 'react-native';
import {Content, Thumbnail} from 'native-base';

import {connect, useSelector} from 'react-redux';
import {COLOR} from '../../theme';
import Review from './Review/Review';
import Icon from 'react-native-vector-icons/FontAwesome';
import CommentBox from './CommentBox/CommentBox';
import {urlServer} from '../../commons/server';
import {getProvince} from '../../helpers/getLocal';
import {formatToCurrency} from '../../helpers/formatMoney';
import moment from 'moment';
import {getUserCate, noneAvatar} from '../../helpers/helper';

const ProductItem = props => {
  const navigation = useSelector(state => state.screen.navigation);
  const goToDetail = id => {
    navigation.push('ProductDetail', {id});
  };

  const {post} = props;
  const {
    user,
    province_id,
    district_id,
    content,
    created_at,
    images,
    id,
    tags,
    like_count,
    liked,
  } = post;
  const province = getProvince(province_id);
  return (
    <TouchableNativeFeedback
      onPress={() => {
        goToDetail(post.id);
      }}>
      <View style={styles.productItem}>
        <ImageBackground
          source={{
            uri: urlServer + post?.avatar,
          }}
          style={styles.avatarProduct}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.time}>{province.name}</Text>
            <Text style={styles.time}>{moment(created_at).fromNow()}</Text>
          </View>
        </ImageBackground>
        <Text numberOfLines={2} style={styles.nameProduct}>
          {post.title}
        </Text>
        <Text numberOfLines={2} style={styles.map}>
          <Icon size={14} name="map-marker" style={{color: COLOR.primary}} />{' '}
          {post.address}
        </Text>

        <Text style={styles.priceProduct}>{formatToCurrency(post.price)}</Text>
        <Text numberOfLines={2} style={styles.square}>
          <Icon size={14} name="square-o" style={{color: COLOR.primary}} /> Diện
          tích : {post.area} m²
        </Text>
        {/* <Review /> */}
        <View
          style={{
            borderTopWidth: 0.2,
            paddingTop: 2,
            marginTop: 2,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          bordered>
          <Thumbnail
            circular
            style={{width: 30, height: 30}}
            source={{
              uri: user.avatar ? urlServer + user.avatar : noneAvatar,
            }}
          />
          <Content
            style={{
              paddingLeft: 5,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: COLOR.primary,
                fontSize: 12,
                marginBottom: 0,
              }}>
              {user.name}
            </Text>
            <Text
              style={{
                color: COLOR.greyDark,
                fontSize: 12,
              }}>
              {getUserCate(user.cate_id)}
            </Text>
          </Content>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  productItem: {
    width: 190,
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
    height: 160,
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
  time: {
    color: COLOR.white,
    padding: 5,
    textAlign: 'right',
    backgroundColor: 'rgba(0, 0, 0,0.2)',
  },
});


export default ProductItem;
