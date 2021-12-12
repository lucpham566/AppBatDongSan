import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {RefreshControl, ScrollView, StyleSheet} from 'react-native';
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
  Icon,
  Text,
  H3,
} from 'native-base';
import Banner from '../../../component/Banner/Banner';
import PostList from '../../../component/Post/PostList';
import {connect} from 'react-redux';
import * as actions from '../../../actions/screen';
import HeaderMain from '../../../component/HeaderMain/HeaderMain';
import {COLOR} from '../../../theme';
import Toast from 'react-native-toast-message';
import FormPost from '../../../container/FormPost/FormPost';
import * as actionPost from '../../../actions/post';
import {fetchToken, getToken} from './../../../helpers/auth';
import FormSearchPost from './FormSearchPost/FormSearchPost';
import SearchBar from './FormSearchPost/FormSearchPost';
import axiosService from '../../../commons/axiosService';
import {urlServer} from '../../../commons/server';
import ProductList from '../../../component/ProductList/ProductList';
import ProductListCol from '../../../component/ProductListCol/ProductListCol';

const HomeScreen = props => {
  const [posts, setPosts] = useState({});
  const dispatch = useDispatch();

  const fetchAllPost = () => {
    axiosService
      .get(`${urlServer + 'api/post'}`)
      .then(function (response) {
        setPosts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    dispatch(actions.addNavigation(props.navigation));
    fetchAllPost();
  }, []);

  const goToDetail = () => {
    props.navigation.navigate('ProductDetail');
  };

  const onRefresh = () => {
    fetchAllPost();
  };

  return (
    <Container>
      <HeaderMain formSearch={<FormSearchPost />} title="Trang chủ" />
      <Content
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }>
        <Banner />
        <Content style={{marginBottom: 50}}>
          <FormPost onRefresh={onRefresh} />
          {/* <SearchBar setPostList={data => setPosts(data)} /> */}
          <ProductListCol postData={posts} />
          <ProductList title="Bài viết nổi bật" posts={posts.data} />
          {/* <PostList postData={posts} goToDetail={goToDetail} /> */}
          {/* <Button
            rounded
            danger
            block
            style={styles.button}
            onPress={() => {
              Toast.show({
                text1: 'Đăng bài viết thành công',
              });
            }}>
            <Text style={[styles.textButton, {color: COLOR.white}]}>
              Đăng nhập để xem thêm bài viết
            </Text>
          </Button> */}
        </Content>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    color: 'white',
    margin: 10,
  },
  textButton: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
