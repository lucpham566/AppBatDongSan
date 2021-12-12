import {
  Body,
  CardItem,
  Container,
  Content,
  Header,
  Left,
  List,
  ListItem,
  Right,
  Text,
  Thumbnail,
  Title,
} from 'native-base';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  TouchableNativeFeedback,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import HeaderMain from '../../../component/HeaderMain/HeaderMain';
import {COLOR} from '../../../theme';
import {logout} from '../../../actions/auth';
import {useDispatch, useSelector} from 'react-redux';
import {getUserCate, noneAvatar} from '../../../helpers/helper';
import {urlServer} from '../../../commons/server';
import {ScrollView} from 'react-native-gesture-handler';

export default function AccountScreen(props) {
  const dispatch = useDispatch();
  const account = useSelector(state => state.account);
  console.log(account);
  const onLogout = () => {
    dispatch(logout());
    props.navigation.navigate('HomeLogin');
  };
  return (
    <Container>
      <HeaderMain title="Tài khoản" />
      <Content>
        <List>
          <CardItem bordered>
            <Thumbnail
              circular
              style={{width: 60, height: 60}}
              source={{
                uri: account.avatar
                  ? urlServer + account.avatar.image
                  : noneAvatar,
              }}
            />
            <Content style={{paddingLeft: 10}}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>
                {account.name}{' '}
                {account.active == 1 ? (
                  <Icon size={20} color={COLOR.primary} name="check-circle" />
                ) : (
                  ''
                )}
              </Text>
              <Text style={{fontSize: 14}}>{getUserCate(account.cate_id)}</Text>
            </Content>
          </CardItem>
          <TouchableNativeFeedback
            onPress={() => props.navigation.navigate('UserInfo')}>
            <ListItem icon>
              <Left>
                <Icon style={styles.iconLeft} size={20} name="user" />
              </Left>
              <Body>
                <Text style={styles.menuItem}>Thông tin tài khoản</Text>
              </Body>
              <Right>
                <Icon style={styles.iconLeft} size={14} name="arrow-right" />
              </Right>
            </ListItem>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() => props.navigation.navigate('UserPost')}>
            <ListItem icon>
              <Left>
                <Icon style={styles.iconLeft} size={20} name="clone" />
              </Left>
              <Body>
                <Text style={styles.menuItem}>Các bài đã đăng</Text>
              </Body>
              <Right>
                <Icon style={styles.iconLeft} size={14} name="arrow-right" />
              </Right>
            </ListItem>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() => props.navigation.navigate('UserPostFollow')}>
            <ListItem icon>
              <Left>
                <Icon style={styles.iconLeft} size={20} name="heart" />
              </Left>
              <Body>
                <Text style={styles.menuItem}>Các bài đang theo dõi</Text>
              </Body>
              <Right>
                <Icon style={styles.iconLeft} size={14} name="arrow-right" />
              </Right>
            </ListItem>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => alert(1)}>
            <ListItem icon>
              <Left>
                <Icon style={styles.iconLeft} size={20} name="newspaper-o" />
              </Left>
              <Body>
                <Text style={styles.menuItem}>Điều khoản sử dụng</Text>
              </Body>
              <Right>
                <Icon style={styles.iconLeft} size={14} name="arrow-right" />
              </Right>
            </ListItem>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => alert(1)}>
            <ListItem icon>
              <Left>
                <Icon style={styles.iconLeft} size={20} name="lock" />
              </Left>
              <Body>
                <Text style={styles.menuItem}>Đổi mật khẩu</Text>
              </Body>
              <Right>
                <Icon style={styles.iconLeft} size={14} name="arrow-right" />
              </Right>
            </ListItem>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={onLogout}>
            <ListItem icon>
              <Left>
                <Icon style={styles.iconLeft} size={20} name="sign-out" />
              </Left>
              <Body>
                <Text style={styles.menuItem}>Đăng xuất</Text>
              </Body>
            </ListItem>
          </TouchableNativeFeedback>
        </List>
        <Text
          style={{
            fontWeight: 'bold',
            marginHorizontal: 20,
            marginTop: 20,
            fontSize: 20,
            color: COLOR.primary,
          }}>
          Quảng cáo
        </Text>
        <ScrollView horizontal={true} style={{marginTop: 20, margin: 10}}>
          <TouchableOpacity>
            <ImageBackground
              source={{
                uri: 'https://bdsnghiduong.com/wp-content/uploads/sites/12/2017/08/Scenia-nhatrang-bay-banner.jpg',
              }}
              style={{
                marginLeft: 3,
                width: 200,
                height: 100,
                borderRadius: 10,
                backgroundColor: '#cfcfcf',
                overflow: 'hidden',
              }}></ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity>
            <ImageBackground
              source={{
                uri: 'https://bdsbacthanhnam.com/wp-content/uploads/2021/02/banner-bat-dong-san-lop-do-hoa-vtd5.jpg',
              }}
              style={{
                marginLeft: 3,
                width: 200,
                height: 100,
                borderRadius: 10,
                backgroundColor: '#cfcfcf',
                overflow: 'hidden',
              }}></ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity>
            <ImageBackground
              source={{
                uri: 'https://news.mogi.vn/wp-content/uploads/2020/09/bannerbatdongsan013.jpg',
              }}
              style={{
                marginLeft: 3,
                width: 200,
                height: 100,
                borderRadius: 10,
                backgroundColor: '#cfcfcf',
                overflow: 'hidden',
              }}></ImageBackground>
          </TouchableOpacity>
        </ScrollView>
        <Text
          style={{
            fontWeight: 'bold',
            marginHorizontal: 20,
            fontSize: 20,
            color: COLOR.primary,
          }}>
          Tin tức nổi bật
        </Text>
        <ScrollView horizontal={true} style={{marginTop: 20, margin: 10}}>
          <TouchableOpacity>
            <ImageBackground
              source={{
                uri: 'https://truyenthong247land.net/upload/images/BannerWeb_TNR-11.jpg',
              }}
              style={{
                marginLeft: 3,
                width: 150,
                height: 100,
                borderRadius: 10,
                backgroundColor: '#cfcfcf',
                overflow: 'hidden',
              }}></ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity>
            <ImageBackground
              source={{
                uri: 'https://accgroup.vn/wp-content/uploads/2021/09/thanh-lap-cong-ty-tai-Tay-Ban-Nha-2.jpg',
              }}
              style={{
                marginLeft: 3,
                width: 150,
                height: 100,
                borderRadius: 10,
                backgroundColor: '#cfcfcf',
                overflow: 'hidden',
              }}></ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity>
            <ImageBackground
              source={{
                uri: 'https://www.amec.com.vn/wp-content/uploads/2017/08/Barcelona.jpg',
              }}
              style={{
                marginLeft: 3,
                width: 150,
                height: 100,
                borderRadius: 10,
                backgroundColor: '#cfcfcf',
                overflow: 'hidden',
              }}></ImageBackground>
          </TouchableOpacity>
        </ScrollView>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  iconLeft: {
    color: COLOR.primary,
  },
  menuItem: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
