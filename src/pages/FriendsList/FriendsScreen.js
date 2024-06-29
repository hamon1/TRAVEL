/**
 * 사용자 프로필 + 생성한 여행 보드 리스트
 * + 친구 목록, 프로필 수정
 *
 *
 */

import React, {useState, useEffect} from 'react';
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

import FriendList from '../../components/FriendList';
import Empty from '../../assets/Empty';
import SearchHeader from '../../components/SearchHeader';
import FriendProfileModal from '../../components/FriendProfie';

const FriendScreen = () => {
  const [user, setUser] = useState([
    {
      id: 1,
      text: 'user1',
      text2:
        'Excepteur anim culpa Lorem reprehenderit adipisicing excepteur consectetur et et eiusmod ex veniam consectetur velit.',
    },
    {
      id: 2,
      text: 'user2',
      text2:
        'Excepteur anim culpa Lorem reprehenderit adipisicing excepteur consectetur et et eiusmod ex veniam consectetur velit.',
    },
    {
      id: 3,
      text: 'user3',
      text2:
        'Excepteur anim culpa Lorem reprehenderit adipisicing excepteur consectetur et et eiusmod ex veniam consectetur velit.',
    },
    {
      id: 4,
      text: 'user4',
      text2:
        'Excepteur anim culpa Lorem reprehenderit adipisicing excepteur consectetur et et eiusmod ex veniam consectetur velit.',
    },
    {
      id: 5,
      text: 'user5',
      text2:
        'Excepteur anim culpa Lorem reprehenderit adipisicing excepteur consectetur et et eiusmod ex veniam consectetur velit.',
    },
    {
      id: 6,
      text: 'user6',
      text2:
        'Excepteur anim culpa Lorem reprehenderit adipisicing excepteur consectetur et et eiusmod ex veniam consectetur velit.',
    },
    {
      id: 7,
      text: 'user7',
      text2:
        'Excepteur anim culpa Lorem reprehenderit adipisicing excepteur consectetur et et eiusmod ex veniam consectetur velit.',
    },
  ]);

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

  const {height} = useWindowDimensions();

  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {}, []);

  const onPressModalOpen = () => {
    console.log('팝업을 여는 중입니다.');
    setIsModalVisible(true);
  };

  const onPressModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <SafeAreaProvider>
        <View style={styles.block}>
          <SearchHeader />
          <SafeAreaView style={[styles.list]}>
            <KeyboardAvoidingView>
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
                    onPress={onPressModalOpen}
                  />
                </>
              )}
              <Modal
                animationType="fade"
                visible={isModalVisible}
                transparent={true}>
                <View style={styles.modalView}>
                  <Text>hi</Text>
                  <FriendProfileModal onPress={onPressModalClose} />
                </View>
              </Modal>
            </KeyboardAvoidingView>
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
  modalView: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default FriendScreen;
