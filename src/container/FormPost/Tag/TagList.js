import {CardItem, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import axiosService from '../../../commons/axiosService';
import {urlServer} from '../../../commons/server';
import TagItem from './TagItem';

const TagList = props => {
  const [data, setData] = useState([]);
  const [dataCheck, setDataCheck] = useState([]);
  const {setTag} = props;
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
  };

  useEffect(() => {
    setTag(dataCheck);
  }, [dataCheck]);

  const elmTagCheck = data.map((item, index) => {
    return <TagItem key={index} tag={item} onAddTag={(id) => onAddTag(id)} />;
  });
  
  return (
    <CardItem style={styles.tagList}>
      {elmTagCheck}
    </CardItem>
  );
};

const styles = StyleSheet.create({
  tagList: {
    flexWrap: 'wrap',
  },
});

export default TagList;
