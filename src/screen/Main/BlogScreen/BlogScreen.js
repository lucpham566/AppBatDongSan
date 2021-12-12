import React, {useEffect, useState} from 'react';
import HeaderMain from './../../../component/HeaderMain/HeaderMain';
import axiosService from '../../../commons/axiosService';

import {Container, Content} from 'native-base';
import BlogList from './../../../component/Blog/BlogList';
import {urlServer} from '../../../commons/server';
import ArticleList from '../../../component/Article/ArticleList';

function BlogScreen(props) {
  const [data, setData] = useState([]);
  const fetchData = () => {
    axiosService
      .get(`${urlServer + 'api/article'}`)
      .then(function (response) {
        if (response.data && response.data.articles) {
          setData(response.data.articles);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Container>
      <HeaderMain title="Tin tức" />
      <Content>
        <ArticleList articleList={data} />
      </Content>
    </Container>
  );
}

export default BlogScreen;
