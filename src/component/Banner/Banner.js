import React, {Component, useEffect, useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';
import axiosService from '../../commons/axiosService';
import {urlServer} from '../../commons/server';
import {COLOR} from '../../theme';

const Banner = () => {
  const [imageAds, setImageAds] = useState([]);
  const [imageBanner, setImageBanner] = useState([]);

  useEffect(() => {
    axiosService
      .get(`${urlServer + 'api/image_service'}`)
      .then(function (response) {
        if (
          response.status === 200 &&
          response.data &&
          response.data.success &&
          response.data.imageCate
        ) {
          console.log(response);
          const imageAdsValue = response.data.imageCate[1].images;
          const imageBannerValue = response.data.imageCate[0].images;
          setImageAds(imageAdsValue);
          setImageBanner(imageBannerValue);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const elmBanner =
    imageBanner?.length > 0
      ? imageBanner.map((item, index) => {
          return (
            <View style={styles.slide} key={index}>
              <Image
                style={styles.image}
                source={{
                  uri: urlServer + item?.image,
                }}
              />
            </View>
          );
        })
      : null;
  const elmSwiper = elmBanner ? (
    <Swiper showsButtons={false} autoplay loop>
      {elmBanner}
    </Swiper>
  ) : null;
  return (
    <View style={styles.wrapper}>
      <Swiper autoplay loop>
        <View style={styles.slide1}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://phandatland.com/wp-content/uploads/banner-bat-dong-san-00-0.jpg',
            }}
          />
        </View>
        <View style={styles.slide2}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://news.mogi.vn/wp-content/uploads/2020/09/bannerbatdongsan013.jpg',
            }}
          />
        </View>
        <View style={styles.slide3}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://truyenthong247land.net/upload/images/BannerWeb_TNR-11.jpg',
            }}
          />
        </View>
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
    margin: 5,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default Banner;
