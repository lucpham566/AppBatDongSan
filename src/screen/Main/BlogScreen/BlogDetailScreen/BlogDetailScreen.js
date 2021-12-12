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
import {COLOR} from './../../../../theme/color';
import axiosService from '../../../../commons/axiosService';
import {urlServer} from '../../../../commons/server';

function BlogDetailScreen(props) {
  const [data, setData] = useState({});
  const {id} = props.route.params;

  const fetchData = () => {
    axiosService
      .get(`${urlServer + 'api/article_cate_detail/' + id}`)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const elmListLink = data?.options
    ? data.options.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => goToCate(id, item.id)}
            style={{backgroundColor: COLOR.grey, margin: 5, padding: 10}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.name}</Text>
            <Text style={{fontSize: 14, color: COLOR.greyDark, marginTop: 3}}>
              {item.description}
            </Text>
          </TouchableOpacity>
        );
      })
    : null;

  useEffect(() => {
    fetchData();
  }, [id]);

  const goBack = () => {
    props.navigation.goBack();
  };

  const goToCate = (cate_id, option_id) => {
    props.navigation.push('BlogCate', {cate_id, option_id});
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
          <Title>
            Blog{' '}
            <Icon size={16} color={COLOR.white} name="angle-double-right" />{' '}
            {data?.article_cate?.name}
          </Title>
        </Body>
        <Right></Right>
      </Header>
      <Content>
        <ImageBackground
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          source={{
            uri: urlServer + data?.article_cate?.avatar,
          }}
          style={styles.imageBackground}>
          <Text style={styles.title}>{data?.article_cate?.name}</Text>
        </ImageBackground>

        {elmListLink}
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

export default BlogDetailScreen;
