// /**
//  * 매인 화면 (로그인 시, 가장 먼저 보이는 화면)
//  * 여행지 추천 목록  - 무한 스크롤. - flatlist 통해 구현.
//  * 상단 리롤, 데이터 get -> 임시 data API를 통해 구현함. (이후 데이터 구축)
//  *
//  * @format
//  */

import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  Button,
  ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import PlaceList from './components/PlaceList';
import Empty from '../../assets/Empty';

import placeData from '../../data/placeData';
import placeJSON from '../../data/place.json';



function HomeScreen() {
  const [page, setPage] = useState(1);
  const [place, setPlace] = useState([]);
  const [isFetchingMore, setIsFetchingMore] = useState(true);
  const [loading, setLoading] = useState(true);

    const getData = async() => {
      console.log('f loading?: ' + loading);
      console.log('f isFetchingMore?: ' + isFetchingMore);
      if(isFetchingMore) {
        try {
          const pageSize = 10;
          const startIndex = (page - 1) * pageSize;
          const endIndex = startIndex + pageSize;
         const placeData = placeJSON.records.slice(startIndex, endIndex);
  
          console.log('i' + placeData);
  
         setPlace((prevPlace) => [...prevPlace,...placeData]);
         console.log('item: ' + place[0].관광지명);
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }finally{
        setLoading(false);
        setIsFetchingMore(false);
      }
      }
  };
  
  
  const handleLoadMore = () => {
    console.log('load more');
    setIsFetchingMore(true);
    if (!isFetchingMore) {
      setLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
    setIsFetchingMore(false);
  };

useEffect(() => {
    getData();
  })
  console.log('loading?: ' + loading);
  console.log('isFetchingMore?: ' + isFetchingMore);
  return (
  
    <SafeAreaProvider>
      <SafeAreaView style={style.block}>
        <KeyboardAvoidingView style={style.avoid}>
          {/* <Pressable onPress={handleLoadMore}>
            <Text>hi</Text>
          </Pressable> */}
          {placeData.length === 0 ? (<Text>빈 화면</Text>) : <PlaceList place={placeData} onEndReached={handleLoadMore}/>}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const style = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoid: {
    flex: 1,
  },
});

export default HomeScreen;
