import React, {useEffect, useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {
  Button,
  Form,
  Item,
  Label,
  Input,
  Header,
  Left,
  Body,
  Title,
  Right,
  CardItem,
  Thumbnail,
  Content,
  Textarea,
  Container,
  Card,
  Footer,
} from 'native-base';
import {COLOR} from './../../theme/color';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {getUserCate, noneAvatar} from '../../helpers/helper';
import moment from 'moment';
import {urlServer} from '../../commons/server';
import axiosService from '../../commons/axiosService';

const UserModal = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState({});
  const {user_id} = props;
  const fetchInfo = () => {
    axiosService
      .get(`${urlServer + 'api/user/' + user_id}`)
      .then(function (response) {
        if (response.data) {
          setUser(response.data.info);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onShowInfo = () => {
    fetchInfo();
    setModalVisible(true);
  };

  const {title} = props;
  return (
    <>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={{flex: 1}}>
          <Header style={{backgroundColor: COLOR.primary}}>
            <Left>
              <Button transparent onPress={() => setModalVisible(false)}>
                <Icon size={20} color={COLOR.white} name="chevron-left" />
              </Button>
            </Left>
            <Body>
              <Title>Thông tin</Title>
            </Body>
            <Right></Right>
          </Header>
          <Content>
            <Card>
              <CardItem bordered>
                <Thumbnail
                  circular
                  style={{width: 60, height: 60}}
                  source={{
                    uri: user.avatar
                      ? urlServer + user.avatar.image
                      : noneAvatar,
                  }}
                />
                <Content style={{paddingLeft: 10}}>
                  <Text style={{fontWeight: 'bold', fontSize: 20}}>
                    {user.name}
                  </Text>
                  <Text style={{fontSize: 14}}>
                    {getUserCate(user.cate_id)}
                  </Text>
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
                    <Text style={{fontWeight: 'bold'}}>Email : </Text>{' '}
                    {user.email}
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

                <Content style={{marginTop: 3}}>
                  <Text>
                    <Text style={{fontWeight: 'bold'}}>Đang du học tại : </Text>
                    {user.address_study}
                  </Text>
                </Content>
              </CardItem>
              <CardItem style={styles.boxInfoItem}>
                <Text style={styles.titleInfo}>Quá trình học tập</Text>

                <Content style={{marginTop: 3}}>
                  <Text>
                    <Text style={{fontWeight: 'bold'}}>Cấp 3 : </Text>Trung học
                    phổ thông Quế Lâm
                  </Text>
                </Content>
                <Content style={{marginTop: 3}}>
                  <Text>
                    <Text style={{fontWeight: 'bold'}}>Đại học : </Text>Học Viện
                    Bưu Chính Viễn Thông
                  </Text>
                </Content>
                <Content style={{marginTop: 3}}>
                  <Text>
                    <Text style={{fontWeight: 'bold'}}>Ngành học : </Text>
                    Công nghệ thông tin
                  </Text>
                </Content>
              </CardItem>
            </Card>
          </Content>
          <Footer style={{backgroundColor: COLOR.primary, padding: 5}}>
            <Button
              full
              onPress={() => setModalVisible(false)}
              style={{backgroundColor: 'transparent', elevation: 0, flex: 1}}>
              <Text style={{color: COLOR.white}}>Quay lại</Text>
            </Button>
          </Footer>
        </View>
      </Modal>

      <Text onPress={onShowInfo}>{title}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  boxInfoItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});

export default UserModal;
