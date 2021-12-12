import React, {useEffect, useState} from 'react';
import {
  Text,
  Container,
  Content,
  Header,
  Left,
  Button,
  Body,
  Right,
  Title,
  Card,
  CardItem,
  Thumbnail,
  Footer,
  Spinner,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, Image, View, ScrollView} from 'react-native';
import {COLOR} from '../../../../theme';
import ImageInput from './ImageInput/ImageInput';
import {urlServer} from '../../../../commons/server';
import axiosService from '../../../../commons/axiosService';
import ModalImage from './ImageInput/ModalImage';

function BriefScreen(props) {
  const [data, setData] = useState([]);
  const fetchData = () => {
    axiosService
      .get(`${urlServer + 'api/user-brief'}`)
      .then(function (response) {
        if (response.data) {
          setData(response.data);
          console.log(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const elmBrief =
    data.length > 0 ? (
      data.map((item, index) => {
        return (
          <CardItem bordered style={styles.boxInfoItem}>
            <Text style={styles.titleInfo}>{item.title}</Text>

            <Content style={{marginTop: 3}}>
              <ScrollView horizontal={true} style={{marginBottom: 5}}>
                {item.images.map((image, index) => {
                  return (
                    <Image
                      key={index}
                      style={{width: 100, height: 100, marginRight: 5}}
                      source={{
                        uri: urlServer + image.image,
                      }}
                    />
                  );
                })}
              </ScrollView>

              <ImageInput
                title={item.title}
                cate_id={index + 1}
                fetchData={fetchData}
              />
            </Content>
          </CardItem>
        );
      })
    ) : (
      <Spinner color="red" />
    );

  return (
    <Container>
      <Header style={{backgroundColor: COLOR.primary}}>
        <Left>
          <Button transparent onPress={() => props.navigation.goBack()}>
            <Icon size={20} color={COLOR.white} name="chevron-left" />
          </Button>
        </Left>
        <Body>
          <Title>Hồ sơ du học</Title>
        </Body>
        <Right></Right>
      </Header>

      <Content style={styles.contentBody}>
        <Card>
          {elmBrief}
        </Card>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  contentBody: {
    padding: 5,
  },
  boxInfoItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  titleInfo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default BriefScreen;
