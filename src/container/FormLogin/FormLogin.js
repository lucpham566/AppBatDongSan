import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {Form, Item, Label, Input, Button, Text} from 'native-base';
import {COLOR} from './../../theme/color';
import {StyleSheet} from 'react-native';
import { useDispatch } from 'react-redux';
import * as actions from "../../actions/auth";

FormLogin.propTypes = {};

function FormLogin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(actions.login({email,password}))
  };
  const handleEmail = (val) => {
    setEmail(val);
  };
  const handlePassword = (val) => {
    setPassword(val);
  };
  return (
    <Form style={{width: '100%', padding: 20}}>
      <Item fixedLabel>
        <Label>Tài khoản</Label>
        <Input onChangeText={(val) => handleEmail(val)} />
      </Item>
      <Item fixedLabel>
        <Label>Mật khẩu</Label>
        <Input secureTextEntry={true} onChangeText={(val) => handlePassword(val)}/>
      </Item>

      <Button
        rounded
        block
        style={[styles.button, {backgroundColor: COLOR.primary}]}
        onPress={onSubmit}>
        <Text style={[styles.textButton, {color: 'white'}]}>Đăng nhập</Text>
      </Button>
      <Button rounded light  block style={styles.button} onPress={props.goToSignUp}>
        <Text style={[styles.textButton, {color: 'white'}]}>Đăng ký</Text>
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

export default FormLogin;
