/**
 * 여행지 정보 무한스크롤. (flatlist)
 */

import React from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';
import {OptimizedFlatList} from 'react-native-optimized-flatlist';

import PlaceSection from './PlaceSection';

const GOOGLE_PLACES_API_KEY = 'AIzaSyDRdIybBpN0aO6gJal9skDd0VG6KMrgqJk';


function PlaceList({place}, {onEndReached}) {
  console.log('================================', {place}.place[0].photos);
  // photo_reference를 사용하여 사진 URL 생성
  // const photoUrl = place.photos
  // ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place[0].photos.photo_reference}&key=${GOOGLE_PLACES_API_KEY}`
  // : null;

  // console.log("photoUrl: ", photoUrl);

  return (
    <OptimizedFlatList
      style={style.list}
      data={place}
      renderItem={({item}) => 
        {// photo_reference를 사용하여 사진 URL 생성
        const photoUrl = item.photos
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&key=${GOOGLE_PLACES_API_KEY}`
          : null;

        console.log("photoUrl: ", photoUrl);

        return (
          <PlaceSection 
            name={item.name} 
            address={item.vicinity} 
            photo_url={photoUrl} 
            types={item.types} 
            lat={item.geometry.location.lat} 
            lng={item.geometry.location.lng} 
          />
        );}
        // <PlaceSection name={item.name} address={item.vicinity} photo_url={photoUrl} types={item.types} lat={item.geometry.location.lat} lng={item.geometry.location.lng} />
        // <PlaceSection id={item.id} text={item.text} text2={item.text2} structured_formatting={item.structured_formatting} />
      }
      keyExtractor={item => item.place_id}
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
