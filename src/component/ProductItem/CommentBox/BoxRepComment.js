import moment from 'moment';
import {
  Body,
  Button,
  CardItem,
  Content,
  Footer,
  Input,
  Text,
  Thumbnail,
} from 'native-base';
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLOR} from '../../../theme';
import CommentForm from './CommentForm/CommentForm';

const BoxRepComment = props => {
  const [isOpen, setIsOpen] = useState(false);
  const {comments, post_id, comment, onFetchListComment} = props;

  const elmRepCommentList = (comments, parent_id) => {
    return comments.map((comment, index) => {
      if (comment.user && comment.user.name && comment.parent_id == parent_id) {
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
              <View>
                <Text style={{fontSize: 14, color: COLOR.greyDark}}>
                  {moment(comment.created_at).fromNow()}{' '}
                  <Text style={{fontSize: 14, color: COLOR.primary}}>
                    Trả lời
                  </Text>
                </Text>
              </View>
            </Content>
          </CardItem>
        );
      }
    });
  };

  return (
    <View>
      <View>
        <Text style={{fontSize: 14, color: COLOR.greyDark,marginBottom:5}}>
          {moment(comment.created_at).fromNow()}{' '}
          <Text
            style={{fontSize: 14, color: COLOR.primary}}
            onPress={() => {
              setIsOpen(!isOpen);
            }}>
            Trả lời
          </Text>
        </Text>
      </View>
      {isOpen ? (
        <CommentForm
          post_id={post_id}
          parent_id={comment.id}
          onFetchListComment={onFetchListComment}
        />
      ) : null}
      {elmRepCommentList(comments, comment.id)}
    </View>
  );
};

const styles = StyleSheet.create({});

export default BoxRepComment;
