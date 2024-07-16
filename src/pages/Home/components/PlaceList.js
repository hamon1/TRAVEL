/**
 * 여행지 정보 무한스크롤. (flatlist)
 */

import React from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';
import {OptimizedFlatList} from 'react-native-optimized-flatlist';

import PlaceSection from './PlaceSection';

function PlaceList({place}, {onEndReached}) {
  return (
    <OptimizedFlatList
      style={style.list}
      data={place}
      renderItem={({item}) => (
        <PlaceSection id={item.id} text={item.text} text2={item.text2}/>
      )}
      keyExtractor={item => item.id}
      // onEndReached={onEndReached}
      // onEndReachedThreshold={0.6}
      // onRefresh={console.log('isLoading')}
      // refreshing={true}
      disableVirtualization={false} //비정상적인 스크롤 동작 방지
    />
  );
}

const style = StyleSheet.create({
  list: {
    // flex: 1,
  },
});

export default PlaceList;
