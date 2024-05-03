/**
 * 사용자 프로필 + 생성한 여행 보드 리스트
 * + 친구 목록, 프로필 수정
 *
 *
 */
import People from '../../components/NumOfPeople';

import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import PlanList from './PlanList';
import Empty from '../../assets/Empty';

import {useNavigation} from '@react-navigation/native';
import PlaceList from '../Home/PlaceList';

const Profile = () => {
  const [plan, setplace] = useState([
    {
      id: 1,
      text: 'place1',
      text2:
        'Excepteur anim culpa Lorem reprehenderit adipisicing excepteur consectetur et et eiusmod ex veniam consectetur velit.',
    },
    {
      id: 2,
      text: 'place2',
      text2:
        'Excepteur anim culpa Lorem reprehenderit adipisicing excepteur consectetur et et eiusmod ex veniam consectetur velit.',
    },
    {
      id: 3,
      text: 'place3',
      text2:
        'Excepteur anim culpa Lorem reprehenderit adipisicing excepteur consectetur et et eiusmod ex veniam consectetur velit.',
    },
    {
      id: 4,
      text: 'place4',
      text2:
        'Excepteur anim culpa Lorem reprehenderit adipisicing excepteur consectetur et et eiusmod ex veniam consectetur velit.',
    },
    {
      id: 5,
      text: 'place5',
      text2:
        'Excepteur anim culpa Lorem reprehenderit adipisicing excepteur consectetur et et eiusmod ex veniam consectetur velit.',
    },
    {
      id: 6,
      text: 'place6',
      text2:
        'Excepteur anim culpa Lorem reprehenderit adipisicing excepteur consectetur et et eiusmod ex veniam consectetur velit.',
    },
    {
      id: 7,
      text: 'place7',
      text2:
        'Excepteur anim culpa Lorem reprehenderit adipisicing excepteur consectetur et et eiusmod ex veniam consectetur velit.',
    },
  ]);

  const navigation = useNavigation();

  return (
    <>
      <SafeAreaProvider>
        <View style={styles.block}>
          <View style={styles.userProfile}>
            <View style={styles.user_image}>
              <Image style={styles.image} />
            </View>
            <View style={styles.introduce_box}>
              <Text style={styles.profile_name}>userName</Text>
              <Text style={styles.profile_id}>userId: 000000</Text>
              <Text style={styles.introduce_text}>
                Ad consequat fugiat ad nostrud aliqua occaecat culpa amet.
              </Text>
            </View>
          </View>

          <SafeAreaView style={styles.PlaceList}>
            <KeyboardAvoidingView>

              {plan.length === 0 ? (
                <Empty />
              ) : (
                <>
                  <PlanList plan={plan} />
                </>
              )}
            </KeyboardAvoidingView>
          </SafeAreaView>
        </View>
      </SafeAreaProvider>
    </>
  );
};

const styles = StyleSheet.create({
  PlaceList: {
    top: 128,
    backgroundColor: 'white',
    height: 546,
  },
  block: {
    flex: 1,
  },
  userProfile: {
    // flex: 1,
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
    borderRadius: 45,
  },
  introduce_box: {
    width: '70%',
    height: 128,
    backgroundColor: 'green',
    paddingLeft: 10,
  },
  user_image: {
    width: '30%',
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
  profile_name: {
    fontSize: 16,
    fontWeight: 'blod',
    color: 'black',
    top: 20,
    left: 10,
    width: '50%',
  },
  profile_id: {
    fontSize: 14,
    fontWeight: 'thin',
    color: 'black',
    top: 25,
    left: 10,
    width: '50%',
  },
  introduce_text: {
    width: '60%',
    height: '30%',
    left: 10,
    top: 40,
  },
});

export default Profile;
