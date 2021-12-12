import React, {useEffect, useState} from 'react';
import HeaderMain from './../../../component/HeaderMain/HeaderMain';
import CourseList from './../../../component/Course/CourseList';

import {Container, Content} from 'native-base';
import axiosService from '../../../commons/axiosService';
import {urlServer} from '../../../commons/server';
import CourseAll from './CourseAll/CourseAll';
import PostListFilter from '../../../component/PostListFilter/PostListFilter';

function CourseScreen(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axiosService
      .get(`${urlServer + 'api/post'}`)
      .then(function (response) {
        setPosts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <HeaderMain title="Tìm kiếm" />
      <CourseAll/>
    </Container>
  );
}

export default CourseScreen;
