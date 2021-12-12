import React from 'react';
import {Content, Text} from 'native-base';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLOR} from './../../theme/color';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import {urlServer} from '../../commons/server';

function Article(props) {
  const navigation = useSelector(state => state.screen.navigation);
  const {article} = props;
  const goToDetail = id => {
    navigation.push('ArticleDetail', {id});
  };

  return (
    <TouchableOpacity
      onPress={() => {
        goToDetail(article.id);
      }}>
      <ImageBackground
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        source={{
          uri: urlServer + article.avatar,
        }}
        style={styles.imageBackground}>
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {article.name}
          </Text>
          <Text style={styles.text} numberOfLines={3}>
            {article.intro}
          </Text>
          <Text style={{textAlign: 'right', color: COLOR.grey, marginTop: 10}}>
            <Icon size={16} color={COLOR.grey} name="clock-o" /> Chủ nhật,
            {moment(article.created_at).format('l')}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    height: 200,
    overflow: 'hidden',
    marginBottom: 10,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: 'rgba(52, 52, 52, 0.1)',
  },
  content: {
    padding: 10,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLOR.white,
  },
  text: {
    fontSize: 16,
    color: COLOR.white,
  },
});

export default Article;
