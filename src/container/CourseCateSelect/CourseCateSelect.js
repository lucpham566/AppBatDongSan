import React, {useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableHighlight,
  TouchableOpacityBase,
  TouchableOpacity,
} from 'react-native';
import {
  Button,
  Form,
  Item,
  Label,
  Input,
  Header,
  Left,
  Body,
  Title,
  Right,
  CardItem,
  Thumbnail,
  Content,
  Textarea,
  Container,
  Separator,
  ListItem,
  Spinner,
} from 'native-base';
import {COLOR} from './../../theme/color';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import * as action from '../../actions/post';
import Toast from 'react-native-toast-message';
import axiosService from '../../commons/axiosService';
import {urlServer} from '../../commons/server';

const CourseCateSelect = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cates, setCate] = useState([]);
  const {setCourseList} = props;
  const [title, setTitle] = useState('Chọn danh mục');

  useEffect(() => {
    axiosService
      .get(`${urlServer + 'api/course-cate'}`)
      .then(function (response) {
        if (response.data) {
          setCate(response.data);
          console.log(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const onChangeCate = id => {
    setModalVisible(!modalVisible);
    axiosService
      .get(`${urlServer + 'api/get-cate-course/'}` + id)
      .then(function (response) {
        if (response.data) {
          console.log(response);
          setTitle(response.data.course_cate.name);
          setCourseList(response.data.courses);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getParentCateCourse = (product_cates, parent = 0, path) => {
    let elm = product_cates.map((item, index) => {
      if (item.parent_id == parent) {
        return (
          <ListItem key={item.id}>
            <TouchableOpacity
              onPress={() => onChangeCate(item.id)}
              style={{flex: 1}}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          </ListItem>
        );
      }
    });
    return elm;
  };

  const elmCate =
    cates.length > 0 ? (
      cates.map((item, index) => {
        if (item.parent_id == 0) {
          return (
            <>
              <Separator key={item.id}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  {item.name}
                </Text>
              </Separator>
              {getParentCateCourse(cates, item.id, '')}
            </>
          );
        }
      })
    ) : (
      <Spinner color="red" />
    );

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={{flex: 1}}>
          <Header style={{backgroundColor: COLOR.primary}}>
            <Left>
              <Button transparent onPress={() => setModalVisible(false)}>
                <Icon size={20} color={COLOR.white} name="chevron-left" />
              </Button>
            </Left>
            <Body>
              <Title>Chọn danh mục</Title>
            </Body>
            <Right></Right>
          </Header>
          <Content>{elmCate}</Content>
        </View>
      </Modal>
      <Button
        style={[styles.button, {marginHorizontal: 5}]}
        block
        light
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>
          {title}
          <Icon size={14} color={COLOR.white} name="caret-down" />
        </Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 10,
    elevation: 2,
    borderColor: 'red',
    borderWidth: 1,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default CourseCateSelect;
