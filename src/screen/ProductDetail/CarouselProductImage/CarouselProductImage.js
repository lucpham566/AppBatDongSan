import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';
import {urlServer} from '../../../commons/server';

const CarouselProductImage = props => {
  const images = props.images ? props.images : null;
  const {avatar} = props;
  const elmImage =
    images?.length > 0
      ? images.map((item, index) => {
          return (
            <View key={index} style={styles.slide1}>
              <Image
                style={styles.image}
                source={{
                  uri: urlServer + item.image,
                }}
              />
            </View>
          );
        })
      : null;
  return (
    <View>
      <Swiper style={styles.wrapper} showsButtons={false} autoplay loop>
        <View style={styles.slide1}>
          <Image
            style={styles.image}
            source={{
              uri: urlServer + avatar,
            }}
          />
        </View>
        {elmImage}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  wrapper: {
    height: 300,
  },
});

export default CarouselProductImage;
