/**
 * 사용자 프로필 + 생성한 여행 보드 리스트
 * + 친구 목록, 프로필 수정
 *
 * 아래 공간은 채팅 목록.
 */
import People from '../../components/FriendsButton';

import React, {useState} from 'react';
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
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import PlanList from '../../components/PlanList';
import Empty from '../../assets/Empty';

import {useNavigation} from '@react-navigation/native';
import PlaceList from '../../components/PlaceList';
import Friends from '../../components/FriendsButton';
import Setting from '../../components/SettingButton';

const Profile = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.block}>
      {/** 사용자 프로필 (프로필 사진, 이름, id, 개인 소개글) */}
      <View style={styles.userProfile}>
        <Image
          style={styles.image}
          /** 이미지 설정(기본 값)
           * 이후 사용자가 선택한 이미지로 변경 가능하게.
           */
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
          <Friends />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.setting}
          onPress={() => {
            navigation.navigate('Setting');
          }}>
          <Setting />
        </TouchableOpacity>
      </View>
      {/** 채팅 목록 */}
      <View style={styles.chatList}>
          <Text>Chat List</Text>
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
    top: 10,
    // flex: 1,
    width: '95%',
    // top: 80,
    height: 340,
    backgroundColor: '#FFF8DE',
    borderRadius: 15,
    alignItems: 'center',
    // position: 'absolute',
    shadowColor: '#4d4d4d',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  chatList: {
    top: 20,
    backgroundColor: 'yellow',
    width: '100%',
    height: 314,
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
    fontWeight: 'blod',
    color: 'black',
    top: 80,
    width: '95%',
    backgroundColor: 'green',
  },
  profile_id: {
    fontSize: 14,
    fontWeight: '300',
    fontStyle: 'italic',
    color: '#998888',
    top: 88,
    width: '95%',
    // backgroundColor: 'red',
  },
  introduce_text: {
    width: '95%',
    height: '30%',
    top: 116,
    backgroundColor: 'blue',
  },
  friend: {
    position: 'absolute',
    top: 24,
    left: '80%',
    // backgroundColor: '#df2571',
    // width: 56,
    // height: 32,
    // borderRadius: 15,
  },
  setting: {
    position: 'absolute',
    left: 0,
  },
});

export default Profile;
