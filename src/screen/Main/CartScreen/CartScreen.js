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
  H2,
  View,
  List,
  ListItem,
  Thumbnail,
} from 'native-base';
import {ScrollView, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import HeaderMain from '../../../component/HeaderMain/HeaderMain';
import { COLOR } from './../../../theme/color';
class CartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goToCheckout = () =>{
    this.props.navigation.navigate('Checkout');
  }

  render() {
    return (
      <Container>
        <HeaderMain title="Giỏ hàng"/>
        <Content>
          <ScrollView>
            <List>
              <ListItem style={styles.cartItem}>
                <Thumbnail
                  square
                  large
                  source={{
                    uri:
                      'https://thoitrang.biz/wp-content/uploads/2017/05/ao-co-tron6.jpg',
                  }}
                />
                <Body>
                  <Text style={styles.productName}>Kumar Pratik</Text>
                  <Text style={styles.productPrice}>500.000 VNĐ</Text>
                </Body>
                <Right>
                  <Button transparent>
                    <Icon name="add-circle" />
                  </Button>
                  <Button bordered>
                    <Text style={{textAlign: 'center'}}>1</Text>
                  </Button>
                  <Button transparent>
                    <Icon name="remove-circle" />
                  </Button>
                </Right>
              </ListItem>
              <ListItem style={styles.cartItem}>
                <Thumbnail
                  square
                  large
                  source={{
                    uri:
                      'https://thoitrang.biz/wp-content/uploads/2017/05/ao-co-tron6.jpg',
                  }}
                />
                <Body>
                  <Text style={styles.productName}>Kumar Pratik</Text>
                  <Text style={styles.productPrice}>500.000 VNĐ</Text>
                </Body>
                <Right>
                  <Button transparent>
                    <Icon name="add-circle" />
                  </Button>
                  <Button bordered>
                    <Text style={{textAlign: 'center'}}>1</Text>
                  </Button>
                  <Button transparent>
                    <Icon name="remove-circle" />
                  </Button>
                </Right>
              </ListItem>
              <ListItem style={styles.cartItem}>
                <Thumbnail
                  square
                  large
                  source={{
                    uri:
                      'https://thoitrang.biz/wp-content/uploads/2017/05/ao-co-tron6.jpg',
                  }}
                />
                <Body>
                  <Text style={styles.productName}>Kumar Pratik</Text>
                  <Text style={styles.productPrice}>500.000 VNĐ</Text>
                </Body>
                <Right>
                  <Button transparent>
                    <Icon name="add-circle" />
                  </Button>
                  <Button bordered>
                    <Text style={{textAlign: 'center'}}>1</Text>
                  </Button>
                  <Button transparent>
                    <Icon name="remove-circle" />
                  </Button>
                </Right>
              </ListItem>
              <ListItem style={styles.cartItem}>
                <Thumbnail
                  square
                  large
                  source={{
                    uri:
                      'https://thoitrang.biz/wp-content/uploads/2017/05/ao-co-tron6.jpg',
                  }}
                />
                <Body>
                  <Text style={styles.productName}>Kumar Pratik</Text>
                  <Text style={styles.productPrice}>500.000 VNĐ</Text>
                </Body>
                <Right>
                  <Button transparent>
                    <Icon name="add-circle" />
                  </Button>
                  <Button bordered>
                    <Text style={{textAlign: 'center'}}>1</Text>
                  </Button>
                  <Button transparent>
                    <Icon name="remove-circle" />
                  </Button>
                </Right>
              </ListItem>
            </List>
          </ScrollView>
        </Content>
        <Footer style={styles.footer} style={{backgroundColor: COLOR.secondary}}>
          <View style={{flex:60,justifyContent:'center',alignItems:'center'}}>
            <Text>Tổng tiền : 2.000.000 VNĐ</Text>
          </View>
          <Button dark transparent style={{flex:40,justifyContent:'center'}} onPress={this.goToCheckout}>
            <Text style={{alignItems:'center'}}>
              Tiếp tục
            </Text>
          </Button>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  cartItem: {
    margin:5,
    marginLeft:5,
    padding:4,
    borderColor:'#ecf0f1',
    borderBottomWidth: 2,
    borderWidth:2
  },
  productName: {
    fontWeight: 'bold',
  },
  productPrice: {
    fontWeight: 'bold',
    paddingVertical: 10,
    color: '#ff4757',
  },
  footer:{
    flexDirection:'row',
  }
});

const mapStateToProps = (state) => {
  return {
    navigation:state.screen.navigation
  };
};


export default connect(mapStateToProps, null)(CartScreen);
