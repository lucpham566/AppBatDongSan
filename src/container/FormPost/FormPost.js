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
  Picker,
  Footer,
} from 'native-base';
import {COLOR} from './../../theme/color';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import * as action from '../../actions/post';
import * as actionScreen from '../../actions/screen';
import ImageInput from './ImageInput/ImageInput';
import TagList from './Tag/TagList';
import axiosService from '../../commons/axiosService';
import {urlServer} from '../../commons/server';
import Toast from 'react-native-toast-message';
import AvatarInput from './AvatarInput/AvatarInput';
import SelectLocal from './SelectLocal/SelectLocal';
import {useSelector} from 'react-redux';
import GlobalLoading from '../GlobalLoading/GlobalLoading';
import {isNumeric} from '../../helpers/helper';

const FormPost = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const globalLoading = useSelector(state => state.screen.globalLoading);
  const [tags, setTag] = useState([]);
  const [images, setImages] = useState([]);
  const [provinceId, setProvinceId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const [avatar, setAvatar] = useState({});
  const [post, setPost] = useState({});
  const dispatch = useDispatch();
  const {onRefresh} = props;
  const onChangeHandle = (e, name) => {
    const value = e.nativeEvent.text;
    setPost({...post, [name]: value});
  };

  const addPost = data => {
    const {title, content, price, address, phone, area} = data.post;
    const formData = new FormData();
    if (data.images && data.images.length > 0) {
      data.images.map((item, index) => {
        const name = item.path.substring(item.path.lastIndexOf('/') + 1);
        formData.append(`images[]`, {
          uri: item.path,
          type: item.mime,
          name: name,
        });
      });
    }

    if (avatar && avatar.path) {
      const name = avatar.path.substring(avatar.path.lastIndexOf('/') + 1);
      formData.append(`avatar`, {
        uri: avatar.path,
        type: avatar.mime,
        name: name,
      });
    }

    formData.append('title', title);
    formData.append('content', content);
    formData.append('price', price);
    formData.append('address', address);
    formData.append('phone', phone);
    formData.append('area', area);
    formData.append('province_id', provinceId);
    formData.append('district_id', districtId);

    if (data.tags?.length > 0) {
      formData.append('tags', `${data.tags}`);
    }

    axiosService
      .post(`${urlServer + 'api/post'}`, formData)
      .then(function (response) {
        console.log(response);
        if (response.status === 201 && response.data) {
          Toast.show({
            text1: 'Tạo bài viết thành công',
          });
          onRefresh();
          setPost({});
          setImages([]);
          setAvatar({});
          setProvinceId(null);
          setDistrictId(null);
          setTag([]);
          setModalVisible(!modalVisible);
        } else {
          if (response.data.error) {
            const {error} = response.data;
            const arr = Object.values(error);
            const arrErr = Object.keys(error).map((item, index) => {
              return {
                key: item,
                value: arr[index],
              };
            });

            Toast.show({
              type: 'error',
              text1: arrErr[0].value[0],
            });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
        Toast.show({
          type: 'error',
          text1: 'Tạo bài viết thất bại',
        });
      })
      .finally(() => {
        dispatch(actionScreen.hideLoading());
      });
  };

  const onSubmit = () => {
    dispatch(actionScreen.showLoading());
    if (!(post && post.phone && isNumeric(post.phone))) {
      Toast.show({
        type: 'error',
        text1: 'Số điện thoại không hợp lệ',
      });
      dispatch(actionScreen.hideLoading());
      return;
    }
    if (!(post && post.price && isNumeric(post.price))) {
      Toast.show({
        type: 'error',
        text1: 'Giá không hợp lệ',
      });
      dispatch(actionScreen.hideLoading());
      return;
    }
    addPost({post, tags, images});
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
              <Title>Tạo bài viết</Title>
            </Body>
            <Right>
              <Button transparent onPress={onSubmit}>
                <Text style={{color: COLOR.white, fontSize: 20}}>Đăng</Text>
              </Button>
            </Right>
          </Header>
          <Content padder>
            <Form>
              <Item stackedLabel bordered>
                <Label style={{fontWeight: 'bold', marginBottom: 5}}>
                  Tiêu đề
                </Label>
                <Input
                  placeholder="Ví dụ: sản phẩm bất động sản cao cấp"
                  onChange={e => onChangeHandle(e, 'title')}
                />
              </Item>
              <View style={{paddingHorizontal: 15}}>
                <SelectLocal
                  setDistrictId={setDistrictId}
                  setProvinceId={setProvinceId}
                />
              </View>
              <Item>
                <Label>Địa chỉ </Label>
                <Input
                  placeholder="Ví dụ: Số nhà a thôn b"
                  onChange={e => onChangeHandle(e, 'address')}
                />
              </Item>

              <Item>
                <Label>Số điện thoại: </Label>
                <Input
                  placeholder=""
                  onChange={e => onChangeHandle(e, 'phone')}
                />
              </Item>
              <Item>
                <Label>Diện tích {'(m2)'}: </Label>
                <Input
                  placeholder=""
                  onChange={e => onChangeHandle(e, 'area')}
                />
              </Item>
              <Item>
                <Label>Giá {'(VNĐ)'}: </Label>
                <Input
                  placeholder=""
                  onChange={e => onChangeHandle(e, 'price')}
                />
              </Item>
              <Item stackedLabel bordered>
                <Label>Chi tiết: </Label>

                <Textarea
                  h={5}
                  style={{width: '100%', height: 50}}
                  placeholder="Nội dung bài viết"
                  onChange={e => onChangeHandle(e, 'content')}
                />
              </Item>
            </Form>
            <Text style={{fontWeight: 'bold', paddingLeft: 15}}>
              Chọn ảnh đại diện
            </Text>
            <CardItem bordered>
              <AvatarInput setAvatar={setAvatar} avatar={avatar} />
            </CardItem>
            <Text style={{fontWeight: 'bold', paddingLeft: 15}}>
              Chọn ảnh phụ
            </Text>
            <CardItem bordered>
              <ImageInput setImages={setImages} images={images} />
            </CardItem>
            <Text style={{fontWeight: 'bold', paddingLeft: 15}}>
              Chọn tag bài viết
            </Text>
            <TagList setTag={data => setTag(data)} tags={tags} />
          </Content>
        </View>
        <Toast ref={ref => Toast.setRef(ref)} />
        {globalLoading ? <GlobalLoading /> : null}
      </Modal>
      <Button
        style={{marginHorizontal: 5, backgroundColor: COLOR.primary}}
        block
        rounded
        light
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Tạo bài viết</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
});

export default FormPost;
