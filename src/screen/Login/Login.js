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
import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLOR} from '../../theme';
import FormLogin from './../../container/FormLogin/FormLogin';
import {useSelector} from 'react-redux';
import axiosService from '../../commons/axiosService';
import {urlServer} from '../../commons/server';
import {getToken} from '../../helpers/auth';
import axios from 'axios';

function Login(props) {
  const token = useSelector(state => state.auth.access_token);

  useEffect(() => {
    axios
      .get(`${urlServer + 'api/user-profile'}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(function (response) {
        if (response.data && response.data.id) {
          props.navigation.navigate('MainScreen');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [token]);

  const goToLogin = () => {
    props.navigation.navigate('HomeLogin');
  };

  const goToSignUp = () => {
    props.navigation.navigate('SignUp');
  };

  const goToHome = () => {
    props.navigation.navigate('MainScreen');
  };

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
        Đăng nhập
      </Text>
      <FormLogin goToSignUp={goToSignUp} />
    </Container>
  );
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

export default Login;
