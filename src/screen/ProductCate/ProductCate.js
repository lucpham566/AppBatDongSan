import React, {Component} from 'react';
import {
  Container,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Text,
  Content,
  Left,
  Body,
  Title,
  Right,
  List,
} from 'native-base';
import {ScrollView} from 'react-native';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import ProductItem from '../../component/ProductItem/ProductItem';
import CategoryList from '../../component/CategoryList/CategoryList';
import {connect} from 'react-redux';

class ProductCate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[
        1,2,3.4,5,6
      ]
    };
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  addItem = () =>{
    alert(1);

  }

  render() {
    return (
      <Container>
        <Header searchBar rounded style={{backgroundColor: '#2ed573'}}>
          <Left>
            <Button transparent onPress={this.addItem}>
              <Icon name="chevron-back" />
            </Button>
          </Left>
          <Body>
            <Title>Đây là thể loại sản phẩm</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.goToCart}>
              <Icon name="cart" />
            </Button>
          </Right>
        </Header>
        <Header searchBar rounded style={{backgroundColor: '#ffffff'}}>
          <Item>
            <Icon name="search" />
            <Input placeholder="Search" />
          </Item>
          <Button>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content style={styles.container}>
              <FlatList
                data={this.state.data}
                renderItem={() =><ProductItem />}
                keyExtractor={(item) => item.id}
                onEndReachedThreshold={10}
                onEndReached={() => this.addItem}
                onRefresh={ this.addItem}
                refreshing={true}
            />
            {/* <CategoryList /> */}
            {/* <FlatList 
              data={this.state.data}
              renderItem={() =><ProductItem />}
              keyExtractor={(item) => item.id}
              onEndReached={() => this.addItem}
              onEndReachedThreshold={1}
            /> */}
            {/* <View style={}>
              
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
            </View> */}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: '#E6E6E6',
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  categoryItem: {
    width: '100%',
    height: 200,
  },
});

const mapStateToProps = (state) => {
  return {
    navigation: state.screen.navigation,
  };
};

export default connect(mapStateToProps, null)(ProductCate);
