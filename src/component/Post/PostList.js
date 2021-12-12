import {Button, Content, Spinner} from 'native-base';
import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {COLOR} from '../../theme';
import Post from './Post';

function PostList(props) {
  const {postData} = props;
  if (postData && postData.data) {
    const posts = postData.data;
    const emlPostList =
      posts.length > 0 ? (
        posts.map((post, index) => {
          return <Post post={post} key={post.id} />;
        })
      ) : (
        <Spinner color="red" />
      );
    return <Content style={styles.listContainer}>{emlPostList}</Content>;
  } else {
    return <Spinner color="red" />;
  }
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 5,
    backgroundColor: 'white',
  },
  titleContainer: {
    flexDirection: 'row',
    backgroundColor: COLOR.primary,
    alignItems: 'center',
    padding: 2,
  },
  titleText: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fafafa',
  },
  seeMore: {
    fontSize: 14,
    color: COLOR.white,
  },
  content: {
    backgroundColor: 'white',
  },
});

export default PostList;
