/**
 * 매인 화면 (로그인 시, 가장 먼저 보이는 화면)
 * 여행지 추천 목록  - 무한 스크롤. - flatlist 통해 구현.
 * 상단 리롤, 데이터 get -> 임시 data API를 통해 구현함. (이후 데이터 구축)
 * 
 * @format
 */

// import React from 'react';
// import Controlbar from '../Footer/ControlBar';
// import Topbar from '../header/Top';

// import {
//   Text,
//   View,
//   StyleSheet,
//   ScrollView,
//   FlatList,
//   Button,
//   TouchableOpacity,
// } from 'react-native';

// import {NavigationContainer} from '@react-navigation/native';
// import {useNavigation} from '@react-navigation/native';

// // scrollview -> flatlist(travel data)
// export default function Home() {
//   // const navigation = useNavigation();
//   return (
//     <NavigationContainer>
//       <View style={styles.container}>
//         <ScrollView style={styles.boardScroll}>
//           <TouchableOpacity
//             style={styles.board}
//             onPress={() => navigation.navigate('PlaceDetaile')}>
//             <Text>Place1</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.board}
//             onPress={() => navigation.navigate('PlaceDetaile')}>
//             <Text>Place2</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </View>

//       <Topbar />
//       <Controlbar />
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'blue',
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: {
//     backgroundColor: 'black',
//     width: 42,
//     height: 42,
//     fontSize: 20,
//   },
//   board: {
//     margin: 10,
//     backgroundColor: 'red',
//     height: 600,
//     width: '95%',
//   },
//   boardScroll: {
//     width: '100%',
//     top: 84,
//     marginBottom: 60,
//   },
// });

// import React, {useState} from 'react';
// import {FlatList, StyleSheet, ActivityIndicator} from 'react-native';
// import FeedSection from '../Home/HomeFeedSection';

// const FeedScreen = () => {
//   const [loading, setLoading] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const data = [
//     {title: '첫번째 제목', content: '첫번째 글'},
//     {title: '두번째 제목', content: '두번째 글'},
//     {title: '세번째 제목', content: '세번째 글'},
//   ];

//   const getRefreshData = async () => {
//     setRefreshing(true);
//     await RefreshDataFetch();
//     setRefreshing(false);
//   };

//   const onRefresh = () => {
//     if (!refreshing) {
//       getRefreshData();
//     }
//   };

//   const getData = async () => {
//     if (FeedScreen.length >= 10 && !notNextFeed) {
//       setLoading(true);
//       await DataFetch();
//       setLoading(false);
//     }
//   };

//   const onEndReached = () => {
//     if (!loading) {
//       getData();
//     }
//   };

//   return (
//     <FlatList
//       style={styles.container}
//       onRefresh={onRefresh}
//       refreshing={refreshing}
//       onEndReached={onEndReached}
//       onEndReachedThreshold={0.6}
//       ListFooterComponent={loading && <ActivityIndicator />}
//     />
//   );
// };

// const styles=StyleSheet.create({
// 	container: {
//     	flex: 1
//     }
// })

// export default FeedScreen;
import React from 'react';
import {View, Image, Text, FlatList, StyleSheet} from 'react-native';

import Header from '../header/Top';
import Controlbar from '../Footer/ControlBar';
import Place_detaile from './Place_info';

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
      <Text style={styles.text}>
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
      </Text>
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
    // borderBottomWidth: 1,
    marginTop: 20,
    height: 500,
    width: '95%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
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
