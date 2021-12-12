import {Body, Button, Container, Content, Form, Header, Icon, Input, Item, Label, Left, Right, Thumbnail} from 'native-base';
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goToLogin = () =>{
    this.props.navigation.navigate('HomeLogin');
  }

  goToSignUp = () =>{
    this.props.navigation.navigate('SignUp');
  }

  goToHome = () =>{
    this.props.navigation.navigate('MainScreen');
  }

  goBack = () =>{
    this.props.navigation.goBack();

  }

  render() {
    return (
      <Container style={{backgroundColor:'#ffffff',justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize:28,fontWeight:'bold',padding:20}}>Check Out</Text>
        <Form style={{width:'100%',padding:20}}>
            <Item fixedLabel>
              <Label>Họ tên</Label>
              <Input />
            </Item>
            <Item fixedLabel>
              <Label>Email</Label>
              <Input />
            </Item>
            <Item fixedLabel>
              <Label>Số điện thoại</Label>
              <Input />
            </Item>
            <Item fixedLabel>
              <Label>Địa chỉ</Label>
              <Input />
            </Item>
          </Form>
        <Button rounded success block style={styles.button} onPress={this.goToHome}>
            <Text style={[styles.textButton,{color:'white'}]}>
                Gửi
            </Text>
        </Button>
        <Button rounded primary block style={styles.button} onPress={this.goBack}>
            <Text style={[styles.textButton,{color:'white'}]}>
                Quay lại
            </Text>
        </Button>
       
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    button:{
        color:'white',
        paddingVertical:30,
        margin: 10,
    },
    textButton:{
        fontSize:18,
        fontWeight:'bold',

    }
});

export default Checkout;
