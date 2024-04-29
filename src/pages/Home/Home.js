// // /**
// //  * 매인 화면 (로그인 시, 가장 먼저 보이는 화면)
// //  * 여행지 추천 목록  - 무한 스크롤.
// //  *
// //  * @format
// //  */

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

export default class App extends React.Component {
  state = {
    data: [],
    page: 1,
    refreshing: false,
  }

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

  _handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
        page: 1,
      },
      this._getData,
    );
  };

  _handleLoadMore = () => {
    this._getData();
  }

  componentDidMount() {
    this._getData();
  }

  _renderItem = ({item}) => (
    <View style={{borderBottomWidth:1, marginTop: 20}}>
      <Image source={{uri: item.url}} style={{height: 200}} />
      <Text>{item.title}</Text>
      <Text>{item.id}</Text>
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
});
