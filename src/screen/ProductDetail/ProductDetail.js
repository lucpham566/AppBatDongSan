import React, {Component, useEffect, useState} from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Text,
  H3,
  H2,
  View,
  Thumbnail,
} from 'native-base';
import {connect} from 'react-redux';
import CarouselProductImage from './CarouselProductImage/CarouselProductImage';
import {Linking, ScrollView, StyleSheet} from 'react-native';
import ProductList from '../../component/ProductList/ProductList';
import {COLOR} from '../../theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import CommentBox from './CommentBox/CommentBox';
import axiosService from '../../commons/axiosService';
import {urlServer} from '../../commons/server';
import moment from 'moment';
import TagList from './Tag/TagList';
import {getUserCate, noneAvatar} from '../../helpers/helper';
import {formatToCurrency} from '../../helpers/formatMoney';
import {getDistrict, getProvince} from '../../helpers/getLocal';
import Toast from 'react-native-toast-message';
import CommentPreview from './CommentBox/CommentPreview';

const ProductDetail = props => {
  const {id} = props.route.params;
  const [post, setPost] = useState({});
  const [userPost, setUserPost] = useState([]);
  const [comments, setComments] = useState([]);
  const {
    images,
    tags,
    avatar,
    user,
    province_id,
    district_id,
    content,
    created_at,
    phone,
    liked,
  } = post;
  const [isLike, setIsLike] = useState(liked);
  const province = getProvince(province_id);
  const district = getDistrict(district_id, province);
  const fetchData = () => {
    axiosService
      .get(`${urlServer + 'api/post/' + id}`)
      .then(function (response) {
        console.log(response);
        if (response.data && response.data.post) {
          setPost(response.data.post);
          setUserPost(response.data.user_post);
          setComments(response.data.comments);
        }
        // setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onClickLike = () => {
    setIsLike(!isLike);

    axiosService
      .post(`${urlServer + 'api/like/' + id}`)
      .then(function (response) {
        console.log(response);
        if (response.data && response.data.success) {
          Toast.show({
            type: 'success',
            text1: response.data.success,
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'có lỗi xảy ra',
          });
        }
        // setLikeCount(response.data.like_count);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const callPhone = () => {
    if (user && user.phone) {
      Linking.openURL(`tel:${user.phone}`);
    } else {
      Toast.show({
        type: 'error',
        text1: 'có lỗi xảy ra',
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Header style={{backgroundColor: COLOR.primary}}>
        <Left>
          <Button transparent onPress={() => props.navigation.goBack()}>
            {/* <Icon name="chevron-back" /> */}
            <Icon size={16} name="chevron-left" style={{color: COLOR.white}} />
          </Button>
        </Left>
        <Body>
          <Title>Chi tiết bài viết</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon size={16} name="heart" style={{color: COLOR.white}} />
          </Button>
        </Right>
      </Header>
      <Content>
        <ScrollView>
          <CarouselProductImage avatar={avatar} images={images} />
          <View style={styles.detailBox}>
            <H2 style={styles.productName}>{post.title}</H2>
            <Text style={styles.productPrice}>
              {formatToCurrency(post.price)}
            </Text>
            <Text numberOfLines={2} style={styles.map}>
              <Icon
                size={20}
                name="map-marker"
                style={{color: COLOR.primary}}
              />{' '}
              <Text style={{fontWeight: 'bold'}}>Tỉnh/Thành phố</Text> :{' '}
              {province?.name}
            </Text>
            <Text numberOfLines={2} style={styles.map}>
              <Icon
                size={20}
                name="map-marker"
                style={{color: COLOR.primary}}
              />{' '}
              <Text style={{fontWeight: 'bold'}}>Quận/Huyện</Text> :{' '}
              {district?.name}
            </Text>
            <Text numberOfLines={2} style={styles.map}>
              <Icon
                size={20}
                name="map-marker"
                style={{color: COLOR.primary}}
              />{' '}
              <Text style={{fontWeight: 'bold'}}>Địa chỉ</Text> : {post.address}
            </Text>
            <Text numberOfLines={2} style={styles.square}>
              <Icon size={20} name="phone" style={{color: COLOR.primary}} />{' '}
              <Text style={{fontWeight: 'bold'}}>Điện thoại</Text> : {post.phone}
            </Text>
            <Text numberOfLines={2} style={styles.square}>
              <Icon size={20} name="clock-o" style={{color: COLOR.primary}} />{' '}
              <Text style={{fontWeight: 'bold'}}>Thời gian</Text> :{' '}
              {moment(post.created_at).fromNow()}
            </Text>
            <Text numberOfLines={2} style={styles.square}>
              <Icon size={20} name="square-o" style={{color: COLOR.primary}} />{' '}
              <Text style={{fontWeight: 'bold'}}>Diện tích</Text> : {post.area}{' '}
              m²
            </Text>
            <TagList tagList={tags} />
            <View
              style={{
                borderTopWidth: 0.2,
                paddingTop: 5,
                marginTop: 3,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              bordered>
              <Thumbnail
                circular
                style={{width: 50, height: 50}}
                source={{
                  uri: user?.avatar ? urlServer + user.avatar : noneAvatar,
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
                    fontSize: 16,
                    marginBottom: 0,
                  }}>
                  {user?.name}
                </Text>
                <Text
                  style={{
                    color: COLOR.greyDark,
                    fontSize: 14,
                  }}>
                  {getUserCate(user?.cate_id)}
                </Text>
              </Content>
            </View>
            <View style={styles.contentContainer}>
              <H3>Chi tiết sản phẩm</H3>

              <Text>{post.content}</Text>
            </View>
            <H3>Bình luận</H3>
            <View bordered style={{justifyContent: 'space-between'}}>
              <CommentPreview
                setComments={setComments}
                comments={comments}
                post_id={post.id}
              />
            </View>
            <CommentBox post_id={id} />
          </View>
          <ProductList title="Bài viết khác" posts={userPost} />
        </ScrollView>
      </Content>
      <Footer style={{backgroundColor: COLOR.grey, paddingVertical: 5}}>
        <Button
          transparent
          onPress={() => props.navigation.navigate('MainScreen')}>
          <Icon name="home" size={30} color={COLOR.primary} />
        </Button>
        <Button
          style={{
            marginHorizontal: 5,
            backgroundColor: isLike ? COLOR.primary : COLOR.greyDark,
          }}
          onPress={() => onClickLike()}>
          <Text style={{textAlign: 'center'}}>
            <Icon name="heart" size={16} color={COLOR.white} />{' '}
            {isLike ? 'Đã thích' : 'Yêu thích'}
          </Text>
        </Button>
        <Button
          style={{marginHorizontal: 5, backgroundColor: COLOR.secondary}}
          onPress={() => callPhone()}>
          <Text>
            <Icon name="phone" size={16} color={COLOR.white} /> Liên hệ ngay
          </Text>
        </Button>
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  detailBox: {
    padding: 10,
  },
  productName: {
    fontWeight: 'bold',
  },
  productPrice: {
    fontWeight: 'bold',
    paddingVertical: 2,
    color: '#ff4757',
  },
  contentContainer: {
    paddingVertical: 10,
  },
});

export default ProductDetail;
