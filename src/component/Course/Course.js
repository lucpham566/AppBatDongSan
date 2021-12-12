import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Button,
  TouchableHighlight,
  Alert,
  TouchableNativeFeedback,
  Image,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Thumbnail,
  Icon,
} from 'native-base';
import {connect} from 'react-redux';
import {COLOR} from '../../theme';
import {urlServer} from '../../commons/server';

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goToDetail = id => {
    this.props.navigation.push('CourseDetail', {id});
  };

  addToCart = () => {
    Alert.alert('thành công');
  };

  render() {
    const {course} = this.props;
    return (
      <TouchableNativeFeedback
        onPress={() => {
          this.goToDetail(course.id);
        }}>
        <Card>
          <CardItem header bordered style={{justifyContent: 'space-between'}}>
            <Text
              style={{fontSize: 20, fontWeight: 'bold', color: COLOR.black}}>
              {course.name}
            </Text>
            <Icon name="heart" style={{color: COLOR.primaryDark}} />
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text numberOfLines={4}>{course.intro}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Thumbnail
              circular
              style={{width: 40, height: 40}}
              source={{
                uri: course.school ? urlServer + course.school.avatar : '',
              }}
            />
            <Content style={{paddingLeft: 10}}>
              <Text style={{fontWeight: 'bold'}}> {course.school?.name}</Text>
              <Text style={{fontSize: 14}}>{course.school?.location}</Text>
            </Content>
          </CardItem>
          <CardItem footer bordered style={{justifyContent: 'space-between'}}>
            <Text style={{fontWeight: 'bold', color: COLOR.primaryDark}}>
              {course.price} $ / Year
            </Text>
            <Text style={{fontWeight: 'bold', color: COLOR.primaryDark}}>
              {course.time} Year
            </Text>
            <Text style={{fontWeight: 'bold', color: COLOR.primaryDark}}>
              Mỹ
            </Text>
          </CardItem>
        </Card>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  productItem: {
    width: 200,
    padding: 5,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    backgroundColor: 'white',
  },
  avatarProduct: {
    width: '100%',
    height: 100,
  },
  nameProduct: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLOR.black,
    marginVertical: 5,
  },
  review: {
    fontSize: 13,
    color: '#747d8c',
    marginVertical: 5,
  },
  priceProduct: {
    fontSize: 15,
    color: '#ff4757',
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => {
  return {
    navigation: state.screen.navigation,
  };
};

// const mapDispatchToProps = (dispatch) => {
//     return {

//     };
// };

export default connect(mapStateToProps, null)(Course);
