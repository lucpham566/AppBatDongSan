import React, {Component, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useDispatch, useSelector} from 'react-redux';

import HomeScreen from './HomeScreen/HomeScreen';
import AccountScreen from './AccountScreen/AccountScreen';
import CourseScreen from './CourseScreen/CourseScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import BlogScreen from './BlogScreen/BlogScreen';
import NotifyScreen from './NotifyScreen/NotifyScreen';
import {COLOR} from '../../theme';
import {urlServer} from '../../commons/server';
import axiosService from '../../commons/axiosService';

import Pusher from 'pusher-js/react-native';
import {fetchAccount} from '../../actions/account';

const Tab = createBottomTabNavigator();

const Main = () => {
  const [notifyList, setNotifyList] = useState([]);
  const user = useSelector(state => state.account);
  const dispatch = useDispatch();

  const fetchNotify = () => {
    axiosService
      .get(`${urlServer + 'api/unseen_notification'}`)
      .then(function (response) {
        if (response.data && response.data.length) {
          setNotifyList(response.data);
          console.log(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    var pusher = new Pusher('4d2c5d197fef349e43e4', {
      cluster: 'ap1',
      encrypted: true,
    });
    var channel = pusher.subscribe('user' + user?.id);
    channel.bind('comment-event', function (data) {
      fetchNotify();
    });
  }, []);

  useEffect(() => {
    dispatch(fetchAccount());
    fetchNotify();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Home') {
            return <Icon size={size} name="home" style={{color: color}} />;
          } else if (route.name === 'Course') {
            return <Icon size={size} name="search" style={{color: color}} />;
          } else if (route.name === 'Blog') {
            return <Icon size={size} name="book" style={{color: color}} />;
          } else if (route.name === 'Account') {
            return <Icon size={size} name="user" style={{color: color}} />;
          } else if (route.name === 'Notification') {
            return <Icon size={size} name="bell" style={{color: color}} />;
          }
        },
        tabBarLabel: ({focused, color, size}) => {
          if (route.name === 'Home') {
            return <Text style={{fontSize:12,color: color}}>Trang chủ</Text>;
          } else if (route.name === 'Course') {
            return <Text style={{fontSize:12,color: color}}>Tìm kiếm</Text>;
          } else if (route.name === 'Blog') {
            return <Text style={{fontSize:12,color: color}}>Blog</Text>;
          } else if (route.name === 'Account') {
            return <Text style={{fontSize:12,color: color}}>Tài khoản</Text>;
          } else if (route.name === 'Notification') {
            return <Text style={{fontSize:12,color: color}}>Thông báo</Text>;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: COLOR.primary,
        inactiveTintColor: 'gray',
        showLabel: true,
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Course" component={CourseScreen} />
      <Tab.Screen name="Blog" component={BlogScreen} />
      <Tab.Screen
        name="Notification"
        component={NotifyScreen}
        options={{tabBarBadge: notifyList.length}}
      />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

export default Main;
