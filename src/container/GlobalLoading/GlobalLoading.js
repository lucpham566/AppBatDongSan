import {Spinner, Text} from 'native-base';
import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import { COLOR } from '../../theme';
var {width, height} = Dimensions.get('window');

const GlobalLoading = () => {
  return (
    <View style={styles.container}>
      <View style={styles.overlay}></View>
      <Spinner color={COLOR.primary}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    width: width,
    height: height,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    width: width,
    height: height,
    justifyContent: 'center',
  },
});

export default GlobalLoading;
