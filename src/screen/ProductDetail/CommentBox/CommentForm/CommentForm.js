import {
  Body,
  Button,
  CardItem,
  Footer,
  Input,
  Text,
  Thumbnail,
} from 'native-base';
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import axiosService from '../../../../commons/axiosService';
import {urlServer} from '../../../../commons/server';
import {COLOR} from '../../../../theme';

const CommentForm = props => {
  const [value, setValue] = useState('');
  const {post_id, onFetchListComment, parent_id} = props;

  const handleContent = val => {
    setValue(val);
  };

  const submitForm = () => {
    axiosService
      .post(`${urlServer + 'api/comment'}`, {
        content: value,
        post_id,
        parent_id,
      })
      .then(function (response) {
        if (response.data && response.data.success) {
          setValue('');
          onFetchListComment();
          Toast.show({
            text1: 'Bình luận thành công',
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        Toast.show({
          type: 'error',
          text1: 'Bình luận thất bại',
        });
      });
  };

  return (
    <CardItem bordered style={{backgroundColor: COLOR.grey}}>
      <Thumbnail
        circular
        style={{width: 50, height: 50}}
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Tr%C6%B0%E1%BB%9Dng_%C4%91%E1%BA%A1i_h%E1%BB%8Dc_%C4%90%C3%B4ng_%C3%81_%E1%BB%9F_B%E1%BA%AFc_Ninh.jpg',
        }}
      />
      <Input
        type="text"
        value={value}
        onChangeText={val => handleContent(val)}
        placeholder="Viết bình luận"
      />
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
