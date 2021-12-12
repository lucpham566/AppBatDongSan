import {Content, Text} from 'native-base';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {COLOR} from '../../../theme';

const TagList = props => {
  const {tagList} = props;
  const elmTags = tagList?.map((item, index) => {
    return (
      <Text key={index} style={styles.tagItem}>
        {item.name}
      </Text>
    );
  });
  return (
    <View style={{flexDirection: 'row'}}>
      {elmTags}
    </View>
  );
};

const styles = StyleSheet.create({
  tagItem: {
    padding: 5,
    backgroundColor: COLOR.grey,
    margin: 2,
  },
});

export default TagList;
