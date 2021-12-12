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
  Text,
  H3,
} from 'native-base';
import {COLOR} from '../../theme';
import Icon from 'react-native-vector-icons/FontAwesome';
class HeaderTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goBack = () =>{
    this.props.navigation.goBack();
  }

  render() {
    const {title} = this.props;
    return (
      <Header style={{backgroundColor: COLOR.primary}}>
        <Left>
          <Button transparent onPress={this.goBack}>
            <Icon size={20} color={COLOR.white} name="chevron-left" />
          </Button>
        </Left>
        <Body>
          <Title>{title}</Title>
        </Body>
        <Right>
          
        </Right>
      </Header>
    );
  }
}

export default HeaderTitle;
