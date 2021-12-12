import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {
  Button,
  Form,
  Header,
  Left,
  Body,
  Title,
  Right,
  CardItem,
  Thumbnail,
  Content,
  Textarea,
  Footer,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {COLOR} from '../../../../../theme';
import ImagePicker from 'react-native-image-crop-picker';
import * as actions from '../../../../../actions/account';
import axiosService from '../../../../../commons/axiosService';
import {urlServer} from '../../../../../commons/server';
import Toast from 'react-native-toast-message';
import * as actionScreen from '../../../../../actions/screen';
import * as actionAccount from '../../../../../actions/account';
const AvatarModel = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [avatar, setAvatar] = useState({});
  const {initAvatar, fetchUser} = props;
  const handleChosePhoto = () => {
    ImagePicker.openPicker({multiple: false}).then(photo => {
      setAvatar(photo);
      // console.log(image.path.substring(image.path.lastIndexOf('/') + 1));
    });
  };
  const handleChosePhotoCam = () => {
    ImagePicker.openCamera({multiple: false}).then(photo => {
      setAvatar(photo);
    });
  };

  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(actionScreen.showLoading());
    const formData = new FormData();

    if (avatar) {
      const name = avatar.path.substring(avatar.path.lastIndexOf('/') + 1);
      formData.append(`avatar`, {
        uri: avatar.path,
        type: avatar.mime,
        name: name,
      });
    }

    axiosService
      .post(`${urlServer + 'api/change_avatar'}`, formData)
      .then(function (response) {
        console.log(response);
        Toast.show({
          text1: 'Sửa ảnh thành công',
        });
        setModalVisible(!modalVisible);
        dispatch(actionAccount.fetchAccount());
        fetchUser();
      })
      .catch(function (error) {
        console.log(error);
        Toast.show({
          text1: 'Sửa ảnh thất bại',
        });
      })
      .finally(() => {
        dispatch(actionScreen.hideLoading());
      });
  };

  return (
    <View style={styles.centeredView}>
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
              <Title>Ảnh đại diện</Title>
            </Body>
            <Right>
              {/* <Button transparent onPress={onSubmit}>
                <Text style={{color: COLOR.white, fontSize: 20}}>Đăng</Text>
              </Button> */}
            </Right>
          </Header>
          <Content>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 50,
              }}>
              <Thumbnail
                style={{width: 200, height: 200}}
                source={{
                  uri: avatar?.path ? avatar.path : initAvatar,
                }}
              />
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <Button
                  style={{backgroundColor: COLOR.primary, marginRight: 10}}
                  light
                  onPress={handleChosePhoto}>
                  <Text style={{paddingHorizontal: 15, color: COLOR.white}}>
                    Chọn ảnh{' '}
                    <Icon size={16} name="image" style={{color: COLOR.white}} />
                  </Text>
                </Button>
                <Button
                  style={{backgroundColor: COLOR.primary}}
                  light
                  onPress={handleChosePhotoCam}>
                  <Text style={{paddingHorizontal: 15, color: COLOR.white}}>
                    Chụp ảnh{' '}
                    <Icon
                      size={16}
                      name="camera"
                      style={{color: COLOR.white}}
                    />
                  </Text>
                </Button>
              </View>
            </View>
          </Content>
          <Footer style={{backgroundColor: COLOR.primary, padding: 5}}>
            <Button
              style={{backgroundColor: 'transparent', elevation: 0}}
              onPress={onSubmit}>
              <Text style={{color: COLOR.white}}>Xác nhận</Text>
            </Button>
          </Footer>
        </View>
      </Modal>
      <Button
        style={{marginHorizontal: 5, backgroundColor: COLOR.primary}}
        block
        light
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Chỉnh sửa</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  //   centeredView: {
  //     flex: 1,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     marginTop: 22,
  //   },
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
    // borderRadius: 20,
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
});

export default AvatarModel;
