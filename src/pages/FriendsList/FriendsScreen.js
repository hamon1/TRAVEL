/**
 * 사용자 프로필 + 생성한 여행 보드 리스트
 * + 친구 목록, 프로필 수정
 *
 *
 */

import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  useWindowDimensions,
  Modal,
  Pressable,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import FriendList from './components/FriendList';
// import Empty from '../../assets/Empty';
import SearchHeader from './components/SearchHeader';
import SearchContext from '../../context/SearchContext';
import SearchUserModal from './components/SearchUserModal';

import { searchUser } from './utils/searchUser';

import { getUserAuth } from '../../utils/getUserAuth';

import firestore, {query, orderBy, doc, deleteDoc} from '@react-native-firebase/firestore';
import FriendSection from './components/FriendSection';

import CustomToast from '../../components/CustomToast';

const FriendScreen = () => {
  // const {handleCountFriend} = route.params;

  // useEffect(() => {
  //   if (handleCountFriend) {
  //     handleCountFriend(); // Invoke the function passed from the previous screen
  //   }
  // }, []);
  // const foundUser = await searchUser('Oo');
  // console.log(foundUser);
  const [user, setUser] = useState([]);
  const [searchedFriend, setSearchedFriend] = useState();
  const [searchUserModalVisible, setSearchUserModalVisible] = useState(false);

  // const [toastVisible, setToastVisible] = useState(false);

  // const onToast = () => {
  //   setToastVisible(true);
  // }

  const searchedUser = () => {
    console.log('Press Search');
    setSearchUserModalVisible(true);
  }

  const searchedUserModalClose = () => {
    console.log('Press Search User Modal Close');
    setSearchUserModalVisible(false);
  }

  const userId = getUserAuth();

  useEffect(() => {
    // let isMounted = true;

    const unsubscribe = firestore()
      .collection('users')
      .doc(userId)
      .collection('friends')
      // .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        const fetchedFriends = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        if (fetchedFriends[0] === undefined) {
          console.log('no fetched friends');
          return;
        }
        else {
          setUser(fetchedFriends);

          firestore()
            .collection('users')
            .doc(userId)
            .update({
              friendCount: fetchedFriends.length,
              // pid: fetchedFriends[0].id,
            });
          console.log('Fetched Plan Success!// Friends length: ', fetchedFriends[0].id);
          // handleCountFriend(fetchedFriends.length);
          // setDocId(fetchedFriends[0].docId);
        }
        // console.log('Fetched Plan Success!// docId:', fetchedPlans[0].docId);
      }, error => {
        console.error("Error fetching plans: " + error);
      });

    // Clean up the subscription
    return () => {
      // isMounted = false;
      unsubscribe();
    }
  }, [userId]);

  // searchUser('Oo').then((foundUser) => {
  //   console.log(foundUser[0]);
  //   // setUser(foundUser);
  // }).catch((error) => {
  //   console.error(error);
  // });

  useEffect(() => {
    searchUser(keyword)
      .then(foundUser => {
        if (foundUser.length > 0) {
          setSearchedFriend(foundUser);
          console.log('Fetched Plan Success!// searchedFriend', searchedFriend);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [keyword]); 

  const handleUserData = (item) => {
    console.log('user data', item);
    setSearchedFriend(item);
  };

  const onInsert = text => {
    const nextId =
      user.length > 0 ? Math.max(...user.map(user => user.id)) + 1 : 1;
    const user = {
      id: nextId,
      text: 'user',
      text2:
        'Excepteur anim culpa Lorem reprehenderit adipisicing excepteur consectetur et et eiusmod ex veniam consectetur velit.',
    };
    setUser(user.concat(user));
  };

  const onRemove = id => {
    const nextUser = user.filter(user => user.id !== id);
    setUser(nextUser);
  };

  const navigation = useNavigation();

  const {keyword} = useContext(SearchContext);

  // const {height} = useWindowDimensions();

  return (
    <>
      <SafeAreaProvider>
        <View style={styles.block}>
          {/* <Text>{keyword}</Text> */}
          <SearchHeader openModal={searchedUser} handleUserData={handleUserData}/>
          <SafeAreaView style={[styles.list]}>
            <KeyboardAvoidingView>
              {/* <View style={{width: '100%', height: 100, backgroundColor: 'yellow'}}/> */}
              {searchedFriend ? (
                <View style={{width: '100%', height: 164, paddingTop: 12, backgroundColor: '#f6f6f6', borderBottomWidth: 3, borderColor: 'orange'}}>
                  <Text style={{color: 'gray'}}>유저 검색 결과</Text>
                {/* {id, userName, userId, photoUrl, text, text2, onRemove, onPress} */}
                  <FriendSection user={userId} userId={searchedFriend.id} userName={searchedFriend.displayName} photoUrl={searchedFriend.photoUrl} isAddFriend={true} />
                </View>
              ): 
              <View>
                <Text style={{width: '100%', height: 24, justifyContent: 'center'}}>
                  {/* <Text style={{color: 'gray'}}>
                    검색하신 결과가 없습니다.
                  </Text> */}
                </Text>
              </View>
              }
              {user.length === 0 ? (
                <View style={styles.emptyView}>
                  <Text style={styles.emptyViewText}>
                    친구 목록이 비어있습니다.
                  </Text>
                </View>
              ) : (
                <>
                  <FriendList
                    user={user}
                    onInsert={onInsert}
                    onRemove={onRemove}
                  />
                </>
              )}
            </KeyboardAvoidingView>
            {/* <CustomToast visible={toastVisible} message="이미 추가된 친구입니다."/> */}

            {/* <Pressable onPress={searchedUser} style={{width: 100, height: 100, backgroundColor: 'red'}}/> */}
            {/* <Modal 
            visible={searchUserModalVisible}
            transparent={true}
            >
              <SearchUserModal/>
            </Modal> */}
          </SafeAreaView>
        </View>
      </SafeAreaProvider>
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'white',
    // top: 76,
    flex: 1,
  },
  block: {
    flex: 1,
    // backgroundColor: 'green',
  },
  container: {
    top: 128,
    backgroundColor: 'blue',
  },
  emptyView: {
    // backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    top: 8,
  },
  emptyViewText: {
    color: 'gray',
  },
});

export default FriendScreen;
