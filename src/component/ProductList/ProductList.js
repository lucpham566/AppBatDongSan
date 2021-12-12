import {Button} from 'native-base';
import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {COLOR} from '../../theme';
import ProductItem from '../ProductItem/ProductItem';

const ProductList = props => {
  const {posts, title} = props;
  const elmPost =
    posts?.length > 0
      ? posts.map((item, index) => {
          return <ProductItem post={item} key={index} />;
        })
      : null;
  return (
    <View style={styles.listContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}> {title} </Text>
        {/* <Button transparent onPress={this.goToProductCate}>
          <Text style={styles.seeMore}> Xem thêm </Text>
        </Button> */}
      </View>
      <ScrollView
        horizontal={true}
        style={styles.content}
        showsHorizontalScrollIndicator={false}>
        {elmPost}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 5,
    marginTop: 10,
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

export default ProductList;
