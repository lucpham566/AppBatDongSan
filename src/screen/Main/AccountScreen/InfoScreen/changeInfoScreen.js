import React, {useEffect, useState} from 'react';
import {
  Text,
  Container,
  Content,
  Header,
  Left,
  Button,
  Body,
  Right,
  Title,
  Card,
  CardItem,
  Thumbnail,
  Footer,
  Input,
  View,
  Item,
  Picker,
  Label,
} from 'native-base';
import {COLOR} from '../../../../theme/color';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet} from 'react-native';
import {urlServer} from '../../../../commons/server';
import axiosService from '../../../../commons/axiosService';
import {getToken} from '../../../../helpers/auth';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import 'moment/locale/vi';

import AvatarModel from './AvatarModal/AvatarModal';
import {noneAvatar} from '../../../../helpers/helper';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import * as actions from '../../../../actions/account';
function ChangeInfoScreen(props) {
  const [user, setUser] = useState({});
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const fetchUser = () => {
    axiosService
      .get(`${urlServer + 'api/user-profile'}`)
      .then(function (response) {
        if (response.data) {
          setUser(response.data);
          console.log(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const onChangeHandle = (e, name) => {
    // console.log(e.nativeEvent.text);
    const value = e.nativeEvent.text;
    setUser({...user, [name]: value});
  };

  const onsubmit = () => {
    axiosService
      .post(`${urlServer + 'api/change-info'}`, user)
      .then(function (response) {
        if (response.data) {
          setUser(response.data['201']);
          dispatch(actions.fetchAccount());
          props.navigation.goBack();
          Toast.show({
            type: 'success',
            text1: 'Chỉnh sửa thành công',
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        Toast.show({
          type: 'error',
          text1: 'Chỉnh sửa thất bại',
        });
      });
  };
  return (
    <Container>
      <Header style={{backgroundColor: COLOR.primary}}>
        <Left>
          <Button transparent onPress={() => props.navigation.goBack()}>
            <Icon size={20} color={COLOR.white} name="chevron-left" />
          </Button>
        </Left>
        <Body>
          <Title>Sửa thông tin</Title>
        </Body>
        <Right></Right>
      </Header>

      <Content style={styles.contentBody}>
        <Card>
          <CardItem bordered style={styles.boxInfoItem}>
            <Text style={styles.titleInfo}>Ảnh đại diện</Text>
            <View>
              <Thumbnail
                style={{width: 100, height: 100}}
                source={{
                  uri: user.avatar ? urlServer + user.avatar.image : noneAvatar,
                }}
              />
              <AvatarModel
                initAvatar={
                  user.avatar ? urlServer + user.avatar.image : noneAvatar
                }
                fetchUser={fetchUser}
              />
            </View>
          </CardItem>

          <CardItem bordered style={styles.boxInfoItem}>
            <Text style={styles.titleInfo}>Thông tin liên hệ</Text>

            <View>
              <Text style={{fontWeight: 'bold', marginBottom: 5}}>
                Họ tên :
              </Text>

              <Item style={{paddingLeft: 5, width: '100%'}} regular>
                <Input
                  placeholder={user.name}
                  data-name="name"
                  value={user.name}
                  onChange={e => onChangeHandle(e, 'name')}
                />
              </Item>
            </View>

            <View style={{marginTop: 3}}>
              <Text style={{fontWeight: 'bold', marginBottom: 5}}>
                Ngày sinh :
              </Text>

              <Item
                style={{paddingLeft: 5, width: '100%'}}
                regular
                onPress={() => setOpen(true)}>
                <Input
                  placeholder="Chưa có thông tin"
                  value={moment(user.birthday).format('l')}
                  disabled
                />
              </Item>
              <DatePicker
                modal
                mode="date"
                locale="vi"
                open={open}
                date={date}
                onConfirm={date => {
                  setOpen(false);
                  setUser({...user, birthday: moment(date).format()});
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </View>

            <View style={{marginTop: 3}}>
              <Text style={{fontWeight: 'bold', marginBottom: 5}}>Email :</Text>

              <Item style={{paddingLeft: 5, width: '100%'}} regular>
                <Input placeholder={user.email} disabled />
              </Item>
            </View>

            <View style={{marginTop: 3}}>
              <Text style={{fontWeight: 'bold', marginBottom: 5}}>
                Số điện thoại :
              </Text>

              <Item style={{paddingLeft: 5, width: '100%'}} regular>
                <Input
                  placeholder="Số điện thoại"
                  keyboardType={'number-pad'}
                  data-name="phone"
                  value={user.phone}
                  onChange={e => onChangeHandle(e, 'phone')}
                />
              </Item>
            </View>

            <View style={{marginTop: 3}}>
              <Text style={{fontWeight: 'bold', marginBottom: 5}}>
                Địa chỉ :
              </Text>

              <Item
                style={{
                  paddingLeft: 5,
                  width: '100%',
                }}
                regular>
                <Input
                  style={{textAlignVertical: 'top'}}
                  placeholder="Địa chỉ"
                  multiline={true}
                  numberOfLines={4}
                  data-name="address"
                  value={user.address}
                  onChange={e => onChangeHandle(e, 'address')}
                />
              </Item>
            </View>
          </CardItem>

          <CardItem style={styles.boxInfoItem}>
            <Text style={styles.titleInfo}>Loại user</Text>

            <View style={{marginTop: 3}}>
              <Text style={{fontWeight: 'bold', marginBottom: 5}}>Loại :</Text>
            </View>
            <Item picker regular>
              <Picker
                selectedValue={user.cate_id}
                mode="dropdown"
                onValueChange={val => setUser({...user, cate_id: val})}>
                <Picker.Item label="Cá nhân" value="1" />
                <Picker.Item label="Công ty" value="2" />
              </Picker>
            </Item>
          </CardItem>
          <CardItem style={styles.boxInfoItem}>
            <Text style={styles.titleInfo}>Giới thiệu</Text>

            <View style={{marginTop: 3}}>

              <Item
                style={{
                  width: '100%',
                }}
                regular>
                <Input
                  style={{textAlignVertical: 'top'}}
                  placeholder="Giới thiệu"
                  multiline={true}
                  numberOfLines={4}
                  data-name="intro"
                  value={user.intro}
                  onChange={e => onChangeHandle(e, 'intro')}
                />
              </Item>
            </View>
          </CardItem>
        </Card>
      </Content>

      <Footer style={{backgroundColor: COLOR.primary, padding: 5}}>
        <Button
          full
          style={{backgroundColor: 'transparent', elevation: 0, flex: 1}}
          onPress={onsubmit}>
          <Text>
            Sửa thông tin <Icon size={16} color={COLOR.white} name="pencil" />
          </Text>
        </Button>
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  contentBody: {
    padding: 5,
  },
  boxInfoItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  titleInfo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default ChangeInfoScreen;
