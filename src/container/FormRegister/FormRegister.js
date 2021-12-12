import React, {useState} from 'react';
import {Form, Item, Label, Input, Button, Text} from 'native-base';
import {StyleSheet} from 'react-native';
import {COLOR} from './../../theme/color';

import * as actionScreen from '../../actions/screen';
import {useDispatch, useSelector} from 'react-redux';
import axiosService from '../../commons/axiosService';
import {urlServer} from '../../commons/server';
import Toast from 'react-native-toast-message';

function FormRegister(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();

  const onsubmit = () => {
    // dispatch(actions.register({email, phone, password, name}));
    dispatch(actionScreen.showLoading());
    axiosService
      .post(`${urlServer + 'api/register'}`, {email, phone, password, name})
      .then(function (res) {
        if (res.status === 201) {
          Toast.show({
            text1: 'Đăng ký thành công',
          });
          props.gotoLogin();
        } else {
          if (res.data.error) {
            const {error} = res.data;
            const arr = Object.values(error);
            const arrErr = Object.keys(error).map((item, index) => {
              return {
                key: item,
                value: arr[index],
              };
            });

            Toast.show({
              type: 'error',
              text1: arrErr[0].value[0],
            });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
        Toast.show({
          type: 'error',
          text1: 'Đăng ký thất bại',
        });
      })
      .finally(function () {
        dispatch(actionScreen.hideLoading());
      });
  };

  return (
    <Form style={{width: '100%', padding: 20}}>
      <Item>
        <Label>Email</Label>
        <Input onChangeText={val => setEmail(val)} />
      </Item>
      <Item>
        <Label>Họ tên </Label>
        <Input onChangeText={val => setName(val)} />
      </Item>
      <Item>
        <Label>Số điện thoại</Label>
        <Input onChangeText={val => setPhone(val)} />
      </Item>
      <Item>
        <Label>Mật khẩu </Label>
        <Input
          secureTextEntry={true}
          passwordRules
          onChangeText={val => setPassword(val)}
        />
      </Item>
      <Item>
        <Label>Nhập lại mật khẩu</Label>
        <Input
          secureTextEntry={true}
          passwordRules
          onChangeText={val => setRePassword(val)}
        />
      </Item>
      <Button rounded light block style={styles.button} onPress={onsubmit}>
        <Text style={[styles.textButton, {color: 'white'}]}>Đăng ký ngay</Text>
      </Button>
      <Button
        rounded
        block
        onPress={() => props.gotoLogin()}
        style={[styles.button, {backgroundColor: COLOR.primary}]}>
        <Text style={[styles.textButton, {color: 'white'}]}>
          Đã có tài khoản
        </Text>
      </Button>
    </Form>
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

export default FormRegister;
