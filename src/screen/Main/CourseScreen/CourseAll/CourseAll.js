import {Content} from 'native-base';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import axiosService from '../../../../commons/axiosService';
import {urlServer} from '../../../../commons/server';
import CourseList from '../../../../component/Course/CourseList';
import CourseCateSelect from '../../../../container/CourseCateSelect/CourseCateSelect';
import FormSearchCourse from '../FormSearchCourse/FormSearchCourse';
import PostListFilter from '../../../../component/PostListFilter/PostListFilter';
import ProductListCol from '../../../../component/ProductListCol/ProductListCol';
import local from '../../../../commons/local.json';
const CourseAll = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(local[0]);
    axiosService
      .get(`${urlServer + 'api/post'}`)
      .then(function (response) {
        setPosts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  console.log(posts);
  return (
    <Content>
      <FormSearchCourse setPosts={setPosts} />
      {/* <CourseCateSelect setPosts={setPosts} /> */}
      <ProductListCol postData={posts} />
    </Content>
  );
};

const styles = StyleSheet.create({});

export default CourseAll;
