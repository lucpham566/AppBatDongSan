import React, {useEffect, useState} from 'react';
import {
  Text,
  Container,
  Content,
  Header,
  Left,
  Button,
  Body,
  Right,
  Title,
  Card,
  CardItem,
  Thumbnail,
  Footer,
  Spinner,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, Image, View, ScrollView} from 'react-native';
import {COLOR} from '../../../../theme';
import {urlServer} from '../../../../commons/server';
import axiosService from '../../../../commons/axiosService';
import {useSelector} from 'react-redux';
import PostList from '../../../../component/Post/PostList';
import ProductListCol from '../../../../component/ProductListCol/ProductListCol';

function PostScreen(props) {
  const account = useSelector(state => state.account);
  const [postList, setPostList] = useState([]);
  const fetchData = () => {
    axiosService
      .get(`${urlServer + 'api/user/' + account.id + '/post'}`)
      .then(function (response) {
        if (response.data) {
          setPostList(response.data);
          console.log(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Header style={{backgroundColor: COLOR.primary}}>
        <Left>
          <Button transparent onPress={() => props.navigation.goBack()}>
            <Icon size={20} color={COLOR.white} name="chevron-left" />
          </Button>
        </Left>
        <Body>
          <Title>Bài viết đã đăng</Title>
        </Body>
        <Right></Right>
      </Header>

      <Content style={styles.contentBody}>
        <ProductListCol postData={postList} />
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  contentBody: {
    padding: 5,
  },
  boxInfoItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  titleInfo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default PostScreen;
