import React from 'react';
import PropTypes from 'prop-types';
import { View, Icon, Text, Left } from 'native-base';
import { StyleSheet } from 'react-native';
import { COLOR } from '../../../../theme';

Review.propTypes = {};

function Review(props) {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.starContainer}>
        <Icon style={[styles.star,{color: COLOR.starActive}]} name="star" />
        <Icon style={[styles.star,{color: COLOR.starActive}]} name="star" />
        <Icon style={[styles.star,{color: COLOR.starActive}]} name="star" />
        <Icon style={[styles.star,{color: COLOR.starActive}]} name="star" />
        <Icon style={[styles.star,{color: COLOR.starActive}]} name="star" />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
            550 đánh giá
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    rootContainer:{
        flexDirection:'row',
        justifyContent: 'flex-start',
        marginVertical:5
    },
    starContainer:{
        flexDirection:'row',
    },
    star:{
        fontSize:14
    },
    
    infoContainer:{
        marginLeft:5,
    },
    infoText:{
        fontSize:14
    }
})

export default Review;
