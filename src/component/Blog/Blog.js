import React from 'react';
import {Text} from 'native-base';
import {
  ImageBackground,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {COLOR} from './../../theme/color';
import {useSelector} from 'react-redux';
import {urlServer} from '../../commons/server';

Blog.propTypes = {};

function Blog(props) {
  const navigation = useSelector(state => state.screen.navigation);

  const goToDetail = id => {
    navigation.push('BlogDetail', {id});
  };

  const {blog} = props;

  return (
    <TouchableOpacity
      onPress={() => {
        goToDetail(blog.id);
      }}>
      <ImageBackground
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        source={{
          uri: 'urlServer + blog.avatar',
        }}
        style={styles.imageBackground}>
        <Text style={styles.title}>{blog.name}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLOR.white,
    margin: 10,
  },
});

export default Blog;
