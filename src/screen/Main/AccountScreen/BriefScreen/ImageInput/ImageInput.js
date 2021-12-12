import React, {useState} from 'react';
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
import {urlServer} from '../../../../../commons/server';
import axiosService from '../../../../../commons/axiosService';
import Toast from 'react-native-toast-message';

function ImageInput(props) {
  const [modalVisible, setModalVisible] = useState(false);

  const [photos, setPhotos] = useState([]);
  const [text, setText] = useState('abc');
  const {title, cate_id, fetchData} = props;

  const handleChosePhoto = () => {
    ImagePicker.openPicker({
      multiple: true,
    })
      .then(images => {
        setPhotos([...photos].concat(images));
        // console.log(image.path.substring(image.path.lastIndexOf('/') + 1));
      })
      .catch(err => {
        console.log('error' + err.toString());
      });
  };
  const handleChosePhotoCam = () => {
    ImagePicker.openCamera({
      multiple: false,
    }).then(photo => {
      setPhotos([...photos].concat([photo]));
    });
  };

  const removeImage = index => {
    let newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
  };

  const onSubmit = () => {
    const formData = new FormData();
    if (photos && photos.length > 0) {
      photos.map((item, index) => {
        const name = item.path.substring(item.path.lastIndexOf('/') + 1);
        formData.append(`images[]`, {
          uri: item.path,
          type: item.mime,
          name: name,
        });
      });
    }

    formData.append('cate_id', cate_id);
    axiosService
      .post(`${urlServer + 'api/user-brief'}`, formData)
      .then(function (response) {
        console.log(response);
        setPhotos([]);
        setModalVisible(false);
        fetchData();
        Toast.show({
          text1: 'Thêm ảnh thành công',
        });
      })
      .catch(function (error) {
        console.log(error);
        Toast.show({
          text1: 'Thêm ảnh thất bại',
        });
      });
  };

  let elmImage =
    photos.length > 0
      ? photos?.map((item, index) => {
          console.log(item.path);
          return (
            <ImageBackground
              key={index}
              source={{
                uri: item.path,
              }}
              style={{
                marginLeft: 3,
                width: 100,
                height: 100,
                borderRadius: 10,
                backgroundColor: '#cfcfcf',
              }}>
              <Button
                style={{padding: 5, height: 30}}
                transparent
                onPress={() => {
                  removeImage(index);
                }}>
                <Text>
                  <Icon size={16} name="times" style={{color: COLOR.primary}} />
                </Text>
              </Button>
            </ImageBackground>
          );
        })
      : null;
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
              <Title>{title}</Title>
            </Body>
            <Right></Right>
          </Header>
          <Content>
            <View style={{flex: 1, alignItems: 'center'}}>
              <ScrollView horizontal={true} style={{marginTop: 20}}>
                {elmImage}
                <TouchableOpacity
                  onPress={handleChosePhoto}
                  style={{
                    marginLeft: 3,
                    width: 100,
                    height: 100,
                    backgroundColor: '#cfcfcf',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>
                    <Icon
                      size={30}
                      name="plus"
                      style={{color: COLOR.primary}}
                    />
                  </Text>
                </TouchableOpacity>
              </ScrollView>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                  justifyContent: 'center',
                }}>
                <Button
                  style={{backgroundColor: COLOR.primary, marginRight: 10}}
                  light
                  onPress={handleChosePhoto}>
                  <Text style={{paddingHorizontal: 15, color: COLOR.white}}>
                    Chọn ảnh{' '}
                    <Icon size={16} name="image" style={{color: COLOR.white}} />
                  </Text>
                </Button>
                <Button
                  style={{backgroundColor: COLOR.primary}}
                  light
                  onPress={handleChosePhotoCam}>
                  <Text style={{paddingHorizontal: 15, color: COLOR.white}}>
                    Chụp ảnh{' '}
                    <Icon
                      size={16}
                      name="camera"
                      style={{color: COLOR.white}}
                    />
                  </Text>
                </Button>
              </View>
            </View>
          </Content>
          <Footer style={{backgroundColor: COLOR.primary, padding: 5}}>
            <Button
              full
              onPress={onSubmit}
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
        style={{
          marginHorizontal: 5,
          backgroundColor: COLOR.primary,
          width: 200,
          justifyContent: 'center',
        }}
        rounded
        block
        light
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Thêm ảnh</Text>
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

export default ImageInput;
