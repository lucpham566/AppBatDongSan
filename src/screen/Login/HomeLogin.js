import {Button, Thumbnail} from 'native-base';
import React, {Component, useEffect} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {COLOR} from './../../theme/color';
import {useSelector} from 'react-redux';
import {fetchToken} from '../../helpers/auth';
import axiosService from '../../commons/axiosService';
import {urlServer} from '../../commons/server';

const HomeLogin = props => {
  const goToLogin = () => {
    props.navigation.navigate('Login');
  };

  const goToSignUp = () => {
    props.navigation.navigate('SignUp');
  };

  const goToHome = () => {
    props.navigation.navigate('MainScreen');
  };

  useEffect(() => {
    fetchToken().then(() => {
      axiosService
        .get(`${urlServer + 'api/user-profile'}`)
        .then(function (response) {
          if (response.data && response.data.id) {
            props.navigation.navigate('MainScreen');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }, []);

  return (
    <ImageBackground
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      source={{
        uri: 'https://thoitrangwiki.com/wp-content/uploads/2019/05/mau-nha-pho-dep-o-quang-binh-1-12.jpg',
      }}
      style={styles.imageBackground}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          top: '10%',
          padding: 20,
        }}>
        <Thumbnail
          square
          large
          source={{
            uri: 'data:image/png;base64,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',
          }}
        />
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            padding: 20,
            color: 'white',
          }}>
          App nhà trọ
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            paddingHorizontal: 20,
            marginBottom: 40,
            color: 'white',
          }}>
          Chuyên cung cấp các bất động sản chất lượng
        </Text>
        <Button
          rounded
          block
          style={[styles.button, {backgroundColor: COLOR.primary}]}
          onPress={goToLogin}>
          <Text style={[styles.textButton, {color: 'white'}]}>Đăng nhập </Text>
        </Button>
        <Button
          rounded
          block
          style={[styles.button, {backgroundColor: COLOR.white}]}
          onPress={goToSignUp}>
          <Text style={[styles.textButton, {color: COLOR.primary}]}>
            Đăng ký
          </Text>
        </Button>
      </View>
    </ImageBackground>
  );
};

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
  imageBackground: {
    display: 'flex',
    flexGrow: 1,
  },
});
export default HomeLogin;
