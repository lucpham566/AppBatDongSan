import React, {useEffect, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';

import HeaderMain from './../../../component/HeaderMain/HeaderMain';

import {Container, Content} from 'native-base';
import NotifyList from '../../../component/Notify/NotifyList';
import axiosService from '../../../commons/axiosService';
import {urlServer} from '../../../commons/server';
import {RefreshControl} from 'react-native';
function NotifyScreen(props) {
  const [notifyList, setNotifyList] = useState([]);

  const fetchNotifyList = () => {
    axiosService
      .get(`${urlServer + 'api/notification'}`)
      .then(function (response) {
        console.log(response.data);
        setNotifyList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onRefresh = () => {
    fetchNotifyList();
  };

  useEffect(() => {
    fetchNotifyList();
  },[]);

  // useFocusEffect(() => {
  //   onRefresh();
  // });

  return (
    <Container>
      <HeaderMain title="Thông báo" />
      <Content
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }>
        <NotifyList notifyList={notifyList} />
      </Content>
    </Container>
  );
}

export default NotifyScreen;
