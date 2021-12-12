import {
  Body,
  Button,
  Container,
  Content,
  Form,
  Header,
  Icon,
  Input,
  Item,
  Label,
  Left,
  Right,
  Thumbnail,
} from 'native-base';
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLOR} from '../../theme';
import FormRegister from './../../container/FormRegister/FormRegister';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  gotoLogin = () => {
    this.props.navigation.push("Login");
  };

  render() {
    return (
      <Container
        style={{
          backgroundColor: '#ffffff',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            padding: 20,
            color: COLOR.primary,
          }}>
          Đăng ký
        </Text>
        <FormRegister gotoLogin={this.gotoLogin}/>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    color: 'white',
    paddingVertical: 30,
    margin: 10,
  },
  textButton: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignUp;
