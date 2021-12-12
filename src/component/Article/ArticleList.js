import React from 'react';
import {Text, Content, Card, CardItem, Spinner} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLOR} from './../../theme/color';
import Article from './Article';

function ArticleList(props) {
  const {articleList, cate, option} = props;

  const elmArticleList =
    articleList.length > 0 ? (
      articleList.map((item, index) => {
        return <Article article={item} key={index} />;
      })
    ) : (
      <Spinner color="orange" />
    );

  return (
    <Content style={{padding: 5}}>
      {/* <Card style={{padding: 10}}>
        <Text style={{fontWeight: 'bold', fontSize: 20, color: COLOR.greyDark}}>
          Blog{' '}
          <Icon size={16} color={COLOR.greyDark} name="angle-double-right" />{' '}
          {cate.name}{' '}
          <Icon size={16} color={COLOR.greyDark} name="angle-double-right" />{' '}
          {option.name}
        </Text>
      </Card> */}

      {/* -------- list -------------- */}
      {elmArticleList}
    </Content>
  );
}

export default ArticleList;
