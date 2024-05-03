// /**
//  * 매인 화면 (로그인 시, 가장 먼저 보이는 화면)
//  * 여행지 추천 목록  - 무한 스크롤. - flatlist 통해 구현.
//  * 상단 리롤, 데이터 get -> 임시 data API를 통해 구현함. (이후 데이터 구축)
//  *
//  * @format
//  */

import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  Button,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import PlaceList from './PlaceList';
import Empty from '../../assets/Empty';

function HomeScreen() {
  const [place, setplace] = useState([
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

  return (
    <SafeAreaProvider>
      <SafeAreaView style={style.block}>
        <KeyboardAvoidingView style={style.avoid}>
          {place.length === 0 ? <Empty /> : <PlaceList place={place} />}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const style = StyleSheet.create({
  block: {
    flex: 1,
  },
  avoid: {
    flex: 1,
  },
});

export default HomeScreen;
