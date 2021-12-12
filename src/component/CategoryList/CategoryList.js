import React, {Component} from 'react';
import {
  Container,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Text,
  Content,
} from 'native-base';
import {ScrollView} from 'react-native';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import Swiper from 'react-native-swiper';

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            transparent
            style={styles.CategoryItem}
            onPress={() => alert(2)}>
            <Image
              style={styles.image}
              source={{
                uri:
                  'https://kyma.vn/StoreData/images/pagedata/cac-loai-nhiep-anh-30-the-loai-nhiep-anh-pho-bien-ma-ban-co-the-thu-phan-177.jpg',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            transparent
            style={styles.CategoryItem}
            onPress={() => alert(2)}>
            <Image
              style={styles.image}
              source={{
                uri:
                  'https://kyma.vn/StoreData/images/pagedata/cac-loai-nhiep-anh-30-the-loai-nhiep-anh-pho-bien-ma-ban-co-the-thu-phan-177.jpg',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            transparent
            style={styles.CategoryItem}
            onPress={() => alert(2)}>
            <Image
              style={styles.image}
              source={{
                uri:
                  'https://kyma.vn/StoreData/images/pagedata/cac-loai-nhiep-anh-30-the-loai-nhiep-anh-pho-bien-ma-ban-co-the-thu-phan-177.jpg',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            transparent
            style={styles.CategoryItem}
            onPress={() => alert(2)}>
            <Image
              style={styles.image}
              source={{
                uri:
                  'https://kyma.vn/StoreData/images/pagedata/cac-loai-nhiep-anh-30-the-loai-nhiep-anh-pho-bien-ma-ban-co-the-thu-phan-177.jpg',
              }}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 150,
    padding:20

  },
  CategoryItem: {
      margin:5
  },
  wrapper: {
    padding: 5,
    height: 130,
  },
});

export default CategoryList;
