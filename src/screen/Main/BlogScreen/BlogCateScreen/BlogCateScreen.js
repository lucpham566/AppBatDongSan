import React, {useEffect, useState} from 'react';
import {
  Content,
  Text,
  Left,
  Button,
  Body,
  Title,
  Right,
  Container,
  Header,
} from 'native-base';
import {StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLOR} from '../../../../theme/color';
import ArticleList from './../../../../component/Article/ArticleList';
import axiosService from '../../../../commons/axiosService';
import {urlServer} from '../../../../commons/server';

function BlogCateScreen(props) {
  const [data, setData] = useState([]);
  const [cate, setCate] = useState({});
  const [option, setOption] = useState({});
  const {cate_id, option_id} = props.route.params;

  const fetchData = () => {
    axiosService
      .get(`${urlServer + 'api/article_option/' + cate_id + '/' + option_id}`)
      .then(function (response) {
        setData(response.data.articles);
        setCate(response.data.article_cate);
        setOption(response.data.option);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const goBack = () => {
    props.navigation.goBack();
  };

  return (
    <Container>
      <Header style={{backgroundColor: COLOR.primary}}>
        <Left>
          <Button transparent onPress={goBack}>
            <Icon size={20} color={COLOR.white} name="chevron-left" />
          </Button>
        </Left>
        <Body>
          <Title>Thông tin chung</Title>
        </Body>
        <Right></Right>
      </Header>
      <Content>
        <ArticleList cate={cate} option={option} articleList={data} />
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    height: 200,
    overflow: 'hidden',
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLOR.white,
    margin: 10,
  },
});

export default BlogCateScreen;
