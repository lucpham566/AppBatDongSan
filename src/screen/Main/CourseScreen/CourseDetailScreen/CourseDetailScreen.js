import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Text,
  Container,
  Content,
  Header,
  Left,
  Button,
  Body,
  Right,
  Title,
  Card,
  CardItem,
  Thumbnail,
  Footer,
} from 'native-base';
import {COLOR} from '../../../../theme/color';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Linking, StyleSheet, TouchableHighlight} from 'react-native';
import axiosService from '../../../../commons/axiosService';
import {urlServer} from '../../../../commons/server';
import Toast from 'react-native-toast-message';

function CourseDetailScreen(props) {
  const {id} = props.route.params;

  const [course, setCourse] = useState({});
  useEffect(() => {
    axiosService
      .get(`${urlServer + 'api/course-detail/' + id}`)
      .then(function (response) {
        if (response.data && response.data.course) {
          setCourse(response.data.course);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const postCheckout = () => {
    axiosService
      .post(`${urlServer + 'api/post_checkout'}`, {course_id: id})
      .then(function (response) {
        console.log(response.data);
        if (response.status === 200 && response.data.success) {
          Toast.show({
            text1: 'Đăng ký tư vấn thành công',
          });
        } else {
          Toast.show({
            text1: 'Đăng ký tư vấn thất bại',
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        Toast.show({
          text1: 'Đăng ký tư vấn thất bại',
        });
      });
  };

  return (
    <Container>
      <Header style={{backgroundColor: COLOR.primary}}>
        <Left>
          <Button transparent onPress={() => props.navigation.goBack()}>
            <Icon size={20} color={COLOR.white} name="chevron-left" />
          </Button>
        </Left>
        <Body>
          <Title>Chi tiết khóa học</Title>
        </Body>
        <Right></Right>
      </Header>

      <Content style={styles.contentBody}>
        <Card>
          <CardItem header bordered style={{justifyContent: 'space-between'}}>
            <Text
              style={{fontSize: 20, fontWeight: 'bold', color: COLOR.black}}>
              {course.name}
            </Text>
            <Icon size={20} name="heart" style={{color: COLOR.primaryDark}} />
          </CardItem>
          <CardItem>
            <Thumbnail
              circular
              style={{width: 50, height: 50}}
              source={{
                uri: course.school ? urlServer + course.school.avatar : '',
              }}
            />
            <Content style={{paddingLeft: 10}}>
              <Text style={{fontWeight: 'bold'}}>{course.school?.name}</Text>
              <Text style={{fontSize: 14}}>{course.school?.location}</Text>
            </Content>
          </CardItem>
          <CardItem footer bordered style={{justifyContent: 'space-between'}}>
            <Text style={{fontWeight: 'bold', color: COLOR.primaryDark}}>
              {course.price}$ / Year
            </Text>
            <Text style={{fontWeight: 'bold', color: COLOR.primaryDark}}>
              {course.time} Year
            </Text>
            <Text style={{fontWeight: 'bold', color: COLOR.primaryDark}}>
              {moment(course.start_date).format('l')}
            </Text>
          </CardItem>
        </Card>
        <Card>
          <CardItem bordered style={styles.boxInfoItem}>
            <Text style={styles.titleInfo}>Giới thiệu</Text>

            <Content style={{marginTop: 3}}>
              <Text>{course.intro}</Text>
              <Button
                full
                style={{backgroundColor: COLOR.primary, marginTop: 5}}
                onPress={() =>
                  course.school ? Linking.openURL(course.school?.website) : null
                }>
                <Text>Xem website</Text>
              </Button>
            </Content>
          </CardItem>
        </Card>
        <Card>
          <CardItem bordered style={styles.boxInfoItem}>
            <Text style={styles.titleInfo}>Chi tiết khóa học</Text>

            <Content style={{marginTop: 3}}>
              <Text>{course.content}</Text>
            </Content>
          </CardItem>
        </Card>
      </Content>

      <Footer style={{backgroundColor: COLOR.primary, padding: 5}}>
        <Button
          full
          style={{flex: 1, backgroundColor: 'transparent', elevation: 0}}
          onPress={postCheckout}>
          <Text>Đăng ký học ngay</Text>
        </Button>
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  contentBody: {
    padding: 5,
  },
  boxInfoItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  titleInfo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default CourseDetailScreen;
