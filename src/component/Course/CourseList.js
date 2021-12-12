import {Button, Content, Spinner} from 'native-base';
import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {COLOR} from '../../theme';

import Course from './Course';

class CourseList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goToProductCate = () => {
    this.props.navigation.push('ProductCate');
  };

  render() {
    const {courseList} = this.props;
    const elmCourseList = courseList.length>0?courseList.map((item, index) => {
      return <Course key={item.id} course={item} />;
    }):<Spinner color='red' />;
    return <Content style={styles.listContainer}>{elmCourseList}</Content>;
  }
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 5,
    marginTop: 5,
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

const mapStateToProps = state => {
  return {
    navigation: state.screen.navigation,
  };
};

export default connect(mapStateToProps, null)(CourseList);
