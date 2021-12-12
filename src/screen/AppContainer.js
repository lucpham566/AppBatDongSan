import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeLogin from './Login/HomeLogin';
import Login from './Login/Login';
import SignUp from './Login/SignUp';
import Main from './Main/Main';
import ProductDetail from './ProductDetail/ProductDetail';
import Checkout from './Checkout/Checkout';
import ProductCate from './ProductCate/ProductCate';
import InfoScreen from './Main/AccountScreen/InfoScreen/InfoScreen';
import BriefScreen from './Main/AccountScreen/BriefScreen/BriefScreen';
import PostScreen from './Main/AccountScreen/PostScreen/PostScreen';
import CourseDetailScreen from './Main/CourseScreen/CourseDetailScreen/CourseDetailScreen';
import BlogDetailScreen from './Main/BlogScreen/BlogDetailScreen/BlogDetailScreen';
import BlogCateScreen from './Main/BlogScreen/BlogCateScreen/BlogCateScreen';
import ArticleDetailScreen from './Main/BlogScreen/ArticleDetailScreen/ArticleDetailScreen';
import ChangeInfoScreen from './Main/AccountScreen/InfoScreen/changeInfoScreen';
import PostDetail from './PostDetail/PostDetail';
import {Text} from 'native-base';
import GlobalLoading from '../container/GlobalLoading/GlobalLoading';
import {useSelector} from 'react-redux';
import PostFollowScreen from './Main/AccountScreen/PostFollowScreen/PostFollowScreen';

const Stack = createStackNavigator();

const AppContainer = props => {
  const globalLoading = useSelector(state => state.screen.globalLoading);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeLogin" component={HomeLogin} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="MainScreen" component={Main} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="ProductCate" component={ProductCate} />
        <Stack.Screen name="PostDetail" component={PostDetail} />

        {/* ---------- user screens ------------ */}
        <Stack.Screen name="UserInfo" component={InfoScreen} />
        <Stack.Screen name="ChangeUserInfo" component={ChangeInfoScreen} />
        <Stack.Screen name="UserBrief" component={BriefScreen} />
        <Stack.Screen name="UserPost" component={PostScreen} />
        <Stack.Screen name="UserPostFollow" component={PostFollowScreen} />

        {/* ---------- course screen --------------- */}
        <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />

        {/* ---------- blog screen --------------- */}
        <Stack.Screen name="BlogDetail" component={BlogDetailScreen} />
        <Stack.Screen name="BlogCate" component={BlogCateScreen} />
        <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} />

        {/* ---------- notify screen --------------- */}
      </Stack.Navigator>
      {globalLoading ? <GlobalLoading /> : null}
    </NavigationContainer>
  );
};

export default AppContainer;
