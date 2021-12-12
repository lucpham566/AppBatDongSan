import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, Alert} from 'react-native';
import moment from 'moment';
import 'moment/locale/vi';
import {
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Thumbnail,
  View,
  Badge,
  Button,
} from 'native-base';
import {COLOR} from '../../theme';
import {urlServer} from '../../commons/server';
import TagList from './Tag/TagList';
import axiosService from '../../commons/axiosService';
import ImageBox from './ImageBox/ImageBox';
import CommentBox from './CommentBox/CommentBox';
import {getUserCate, noneAvatar} from '../../helpers/helper';
import Icon from 'react-native-vector-icons/FontAwesome';
import CommentPreview from './CommentBox/CommentPreview';
import UserModal from '../UserModal/UserModal';
import FormUpdatePost from '../../container/FormUpdatePost/FormUpdatePost';

function Post(props) {
  const {post} = props;
  const [likeCount, setLikeCount] = useState(post?.like_count);
  const [comments, setComments] = useState(post?.comments);
  const {user, content, created_at, images, id, tags, like_count, liked} = post;
  const [isLike, setIsLike] = useState(liked);
  const onClickLike = id => {
    setIsLike(!isLike);

    axiosService
      .post(`${urlServer + 'api/like/' + id}`)
      .then(function (response) {
        console.log(response);
        setLikeCount(response.data.like_count);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Card style={styles.container}>
      <CardItem header bordered style={{backgroundColor: COLOR.grey}}>
        <Thumbnail
          circular
          style={{width: 50, height: 50}}
          source={{
            uri: user.avatar ? urlServer + user.avatar : noneAvatar,
          }}
        />

        <Content style={{paddingLeft: 10}}>
          <Text style={{fontWeight: 'bold', fontSize: 17}}>
            <UserModal title={user.name} user_id={user.id} />{' '}
            {user.active == 1 ? (
              <Icon size={16} color={COLOR.primary} name="check-circle" />
            ) : (
              ''
            )}
          </Text>
          <Text style={{fontSize: 12, marginTop: -3}}>
            {'('}
            {getUserCate(user.cate_id)}
            {')'}
          </Text>
          <Text style={{fontSize: 14, color: COLOR.greyDark}}>
            {moment(created_at).fromNow()}
          </Text>
        </Content>
        <FormUpdatePost post={post} />
      </CardItem>
      <CardItem>
        <Body>
          <Text>{content}</Text>
        </Body>
      </CardItem>
      <CardItem>
        <TagList tagList={tags} />
      </CardItem>

      {images?.length > 0 ? (
        <CardItem>
          <ImageBox images={images} />
        </CardItem>
      ) : (
        <></>
      )}

      <CardItem style={{justifyContent: 'space-between'}}>
        <Text style={{fontSize: 14}}>
          <Icon size={18} color={COLOR.primary} name="thumbs-o-up" />{' '}
          {likeCount} lượt quan tâm
        </Text>
        <Text style={{fontSize: 14}}>
          <Icon size={18} color={COLOR.primary} name="comment" />{' '}
          {comments?.length} bình luận
        </Text>
      </CardItem>
      <CardItem footer bordered style={{justifyContent: 'space-between'}}>
        <Text
          onPress={() => onClickLike(id)}
          style={[styles.itemInteract, isLike ? styles.activeLike : '']}>
          <Icon
            size={18}
            color={isLike ? COLOR.primary : COLOR.greyDark}
            name="thumbs-o-up"
          />{' '}
          Quan tâm
        </Text>

        <Text style={styles.itemInteract}>
          <CommentBox setComments={setComments} post_id={post.id} />
        </Text>
        <Text style={styles.itemInteract}>
          <Icon size={16} name="share" /> Chia sẻ
        </Text>
      </CardItem>
      <View bordered style={{justifyContent: 'space-between'}}>
        <CommentPreview
          setComments={setComments}
          comments={comments}
          post_id={post.id}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: COLOR.primary,
  },
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
  activeLike: {
    color: COLOR.primary,
  },
  itemInteract: {
    flexGrow: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: COLOR.greyDark,
  },
});

export default Post;
