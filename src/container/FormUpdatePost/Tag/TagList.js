import {CardItem, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import axiosService from '../../../commons/axiosService';
import {urlServer} from '../../../commons/server';
import TagItem from './TagItem';

const TagList = props => {
  const [data, setData] = useState([]);
  const [dataCheck, setDataCheck] = useState([]);
  const {setTag, tags} = props;
  useEffect(() => {
    axiosService
      .get(`${urlServer + 'api/tag'}`)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const onAddTag = id => {
    const index = dataCheck.indexOf(id);
    if (index !== -1) {
      dataCheck.splice(index, 1);
    } else {
      setDataCheck([...dataCheck, id]);
    }
    console.log(dataCheck);
  };

  useEffect(() => {
    // setTag(dataCheck);
  }, [dataCheck]);

  const elmTagCheck = data.map((item, index) => {
    return <TagItem key={index} tag={item} onAddTag={id => onAddTag(id)} />;
  });

  const elmTagInit = tags.map((item, index) => {
    return (
      <TagItem
        checked={true}
        key={index}
        tag={item}
        onAddTag={id => onAddTag(id)}
      />
    );
  });

  return (
    <>
      <Text style={{fontWeight: 'bold', paddingLeft: 20}}>tag bài viết</Text>
      <CardItem style={styles.tagList}>{elmTagInit}</CardItem>
      <Text style={{fontWeight: 'bold', paddingLeft: 20}}>Thêm tag</Text>
      <CardItem style={styles.tagList}>{elmTagCheck}</CardItem>
    </>
  );
};

const styles = StyleSheet.create({
  tagList: {
    flexWrap: 'wrap',
  },
});

export default TagList;
