/**
 * 매인 화면 (로그인 시, 가장 먼저 보이는 화면)
 * 여행지 추천 목록  - 무한 스크롤. - flatlist 통해 구현.
 * 상단 리롤, 데이터 get -> 임시 data API를 통해 구현함. (이후 데이터 구축)
 * 
 * @format
 */

import React from 'react';
import {View, Image, Text, FlatList, StyleSheet} from 'react-native';

import Header from '../header/Top';
import Controlbar from '../Footer/ControlBar';

export default class App extends React.Component {
  state = {
    data: [],
    page: 1,
    refreshing: false,
  }

/*데이터 가져옴, 가져온 데이터 페이지 +1, 임시로 API로 구축함*/
  _getData = async () => {
    const url = 'https://jsonplaceholder.typicode.com/photos?_limit=10'; 
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          data: this.state.refreshing ? data : this.state.data.concat(data),
          page: this.state.page + 1,
          refreshing: false,
        });
      });
  }

  /*refresh. 상단 새로고침*/
  _handleRefresh = () => { 
    this.setState(
      {
        refreshing: true,
        page: 1,
      },
      this._getData,
    );
  };

  /*무한 스크롤을 위한 데이터 가자오기*/
  _handleLoadMore = () => { /*데이터 가저옴*/
    this._getData();
  }

  componentDidMount() {
    this._getData();
  }

  /*리스트 아이템-각 section 구현*/
  _renderItem = ({item}) => (
    <View style={styles.section}>
      <Image source={{uri: item.url}} style={styles.image} />
      <Text style={styles.text_Name}>{item.title}</Text>
      <Text style={styles.text}>{item.id}</Text>
    </View>
  );

  render() {
    return (
      <>
        <FlatList
          style={styles.container}
          data={this.state.data}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => item.id}
          onEndReached={this._handleLoadMore}
          onEndReachedThreshold={1}
          refreshing={this.state.refreshing}
          onRefresh={this._handleRefresh}
        />
        <Header />
        <Controlbar />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    top: 80,
  },
  section: {
    backgroundColor: 'white',
    marginLeft: 10,
    marginTop: 20,
    height: 500,
    width: '95%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  image: {
    width: 64,
    height: 64,
    alignItems: 'center',
    top: 10,
    borderRadius: 15,
  },
  text_Name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    top: 20,
    left: 10,
  },
  text: {
    fontSize: 15,
    color: 'black',
    top: 30,
    left: 10,
  },
});
