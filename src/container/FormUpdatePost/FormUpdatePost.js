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
} from 'native-base';
import {COLOR} from './../../theme/color';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import * as action from '../../actions/post';
import ImageInput from './ImageInput/ImageInput';
import TagList from './Tag/TagList';
import Toast from 'react-native-toast-message';
import axiosService from '../../commons/axiosService';
import {urlServer} from '../../commons/server';
import {noneAvatar} from '../../helpers/helper';

const FormUpdatePost = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const {post} = props;
  const [content, setContent] = useState(post?.content);
  const [tags, setTag] = useState(post.tags ? post.tags : []);
  const [images, setImages] = useState([]);

  const account = useSelector(state => state.account);
  const {avatar, name} = account;
  const dispatch = useDispatch();

  const updatePost = data => {
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
    formData.append('content', data.content);
    // if (data.tags?.length > 0) {
    //   formData.append('tags', `${data.tags}`);
    // }

    axiosService
      .put(`${urlServer + 'api/post/'}` + post.id, data)
      .then(function (response) {
        console.log(response);
        if (response.status === 202) {
          Toast.show({
            text1: 'Sửa bài viết thành công',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Sửa bài viết thất bại',
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        Toast.show({
          type: 'error',
          text1: 'Sửa bài viết thất bại',
        });
      });
  };

  const onSubmit = () => {
    // setModalVisible(false);
    // setContent('');
    // setImages([]);
    // setTag([]);
    updatePost({content, tags, images});
    console.log(tags, post);
  };

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
              <Title>Tạo bài viết</Title>
            </Body>
            <Right>
              <Button transparent onPress={onSubmit}>
                <Text style={{color: COLOR.white, fontSize: 20}}>Sửa</Text>
              </Button>
            </Right>
          </Header>
          <Content>
            <CardItem header bordered>
              <Thumbnail
                circular
                style={{width: 50, height: 50}}
                source={{
                  uri: avatar ? urlServer + avatar.image : noneAvatar,
                }}
              />
              <Text style={{fontWeight: 'bold', paddingLeft: 5}}>{name}</Text>
            </CardItem>

            <CardItem bordered>
              <Form style={{height: 100}}>
                <Textarea
                  h={1}
                  style={{flex: 1}}
                  value={content}
                  placeholder="Bạn đang nghĩ gì thế ?"
                  onChangeText={val => setContent(val)}
                />
              </Form>
            </CardItem>
            <CardItem bordered>
              <ImageInput
                setImages={setImages}
                images={images}
                initImages={post.images}
              />
            </CardItem>

            <TagList setTag={data => setTag(data)} tags={tags} />
          </Content>
        </View>
      </Modal>
      <Button
        style={{position: 'absolute', top: 0, right: 10, margin: 5}}
        transparent>
        <Icon
          size={18}
          color={COLOR.primary}
          name="pencil"
          onPress={() => setModalVisible(true)}
        />
      </Button>
    </>
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

export default FormUpdatePost;
