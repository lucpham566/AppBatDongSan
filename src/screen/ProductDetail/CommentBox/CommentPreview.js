import {
  Button,
  Header,
  Left,
  Body,
  Title,
  CardItem,
  Thumbnail,
  Content,
  Footer,
  Item,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {COLOR} from '../../../theme';
import axiosService from '../../../commons/axiosService';
import {urlServer} from '../../../commons/server';
import CommentForm from './CommentForm/CommentForm';
import BoxRepComment from './BoxRepComment';
import {noneAvatar} from '../../../helpers/helper';
import {useSelector} from 'react-redux';
import moment from 'moment';

const CommentPreview = props => {
  const [modalVisible, setModalVisible] = useState(false);
  //   const [comments, setComments] = useState([]);
  const {post_id, setComments, comments} = props;
  const account = useSelector(state => state.account);
  const {avatar, name} = account;

  const onFetchListComment = () => {
    axiosService
      .get(`${urlServer + 'api/comment/' + post_id}`)
      .then(function (response) {
        if (response.data) {
          setComments(response.data);
          //   setCommentCount(response.data.length);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    // onFetchListComment();
  }, []);

  var count = 0;

  const elmCommentList = comments?.map((comment, index) => {
    if (count >= 4) {
      return;
    }
    if (comment.user && comment.user.name && comment.parent_id == 0) {
      count++;
      return (
        <Item key={index} style={{alignItems: 'flex-start', padding: 5}}>
          <Thumbnail
            circular
            style={{width: 50, height: 50, marginRight: 10}}
            source={{
              uri: comment.user.avatar
                ? urlServer + comment.user.avatar
                : noneAvatar,
            }}
          />
          <Content>
            <View
              style={{
                backgroundColor: COLOR.grey,
                padding: 10,
              }}>
              <Text style={{fontWeight: 'bold', color: COLOR.black}}>
                {comment.user.name}
              </Text>
              <Text>{comment.content}</Text>
            </View>
            <BoxRepComment
              post_id={post_id}
              comment={comment}
              comments={comments}
              onFetchListComment={onFetchListComment}
            />
          </Content>
        </Item>
      );
    }
  });
  return (
    <View style={styles.centeredView}>
      <CommentForm
        post_id={post_id}
        parent_id={0}
        onFetchListComment={onFetchListComment}
      />
      {elmCommentList}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    padding: 2,
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

export default CommentPreview;
