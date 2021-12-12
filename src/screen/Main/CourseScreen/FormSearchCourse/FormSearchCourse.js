import {
  Body,
  Button,
  Col,
  Content,
  Footer,
  Grid,
  Header,
  Input,
  Item,
  Label,
  Left,
  Picker,
  Right,
  Text,
  Title,
  View,
} from 'native-base';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {Modal} from 'react-native';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axiosService from '../../../../commons/axiosService';
import {urlServer} from '../../../../commons/server';
import {COLOR} from '../../../../theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectSchool from './SelectSchool/SelectSchool';

const FormSearchCourse = props => {
  const [price, setPrice] = useState({min: 0, max: 10000});
  const [time, setTime] = useState({min: 0, max: 10});
  const [name, setName] = useState('');
  const [schoolId, setSchoolId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const [sortBy, setSortBy] = useState('');
  const {setPosts} = props;
  const [modalVisible, setModalVisible] = useState(false);

  const onChangePrice = values => {
    setPrice({min: values[0], max: values[1]});
  };

  const onChangeTime = values => {
    setTime({min: values[0], max: values[1]});
  };

  const onSubmit = () => {
    setModalVisible(!modalVisible);
    let formData = new FormData();
    formData.append('price_min', price.min * 1000000);
    formData.append('price_max', price.max * 1000000);
    formData.append('time_min', time.min);
    formData.append('time_max', time.max);
    if (name) {
      formData.append('name', name);
    }
    if (sortBy) {
      formData.append('sort_by', sortBy);
    }
    if (schoolId) {
      formData.append('province_id', schoolId);
      if (districtId) {
        formData.append('district_id', districtId);
      }
    }

    axiosService
      .post(`${urlServer + 'api/all_post'}`, formData)
      .then(function (response) {
        if (response.status === 200 && response.data) {
          setPosts(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
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
            <View style={{padding: 10}}>
              <View style={{marginTop: 5}}>
                <Text style={{fontWeight: 'bold', marginBottom: 5}}>
                  Tìm kiếm theo tiêu đề :
                </Text>
              </View>
              <Item style={{}} regular>
                <Input
                  placeholder="Ví dụ : Dự án tốt"
                  data-name="name"
                  onChangeText={val => setName(val)}
                />
              </Item>

              <SelectSchool
                setDistrictId={setDistrictId}
                setSchoolId={setSchoolId}
              />

              <View style={{marginTop: 5}}>
                <Text style={{fontWeight: 'bold', marginBottom: 5}}>
                  Sắp xếp theo :
                </Text>
              </View>
              <Item picker regular>
                <Picker
                  mode="dropdown"
                  selectedValue={sortBy}
                  onValueChange={val => setSortBy(val)}>
                  <Picker.Item label="Mặc định" value="" />
                  <Picker.Item label="Giá thấp đến cao" value="price_asc" />
                  <Picker.Item label="Giá cao đến thấp" value="price_desc" />
                  <Picker.Item label="Tên a-z" value="name_asc" />
                  <Picker.Item label="Tên z-a" value="name_desc" />
                </Picker>
              </Item>

              <View style={{marginTop: 5}}>
                <Text style={{fontWeight: 'bold', marginBottom: 5}}>
                  Khoảng giá {'(Triệu VNĐ)'}:
                </Text>
              </View>
              <Item style={{justifyContent: 'center', marginTop: 40}}>
                <MultiSlider
                  values={[price.min, price.max]}
                  sliderLength={300}
                  onValuesChange={onChangePrice}
                  min={0}
                  max={10000}
                  step={1}
                  allowOverlap
                  snapped
                  enableLabel
                />
              </Item>
            </View>
          </Content>
          <Footer style={{backgroundColor: COLOR.primary, padding: 5}}>
            <Button
              full
              onPress={onSubmit}
              style={{backgroundColor: 'transparent', elevation: 0, flex: 1}}>
              <Text>
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
        <Text style={styles.textStyle}>
          <Icon size={16} color={COLOR.white} name="search" /> Tìm kiếm{' '}
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
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: COLOR.primary,
    paddingHorizontal: 10,
    paddingVertical: 20,
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

export default FormSearchCourse;
