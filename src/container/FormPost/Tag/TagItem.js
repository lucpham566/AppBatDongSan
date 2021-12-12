import {Item, Text} from 'native-base';
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {COLOR} from '../../../theme';

const TagItem = props => {
  const [check, setCheck] = useState(false);
  const {tag, onAddTag} = props;
  const onCheck = () => {
    setCheck(!check);
    onAddTag(tag.id);
  };

  if (check) {
    return (
      <Text style={styles.tagItemActive} onPress={onCheck}>
        {tag.name}
      </Text>
    );
  } else {
    return (
      <Text style={styles.tagItem} onPress={onCheck}>
        {tag.name}
      </Text>
    );
  }
};

const styles = StyleSheet.create({
  tagItem: {
    padding: 10,
    margin: 3,
    borderRadius: 5,
    backgroundColor: COLOR.grey,
  },
  tagItemActive: {
    padding: 10,
    margin: 3,
    borderRadius: 5,
    color:COLOR.white,
    backgroundColor: COLOR.primary,
  },
});

export default TagItem;
