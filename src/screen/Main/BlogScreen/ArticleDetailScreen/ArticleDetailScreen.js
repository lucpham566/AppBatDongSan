import React, {useEffect, useState} from 'react';
import {
  Text,
  Content,
  Card,
  Header,
  Container,
  Button,
  Left,
  Body,
  Right,
  Title,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLOR} from './../../../../theme/color';
import {Image} from 'react-native';
import axiosService from '../../../../commons/axiosService';
import {urlServer} from '../../../../commons/server';
import moment from 'moment';

function ArticleDetailScreen(props) {
  const {id} = props.route.params;
  const [data, setData] = useState([]);
  const [cate, setCate] = useState({});
  const [option, setOption] = useState({});

  const fetchData = () => {
    axiosService
      .get(`${urlServer + 'api/article/' + id}`)
      .then(function (response) {
        setData(response.data);
        setCate(response.data.category);
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
          <Title>{data.name}</Title>
        </Body>
        <Right></Right>
      </Header>
      <Content style={{padding: 5}}>
        {/* <Card style={{padding: 10}}>
          <Text
            style={{fontWeight: 'bold', fontSize: 20, color: COLOR.greyDark}}>
            Blog{' '}
            <Icon size={16} color={COLOR.greyDark} name="angle-double-right" />{' '}
            {cate.name}{' '}
            <Icon size={16} color={COLOR.greyDark} name="angle-double-right" />{' '}
            {option.name}
          </Text>
        </Card> */}
        <Card style={{padding: 10}}>
          <Content bordered>
            <Text
              style={{fontWeight: 'bold', fontSize: 20, color: COLOR.greyDark}}>
              {data.intro}
            </Text>
            <Text style={{color: COLOR.greyDark, marginTop: 10}}>
              <Icon size={16} color={COLOR.greyDark} name="clock-o" /> Chủ nhật,
              {moment(data.created_at).format('l')}
            </Text>
            <Text style={{textAlign: 'justify'}}>{data.content}</Text>
          </Content>
        </Card>
      </Content>
    </Container>
  );
}

export default ArticleDetailScreen;
