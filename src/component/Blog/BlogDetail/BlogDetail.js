import React from 'react';
import { Content, Text, Left, Button, Body, Title, Right, Container, Header } from 'native-base';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {COLOR} from './../../../theme/color';
import Icon from 'react-native-vector-icons/FontAwesome';

function BlogDetail(props) {
  const navigation = useSelector((state) => state.screen.navigation);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <Header style={{backgroundColor: COLOR.primary}}>
        <Left>
          <Button transparent onPress={goBack}>
            <Icon name="chevron-left" />
          </Button>
        </Left>
        <Body>
          <Title>Anh</Title>
        </Body>
        <Right>
          
        </Right>
      </Header>
        <Content>
            <Text>
                xin hcaof
            </Text>
        </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    height: 200,
    borderRadius: 10,
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

export default BlogDetail;
