/**
 * 사용자 프로필 + 생성한 여행 보드 리스트
 * + 친구 목록, 프로필 수정
 *
 *
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
        <Setting />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  userProfile: {
    // flex: 1,
    width: '100%',
    // top: 80,
    height: '50%',
    backgroundColor: '#FFF8DE',
    // position: 'absolute',
  },
  image: {
    backgroundColor: 'gray',
    width: 72,
    height: 72,
    borderRadius: 45,
    left: '50%',
    transform: [{translateX: -36}],
    top: 56,
  },
  profile_name: {
    fontSize: 20,
    fontWeight: 'blod',
    color: 'black',
    top: 80,
    left: 24,
    width: '50%',
  },
  profile_id: {
    fontSize: 14,
    fontWeight: 'thin',
    color: 'black',
    top: 91,
    left: 24,
    width: '50%',
  },
  introduce_text: {
    width: '60%',
    height: '30%',
    left: 24,
    top: 124,
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
});

export default Profile;
