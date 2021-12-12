import React, {useEffect, useState} from 'react';
import {Content, Spinner} from 'native-base';
import Blog from './Blog';
import {StyleSheet} from 'react-native';
import axiosService from '../../commons/axiosService';
import {urlServer} from '../../commons/server';

function BlogList(props) {
  const [data, setData] = useState([]);
  const fetchData = () => {
    axiosService
      .get(`${urlServer + 'api/article_cate'}`)
      .then(function (response) {
        console.log(response.data);
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  let elmCountryList =
    data.length > 0 ? (
      data.map((item, index) => {
        return <Blog blog={item} key={index} />;
      })
    ) : (
      <Spinner color="red" />
    );

  return <Content style={styles.listContainer}>{elmCountryList}</Content>;
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 5,
    marginTop: 10,
    backgroundColor: 'white',
  },
});

export default BlogList;
