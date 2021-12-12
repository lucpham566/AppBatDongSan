import {
  Body,
  Button,
  Container,
  Content,
  Footer,
  Header,
  Left,
  Right,
  Text,
  Title,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axiosService from '../../commons/axiosService';
import {urlServer} from '../../commons/server';
import {COLOR} from '../../theme/color';
import Post from '../../component/Post/Post';

const PostDetail = props => {
  const {id} = props.route.params;
  const [post, setPost] = useState({});
  useEffect(() => {
    axiosService
      .get(`${urlServer + 'api/post/' + id}`)
      .then(function (response) {
        if (response && response.data) {
          console.log(response.data.post);
          setPost(response.data.post);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  return (
    <Container>
      <Header style={{backgroundColor: COLOR.primary}}>
        <Left>
          <Button transparent onPress={() => props.navigation.goBack()}>
            <Icon size={20} color={COLOR.white} name="chevron-left" />
          </Button>
        </Left>
        <Body>
          <Title>Chi tiết bài viết</Title>
        </Body>
        <Right></Right>
      </Header>

      <Content style={styles.contentBody}>
        {post.id ? <Post post={post} /> : null}
      </Content>

      <Footer style={{backgroundColor: COLOR.primary, padding: 5}}>
        <Button onPress={() => props.navigation.goBack()} style={{backgroundColor: 'transparent', elevation: 0}}>
          <Text>Quay lại</Text>
        </Button>
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default PostDetail;
