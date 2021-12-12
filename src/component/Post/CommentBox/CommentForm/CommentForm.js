import {
  Button,
  CardItem,
  Input,
  Text,
  Thumbnail,
} from 'native-base';
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import axiosService from '../../../../commons/axiosService';
import {urlServer} from '../../../../commons/server';
import { getAvatar, noneAvatar } from '../../../../helpers/helper';
import {COLOR} from '../../../../theme';

const CommentForm = props => {
  const account = useSelector(state => state.account);
  const {avatar, name} = account;
  const [value, setValue] = useState('');
  const {post_id, onFetchListComment, parent_id} = props;

  const submitForm = () => {
    setValue('');
    axiosService
      .post(`${urlServer + 'api/comment'}`, {
        content: value,
        post_id,
        parent_id,
      })
      .then(function (response) {
        onFetchListComment();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleValue = (e)=>{
    setValue(e.nativeEvent.text)
  }

  return (
    <CardItem bordered style={{backgroundColor: COLOR.grey}}>
      <Thumbnail
        circular
        style={{width: 50, height: 50}}
        source={{
          uri: avatar ? urlServer + avatar.image : noneAvatar,
        }}
      />
      <Input type="text" value={value} onChange={e => handleValue(e)} placeholder="viết bình luận"/>
      <Button style={{}} transparent onPress={submitForm}>
        <Text>
          <Icon size={20} color={COLOR.primary} name="paper-plane" />
        </Text>
      </Button>
    </CardItem>
  );
};

const styles = StyleSheet.create({});

export default CommentForm;
