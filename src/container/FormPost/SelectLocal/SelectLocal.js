import React, {Component, Fragment, useEffect, useState} from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import local from '../../../commons/local.json';
import {Label, Text, View} from 'native-base';

const SelectLocal = props => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [items, setSchool] = useState(local);
  const [districts, setDistricts] = useState([]);
  const [title, setTitle] = useState('');
  const [titleDistrict, setTitleDistrict] = useState('');
  const {setProvinceId, setDistrictId} = props;
  console.log(districts);
  return (
    <Fragment>
      <View style={{marginTop: 5}}>
        <Label style={{fontWeight: 'bold', marginBottom: 5}}>
          Tỉnh/Thành Phố :
        </Label>
      </View>
      <SearchableDropdown
        onItemSelect={item => {
          const items = selectedItems;
          items.push(item);
          setProvinceId(item.id);
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
        <Label style={{fontWeight: 'bold', marginBottom: 5}}>Quận/Huyện :</Label>
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

export default SelectLocal;
