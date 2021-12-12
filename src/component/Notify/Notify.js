import React from 'react';
import moment from 'moment';
import 'moment/locale/vi';
import {
  View,
  StyleSheet,
  Button,
  TouchableHighlight,
  Alert,
  TouchableNativeFeedback,
  Image,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Thumbnail,
  Icon,
} from 'native-base';
import {urlServer} from '../../commons/server';
import {noneAvatar} from '../../helpers/helper';

function Notify(props) {
  const {notify, created_at} = props;
  return (
    <TouchableNativeFeedback
      onPress={() => {
        props.goToDetail(notify.post_id);
      }}>
      <Card>
        <CardItem>
          <Thumbnail
            circular
            style={{width: 50, height: 50}}
            source={{
              uri: notify.avatar ? urlServer + notify.avatar : noneAvatar,
            }}
          />
          <Content style={{paddingLeft: 10}}>
            <Text>
              <Text style={{fontWeight: 'bold'}}>{notify.user_name}</Text>{' '}
              {notify.option_text}:{' '}
              <Text numberOfLines={1}>{notify.content}</Text>
            </Text>
            <Text style={{fontSize: 14}}>{moment(created_at).fromNow()}</Text>
          </Content>
        </CardItem>
      </Card>
    </TouchableNativeFeedback>
  );
}

export default Notify;
