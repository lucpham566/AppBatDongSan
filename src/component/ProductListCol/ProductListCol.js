import {Button, Content, Container, Spinner} from 'native-base';
import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {COLOR} from '../../theme';
import ProductItem from './ProductItem/ProductItem';

const ProductListCol = props => {
  const {postData} = props;
  const posts = postData.data ? postData.data : [];
  console.log(posts);
  const elmPostItem =
    posts.length > 0 ? (
      posts?.map((item, index) => {
        return <ProductItem post={item} key={index} />;
      })
    ) : (
      <Spinner color="orange" />
    );
  return <View style={styles.content}>{elmPostItem}</View>;
};

const styles = StyleSheet.create({
  listContainer: {
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default ProductListCol;
