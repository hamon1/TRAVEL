/**
 * 여행지 정보 무한스크롤. (flatlist)
 */

import React from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';
import {OptimizedFlatList} from 'react-native-optimized-flatlist';

import PlaceSection from './PlaceSection';


function PlaceList({place}, {onEndReached}) {
  console.log('================================', {place}.place[0].types[0]);
  return (
    <OptimizedFlatList
      style={style.list}
      data={place}
      renderItem={({item}) => (
        <PlaceSection name={item.name} address={item.vicinity} photo_url={item.photos} types={item.types} lat={item.geometry.location.lat} lng={item.geometry.location.lng}/>
        // <PlaceSection id={item.id} text={item.text} text2={item.text2} structured_formatting={item.structured_formatting} />
      )}
      keyExtractor={item => item.id}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.6}
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
