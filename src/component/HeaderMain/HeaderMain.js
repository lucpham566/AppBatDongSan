import React, {Component} from 'react';
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
  Thumbnail,
} from 'native-base';
import {COLOR} from '../../theme';
import {useSelector} from 'react-redux';
const HeaderMain = props => {
  const {navigation} = useSelector(state => state.screen);
  const {title, formSearch} = props;
  return (
    <Header style={{backgroundColor: COLOR.primary}}>
      <Left>
        <Button transparent>
          <Thumbnail
            style={{width: 40, height: 40}}
            square
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVuNFGkHht3XT1FlBTbbO2lFj8BzOhOp6ETw&usqp=CAU',
            }}
          />
        </Button>
      </Left>
      <Body>
        <Title>{title}</Title>
      </Body>
      <Right>
        <Button onPress={() => navigation.push('UserPostFollow')} transparent>
          <Icon name="heart" />
        </Button>
      </Right>
    </Header>
  );
};

export default HeaderMain;
