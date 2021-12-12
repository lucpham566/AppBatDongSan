import React, {useState} from 'react';
import {ImageBackground, ScrollView, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {Button} from 'native-base';
import {COLOR} from '../../../theme';

function ImageInput(props) {
  const [photos, setPhotos] = useState([]);
  const [text, setText] = useState('abc');
  const {images, setImages} = props;
  const handleChosePhoto = () => {
    ImagePicker.openPicker({multiple: true}).then(photos => {
      setImages([...images].concat(photos));
      // console.log(image.path.substring(image.path.lastIndexOf('/') + 1));
    });
  };
  const handleChosePhotoCam = () => {
    ImagePicker.openCamera({multiple: true}).then(photo => {
      setImages([...images].concat([photo]));
    });
  };
  const removeImage = index => {
    let newPhotos = [...images];
    newPhotos.splice(index, 1);
    setImages(newPhotos);
  };
  let elmImage = images?.map((item, index) => {
    return (
      <ImageBackground
        key={index}
        source={{
          uri: item.path,
        }}
        style={{marginLeft: 3, width: 100, height: 100}}>
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
  });
  return (
    <View style={{flex: 1}}>
      <ScrollView horizontal={true}>{elmImage}</ScrollView>
      <View style={{flexDirection: 'row', marginTop: 5}}>
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
            <Icon size={16} name="camera" style={{color: COLOR.white}} />
          </Text>
        </Button>
      </View>
    </View>
  );
}

export default ImageInput;
