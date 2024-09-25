import React, { useState, useContext } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
  Text,
  Modal,
  Keyboard,
} from 'react-native';

import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

import Icon from 'react-native-vector-icons/MaterialIcons';

import SearchContext from '../../../context/SearchContext';

import { getUserAuth } from '../../../utils/getUserAuth';
import { searchUser } from '../utils/searchUser';
import { addFriend } from '../utils/addFriend';

import SearchUserModal from './SearchUserModal';

function SearchHeader({ openModal, handleUserData }) {
  const [keyword, setKeyword] = useState('');
  const [userSearched, setUserSearched] = useState();

  const [searchUserModalVisible, setSearchUserModalVisible] = useState(false);

  const searchedUser = () => {
    console.log('Press Search');
    setSearchUserModalVisible(true);
  }

  const searchedUserModalClose = () => {
    console.log('Press Search User Modal Close');
    setSearchUserModalVisible(false);
  }

  const userId = getUserAuth();

  console.log(userId);

  const PressSearch = () => {
    console.log('Press Search');
    if (!keyword) {
      console.log('keyword not found');
      return;
    }
    searchUser(keyword, '', userId).then((foundUser) => {
      console.log('found User: ', foundUser[0]);
      setUserSearched(foundUser[0]);
      handleUserData(foundUser[0]);
    }).catch((error) => {
      console.error(error);
    });
    Keyboard.dismiss();
    // openModal();
  }

  // searchUser('Oo').then((foundUser) => {
  //   console.log(foundUser[0]);
  //   setUserSearched(foundUser);
  // }).catch((error) => {
  //   console.error(error);
  // });

  return (
    <View style={styles.block}>
      {/* <Modal 
      visible={searchUserModalVisible}
      transparent={true}
      >
        <SearchUserModal/>
      </Modal> */}
      <TextInput
        style={styles.input}
        placeholder="유저 아이디를 입력하세요"
        value={keyword}
        onChangeText={setKeyword}
        // autoFocus
        onSubmitEditing={PressSearch}
      />
      <Pressable
        style={({pressed}) => [styles.button, pressed && {opacity: 0.5}]}
        onPress={() => setKeyword('')}>
        <Icon name="cancel" size={18} color="#9e9e9e" />
      </Pressable>
      <Pressable
        style={({pressed}) => [styles.button, pressed && {opacity: 0.5}]}
        onPress={PressSearch}
        >
        <Icon name="search" size={26} color="black" />
      </Pressable>
      {/* <Pressable
      style={{width: 100, height: 100, backgroundColor: 'green', position: 'absolute', top: 200,}}
      onPress={() => {
        console.log("Press addFriend");
        if (userSearched) {
          addFriend(userId, userSearched)
        }
        else {
          console.log("No user searched");
        }
      }}
      /> */}
      {/* <Pressable onPress={searchedUser} style={{width: 100, height: 100, backgroundColor: 'red'}}/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    shadowColor: '#4d4d4d',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    zIndex: 999,
    // top: 30,
  },
  input: {
    flex: 1,
    // backgroundColor: 'blue',
  },
  button: {
    marginLeft: 8,
  },
});

export default SearchHeader;
