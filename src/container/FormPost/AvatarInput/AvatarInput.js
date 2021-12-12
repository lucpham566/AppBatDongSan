import React, {useState} from 'react';
import {ImageBackground, ScrollView, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {Button} from 'native-base';
import {COLOR} from '../../../theme';

function AvatarInput(props) {
  const {avatar, setAvatar} = props;
  const handleChosePhoto = () => {
    ImagePicker.openPicker({multiple: false}).then(photo => {
      setAvatar({...photo});
      // console.log(image.path.substring(image.path.lastIndexOf('/') + 1));
    });
  };
  const handleChosePhotoCam = () => {
    ImagePicker.openCamera({multiple: false}).then(photo => {
      console.log(photo);
      setAvatar({...photo});
    });
  };
  const removeImage = () => {
    setAvatar({});
  };
  let elmImage = avatar?.path ? (
    <ImageBackground
      source={{
        uri: avatar.path,
      }}
      style={{marginLeft: 3, width: 100, height: 100}}>
      <Button
        style={{padding: 5, height: 30}}
        transparent
        onPress={() => {
          removeImage();
        }}>
        <Text>
          <Icon size={16} name="times" style={{color: COLOR.primary}} />
        </Text>
      </Button>
    </ImageBackground>
  ) : null;
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

export default AvatarInput;
