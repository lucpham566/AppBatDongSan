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
} from 'native-base';
class HeaderMain extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Header style={{backgroundColor: '#2ed573'}}>
        <Left>
          <Button transparent onPress={this.goToSearch}>
            <Icon name="search" />
          </Button>
        </Left>
        <Body>
          <Title>Shop app</Title>
        </Body>
        <Right>
          <Button transparent onPress={this.goToCart}>
            <Icon name="cart" />
          </Button>
        </Right>
      </Header>
    );
  }
}

export default HeaderMain;
