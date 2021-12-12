import {Col, Grid, Text} from 'native-base';
import React from 'react';
import {View, StyleSheet, Image, ImageBackground} from 'react-native';
import {urlServer} from '../../../commons/server';
import {COLOR} from '../../../theme';

const ImageBox = props => {
  const {images} = props;
  let elmImage = null;
  elmImage = images.map((item, index) => {
    return (
      <Col style={{backgroundColor: '#635DB7', height: 200}}>
        <Image
          style={styles.Image}
          key={index}
          source={{
            uri: urlServer + item.image,
          }}
        />
      </Col>
    );
  });

  if (images.length == 2) {
    elmImage = images.map((item, index) => {
      return (
        <Col style={{backgroundColor: '#635DB7', height: 200}}>
          <Image
            style={styles.Image2}
            key={index}
            source={{
              uri: urlServer + item.image,
            }}
          />
        </Col>
      );
    });
  } else if (images.length == 3) {
    elmImage = (
      <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'red'}}>
        <View style={{flex: 2, backgroundColor: 'grey'}}>
          <Image
            style={styles.Image3}
            source={{
              uri: urlServer + images[0].image,
            }}
          />
        </View>
        <View style={{flex: 1, backgroundColor: 'grey'}}>
          <Image
            style={styles.Image3r}
            source={{
              uri: urlServer + images[1].image,
            }}
          />
          <Image
            style={styles.Image3r}
            source={{
              uri: urlServer + images[2].image,
            }}
          />
        </View>
      </View>
    );
  } else if (images.length == 4) {
    elmImage = (
      <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'red'}}>
        <View style={{flex: 1, backgroundColor: 'grey'}}>
          <Image
            style={styles.Image3r}
            source={{
              uri: urlServer + images[0].image,
            }}
          />
          <Image
            style={styles.Image3r}
            source={{
              uri: urlServer + images[1].image,
            }}
          />
        </View>
        <View style={{flex: 1, backgroundColor: 'grey'}}>
          <Image
            style={styles.Image3r}
            source={{
              uri: urlServer + images[2].image,
            }}
          />
          <Image
            style={styles.Image3r}
            source={{
              uri: urlServer + images[3].image,
            }}
          />
        </View>
      </View>
    );
  } else if (images.length > 4) {
    elmImage = (
      <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'red'}}>
        <View style={{flex: 1, backgroundColor: 'grey'}}>
          <Image
            style={{flex: 1, borderColor: COLOR.white, borderWidth: 2}}
            source={{
              uri: urlServer + images[0].image,
            }}
          />
          <Image
            style={{flex: 1, borderColor: COLOR.white, borderWidth: 2}}
            source={{
              uri: urlServer + images[1].image,
            }}
          />
        </View>
        <View style={{flex: 1, backgroundColor: 'grey'}}>
          <Image
            style={{flex: 1, borderColor: COLOR.white, borderWidth: 2}}
            source={{
              uri: urlServer + images[2].image,
            }}
          />
          <ImageBackground
            style={{flex: 1, borderColor: COLOR.white, borderWidth: 2}}
            source={{
              uri: urlServer + images[3].image,
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: COLOR.greyDark,
                opacity: 0.7,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{color: COLOR.white, fontWeight: 'bold', fontSize: 20}}>
                {images.length - 4}+
              </Text>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }

  if (images.length == 1) {
    return <View style={styles.container}>{elmImage}</View>;
  } else if (images.length == 2) {
    return (
      <View style={styles.container2}>
        <Grid>{elmImage}</Grid>
      </View>
    );
  } else if (images.length == 3) {
    return <View style={styles.container3}>{elmImage}</View>;
  } else if (images.length > 4) {
    return <View style={styles.container}>{elmImage}</View>;
  } else {
    return <View style={styles.container}>{elmImage}</View>;
  }
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
  },
  Image: {
    height: '100%',
    width: '100%',
  },
  container2: {
    width: '100%',
    height: 200,
  },
  Image2: {
    height: '100%',
    width: '100%',
    borderColor: COLOR.white,
    borderWidth: 2,
  },
  container3: {
    width: '100%',
    height: 200,
  },
  Image3: {
    height: '100%',
    width: '100%',
    borderColor: COLOR.white,
    borderWidth: 2,
  },
  Image3r: {
    height: '50%',
    width: '100%',
    borderColor: COLOR.white,
    borderWidth: 2,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

export default ImageBox;
