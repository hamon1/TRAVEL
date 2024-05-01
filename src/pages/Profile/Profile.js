/**
 * 사용자 프로필 + 생성한 여행 보드 리스트
 * + 친구 목록, 프로필 수정
 *
 *
 */

import React from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  Button,
  SafeAreaView,
} from 'react-native';

import Header from '../header/Top';
import Controlbar from '../Footer/ControlBar';

import {useNavigation} from '@react-navigation/native';

// export default class App extends React.Component {
//   state = {
//     data: [],
//     page: 1,
//     refreshing: false,
//   }

// /*데이터 가져옴, 가져온 데이터 페이지 +1, 임시로 API로 구축함*/
//   _getData = async () => {
//     const url = 'https://jsonplaceholder.typicode.com/photos?_limit=10';
//     fetch(url)
//       .then(res => res.json())
//       .then(data => {
//         this.setState({
//           data: this.state.refreshing ? data : this.state.data.concat(data),
//           page: this.state.page + 1,
//           refreshing: false,
//         });
//       });
//   }

//   /*refresh. 상단 새로고침*/
//   _handleRefresh = () => {
//     this.setState(
//       {
//         refreshing: true,
//         page: 1,
//       },
//       this._getData,
//     );
//   };

//   /** 생성된 보드 리스트의 데이터를 가져옴. */
//   /*무한 스크롤을 위한 데이터 가자오기*/
//   _handleLoadMore = () => { /*데이터 가저옴*/
//     this._getData();
//   }

//   componentDidMount() {
//     this._getData();
//   }

//   /*리스트 아이템-각 section 구현*/
//   _renderItem = ({item}) => (
//     <View style={styles.section}>
//       <Text style={styles.text_Name}>{item.title}</Text>
//       <Text style={styles.text}>{item.id}</Text>
//     </View>
//   );

//   render() {
//     return (
//       <>
//         <View style={styles.userProfile}>
//             <View style={styles.user_image}>
//                 <Image style={styles.image}></Image>
//             </View>

//             <View style={styles.introduce_box}>
//              <Text style={styles.profile_id_text}>userID</Text>
//             <Text style={styles.introduce_text}>Ad consequat fugiat ad nostrud aliqua occaecat culpa amet.</Text>
//             </View>

//         </View>
//         <FlatList
//           style={styles.container}
//           data={this.state.data}
//           renderItem={this._renderItem}
//           keyExtractor={(item, index) => item.id}
//           onEndReached={this._handleLoadMore}
//           onEndReachedThreshold={1}
//           refreshing={this.state.refreshing}
//           onRefresh={this._handleRefresh}
//         />
//         <Header />
//         <Controlbar />
//       </>
//     );
//   }
// }



const Profile = () => {
  const navigation = useNavigation();
  return (
    <>
      {/* <SafeAreaView style={{flex: 1}}> */}
        <View style={styles.userProfile}>
          <View style={styles.user_image}>
            <Image style={styles.image}></Image>
          </View>

          <View style={styles.introduce_box}>
            <Text style={styles.profile_id_text}>userID</Text>
            <Text style={styles.introduce_text}>
              Ad consequat fugiat ad nostrud aliqua occaecat culpa amet.
            </Text>
          </View>
        </View>
        <FlatList
          style={styles.container}
          // data={this.state.data}
          // renderItem={this._renderItem}
          // keyExtractor={(item, index) => item.id}
          // onEndReached={this._handleLoadMore}
          // onEndReachedThreshold={1}
          // refreshing={this.state.refreshing}
          // onRefresh={this._handleRefresh}
        />
        {/* <Header />
      <Controlbar /> */}
      {/* </SafeAreaView> */}
    </>
  );
};

const styles = StyleSheet.create({
  userProfile: {
    width: '100%',
    // top: 80,
    height: 128,
    backgroundColor: '#FFF8DE',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  container: {
    top: 128,
    backgroundColor: 'blue',
  },
  section: {
    borderRadius: 15,
    backgroundColor: '#FFE99C',
    marginLeft: 10,
    // borderBottomWidth: 1,
    marginTop: 20,
    height: 120,
    width: '95%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  image: {
    backgroundColor: 'gray',
    width: 64,
    height: 64,
    alignItems: 'center',
    top: 10,
    borderRadius: 45,
    // left: -50,
  },
  introduce_box: {
    width: '60%',
    height: 128,
    // backgroundColor: 'blue',
    paddingLeft: 10,
  },
  user_image: {
    width: '40%',
    height: 128,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_Name: {
    width: '90%',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    top: 10,
    left: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    color: 'black',
    top: 30,
    left: 10,
  },
  profile_id_text: {
    fontSize: 20,
    fontWeight: 'light',
    color: 'black',
    top: 20,
    left: 10,
    width: '50%',
  },
  introduce_text: {
    width: '50%',
  },
});

export default Profile;
