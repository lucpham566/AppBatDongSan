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
  Footer,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import React, {useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {COLOR} from '../../../theme';
import axiosService from '../../../commons/axiosService';
import {urlServer} from '../../../commons/server';
import CommentForm from './CommentForm/CommentForm';
import BoxRepComment from './BoxRepComment';

const CommentBox = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const {post_id} = props;

  const onFetchListComment = () => {
    axiosService
      .get(`${urlServer + 'api/comment/' + post_id}`)
      .then(function (response) {
        console.log(response);
        setComments(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    onFetchListComment();
  }, []);

  const elmCommentList = comments.map((comment, index) => {
    if (comment.user && comment.user.name && comment.parent_id == 0) {
      return (
        <CardItem
          key={index}
          header
          bordered
          style={{alignItems: 'flex-start'}}>
          <Thumbnail
            circular
            style={{width: 50, height: 50, marginRight: 10}}
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Tr%C6%B0%E1%BB%9Dng_%C4%91%E1%BA%A1i_h%E1%BB%8Dc_%C4%90%C3%B4ng_%C3%81_%E1%BB%9F_B%E1%BA%AFc_Ninh.jpg',
            }}
          />
          <Content>
            <View
              style={{
                backgroundColor: COLOR.grey,
                padding: 5,
              }}>
              <Text style={{fontWeight: 'bold'}}>{comment.user.name}</Text>
              <Text>{comment.content}</Text>
            </View>

            <BoxRepComment
              post_id={post_id}
              comment={comment}
              comments={comments}
              onFetchListComment={onFetchListComment}
            />
          </Content>
        </CardItem>
      );
    }
  });
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
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
              <Title>Bình luận</Title>
            </Body>
          </Header>
          <Footer>
            <Body>
              <CommentForm
                post_id={post_id}
                parent_id={0}
                onFetchListComment={onFetchListComment}
              />
            </Body>
          </Footer>
          <Content>{elmCommentList}</Content>
        </View>
      </Modal>
      <Button full style={[styles.buttonOpen]} onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Tất cả bình luận</Text>
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
    paddingHorizontal: 10,
    paddingVertical: 20,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: COLOR.primary,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius:20
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

export default CommentBox;
