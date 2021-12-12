import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {
  Body,
  Button,
  Content,
  Footer,
  Header,
  Left,
  Right,
  Title,
} from 'native-base';
import {COLOR} from '../../../../../theme';
import ImageInput from './ImageInput';

function ModalImage(props) {
  const [modalVisible, setModalVisible] = useState(false);

  const {images, setImages} = useState([]);

  useEffect(() => {
    console.log('cc', images);
  }, [images]);
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
              <Title>Tìm kiếm</Title>
            </Body>
            <Right></Right>
          </Header>
          <Content>
            <View style={{flex: 1, alignItems: 'center'}}>
              <ImageInput images={images} setImages={setImages} />
            </View>
          </Content>
          <Footer style={{backgroundColor: COLOR.primary, padding: 5}}>
            <Button
              full
              style={{backgroundColor: 'transparent', elevation: 0, flex: 1}}>
              <Text style={{color: COLOR.white}}>
                Xác nhận
                <Icon size={16} color={COLOR.white} name="check" />
              </Text>
            </Button>
          </Footer>
        </View>
      </Modal>
      <Button
        style={{marginHorizontal: 5, backgroundColor: COLOR.primary}}
        block
        rounded
        light
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Tạo bài viết</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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

export default ModalImage;
