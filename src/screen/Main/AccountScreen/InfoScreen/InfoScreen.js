import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
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
  Input,
  View,
  Item,
} from 'native-base';
import {COLOR} from '../../../../theme/color';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet} from 'react-native';
import {urlServer} from '../../../../commons/server';
import axiosService from '../../../../commons/axiosService';
import axios from 'axios';
import {getToken} from '../../../../helpers/auth';
import moment from 'moment';
import 'moment/locale/vi';
import {getUserCate, noneAvatar} from '../../../../helpers/helper';
import {useSelector} from 'react-redux';

InfoScreen.propTypes = {};

function InfoScreen(props) {
  // const [user, setUser] = useState({});
  const user = useSelector(state => state.account);
  // const fetchInfo = () => {
  //   axiosService
  //     .get(`${urlServer + 'api/user-profile'}`)
  //     .then(function (response) {
  //       setUser(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  // useEffect(() => {fetchInfo}, []);

  return (
    <Container>
      <Header style={{backgroundColor: COLOR.primary}}>
        <Left>
          <Button transparent onPress={() => props.navigation.goBack()}>
            <Icon size={20} color={COLOR.white} name="chevron-left" />
          </Button>
        </Left>
        <Body>
          <Title>Thông tin cá nhân</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => props.navigation.navigate('ChangeUserInfo')}>
            <Icon size={20} color={COLOR.white} name="pencil" />
          </Button>
        </Right>
      </Header>

      <Content style={styles.contentBody}>
        <Card>
          <CardItem bordered>
            <Thumbnail
              circular
              style={{width: 60, height: 60}}
              source={{
                uri: user.avatar ? urlServer + user.avatar.image : noneAvatar,
              }}
            />
            <Content style={{paddingLeft: 10}}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>
                {user.name}
              </Text>
              <Text style={{fontSize: 14}}>{getUserCate(user.cate_id)}</Text>
            </Content>
          </CardItem>
          <CardItem bordered style={styles.boxInfoItem}>
            <Text style={styles.titleInfo}>Thông tin liên hệ</Text>

            <Content horizontal>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Họ tên : </Text>
                {user.name}
              </Text>
            </Content>

            <Content style={{marginTop: 3}}>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Ngày sinh : </Text>{' '}
                {moment(user.birthday).format('LL')}
              </Text>
            </Content>

            <Content style={{marginTop: 3}}>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Email : </Text> {user.email}
              </Text>
            </Content>

            <Content style={{marginTop: 3}}>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Số điện thoại : </Text>{' '}
                {user.phone}
              </Text>
            </Content>

            <Content style={{marginTop: 3}}>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Địa chỉ : </Text>{' '}
                {user.address}
              </Text>
            </Content>
          </CardItem>
          <CardItem style={styles.boxInfoItem}>
            <Text style={styles.titleInfo}>Loại user</Text>

            <Content style={{marginTop: 3}}>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Loại : </Text>
                {getUserCate(user.cate_id)}
              </Text>
            </Content>
          </CardItem>
          <CardItem style={styles.boxInfoItem}>
            <Text style={styles.titleInfo}>Giới thiệu</Text>

            <Content style={{marginTop: 3}}>
              <Text>{user.intro}</Text>
            </Content>
          </CardItem>
        </Card>
      </Content>

      {/* <Footer style={{backgroundColor: COLOR.primary, padding: 5}}>
        <Button style={{backgroundColor: 'transparent', elevation: 0}}>
          <Text>
            Sửa thông tin <Icon size={16} color={COLOR.white} name="pencil" />
          </Text>
        </Button>
      </Footer> */}
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

export default InfoScreen;
