import {Button, Icon, Input, Item, Text, View} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axiosService from '../../../../commons/axiosService';
import {urlServer} from '../../../../commons/server';
import {COLOR} from '../../../../theme';

const FormSearchPost = props => {
  const [value, setValue] = useState([]);
  const [suggest, setSuggest] = useState({tag: {}, suggestList: []});

  const [tags, setTag] = useState([]);
  const {setPostList} = props;
  const getPreTag = val => {
    const value = val;
    setValue(value);
    if (value) {
      axiosService
        .get(`${urlServer + 'api/search_tag?value=' + value}`)
        .then(function (response) {
          setTag(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setTag([]);
    }
  };

  const getPostForTag = id => {
    setValue('');
    setTag([]);
    axiosService
      .get(`${urlServer + 'api/post_for_tag/' + id}`)
      .then(function (response) {
        console.log(response.data.data);
        setPostList(response.data);
        // setSuggest({
        //   tag: response.data.tag,
        //   suggestList: response.data.suggest,
        // });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let elmPreView = tags.map((item, index) => {
    return (
      <TouchableOpacity
        onPress={() => getPostForTag(item.id)}
        style={styles.suggestItem}
        key={index}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.searchContainer}>
      <Item rounded>
        <Icon name="search" />
        <Input
          value={value}
          placeholder="Tìm kiếm bài viết theo tag"
          onChangeText={val => getPreTag(val)}
        />
      </Item>
      {tags.length>0 ? <View style={styles.boxSuggest}>{elmPreView}</View> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    marginHorizontal: 5,
    marginVertical: 10,
    zIndex: 99,
  },
  boxSuggest: {
    position: 'absolute',
    backgroundColor: COLOR.white,
    width: '100%',
    top: 50,
    zIndex: 99,
    elevation: 3,
    padding: 10,
  },
  suggestItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.primary,
  },
});

export default FormSearchPost;
