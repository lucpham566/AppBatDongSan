import React, {Component, Fragment, useEffect, useState} from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import axiosService from '../../../../../commons/axiosService';
import {urlServer} from '../../../../../commons/server';
import local from '../../../../../commons/local.json';
import {Text, View} from 'native-base';

const SelectSchool = props => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [items, setSchool] = useState(local);
  const [districts, setDistricts] = useState([]);
  const [title, setTitle] = useState('');
  const [titleDistrict, setTitleDistrict] = useState('');
  const {setSchoolId, setDistrictId} = props;
  return (
    <Fragment>
      <View style={{marginTop: 5}}>
        <Text style={{fontWeight: 'bold', marginBottom: 5}}>
          Tỉnh/Thành Phố :
        </Text>
      </View>
      <SearchableDropdown
        onItemSelect={item => {
          const items = selectedItems;
          items.push(item);
          setSchoolId(item.id);
          setTitle(item.name);
          setDistricts(item.districts);
          setDistrictId(null);
          setTitleDistrict('');
        }}
        onRemoveItem={(item, index) => {
          const items = selectedItems.filter(sitem => sitem.id !== item.id);
          setSelectedItems(items);
        }}
        itemStyle={{
          padding: 10,
          marginTop: 2,
          backgroundColor: '#ddd',
          borderColor: '#bbb',
          borderWidth: 1,
          borderRadius: 5,
        }}
        itemTextStyle={{color: '#222'}}
        itemsContainerStyle={{maxHeight: 140}}
        items={items}
        defaultIndex={2}
        resetValue={false}
        textInputProps={{
          placeholder: 'Chọn Tỉnh/Thành Phố',
          value: title,
          underlineColorAndroid: 'transparent',
          style: {
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
          },
          onTextChange: text => setTitle(text),
        }}
        listProps={{
          nestedScrollEnabled: true,
        }}
      />
      <View style={{marginTop: 5}}>
        <Text style={{fontWeight: 'bold', marginBottom: 5}}>Quận/Huyện :</Text>
      </View>
      <SearchableDropdown
        onItemSelect={item => {
          setDistrictId(item.id);
          setTitleDistrict(item.name);
        }}
        onRemoveItem={(item, index) => {
          const items = selectedDistricts.filter(sitem => sitem.id !== item.id);
          selectedDistricts(items);
        }}
        itemStyle={{
          padding: 10,
          marginTop: 2,
          backgroundColor: '#ddd',
          borderColor: '#bbb',
          borderWidth: 1,
          borderRadius: 5,
        }}
        itemTextStyle={{color: '#222'}}
        itemsContainerStyle={{maxHeight: 140}}
        items={districts}
        defaultIndex={2}
        resetValue={false}
        textInputProps={{
          placeholder: 'Chọn Quận/Huyện',
          value: titleDistrict,
          underlineColorAndroid: 'transparent',
          style: {
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
          },
          onTextChange: text => setTitleDistrict(text),
        }}
        listProps={{
          nestedScrollEnabled: true,
        }}
      />
    </Fragment>
  );
};

export default SelectSchool;
