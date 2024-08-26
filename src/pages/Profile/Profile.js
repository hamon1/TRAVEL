/**
 * 사용자 프로필 + 생성한 여행 보드 리스트
 * + 친구 목록, 프로필 수정
 *
 * 아래 공간은 채팅 목록.
 */
import People from './components/FriendsButton';
import auth, { getAuth } from '@react-native-firebase/auth';
// import auth from '@react-native-firebase/auth';

import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Empty from '../../assets/Empty';

import { useNavigation } from '@react-navigation/native';
import Friends from './components/FriendsButton';
import Setting from '../../components/SettingButton';

import ChatList from '../../components/ChatList';

const Profile = () => {
  const navigation = useNavigation();

  // 채팅방 목록 상태 설정
  const [chatroom] = useState([
    {
      id: 1,
      text: 'user1',
      text2: 'Excepteur anim culpa Lorem reprehenderit adipisicing excepteur consectetur et et eiusmod ex veniam consectetur velit.',
    },
    {
      id: 2,
      text: 'user2',
      text2: 'Excepteur anim culpa Lorem reprehenderit adipisicing excepteur consectetur et et eiusmod ex veniam consectetur velit.',
    },
    {
      id: 3,
      text: 'user3',
      text2: 'Excepteur anim culpa Lorem reprehenderit adipisicing excepteur consectetur et et eiusmod ex veniam consectetur velit.',
    },
    {
      id: 4,
      text: 'user4',
      text2: 'Excepteur anim culpa Lorem reprehenderit adipisicing excepteur consectetur et et eiusmod ex veniam consectetur velit.',
    },
    {
      id: 5,
      text: 'user5',
      text2: 'Excepteur anim culpa Lorem reprehenderit adipisicing excepteur consectetur et et eiusmod ex veniam consectetur velit.',
    },
    {
      id: 6,
      text: 'user6',
      text2: 'Excepteur anim culpa Lorem reprehenderit adipisicing excepteur consectetur et et eiusmod ex veniam consectetur velit.',
    },
    {
      id: 7,
      text: 'user7',
      text2: 'Excepteur anim culpa Lorem reprehenderit adipisicing excepteur consectetur et et eiusmod ex veniam consectetur velit.',
    },
  ]);

  // 친구 수 계산
  const friendCount = chatroom.length;

  // 현재 사용자 인증 정보 가져오기
//   const [LoggedIn, setLoggedIn] = useState(false);

//   const checkLoggedIn = () => {
//     auth().onAuthStateChanged((user) => {
//         if (user) {
//             setLoggedIn(true)
//             console.log("loggedIn")
//         } else {
//             setLoggedIn(false)
//             console.log("loggedOut")
//         }
//     }
//     )
// }

// checkLoggedIn();

  const auth = getAuth();
  const user = auth.currentUser;

  console.log(auth);
  console.log('user: ' + user);

  return (
    <View style={styles.block}>
      {/* 사용자 프로필 섹션 */}
      <View style={styles.userProfile}>
        <Image
          style={styles.image}
          source={require('../../assets/Defualtuserimage.png')}
        />
        <Text style={styles.profile_name}>userName</Text>
        <Text style={styles.profile_id}>userId: 000000</Text>
        <Text style={styles.introduce_text}>
          Ad consequat fugiat ad nostrud aliqua occaecat culpa amet.
        </Text>
        <TouchableOpacity
          style={styles.friend}
          onPress={() => {
            navigation.navigate('FriendList');
          }}>
          <Friends friendCount={friendCount} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.setting}
          onPress={() => {
            navigation.navigate('Setting');
          }}>
          <Setting />
        </TouchableOpacity>
      </View>

      {/* 채팅 목록 섹션 */}
      <View style={styles.chatList}>
        <View style={styles.chatHeader}></View>
        {chatroom.length === 0 ? (
          <View style={styles.emptyView}>
            <Text style={styles.emptyViewText}>
              생성된 채팅 목록이 없습니다.
            </Text>
          </View>
        ) : (
          <>
            <ChatList chatList={chatroom} style={styles.chat} />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  userProfile: {
    paddingLeft: 10,
    top: 10,
    width: '95%',
    height: 320,
    backgroundColor: '#fb8c00',
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#4d4d4d',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  chatList: {
    top: 20,
    width: '100%',
    height: 334,
  },
  image: {
    backgroundColor: 'gray',
    width: 72,
    height: 72,
    borderRadius: 45,
    top: 56,
  },
  profile_name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    top: 80,
    width: '95%',
  },
  profile_id: {
    fontSize: 14,
    fontWeight: '300',
    fontStyle: 'italic',
    color: 'white',
    top: 88,
    width: '95%',
  },
  introduce_text: {
    width: '95%',
    height: '30%',
    top: 116,
  },
  friend: {
    position: 'absolute',
    top: 8,
    left: '84%',
  },
  setting: {
    position: 'absolute',
    left: 4,
  },
  chatHeader: {
    backgroundColor: 'white',
    height: 12,
    shadowColor: '#4d4d4d',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 999,
    justifyContent: 'center',
  },
  emptyView: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 8,
  },
  emptyViewText: {
    color: 'gray',
  },
});

export default Profile;
